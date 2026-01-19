const mount = document.getElementById("hero-mount");

const style = document.createElement("style");
style.textContent = `
    :root {
        --apple-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
        --accent: #0071e3;
        --bg: #050505;
    }

    .view-wrapper {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--bg);
        font-family: var(--apple-font);
        color: #fff;
        -webkit-font-smoothing: antialiased;
        background-image: radial-gradient(circle at 50% 100%, #111 0%, #050505 100%);
    }

    .main-content {
        text-align: center;
        z-index: 10;
        padding: 0 20px;
    }

    h1 {
        font-size: clamp(70px, 18vw, 180px);
        font-weight: 900;
        letter-spacing: -0.08em;
        margin: 0;
        line-height: 0.8;
        background: linear-gradient(180deg, #fff 50%, #333 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .tagline {
        font-size: clamp(24px, 5vw, 48px);
        font-weight: 700;
        margin-top: 20px;
        letter-spacing: -0.03em;
        color: #fff;
    }

    p {
        font-size: clamp(16px, 2.5vw, 22px);
        color: #6e6e73;
        max-width: 600px;
        margin: 40px auto;
        line-height: 1.4;
        font-weight: 500;
    }

    .control-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .action-row {
        display: flex;
        gap: 20px;
    }

    .heavy-btn {
        background: #fff;
        color: #000;
        padding: 24px 60px;
        font-size: 20px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 2px;
        box-shadow: 0 8px 0 #bcbcbc, 0 20px 30px rgba(0,0,0,0.5);
        transition: all 0.1s ease;
    }

    .heavy-btn:active {
        transform: translateY(4px);
        box-shadow: 0 4px 0 #bcbcbc, 0 10px 15px rgba(0,0,0,0.5);
    }

    .outline-btn {
        background: transparent;
        color: #fff;
        padding: 24px 60px;
        font-size: 20px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 2px;
        border: 2px solid #333;
        transition: all 0.2s ease;
    }

    .outline-btn:hover {
        border-color: #fff;
        background: rgba(255,255,255,0.05);
    }

    .gauge-box {
        width: 350px;
        margin-top: 50px;
    }

    .gauge-label {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 800;
        color: #444;
        letter-spacing: 3px;
        margin-bottom: 12px;
    }

    .gauge-track {
        height: 6px;
        background: #1a1a1a;
        width: 100%;
        position: relative;
    }

    .gauge-fill {
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        width: 0%;
        background: var(--accent);
        box-shadow: 0 0 20px var(--accent);
        transition: width 2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .credit-footer {
        position: absolute;
        bottom: 50px;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 5px;
        color: #222;
        text-transform: uppercase;
    }
`;
document.head.appendChild(style);

function initLanding() {
    mount.innerHTML = `
        <div class="view-wrapper">
            <div class="main-content">
                <h1>Logic101</h1>
                <div class="tagline">ZERO TO ONE HUNDRED</div>
                <p>High-level coding simplified for the absolute beginner. Master the logic, use the AI, and build the impossible.</p>
                
                <div class="control-center">
                    <div class="action-row">
                        <a href="login.html" class="heavy-btn">Deploy</a>
                        <a href="#" class="outline-btn">Syllabus</a>
                    </div>

                    <div class="gauge-box">
                        <div class="gauge-label">
                            <span>LVL_000</span>
                            <span>EVOLUTION_TRACK</span>
                            <span>LVL_100</span>
                        </div>
                        <div class="gauge-track">
                            <div id="progress-bar" class="gauge-fill"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="credit-footer">
                DESIGNED & CREATED BY FRIO
            </div>
        </div>
    `;

    setTimeout(() => {
        document.getElementById('progress-bar').style.width = '75%';
    }, 500);
}

initLanding();
