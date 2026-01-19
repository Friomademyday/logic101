const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: #fbfbfd;
        color: #1d1d1f;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
    }
    .glass-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 30px;
        padding: 50px;
        width: 100%;
        max-width: 500px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        text-align: center;
        border: 1px solid rgba(255,255,255,0.3);
    }
    .logo-mark {
        font-weight: 700;
        font-size: 1.5rem;
        letter-spacing: -0.05em;
        margin-bottom: 40px;
    }
    .headline {
        font-size: 2.2rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 15px;
        line-height: 1.1;
    }
    .subheadline {
        font-size: 1.1rem;
        color: #86868b;
        line-height: 1.5;
        margin-bottom: 40px;
    }
    .input-group {
        width: 100%;
        margin-bottom: 12px;
    }
    input {
        width: 100%;
        padding: 18px;
        border-radius: 12px;
        border: 1px solid #d2d2d7;
        background: #ffffff;
        font-size: 1rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
    }
    input:focus {
        border-color: #0071e3;
    }
    .btn-action {
        width: 100%;
        padding: 18px;
        background-color: #0071e3;
        color: white;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        transition: opacity 0.2s;
    }
    .btn-action:hover {
        opacity: 0.9;
    }
    .status-pill {
        display: inline-block;
        padding: 6px 12px;
        background: #f5f5f7;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        color: #86868b;
        margin-bottom: 20px;
    }
    .timer-view {
        display: none;
        padding: 40px;
    }
    .timer-digits {
        font-size: 3rem;
        font-weight: 700;
        letter-spacing: -0.05em;
        color: #ff3b30;
    }
    .hidden {
        display: none;
    }
`;
document.head.appendChild(style);

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function initApp() {
    const main = document.createElement("div");
    main.className = "main-container";

    const card = document.createElement("div");
    card.className = "glass-card";
    card.id = "main-card";

    const content = `
        <div id="registration-view">
            <div class="logo-mark">TechHub</div>
            <div class="status-pill">Slots Remaining: <span id="slot-num">50000</span></div>
            <h1 class="headline">Design. Code. Connect.</h1>
            <p class="subheadline">An exclusive environment for developers to master new languages and collaborate with AI.</p>
            <div class="input-group"><input type="text" id="reg-name" placeholder="Full Name"></div>
            <div class="input-group"><input type="email" id="reg-email" placeholder="Email Address"></div>
            <div class="input-group"><input type="password" id="reg-pass" placeholder="Password"></div>
            <button class="btn-action" id="submit-request">Request Access</button>
        </div>
        <div id="pending-view" class="hidden">
            <h1 class="headline">Request Logged</h1>
            <p class="subheadline">We've sent your details to the administrator. You will be notified via email once your account is activated.</p>
        </div>
        <div id="limit-view" class="hidden">
            <h1 class="headline">Monthly Limit Reached</h1>
            <p class="subheadline">Maximum users reached. New slots open in:</p>
            <div class="timer-digits" id="countdown">99:59:59</div>
        </div>
    `;

    card.innerHTML = content;
    main.appendChild(card);
    app.appendChild(main);

    document.getElementById("submit-request").addEventListener("click", handleSignup);
    checkSystemStatus();
}

async function checkSystemStatus() {
    const stats = await db.collection("config").doc("global_stats").get();
    const count = stats.data().approvedCount;
    const remaining = 50000 - count;
    document.getElementById("slot-num").textContent = remaining;

    if (remaining <= 0) {
        document.getElementById("registration-view").classList.add("hidden");
        document.getElementById("limit-view").classList.remove("hidden");
        runTimer();
    }
}

function runTimer() {
    let timeLeft = 259200; 
    const display = document.getElementById("countdown");
    setInterval(() => {
        let h = Math.floor(timeLeft / 3600);
        let m = Math.floor((timeLeft % 3600) / 60);
        let s = timeLeft % 60;
        display.textContent = h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "
