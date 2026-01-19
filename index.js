const SUPABASE_URL = "https://homkmdnutdhmwjpojspw.supabase.co";
const SUPABASE_KEY = "sb_publishable_ghgy1pXBtqm0ZuiDAJcFgw_ipx94lPC";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
    body { margin: 0; background-color: #fbfbfd; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto; color: #1d1d1f; }
    .wrapper { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { background: white; padding: 40px; border-radius: 28px; box-shadow: 0 15px 35px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; }
    h1 { font-weight: 700; letter-spacing: -0.02em; margin-bottom: 10px; }
    p { color: #86868b; margin-bottom: 30px; }
    input { width: 100%; padding: 16px; margin: 8px 0; border-radius: 12px; border: 1px solid #d2d2d7; font-size: 16px; outline: none; }
    button { width: 100%; padding: 16px; background: #0071e3; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer; margin-top: 15px; font-size: 16px; }
    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; background: #f5f5f7; color: #1d1d1f; font-weight: 600; margin-top: 10px; }
`;
document.head.appendChild(style);

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
                <h1>TechHub</h1>
                <p>Request access to the workspace.</p>
                <input type="text" id="userName" placeholder="Full Name">
                <input type="email" id="userEmail" placeholder="Email Address">
                <input type="password" id="userPass" placeholder="Password">
                <button onclick="signUp()">Join Waiting List</button>
            </div>
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
                <h1>Application Sent</h1>
                <p>Your request is in the queue.</p>
                <div class="status-badge">Status: Pending Approval</div>
                <p style="margin-top:25px; font-size: 14px;">Logged in as: ${email}</p>
                <button onclick="location.reload()">Check My Status</button>
                <button onclick="supabaseClient.auth.signOut().then(() => location.reload())" style="background:none; color:#0071e3; margin-top:10px;">Sign Out</button>
            </div>
        </div>
    `;
}

function renderSuccess() {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card">
                <h1 style="color: #34c759;">Welcome In</h1>
                <p>Your application has been approved by the admin.</p>
                <button onclick="alert('Entering Workspace...')">Go to Dashboard</button>
                <button onclick="supabaseClient.auth.signOut().then(() => location.reload())" style="background:none; color:#0071e3; margin-top:10px;">Sign Out</button>
            </div>
        </div>
    `;
}

function renderAdmin() {
    app.innerHTML = `
        <div class="wrapper">
            <div class="card">
                <h1>Admin Panel</h1>
                <p>You are logged in as the owner.</p>
                <button onclick="window.open('https://supabase.com/dashboard/project/homkmdnutdhmwjpojspw/editor', '_blank')">Approve Users Now</button>
                <button onclick="supabaseClient.auth.signOut().then(() => location.reload())" style="background:none; color:#0071e3; margin-top:10px;">Sign Out</button>
            </div>
        </div>
    `;
}

checkAppStatus();
