<!-- App.svelte -->
<script>
    import {onMount} from 'svelte';
    import "../app.css";

    onMount(async () => {
        const {gsap} = await import('gsap');
        const {MotionPathPlugin} = await import('gsap/MotionPathPlugin');

        gsap.registerPlugin(MotionPathPlugin);
        gsap.to("#light1", {
            duration: 10,
            repeat: -1,
            ease: "none",
            motionPath: {
                path: "#path1",
                align: "#path1",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            }
        });

        gsap.to("#light2", {
            duration: 12,
            repeat: -1,
            ease: "none",
            motionPath: {
                path: "#path2",
                align: "#path2",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            }
        });
    });
</script>


<main>
    <nav>
        <div class="logo">SaasSignal</div>
        <button class="contact-btn">Contact us</button>
    </nav>

    <header>
        <h1>
            <span class="orange">Unlock,</span> Exclusive<br>
            Insights into the Public B2B SaaS <span class="orange">Market.</span>
        </h1>
        <!-- <button class="cta-btn">Let's work together</button> -->
    </header>

    <svg class="background-design" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path id="path1" d="M0,300 Q250,200 500,300 T1000,300" fill="none" stroke="#FF5733" stroke-width="1"
              opacity="0.5"/>
        <path id="path2" d="M0,350 Q250,250 500,350 T1000,350" fill="none" stroke="#FF5733" stroke-width="1"
              opacity="0.5"/>

        <circle id="light1" r="4" fill="#FFA07A"/>
        <circle id="light2" r="4" fill="#FFA07A"/>
    </svg>
</main>

<h1 class="text-3xl font-bold underline">
    Hello world!
</h1>