<script>
    export let selectedPage = "Assignments"; // Default selected page

    const navItems = [
        { name: "Assignments", icon: "📄" },
        { name: "Students", icon: "👤" },
        { name: "Profile", icon: "⚙️" }
    ];

    const selectPage = (page) => {
        selectedPage = page;
    };
</script>

<nav class="bottom-nav">
    {#each navItems as item}
        <div
            class="nav-item {item.name === selectedPage ? 'selected' : ''}"
            on:click={() => selectPage(item.name)}
        >
            <span class="icon">{item.icon}</span>
            <p>{item.name}</p>
        </div>
    {/each}
</nav>

<style>
    .bottom-nav {
        display: flex;
        justify-content: space-around;
        padding: 1rem 0;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #36383E;
        background-color: #1B1D21;
    }

    .nav-item {
        text-align: center;
        color: #ffffff;
        cursor: pointer;
        position: relative;
        padding: 0.5em;
        border-radius: 8px;
        margin-left: 0.5em;
        margin-right: 0.5em;
        width: 100%;
    }

    .nav-item p {
        margin: 0.2em 0 0;
        font-size: 0.9em;
    }

    .nav-item.selected {
        color: #78adf3; /* Highlighted text */
        border: 2px solid transparent; /* For gradient border */
        background: linear-gradient(
            rgba(120, 173, 243, 0.2),
            rgba(120, 173, 243, 1)
        );
        -webkit-mask: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1));
        mask: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1));
        border-image: linear-gradient(
            rgba(120, 173, 243, 0.2),
            rgba(120, 173, 243, 1)
        );
        border-image-slice: 1;
    }


</style>
