import { json } from '@sveltejs/kit';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const anthropic = createAnthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
})
const model = anthropic("claude-3-5-sonnet-latest");

export default async function POST({ request }) {
    const data = await request.formData();
    const file = data.get('file');

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    const response = await generateText({
        model,
        // prompt: "Describe in detail the given image, including the answers and which answer the student selected. At the end, write a divider of ---, then write the selected letters one after the other in a line, and nothing else."
        messages: [
            {
                content: [
                    {
                        type: "text",
                        text: "Describe in detail the given image, including the answers and which answer the student selected. At the end, write a divider of ---, then write the selected letters one after the other in a line, and nothing else.",
                    },
                    {
                        type: "file",
                        data: base64Image,
                        mimeType: file.type,
                    }
                ]
            }
        ]
    })

    return json({ analysis: response.choices[0].text });
}