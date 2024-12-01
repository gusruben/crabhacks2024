<script>
	import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";

    let answersUpload;
</script>

<div class="container">
    <header>
        <a href="/assignments" id="back">
            <Icon icon="mingcute:left-line" width="1em" height="1em" />
        </a>
        <h1>Create New Assignment</h1>
    </header>
    <main class="main">
        <input type="text" placeholder="Assignment Name" class="input">
        <textarea placeholder="Short Description" class="input textarea"></textarea>
        <p style="font-size: 1.5em; margin: 0;">Answer Key</p>
        <div class="upload">
            <input type="file" class="upload-option" style="display: none" bind:this={answersUpload}>
            <button class="upload-option" on:click={() => answersUpload.click()}>
                <Icon icon="mingcute:upload-2-line" width="2em" height="2em" class="upload-icon"/>
                <p>Upload</p>
            </button>
            <button class="upload-option">
                <Icon icon="mingcute:camera-2-line" width="2em" height="2em" class="upload-icon"/>
                <p>Scan</p>
            </button>
        </div>
        <button class="color-button" on:click={() => goto("/capture")}>Create Assignment</button>
    </main>
</div>

<style>

    .main {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 1em;
    }

    .input {
        background-color: #2C2E33;
        border: 1px solid #404249;
        color: white;
        font-size: 1.2em;
        font-family: Lexend;
        padding: 0.5em;
        border-radius: 6px;
        outline: none !important;
    }
    .textarea {
        min-height: 7.5em;
    }

    .upload {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        height: 7.5em;
    }
    .upload-option {
        background-color: #2C2E33;
        border: 1px solid #404249;
        flex: 1;
        border-radius: 6px;
        color: white;
        font-family: Lexend;
        font-size: 1.2em;
        display: flex;
        flex-direction: column;
    }
    :global(.upload-icon) {
        margin: 0 auto;
        margin-top: 1em;
    }

    :global(body) {
        margin: 0;
        background-color: #232529;
        color: #ffffff;
        overflow: hidden;
        /*disable zoom*/
        touch-action: none;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    #back {
        float: left;
        font-size: 1.8rem;
        color: white;
    }

    header {
        padding: 1em;
        text-align: center;
        background: linear-gradient(180deg, #232529FF 73.22%, #23252915 100%);
    }

    h1 {
        margin: 0;
        font-size: 1.5em;
    }
    
    .color-button {
        background-color: #4263af;
        color: #ffffff;
        border: none;
        border-radius: 0.2em;
        margin: 0px;
        padding: 0.5em 3em;
        width: max-content;
        display: flex;
        font-family: Lexend;
        font-size: 1.2em;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: 0px -3.556px 3.556px 0px rgba(15, 49, 112, 0.25) inset, 0px 3.556px 3.556px 0px rgba(149, 177, 229, 0.10) inset;
        background-image: linear-gradient(-180deg, #3E70CD 0%,  #1C53B8 100%);
        margin: 0.5em auto;
    }
    .color-button:first-of-type {
        margin-top: 2em;
    }
    .color-button:active {
        filter: brightness(1.2);
    }
</style>
