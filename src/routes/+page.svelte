<script>
    import "../app.css";
    import interview from './interview.png';
    import documents from './documents.png';
    import web from './web.png';
    import {onMount} from 'svelte';

    let leftIcons = [
        {src: web, text: 'We conduct interviews with product users, including software and site reliability engineers', alt: 'Icon 1'},
        {src: interview, text: 'We conduct interviews with product users, including software and site reliability engineers', alt: 'Icon 2'},
    ];

    let rightIcon = {src: documents, text: 'We collect data from publicly available sources, such as SEC filings.\n', alt: 'Icon 3'};

    let containerRef;
    let leftIconRefs = [];
    let rightIconRef;
    let ddogCardRef;
    let ovals = [];
    let gsap;

    onMount(async () => {
        const gsapModule = await import('gsap');
        gsap = gsapModule.gsap;
        const {MotionPathPlugin} = await import('gsap/MotionPathPlugin');
        gsap.registerPlugin(MotionPathPlugin);

        drawCurvedLines();
        animateCircles();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    function handleResize() {
        drawCurvedLines();
        animateCircles();
    }

    function drawCurvedLines() {
        const curvedLines = document.getElementById('curvedLines');
        curvedLines.innerHTML = ''; // Clear existing lines and circles

        const containerRect = containerRef.getBoundingClientRect();
        const ddogCardRect = ddogCardRef.getBoundingClientRect();

        // Draw paths for left icons
        leftIcons.forEach((_, index) => {
            const iconElement = leftIconRefs[index];
            if (!iconElement) return;

            const iconRect = iconElement.getBoundingClientRect();
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            const startX = iconRect.right - containerRect.left;
            const startY = iconRect.top + iconRect.height / 2 - containerRect.top;
            const endX = ddogCardRect.left - containerRect.left;
            const endY = ddogCardRect.top + ddogCardRect.height / 2 - containerRect.top;
            const controlX = startX + (endX - startX) * 0.7; // Adjust this value to change the curve

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${startY} ${endX} ${endY}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'black');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('id', `pathLeft${index}`);

            curvedLines.appendChild(path);

            const oval = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            oval.setAttribute('rx', '20'); // Horizontal radius
            oval.setAttribute('ry', '3'); // Vertical radius (smaller to make it more oval)
            oval.setAttribute('fill', 'red');
            oval.setAttribute('id', `ovalLeft${index}`);
            curvedLines.appendChild(oval);
            ovals.push(oval);
        });

        // Draw path for right icon
        if (rightIconRef) {
            const rightIconRect = rightIconRef.getBoundingClientRect();
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            const startX = rightIconRect.left - containerRect.left;
            const startY = rightIconRect.top + rightIconRect.height / 2 - containerRect.top;
            const endX = ddogCardRect.right - containerRect.left;
            const endY = ddogCardRect.top + ddogCardRect.height / 2 - containerRect.top;
            const controlX = startX - (startX - endX) * 0.7; // Adjust this value to change the curve

            path.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${startY} ${endX} ${endY}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'black');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('id', 'pathRight');

            curvedLines.appendChild(path);

            const oval = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            oval.setAttribute('rx', '20'); // Horizontal radius
            oval.setAttribute('ry', '3'); // Vertical radius (smaller to make it more oval)
            oval.setAttribute('fill', 'red');
            oval.setAttribute('id', 'ovalRight');
            curvedLines.appendChild(oval);
            ovals.push(oval);
        }
    }

    function animateCircles() {
        if (!gsap) return;

        ovals.forEach((oval, index) => {
            const pathId = index < leftIcons.length ? `pathLeft${index}` : 'pathRight';
            const path = document.getElementById(pathId);
            if (!oval || !path) return;

            gsap.to(oval, {
                motionPath: {
                    path: path,
                    align: path,
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                },
                duration: 2 + index + 3,
                repeat: -1,
                ease: "none"
            });
        });
    }
</script>

<body class="bg-[#2B1917] text-custom-beige min-h-screen flex flex-col">
<header class="p-4 md:p-6">
    <nav class="flex justify-between items-center">
        <div class="text-custom-red text-2xl font-bold">SaaSignal</div>
        <button class="bg-custom-red text-custom-beige px-4 py-2 rounded-full hover:bg-opacity-90">
            Contact us
        </button>
    </nav>
</header>

<main class="flex-grow flex flex-col items-center px-4">
    <h1 class="text-5xl md:text-5xl mb-8 text-center mt-16 font-Lora">
        <span class="text-custom-red">Unlock,</span> Exclusive<br>
        Insights into the Public B2B SaaS <span class="text-custom-red">Market.</span>
    </h1>

    <div class="relative flex justify-between items-center w-full max-w-6xl mx-auto min-h-[400px]"
         bind:this={containerRef}>
        <div class="flex flex-col items-center space-y-8 md:space-y-16 z-10">
            {#each leftIcons as icon, index}
                <div class="flex flex-col items-center border-2 border-custom-beige rounded-lg p-4"
                     bind:this={leftIconRefs[index]}>
                    <img src={icon.src} alt={icon.alt} class="w-16 h-16 md:w-20 md:h-20 mb-2">
                    <p class="text-center text-xs md:text-sm max-w-[150px]">{icon.text}</p>
                </div>
            {/each}
        </div>

        <svg id="curvedLines" class="absolute top-0 left-0 w-full h-full" style="z-index: 1;"></svg>

        <div class="z-10" bind:this={ddogCardRef}>
            <div class="bg-custom-beige text-[#2B1917] rounded-lg shadow-lg p-6 w-60 text-center">
                <h2 class="text-2xl font-bold mb-4 text-custom-red">DDOG</h2>
                <div class="space-y-2">
                    <p><span class="font-semibold font-Lora">Competition:</span> 79</p>
                    <p><span class="font-semibold font-Lora">Stickiness:</span> 87</p>
                    <p><span class="font-semibold font-Lora">Sales Efficiency:</span> 85</p>
                    <p><span class="font-semibold font-Lora">R&D Efficiency:</span> 84</p>
                    <p><span class="font-semibold font-Lora">Average Score:</span> 86</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center z-10">
            <div class="flex flex-col items-center border-2 border-custom-beige rounded-lg p-4" bind:this={rightIconRef}>
                <img src={rightIcon.src} alt={rightIcon.alt} class="w-16 h-16 md:w-20 md:h-20 mb-2">
                <p class="text-center text-xs md:text-sm max-w-[150px]">{rightIcon.text}</p>
            </div>
        </div>
    </div>
</main>

<div class="absolute bottom-0 left-0 right-0 z-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="text-custom-red opacity-20">
        <path fill="currentColor" fill-opacity="1" d="M0,32L60,58.7C120,85,240,139,360,138.7C480,139,600,85,720,74.7C840,64,960,96,1080,112C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
    </svg>
</div>
</body>