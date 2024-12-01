<script>
	import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";

    
    export let selectedPage = "Assignments"; // Default selected page

    const navItems = [
        { name: "Assignments", icon: "mingcute:document-2-fill", href: "/assignments" },
        { name: "Students", icon: "mingcute:contacts-2-fill", href: "#" },
        { name: "Profile", icon: "iconamoon:profile-fill", href: "/profile" }
    ];

    const selectPage = (page) => {
        selectedPage = page;
    };
</script>

<nav class="bottom-nav">
    {#each navItems as item}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="nav-item {item.name === selectedPage ? 'selected' : ''}"
            on:click={() => {selectPage(item.name); goto(item.href)}}
        >
            <Icon class="icon" icon={item.icon} width="1.5em" height="1.5em" />
            <p>{item.name}</p>
        </div>
    {/each}
</nav>

<style>
    .bottom-nav {
        display: flex;
        justify-content: space-around;
        padding: 0.6rem 0;
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

    .nav-item.selected::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        /*border: 2px solid transparent; /* For gradient border */
        /*background: linear-gradient(
            rgba(120, 173, 243, 0.2),
            rgba(120, 173, 243, 1)
        );*/
        -webkit-mask: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1));
        mask: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1));
        /*border-image: linear-gradient(
            rgba(120, 173, 243, 0.2),
            rgba(120, 173, 243, 1)
        );*/
        border-image-slice: 1;
        border-radius: 16px;
        border: 2px solid rgba(57, 149, 255, 0.70);
        background: linear-gradient(0deg, rgba(57, 149, 255, 0.40) 0%, rgba(34, 90, 153, 0.00) 100%);
    }


</style>
