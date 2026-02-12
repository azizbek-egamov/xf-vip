import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const message = formData.get('message') as string
        const file = formData.get('photo') as File | null

        const token = process.env.TELEGRAM_BOT_TOKEN
        const chatId = process.env.TELEGRAM_CHAT_ID

        if (!token || !chatId) {
            console.error('Missing Telegram credentials')
            return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 })
        }

        if (file) {
            // If there is a file, use sendPhoto
            const telegramFormData = new FormData()
            telegramFormData.append('chat_id', chatId)
            telegramFormData.append('caption', message)
            telegramFormData.append('parse_mode', 'HTML')
            telegramFormData.append('photo', file)

            const url = `https://api.telegram.org/bot${token}/sendPhoto`
            const response = await fetch(url, {
                method: 'POST',
                body: telegramFormData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Telegram API error (Photo):', errorData)
                throw new Error('Telegram API error')
            }
        } else {
            // If no file, use sendMessage
            const url = `https://api.telegram.org/bot${token}/sendMessage`
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML',
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Telegram API error (Message):', errorData)
                throw new Error('Telegram API error')
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to send Telegram content:', error)
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
    }
}
