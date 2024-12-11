import {VITE_ANTHROPIC_API_KEY} from '$env/static/private';
import {VITE_GEMINI_API_KEY} from '$env/static/private';
import { GoogleGenerativeAI } from "@google/generative-ai";

const modelName = "gemini-1.5-flash"; //TODO figure out why experimental model isn't working
const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: modelName });

export async function POST({ request }) {
    const { base64Image } = await request.json(); //TODO fix low image resolution
    const PROMPT = "You have been given a picture of a student's answers to a multiple choice test. In order, state the letter that the student either bubbled in or circled for each question. Your answers should be separated by spaces and formatted as [question number]:[answer]. For example, if the student bubbled in 'A' for question 1 and 'B' for question 2, you should write '1:A 2:B'. If the student did not answer a question, or circled/bubbled more than one answer, write [question number]:?\nYour final output should be on the last line of your response. Do not include additional line breaks after your output.";
    // Create the AI request
    const result = await model.generateContent([
    {
        inlineData: {
            data: base64Image,
            mimeType: "image/png",
        },
    }, PROMPT
    ]);

    console.log("HERE!!!");
    // Check if response is valid
    // console.log(await response.json())

    let text = await result.response.text();
    console.log(text);
    return new Response(JSON.stringify({ analysis: text}), { status: 200 });
}