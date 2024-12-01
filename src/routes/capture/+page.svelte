<script>
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { createAnthropic } from '@ai-sdk/anthropic';
    import { generateText } from 'ai';

    let evaluations = ["A", "B", "B", "C", "A"];
    let analysisResult = ''; // To store the AI analysis result

    export async function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    export async function sendRequest(file) {
        console.log("begin analysis")
        const fileBase64 = await fileToBase64(file);
        console.log(fileBase64)
        const response = await fetch('/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileBase64
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log("analysis complete")
        const result = await response.json();
        console.log("AI Analysis Result:", result);
        return result.analysis; // Return the result for display
    }

    /**
     * Tests the getAnswers function with a static file.
     */
     async function testGetAnswers() {
        try {
            // Fetch the image from the static directory
            const response = await fetch('/test_answers.png');
            if (!response.ok) {
                throw new Error('Failed to load test image.');
            }
            const blob = await response.blob();
            // Create a File from the Blob
            const testFile = new File([blob], "test_answers.png", { type: blob.type });
            // Send the File
            analysisResult = await sendRequest(testFile);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    onMount(()  =>{
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
  });
        // testGetAnswers();
    })
</script>

<!-- Webcam Placeholder -->
<div id="webcam">
    <div id="webcam-wrapper">
        <!-- svelte-ignore a11y_media_has_caption -->
        <video id="video" bind:this={video}></video>
    </div>
</div>

<!-- Camera Button -->
<div id="cam-button">
    <Icon icon="mdi:camera" width="2em" height="2em" color="white" />
</div>

<!-- Evaluation Row -->
<div id="evaluation-row">
    {#each evaluations as answer, i}
        <div class="evaluation-box" title={`Question ${i + 1}: ${answer}`}>
            <!-- Circle with index -->
            <div class="index-circle">{i + 1}</div>
            <span class="box-content">{answer}</span>
        </div>
    {/each}
</div>

<!-- Display AI Analysis Result -->
{#if analysisResult}
    <div id="analysis-result">
        <h2>AI Analysis:</h2>
        <p>{analysisResult}</p>odu
    </div>
{/if}

<style>
    #webcam {
        width: 90%;
        height: 80%;
        margin: 0 auto;
        border-radius: 5px;
        background-color: #2C2E33;
        position: absolute;
        /* Centered */
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #webcam-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }
    #video {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
    }

    #cam-button {
        width: 4em;
        height: 4em;
        border-radius: 50%;
        background-image: linear-gradient(180deg, #3E70CD 0%, #1C53B8 100%);;
        position: absolute;
        bottom: 2em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px -3.556px 3.556px 0px rgba(15, 49, 112, 0.25) inset, 0px 3.556px 3.556px 0px rgba(149, 177, 229, 0.10) inset;
    }


    /* Evaluation row at the bottom */
    #evaluation-row {
        display: flex;
        gap: 0.5em;
        position: absolute;
        bottom: 6em;
        left: 50%;
        transform: translateX(-50%);
    }

    /* Individual evaluation boxes */
    .evaluation-box {
        position: relative; /* Position relative for index circle */
        width: 3em;
        height: 3em;
        border-radius: 0.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: bold;
        color: white;
        text-transform: uppercase;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-color: rgb(200, 150, 150);
    }

    /* Small circle for index */
    .index-circle {
        position: absolute;
        top: -0.5em;
        left: -0.5em;
        width: 1.2em;
        height: 1.2em;
        background-color: #4263af;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8em;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Centered content in boxes */
    .box-content {
        text-align: center;
    }

    /* Analysis Result Styling */
    #analysis-result {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        background-color: white;
        padding: 1em;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-height: 30%;
        overflow-y: auto;
    }

    #analysis-result h2 {
        margin-top: 0;
        color: #4263af;
    }

    #analysis-result p {
        white-space: pre-wrap; /* Preserve line breaks */
    }

    :global(body) {
        background-color: #232529;
        margin: 0;
        padding: 0;
        font-family: 'Lexend', sans-serif;
    }
</style>
