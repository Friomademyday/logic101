const app = document.getElementById("app");

const style = document.createElement("style");
style.textContent = `
    .hero-section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: white;
        padding: 20px;
    }
    .hero-title {
        font-size: 4rem;
        margin-bottom: 10px;
        background: linear-gradient(to right, #38bdf8, #818cf8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
        font-size: 1.2rem;
        color: #94a3b8;
        max-width: 600px;
        line-height: 1.6;
    }
    .btn-join {
        margin-top: 30px;
        padding: 15px 40px;
        font-size: 1.1rem;
        font-weight: bold;
        color: white;
        background-color: #38bdf8;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-join:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
    }
    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        padding: 50px;
        background-color: #0f172a;
    }
    .card {
        background-color: #1e293b;
        padding: 30px;
        border-radius: 15px;
        border: 1px solid #334155;
        color: #e2e8f0;
    }
    .card h3 {
        color: #38bdf8;
        margin-top: 0;
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
    }
    .modal-active {
        opacity: 1;
        pointer-events: auto;
    }
    .form-box {
        background: #1e293b;
        padding: 40px;
        border-radius: 20px;
        width: 100%;
        max-width: 400px;
        text-align: center;
        border: 1px solid #38bdf8;
    }
    .form-box input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border-radius: 8px;
        border: 1px solid #334155;
        background: #0f172a;
        color: white;
        box-sizing: border-box;
    }
`;
document.head.appendChild(style);

function createHomePage() {
    const hero = document.createElement("section");
    hero.className = "hero-section";
    
    const title = document.createElement("h1");
    title.className = "hero-title";
    title.textContent = "The Next Generation of Tech Hub";
    
    const sub = document.createElement("p");
    sub.className = "hero-subtitle";
    sub.textContent = "A gated community for masters of code. Access elite Guru99 tracks, collaborate with high-level developers, and leverage our proprietary AI Environment.";
    
    const cta = document.createElement("button");
    cta.className = "btn-join";
    cta.textContent = "Request Access Path";
    
    hero.appendChild(title);
    hero.appendChild(sub);
    hero.appendChild(cta);
    app.appendChild(hero);

    const grid = document.createElement("div");
    grid.className = "feature-grid";
    
    const features = [
        { t: "Guru99 Fast-Track", d: "Compressed industry-grade courses for Python, Java, and DevOps." },
        { t: "Gated Networking", d: "Zero noise. Only verified developers and serious learners." },
        { t: "AI Dev Buddy", d: "Your personalized assistant that helps you debug and learn 24/7." }
    ];

    features.forEach(f => {
        const card = document.createElement("div");
        card.className = "card";
        const h = document.createElement("h3");
        h.textContent = f.t;
        const p = document.createElement("p");
        p.textContent = f.d;
        card.appendChild(h);
        card.appendChild(p);
        grid.appendChild(card);
    });

    app.appendChild(grid);

    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    const formBox = document.createElement("div");
    formBox.className = "form-box";
    formBox.innerHTML = `
        <h2 style="color:white">Application Portal</h2>
        <p style="color:#94a3b8">Entry is limited to 50,000 slots per month.</p>
        <input type="text" placeholder="Your Tech Handle">
        <input type="email" placeholder="Professional Email">
        <input type="password" placeholder="Passkey">
        <button class="btn-join" style="width:100%">Submit for Approval</button>
    `;
    modal.appendChild(formBox);
    app.appendChild(modal);

    cta.onclick = () => modal.classList.add("modal-active");
    modal.onclick = (e) => { if(e.target === modal) modal.classList.remove("modal-active"); };
}

createHomePage();
