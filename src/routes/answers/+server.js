import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import {VITE_ANTHROPIC_API_KEY} from '$env/static/private';

export async function POST({ request }) {
    const { fileBase64 } = await request.json();
    const apiKey = VITE_ANTHROPIC_API_KEY;

    if (!apiKey) {
        throw new Error("API_KEY is not set.");
    }

    // Initialize the Anthropics instance
    const anthropic = createAnthropic({
        apiKey: apiKey,
    });

    // Define the model
    const model = "claude-3-5-sonnet-20241022";
    const prompt = `Describe in explicit detail the given image. Describe the layout of the page. Then, describe the answers for each question, giving each option it's own paragraph. Then, note which answer the student selected for each question, but never write the letter, only what the sentence is, then that it's the third option / second option / etc. At the end, write the selected letters one after the other in this format (for example answers of ABCD):
\`\`\`
(first option) -> A
(second option) -> B
(third option) -> C
(fourth option) -> D
ABCD
\`\`\`
`
    // Create the AI request
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image",
                            source: {
                                type: "base64",
                                media_type: "image/png", // Adjust the media type as needed
                                data: fileBase64.split(',')[1], // Remove the data URL prefix
                            },
                        },
                        {
                            type: "text",
                            text: prompt
                        }
                    ]
                    // content: "Hello there!"
                }
            ]
        }),
        temperature: 1.0
    });

    console.log("HERE!!!")
    // Check if response is valid
    // console.log(await response.json())
    return new Response(JSON.stringify({ analysis: (await response.json()).content[0].text }), { status: 200 });
}