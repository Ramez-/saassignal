<script>
    import { onMount } from 'svelte';
    let fadeIn = false;

    onMount(() => {
        setTimeout(() => {
            fadeIn = true;
        }, 100);
    });
</script>

<svelte:head>
    <title>Confirmation - SaaSignal</title>
</svelte:head>

<div class="min-h-screen bg-[#2B1917] flex flex-col items-center justify-center px-4 transition-opacity duration-500" class:opacity-100={fadeIn} class:opacity-0={!fadeIn}>
    <div class="bg-custom-beige text-[#2B1917] rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 class="text-3xl font-bold mb-4 text-custom-red">Thank You!</h1>
        <p class="text-xl mb-6">Your email has been recorded. We will contact you shortly for your complimentary 2 months free trial.</p>
        <a href="/" class="inline-block bg-custom-red text-custom-beige px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
            Return to Home
        </a>
    </div>
</div>