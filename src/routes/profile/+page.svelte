<script>
	import { goto } from "$app/navigation";
	import NavBar from "$lib/NavBar.svelte";
    import Icon from "@iconify/svelte";
</script>

<div class="container">
    <header>
        <h1>Profile</h1>
    </header>

    <div class="pfp">
        <p>GR</p>
    </div>

    <p class="info">Gus Ruben</p>
    <p class="info email">gusruben@protonmail.com</p>

    <button class="color-button">Update Email</button>
    <button class="color-button">Change Password</button>
    <button class="color-button">Delete Account</button>
    <NavBar selectedPage="Profile"/>
</div>

<style>

    .info:first-of-type {
        margin-top: 1.5em;
    }
    .info {
        margin: 0 auto;
        font-size: 1.2em;
    }
    .info.email {
        opacity: 0.5;
    }

    .pfp {
        width: 15em;
        height: 15em;
        background-color: #2C2E33;
        border: 6px solid #404249;
        border-radius: 50%;
        margin: 2rem auto 0 auto; 
    }
    .pfp p {
        font-size: 6em;
        margin: 3.5rem auto 0 auto;
        text-align: center;
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
