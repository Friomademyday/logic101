const mount = document.getElementById("hero-mount");

const style = document.createElement("style");
style.textContent = `
    :root {
        --apple-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
        --accent: #0071e3;
        --bg: #000;
    }

    body, html {
        margin: 0;
        padding: 0;
        background: var(--bg);
        overflow: hidden;
        height: 100vh;
        width: 100%;
    }

    .view-wrapper {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: var(--apple-font);
        color: #fff;
        position: relative;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
    }

    .main-content {
        text-align: center;
        z-index: 10;
        padding: 0 20px;
        transform: translateY(20px);
        opacity: 0;
        animation: emerge 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    @keyframes emerge {
        to { transform: translateY(0); opacity: 1; }
    }

    h1 {
        font-size: clamp(80px, 20vw, 200px);
        font-weight: 900;
        letter-spacing: -0.09em;
        margin: 0;
        line-height: 0.8;
        background: linear-gradient(180deg, #fff 40%, #444 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .tagline {
        font-size: clamp(20px, 4vw, 40px);
        font-weight: 700;
        margin-top: 15px;
        letter-spacing: -0.02em;
        color: #fff;
    }

    p {
        font-size: clamp(14px, 2vw, 18px);
        color: #86868b;
        max-width: 500px;
        margin: 40px auto;
        line-height: 1.6;
        font-weight: 500;
    }

    .action-row {
        display: flex;
        gap: 20px;
        justify-content: center;
    }

    .heavy-btn {
        background: #fff;
        color: #000;
        padding: 22px 50px;
        font-size: 16px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 2px;
        box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .heavy-btn:hover {
        background: var(--accent);
        color: #fff;
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 113, 227, 0.4);
    }

    .outline-btn {
        background: transparent;
        color: #fff;
        padding: 22px 50px;
        font-size: 16px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 8px;
        text-transform: uppercase;
        letter-spacing: 2px;
        border: 2px solid #222;
        transition: all 0.3s ease;
    }

    .outline-btn:hover {
        border-color: #fff;
    }

    .evolution-gauge {
        margin-top: 60px;
        width: 300px;
        text-align: left;
    }

    .gauge-header {
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 3px;
        color: #444;
        margin-bottom: 10px;
    }

    .gauge-track {
        height: 2px;
        background: #111;
        width: 100%;
        position: relative;
    }

    .gauge-fill {
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        width: 0%;
        background: #fff;
        box-shadow: 0 0 15px #fff;
        transition: width 2.5s cubic-bezier(0.65, 0, 0.35, 1);
    }

    .footer {
        position: absolute;
        bottom: 40px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 5px;
        color: #333;
    }
`;
document.head.appendChild(style);

function createParticles() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    mount.appendChild(canvas);

    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 2;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.y -= this.speed;
            if (this.y < 0) this.init();
        }
        draw() {
            ctx.fillStyle = \`rgba(255, 255, 255, \${this.opacity})\`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initLanding() {
    mount.innerHTML = `
        <div class="view-wrapper">
            <div class="main-content">
                <h1>Logic101</h1>
                <div class="tagline">ZERO TO ONE HUNDRED</div>
                <p>High-level engineering simplified. Master the logic of code with AI-guided precision.</p>
                
                <div class="action-row">
                    <a href="login.html" class="heavy-btn">Deploy</a>
                    <a href="#" class="outline-btn">Syllabus</a>
                </div>

                <div class="evolution-gauge">
                    <div class="gauge-header">CORE_EVOLUTION_SYNC</div>
                    <div class="gauge-track">
                        <div id="gauge-bar" class="gauge-fill"></div>
                    </div>
                </div>
            </div>

            <div class="footer">
                DESIGNED & CREATED BY FRIO
            </div>
        </div>
    `;

    createParticles();

    setTimeout(() => {
        const bar = document.getElementById("gauge-bar");
        if(bar) bar.style.width = "75%";
    }, 100);
}

initLanding();
