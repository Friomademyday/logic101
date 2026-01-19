const SUPABASE_URL = "https://homkmdnutdhmwjpojspw.supabase.co";
const SUPABASE_KEY = "sb_publishable_ghgy1pXBtqm0ZuiDAJcFgw_ipx94lPC";

let supabaseClient;

const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
    :root {
        --bg: #000000;
        --card: #0a0a0a;
        --accent: #ab9ff2;
        --border: #1a1a1a;
        --font: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
    }
    .wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: var(--font); box-sizing: border-box; }
    .card { background: var(--card); padding: 40px; border-radius: 24px; border: 1px solid var(--border); width: 100%; max-width: 380px; text-align: center; box-sizing: border-box; }
    h1 { font-weight: 800; letter-spacing: -2px; margin: 0 0 10px 0; color: #fff; font-size: 32px; }
    .card p { color: #666; margin-bottom: 30px; font-size: 15px; font-weight: 500; text-transform: none; letter-spacing: normal; }
    .input-group { margin-bottom: 25px; text-align: left; }
    input { 
        width: 100%; 
        padding: 18px; 
        margin: 6px 0; 
        box-sizing: border-box; 
        border-radius: 14px; 
        border: 1px solid var(--border); 
        background: #050505; 
        color: #fff; 
        font-size: 16px; 
        outline: none; 
        transition: 0.2s;
    }
    input:focus { border-color: var(--accent); }
    button { 
        width: 100%; 
        padding: 18px; 
        background: var(--accent); 
        color: #000; 
        border: none; 
        border-radius: 16px; 
        font-weight: 800; 
        cursor: pointer; 
        margin-top: 10px; 
        font-size: 16px; 
        text-transform: uppercase; 
        letter-spacing: 1px;
    }
    button:active { transform: scale(0.98); }
    .status-badge { 
        display: inline-block; 
        padding: 8px 16px; 
        border-radius: 10px; 
        background: rgba(171, 159, 242, 0.1); 
        color: var(--accent); 
        font-weight: 700; 
        margin-top: 10px; 
        font-size: 12px; 
        letter-spacing: 1px;
    }
    .secondary-btn { 
        background: transparent; 
        color: #666; 
        border: 1px solid var(--border); 
        margin-top: 12px; 
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
        width: 100%;
        padding: 18px;
        border-radius: 16px;
        font-weight: 800;
        cursor: pointer;
    }
    .secondary-btn:hover { color: #fff; border-color: #444; }
    .admin-tool-btn {
        background: rgba(171, 159, 242, 0.05);
        border: 1px solid var(--accent);
        color: var(--accent);
    }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    checkAppStatus();
});

async function checkAppStatus() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
        renderLogin();
        return;
    }

    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('approved')
        .eq('id', user.id)
        .single();

    if (user.email === "friomademyday@gmail.com") {
        renderAdmin();
    } else if (profile && profile.approved) {
        renderSuccess();
    } else {
        renderPending(user.email);
    }
}

function renderLogin() {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card">
                <h1>Logic101</h1>
                <p>Initialize node access request.</p>
                <div class="input-group">
                    <input type="text" id="userName" placeholder="Full Name">
                    <input type="email" id="userEmail" placeholder="Email Address">
                    <input type="password" id="userPass" placeholder="Password">
                </div>
                <button onclick="signUp()">Request Access</button>
            </div>
            <div style="margin-top: 30px; font-size: 10px; color: #222; font-weight: 900; letter-spacing: 3px;">DESIGNED BY FRIO</div>
        </div>
    `;
}

async function signUp() {
    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPass").value;
    const name = document.getElementById("userName").value;

    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    
    if (data.user) {
        await supabaseClient.from('profiles').insert([
            { id: data.user.id, email: email, full_name: name, approved: false }
        ]);
        checkAppStatus();
    } else {
        alert(error.message);
    }
}

function renderPending(email) {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card">
                <h1>Sync Pending</h1>
                <p>Your request is currently in the verification queue.</p>
                <div class="status-badge">STATUS: PENDING_APPROVAL</div>
                <div style="margin: 25px 0; font-size: 13px; color: #444;">LOGGED AS: ${email}</div>
                <button onclick="location.reload()">Refresh Link</button>
                <button class="secondary-btn" onclick="supabaseClient.auth.signOut().then(() => location.reload())">Terminate Session</button>
            </div>
        </div>
    `;
}

function renderSuccess() {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card">
                <h1>Link Secure</h1>
                <p>Credentials verified. Welcome to the ecosystem.</p>
                <button onclick="location.href='index.html'">Enter Workspace</button>
                <button class="secondary-btn" onclick="supabaseClient.auth.signOut().then(() => location.reload())">Logout</button>
            </div>
        </div>
    `;
}

function renderAdmin() {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card" style="border-color: var(--accent);">
                <h1>Commander</h1>
                <p>Administrative link established. Welcome back, Frio.</p>
                
                <button onclick="location.href='index.html'">Enter Workspace</button>
                
                <button class="secondary-btn admin-tool-btn" 
                    onclick="window.open('https://supabase.com/dashboard/project/homkmdnutdhmwjpojspw/editor', '_blank')">
                    Manage Nodes (Supabase)
                </button>

                <button class="secondary-btn" onclick="supabaseClient.auth.signOut().then(() => location.reload())">Terminate Session</button>
            </div>
            <div style="margin-top: 30px; font-size: 10px; color: #222; font-weight: 900; letter-spacing: 3px;">ADMIN OVERRIDE ACTIVE</div>
        </div>
    `;
}
