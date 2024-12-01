<script>
    import Icon from "@iconify/svelte";

    let { data } = $props();

    let students = [
        { name: "Emma Thompson", grade: "9/10" },
        { name: "Marcus Chen", grade: "7/10" },
        { name: "Sofia Rodriguez", grade: "8/10" },
        { name: "James Wilson", grade: "6/10" },
        { name: "Aisha Patel", grade: "10/10" },
        { name: "Lucas Schmidt", grade: "7/10" },
        { name: "Nina Kowalski", grade: "8/10" },
        { name: "Derek Johnson", grade: "5/10" },
        { name: "Maya Singh", grade: "9/10" },
        { name: "Felix Anderson", grade: "7/10" },
        { name: "Olivia Martinez", grade: "8/10" },
        { name: "Kai Nakamura", grade: "9/10" },
        { name: "Sarah O'Connor", grade: "6/10" },
        { name: "Hassan Ali", grade: "8/10" },
        { name: "Lena Ivanova", grade: "7/10" },
        { name: "Thomas Wright", grade: "9/10" },
        { name: "Isabella Santos", grade: "10/10" },
        { name: "Yuki Tanaka", grade: "8/10" },
        { name: "Zoe Campbell", grade: "7/10" },

    ]
</script>

<div class="container">
    <header>
        <h1>{data.slug}</h1>
    </header>
    <main class="students">
        {#each students as student}
            <div class="student">
                <p>{student.name}</p>
                <span>
                    <p>{student.grade}</p>
                    <Icon class="icon" icon="mingcute:right-line" width="1em" height="1em" />
                </span>
            </div>
        {/each}
    </main>
</div>

<style>
    .student {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #2C2E33;
        border-bottom: 1px solid #404249; 
        padding: 0 1em;
    }
    .student span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;
    }
    .students {
        overflow-y: auto;
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
</style>
