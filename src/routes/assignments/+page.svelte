<script>
	import NavBar from "$lib/NavBar.svelte";
    import Icon from "@iconify/svelte";

    let assignments = [
        { title: "Calculus 11.2 HW", description: "Graph the following Equations", dueDate: "11/23/24" },
        { title: "Calculus 11.2 HW", description: "Solve These Equations", dueDate: "11/23/24" },
        { title: "Calculus 11.2 HW", description: "Prove this Equation", dueDate: "11/23/24" },
        { title: "Calculus 11.2 HW", description: "Complete the MCQ", dueDate: "11/23/24" },
        { title: "Calculus 11.2 HW", description: "Finish the FRQ", dueDate: "11/23/24" },
        { title: "Calculus 11.2 HW", description: "Grade the FRQ and explain why it’s correct", dueDate: "11/23/24" },
        /*more assignments*/
        {title: "Calculus 11.2 HW", description: "Graph the following Equations", dueDate: "11/23/24"},
        {title: "Calculus 11.2 HW", description: "Solve These Equations", dueDate: "11/23/24"},
        {title: "Calculus 11.2 HW", description: "Prove this Equation", dueDate: "11/23/24"},
        {title: "Calculus 11.2 HW", description: "Complete the MCQ", dueDate: "11/23/24"},
        {title: "Calculus 11.2 HW", description: "Finish the FRQ", dueDate: "11/23/24"},
    ];
</script>

<div class="container">
    <header>
        <h1>My Assignments</h1>
    </header>

    <main class="assignments">
        {#each assignments as assignment}
            <div class="assignment-card">
                <div class="assignment-info">
                    <h2>{assignment.title}</h2>
                    <p>{assignment.description}</p>
                </div>
                <div class="assignment-date">{assignment.dueDate}</div>
            </div>
        {/each}
    </main>

    <button class="floating-button"><Icon id="plus" icon="tabler:plus" width="1.6rem" height="1.6rem" color="white" /></button>
    <NavBar selectedPage="Assignments"/>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #121212;
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
        background: linear-gradient(180deg, #232529 73.22%, rgba(35, 37, 41, 0.00) 100%);
    }

    h1 {
        margin: 0;
        font-size: 1.5em;
        
    }

    .assignments {
        flex: 1;
        padding: 1em;
        overflow-y: auto;
        margin-bottom: 4rem;
    }

    .assignment-card {
        background-color: #1e1e1e;
        border-radius: 8px;
        padding: 1em;
        margin-bottom: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 1px solid gray;
    }

    .assignment-info {
        max-width: 70%;
    }

    .assignment-info h2 {
        margin: 0;
        font-size: 1.2em;
        font-weight: bold;
    }

    .assignment-info p {
        margin: 0.2em 0 0;
        color: #aaaaaa;
    }

    .assignment-date {
        font-size: 0.9em;
        color: #aaaaaa;
    }

    .floating-button {
        position: fixed;
        bottom: 6rem;
        right: 2rem;
        background-color: #4263af;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        width: 3.5rem;
        height: 3.5rem;
        margin: 0px;
        padding: 0px;
        font-size: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        box-shadow: 0px -3.556px 3.556px 0px rgba(15, 49, 112, 0.25) inset, 0px 3.556px 3.556px 0px rgba(149, 177, 229, 0.10) inset;
        background-image: linear-gradient(-180deg, #3E70CD 0%,  #1C53B8 100%);
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
    }
</style>
