<script>
    import Icon from '@iconify/svelte';

    // Example answers for evaluation
    let evaluations = ["A", "B", "B", "C", "A"];
</script>

<div id="webcam"></div>

<div id="cam-button">
    <Icon icon="mdi:camera" width="2em" height="2em" color="white" />
</div>

<div id="evaluation-row">
    {#each evaluations as answer, i}
        <div class="evaluation-box" title={`Question ${i + 1}: ${answer}`}>
            <!-- Circle with index -->
            <div class="index-circle">{i + 1}</div>
            <span class="box-content">{answer}</span>
        </div>
    {/each}
</div>

<style>
    #webcam {
        width: 90%;
        height: 70%;
        margin: 0 auto;
        border-radius: 5px;
        background-color: rgb(176, 176, 176);
        border: 1px solid red; /* Debugging aid */
        position: absolute;
        /* Centered */
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #cam-button {
        width: 4em;
        height: 4em;
        border-radius: 50%;
        background-image: linear-gradient(45deg, #78adf3, #4263af);
        position: absolute;
        bottom: 2em;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

    :global(body) {
        background-color: lightgray;
    }
</style>
