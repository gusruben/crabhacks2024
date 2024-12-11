<script>
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    let evaluations = [];
    //create an answer key dictionary
    let answerKey = [
        {question: 5, answer: "C"},
        {question: 6, answer: "D"},
        {question: 7, answer: "C"},
        {question: 8, answer: "A"},
    ];
    let score = 0;
    let analysisResult = ''; // To store the AI analysis result

    let video;
    let canvas;
    let camDiv;
    let outerWebcamBox;

    export async function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    export async function sendRequest(fileBase64) {
        console.log("begin analysis")
        // const fileBase64 = await fileToBase64(file);
        console.log(fileBase64)
        const response = await fetch('/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                base64Image: fileBase64
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
    let width = 0;
    let height = 0;

    function getBase64(canvas){
        const data = canvas.toDataURL("image/png");
        return data.split(",")[1];
    }

    async function takePicture() {
        const context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        const data = getBase64(canvas);
        analysisResult = await sendRequest(data);
        let evaluationsLines = analysisResult.trimEnd().split("\n");
        let evaluationsRaw = evaluationsLines[evaluationsLines.length - 1].split(" ");
        updateEvaluations(evaluationsRaw);
    }

    function updateEvaluations(evaluationsRaw){
        let newEvaluations = [];
        //check that each evaluation is a question in the answer key
        //also check if it's already been evaluated; if so, simply overwrite it and alert the user
        for (let i = 0; i < evaluationsRaw.length; i++) {
            let evalThis = evaluationsRaw[i].split(":");
            let questionNumber = parseInt(evalThis[0]);
            let answer = evalThis[1];
            if (evalThis[1] == "?") continue; //TODO: handle case of unknown answer
            let foundInAnswerKey = false;
            for (let j = 0; j < answerKey.length; j++) {
                if (answerKey[j].question == questionNumber) {
                    foundInAnswerKey = true;
                    let alreadyEvaluated = false;
                    if (evaluations.length > 0) {
                        for (let k = 0; k < evaluations.length; k++) {
                            if (evaluations[k].question == questionNumber) {
                                evaluations[k].answer = answer;
                                alert(`Question ${questionNumber} has been re-evaluated to ${answer}`);
                                alreadyEvaluated = true;
                                break;
                            }
                        }
                    }
                    if (!alreadyEvaluated) {
                        newEvaluations.push({ answer: evalThis[1], question: evalThis[0] });
                    }
                    break;
                }
            }
            if (!foundInAnswerKey) {
                alert(`Question ${questionNumber} is not in the answer key`);
            }
        }
        evaluations = [...evaluations, ...newEvaluations]; // Concatenate old and new evaluations
        console.log('Evaluations:', evaluations);
        console.log('Score:', score);
        console.log('Answer Key Length:', answerKey.length);
        score = getScore(); 
    }

    let streaming = false;
    function canPlay() {
        if (!streaming) {
            width = video.videoWidth;
            height = video.videoHeight;
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            //outerWebcamBox.style["height"] = 0.9 * (height/width) * 100 + "%";
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
        }
    }

    function isCorrect(index){
        for(let i = 0; i < answerKey.length; i++){
            if(answerKey[i].question == evaluations[index].question){
                return answerKey[i].answer == evaluations[index].answer;
            }
        }
    }

    function getScore(){ //Returns the number of correct answers
        let s = 0;
        for(let i = 0; i < evaluations.length; i++){
            if(isCorrect(i)) s++;
        }
        return s;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<canvas bind:this={canvas} style="opacity: 0; pointer-events: none"></canvas>

<!-- Webcam Placeholder -->
<div id="webcam" bind:this={outerWebcamBox}>
    <div id="webcam-wrapper">
        <!-- svelte-ignore a11y_media_has_caption -->
        <video id="video" bind:this={video} on:canplay={canPlay}></video>
    </div>
</div>

<!-- Camera Button -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="cam-button" on:click={takePicture}>
    <div bind:this={camDiv}>
        <Icon icon="mdi:camera" width="2em" height="2em" color="white" />
    </div>
</div>

<!-- Evaluation Row -->
<div id="evaluation-row">
    {#each evaluations as answer, i}
        <div class={"evaluation-box " + (isCorrect(i) ? "correct" : "wrong")} title={`Question ${answer.question}: ${answer.answer}`}>
            <!-- Circle with index -->
            <div class="index-circle">{answer.question}</div>
            <span class="box-content">{answer.answer}</span>
        </div>
    {/each}
</div>

{#if evaluations.length}
  <p class="score">Score: {score}/{answerKey.length}</p>
{/if}

<h1 style="position: absolute; top: 0.5rem; width: 100%; text-align: center; color: white">Scan an Assignment</h1>

<!-- Display AI Analysis Result -->
<!-- {#if analysisResult}
    <div id="analysis-result">
        <h2>AI Analysis:</h2>
        <p>{analysisResult}</p>odu
    </div>
{/if} -->

<style>
    #webcam {
        width: 90%;
        height: 80%;
        margin: 0 auto;
        border-radius: 5px;
        background-color: #2C2E33;
        position: absolute;
        /* Centered */
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #webcam-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
    }
    #video {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: contain;
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
        padding-top: 3rem; /* Add some top padding */
        padding-left: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        overflow-x: scroll;
    }

    /* Individual evaluation boxes */
    .evaluation-box {
        position: relative; /* Position relative for index circle */
        width: 3em;
        height: 3em;
        border-radius: 5px;
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
    .evaluation-box.correct {
        border: 2px solid #7BC891;
        background-color: rgba(164, 226, 181, 0.60);
        backdrop-filter: blur(10px);
    }
    .evaluation-box.wrong {
        border: 2px solid #E97474;
    background: rgba(233, 192, 183, 0.50);
    backdrop-filter: blur(10px);
    }

    .score {
        position: absolute;
        bottom: 0.3rem;
        right: 1rem;
        font-size: 1rem;
        color: white;
        font: Lexend;
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
        touch-action: none;
        overflow: hidden;
    }

    @keyframes infinite-rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .rotate {
        animation: infinite-rotate 2s linear infinite;
    }
</style>
