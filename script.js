// script.js - محسن
const SERVER_IP = "vexomc.play.hosting";

function copyIP(){
    navigator.clipboard.writeText(SERVER_IP).then(()=>{
        const btn = document.querySelector(".copy-btn");
        const ipEl = document.querySelector(".server-ip");
        
        // تأثير النسخ
        btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        ipEl.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        
        // ذرات تأثير
        createParticles();
        
        setTimeout(()=>{
            btn.innerHTML = '<i class="fas fa-copy"></i> نسخ IP السيرفر';
            btn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
            ipEl.style.background = 'linear-gradient(135deg, #00d4ff, #0099ff)';
        }, 2000);
    }).catch(()=>{
        alert("انسخ: " + SERVER_IP);
    });
}

function createParticles(){
    const particles = document.querySelector(".particles");
    for(let i = 0; i < 8; i++){
        setTimeout(()=>{
            const particle = document.createElement("div");
            particle.innerHTML = "✨";
            particle.style.cssText = `
                position:absolute;
                color:#00ff88;
                font-size:16px;
                pointer-events:none;
                animation:particleFloat 1s ease-out forwards;
                left:${Math.random()*100}%;
                top:${Math.random()*100}%;
            `;
            particles.appendChild(particle);
            setTimeout(()=>particle.remove(), 1000);
        }, i * 100);
    }
}

// حركة الخلفية
document.addEventListener('mousemove', (e)=>{
    const stars = document.querySelector('.stars');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    stars.style.transform = `translate(${x*10}px, ${y*10}px)`;
});
