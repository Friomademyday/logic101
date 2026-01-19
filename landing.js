const mount = document.getElementById("hero-mount");

const style = document.createElement("style");
style.textContent = `
    :root {
        --apple-font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
        --accent: #0071e3;
    }

    body, html {
        margin: 0;
        padding: 0;
        background-color: #000;
        color: #fff;
        font-family: var(--apple-font);
        overflow: hidden;
        height: 100vh;
    }

    .view-wrapper {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: radial-gradient(circle at 50% 100%, #111 0%, #000 80%);
    }

    .main-content {
        padding: 0 20px;
        opacity: 0;
        transform: translateY(30px);
        animation: slideIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    @keyframes slideIn {
        to { opacity: 1; transform: translateY(0); }
    }

    h1 {
        font-size: clamp(60px, 15vw, 160px);
        font-weight: 900;
        letter-spacing: -0.07em;
        margin: 0;
        background: linear-gradient(180deg, #fff 40%, #555 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .tagline {
        font-size: clamp(20px, 4vw, 36px);
        font-weight: 700;
        margin-top: 10px;
        color: #fff;
    }

    p {
        font-size: 18px;
        color: #86868b;
        max-width: 500px;
        margin: 40px auto;
        line-height: 1.5;
    }

    .action-row {
        display: flex;
        gap: 20px;
        justify-content: center;
    }

    .heavy-btn {
        background: #fff;
        color: #000;
        padding: 20px 50px;
        font-size: 18px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }

    .heavy-btn:hover {
        background: var(--accent);
        color: #fff;
        transform: scale(1.05);
    }

    .outline-btn {
        background: transparent;
        color: #fff;
        padding: 20px 50px;
        font-size: 18px;
        font-weight: 800;
        text-decoration: none;
        border-radius: 12px;
        border: 2px solid #333;
        transition: 0.3s;
    }

    .outline-btn:hover {
        border-color: #fff;
    }

    .gauge-track {
        width: 300px;
        height: 2px;
        background: #1a1a1a;
        margin: 50px auto;
        position: relative;
    }

    .gauge-fill {
        position: absolute;
        height: 100%;
        width: 0%;
        background: #fff;
        box-shadow: 0 0 15px #fff;
        transition: width 2s ease-in-out;
    }

    .footer {
        position: absolute;
        bottom: 40px;
        font-size: 11px;
        letter-spacing: 5px;
        color: #333;
        font-weight: 900;
    }
`;
document.head.appendChild(style);

function initLanding() {
    mount.innerHTML = `
        <div class="view-wrapper">
            <div class="main-content">
                <h1>Logic101</h1>
                <div class="tagline">ZERO TO ONE HUNDRED</div>
                <p>Master the architecture of code. Designed for the elite. Engineered by Frio.</p>
                
                <div class="action-row">
                    <a href="login.html" class="heavy-btn">Deploy</a>
                    <a href="#" class="outline-btn">Syllabus</a>
                </div>

                <div class="gauge-track">
                    <div id="bar" class="gauge-fill"></div>
                </div>
            </div>
            <div class="footer">DESIGNED & CREATED BY FRIO</div>
        </div>
    `;

    setTimeout(() => {
        const bar = document.getElementById('bar');
        if(bar) bar.style.width = '75%';
    }, 500);
}

initLanding();
