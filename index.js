const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
    :root {
        --system-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
        font-family: var(--system-font);
        background-color: #ffffff;
        color: #1d1d1f;
        -webkit-font-smoothing: antialiased;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        border-bottom: 1px solid #f2f2f2;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        position: sticky;
        top: 0;
        z-index: 100;
    }
    .logo {
        font-weight: 600;
        font-size: 1.2rem;
        letter-spacing: -0.5px;
    }
    .slot-pill {
        background-color: #f5f5f7;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #86868b;
    }
    .hero {
        padding: 100px 20px;
        text-align: center;
        background-color: #ffffff;
    }
    .hero h1 {
        font-size: 3.5rem;
        font-weight: 700;
        letter-spacing: -1.5px;
        margin-bottom: 20px;
        color: #1d1d1f;
    }
    .hero p {
        font-size: 1.4rem;
        color: #86868b;
        max-width: 700px;
        margin: 0 auto 40px auto;
        line-height: 1.5;
    }
    .btn-primary {
        background-color: #0071e3;
        color: white;
        padding: 16px 32px;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .btn-primary:hover {
        background-color: #0077ed;
    }
    .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        padding: 80px 40px;
        background-color: #f5f5f7;
    }
    .info-card {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    }
    .info-card h3 {
        font-size: 1.5rem;
        margin-bottom: 15px;
        font-weight: 600;
    }
    .info-card p {
        color: #424245;
        line-height: 1.6;
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-content {
        width: 100%;
        max-width: 400px;
        padding: 40px;
        text-align: center;
    }
    .modal-content h2 {
        font-size: 2rem;
        margin-bottom: 30px;
    }
    .input-field {
        width: 100%;
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #d2d2d7;
        border-radius: 12px;
        font-size: 1rem;
        background: #fbfbfd;
        box-sizing: border-box;
        font-family: var(--system-font);
    }
    .input-field:focus {
        outline: 2px solid #0071e3;
        border-color: transparent;
    }
`;
document.head.appendChild(style);

function buildUI() {
    const nav = document.createElement("nav");
    nav.className = "navbar";
    nav.innerHTML = `
        <div class="logo">TechHub</div>
        <div class="slot-pill">Available Slots: <span id="slots">50000</span></div>
    `;
    app.appendChild(nav);

    const hero = document.createElement("div");
    hero.className = "hero";
    hero.innerHTML = `
        <h1>A Private Space for Builders.</h1>
        <p>Expert-led programming paths, integrated AI environments, and a network of professionals. All in one clean interface.</p>
        <button class="btn-primary" id="open-portal">Apply for Membership</button>
    `;
    app.appendChild(hero);

    const grid = document.createElement("div");
    grid.className = "content-grid";
    
    const modules = [
        { title: "Deep-Dive Curriculum", desc: "Structured, high-intensity paths covering modern backend and frontend engineering." },
        { title: "AI Integration", desc: "Built-in language models designed to assist in architectural decisions and debugging." },
        { title: "Professional Network", desc: "A gated environment ensuring high-level collaboration with verified individuals." }
    ];

    modules.forEach(m => {
        const card = document.createElement("div");
        card.className = "info-card";
        card.innerHTML = `<h3>${m.title}</h3><p>${m.desc}</p>`;
        grid.appendChild(card);
    });
    app.appendChild(grid);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "auth-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Access Portal</h2>
            <input type="text" class="input-field" placeholder="Full Name">
            <input type="email" class="input-field" placeholder="Email">
            <input type="password" class="input-field" placeholder="Create Passkey">
            <button class="btn-primary" style="width:100%">Submit Application</button>
            <p style="font-size: 0.8rem; color: #86868b; margin-top: 20px;">Your application will be manually reviewed by an administrator.</p>
        </div>
    `;
    app.appendChild(modal);

    document.getElementById("open-portal").onclick = () => {
        modal.style.display = "flex";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

buildUI();
