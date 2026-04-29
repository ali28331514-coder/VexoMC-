<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box PvP - VexoMC</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Orbitron','Courier New',monospace;background:radial-gradient(circle at 20% 80%,#8B0000 0%,#1a1a2e 50%,#16213e 100%);min-height:100vh;overflow:hidden;position:relative;color:#fff}
        .stars{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;background:radial-gradient(2px 2px at 20px 30px, #ff4444, transparent),radial-gradient(2px 2px at 40px 70px, #ff6666, transparent);background-repeat:repeat;background-size:100px 100px;animation:twinkle 15s linear infinite}
        .container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(145deg,rgba(139,0,0,.95),rgba(26,26,46,.98));backdrop-filter:blur(25px);border-radius:30px;padding:50px;box-shadow:0 30px 80px rgba(255,68,68,.4);width:90%;max-width:800px;height:92vh;text-align:center;border:2px solid rgba(255,68,68,.6);overflow-y:auto;overflow-x:hidden}
        
        .minecraft-text{font-size:clamp(3em,9vw,5.5em);font-weight:900;background:linear-gradient(45deg,#ff4444,#ff6666,#ff4444,#cc0000);background-size:400% 400%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:rainbowShift 1.5s linear infinite;margin-bottom:30px;letter-spacing:5px;text-shadow:0 0 40px rgba(255,68,68,1)}
        
        .ip-section{position:relative;margin:30px 0;padding:35px 25px;background:rgba(0,255,136,.3);border-radius:30px;border:5px solid rgba(0,255,136,1);box-shadow:0 30px 70px rgba(0,255,136,.6);min-height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .server-ip{display:inline-block;font-size:clamp(2.5em,9vw,4em);font-weight:900;background:linear-gradient(135deg,#00ff88,#00cc66,#00ff88);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding:35px 70px;margin:10px 0;border-radius:30px;cursor:pointer;transition:all .4s ease;border:6px solid rgba(255,255,255,1);box-shadow:0 25px 60px rgba(0,255,136,.9),inset 0 0 30px rgba(255,255,255,.3);text-shadow:0 0 30px rgba(0,255,255,1);white-space:nowrap;min-width:350px;position:relative;z-index:2;animation:ipGlow 2s ease-in-out infinite alternate}
        .server-ip::before{content:'';position:absolute;top:-15px;left:50%;transform:translateX(-50%);width:80px;height:80px;background:radial-gradient(circle,#00ff88,transparent);border-radius:50%;opacity:0.4;z-index:-1}
        .server-ip:hover{transform:scale(1.1) translateY(-8px);box-shadow:0 45px 100px rgba(0,255,136,1),inset 0 0 40px rgba(255,255,255,.5);border-color:#fff;animation-play-state:paused}
        
        .copy-btn{background:linear-gradient(135deg,#00ff88,#00cc66);color:#000;border:none;padding:25px 65px;font-size:1.8em;border-radius:35px;cursor:pointer;margin:20px auto;display:block;transition:all .4s ease;box-shadow:0 25px 60px rgba(0,255,136,.8);font-weight:900;text-transform:uppercase;letter-spacing:3px;position:relative;overflow:hidden}
        .copy-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);transition:left .6s}
        .copy-btn:hover{transform:translateY(-10px);box-shadow:0 40px 90px rgba(0,255,136,1)}
        .copy-btn:hover::before{left:100%}
        
        .status-bar{display:flex;align-items:center;justify-content:center;gap:15px;margin:30px 0;padding:20px 40px;background:rgba(0,255,136,.4);border-radius:28px;border:4px solid #00ff88;box-shadow:0 0 35px rgba(0,255,136,.7)}
        .status{width:20px;height:20px;border-radius:50%;background:#00ff88;box-shadow:0 0 30px #00ff88;animation:pulse 1s infinite}
        
        /* القايمة - Box PvP بس */
        .qaim{position:relative;margin:35px auto;padding:40px 30px;background:linear-gradient(145deg,rgba(255,68,68,.45),rgba(204,0,0,.65));border-radius:32px;border:4px solid rgba(255,68,68,1);backdrop-filter:blur(25px);max-width:420px;box-shadow:0 35px 80px rgba(255,68,68,.6)}
        .qaim-title{font-size:2.3em;margin-bottom:30px;background:linear-gradient(45deg,#fff,#ff6666);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:900;text-align:center;text-transform:uppercase;letter-spacing:4px;text-shadow:0 0 25px rgba(255,255,255,.6)}
        .qaim-list{display:flex;flex-direction:column;gap:25px;padding:0;text-align:center}
        .qaim-item{padding:28px 35px;background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.15));border-radius:25px;transition:all .4s ease;border:3px solid rgba(255,255,255,.5);font-size:1.8em;font-weight:900;text-transform:uppercase;position:relative;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,.4)}
        .qaim-item::before{content:'⚔️';position:absolute;top:20px;right:25px;font-size:2em;opacity:.95}
        .qaim-item::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);transition:left .5s}
        .qaim-item:hover{background:linear-gradient(135deg,#ff6666,#ff4444);border-color:#fff;transform:translateY(-12px) scale(1.05);box-shadow:0 35px 80px rgba(255,68,68,.9)}
        .qaim-item:hover::after{left:100%}
        
        .platforms{display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin:40px 0;padding:20px 0}
        .platform{width:140px;height:140px;border-radius:35px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:4em;text-decoration:none;transition:all .4s ease;box-shadow:0 25px 70px rgba(0,0,0,.8);border:6px solid rgba(255,255,255,.6);position:relative;overflow:hidden}
        .platform::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(45deg,rgba(255,255,255,0.2),transparent);transform:skewX(-20deg);transition:all .4s}
        .platform:hover{transform:translateY(-25px) scale(1.3);box-shadow:0 50px 120px rgba(114,137,218,1)}
        .platform:hover::before{transform:skewX(-20deg) translateX(100%)}
        .platform.discord{background:linear-gradient(135deg,#5865f2,#4752c4,#5865f2);animation:discordPulse 2s ease-in-out infinite alternate}
        
        @keyframes discordPulse{
            0%{box-shadow:0 25px 70px rgba(88,101,242,.6),inset 0 0 20px rgba(255,255,255,.1)}
            100%{box-shadow:0 25px 70px rgba(88,101,242,.9),inset 0 0 30px rgba(255,255,255,.3)}
        }
        
        @keyframes ipGlow{
            0%{box-shadow:0 25px 60px rgba(0,255,136,.9),inset 0 0 30px rgba(255,255,255,.3)}
            100%{box-shadow:0 25px 60px rgba(0,255,136,1),inset 0 0 40px rgba(255,255,255,.5)}
        }
        
        @keyframes rainbowShift{0%{background-position:0% 50%}100%{background-position:400% 50%}}
        @keyframes twinkle{0%,100%{opacity:.3}50%{opacity:1}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.4)}}
        
        @media (max-width:768px){
            .container{padding:40px 25px;height:96vh;width:95%;border-radius:25px}
            .minecraft-text{letter-spacing:3px}
            .ip-section{padding:30px 20px;min-height:130px}
            .server-ip{padding:28px 50px;min-width:300px}
            .qaim{max-width:95%;padding:35px 25px}
            .platform{width:110px;height:110px;font-size:3.2em}
        }
        
        @media (max-width:480px){
            .container{padding:30px 20px;border-radius:20px}
            .server-ip{padding:25px 40px;font-size:2.5em;min-width:280px}
            .copy-btn{padding:20px 45px;font-size:1.5em}
            .platform{width:95px;height:95px;font-size:2.8em}
        }
        
        /* Scrollbar مخصص */
        .container::-webkit-scrollbar{width:12px}
        .container::-webkit-scrollbar-track{background:rgba(0,255,136,.2);border-radius:12px}
        .container::-webkit-scrollbar-thumb{background:linear-gradient(#00ff88,#00cc66);border-radius:12px}
        .container::-webkit-scrollbar-thumb:hover{background:linear-gradient(#00cc66,#00ff88)}
    </style>
</head>
<body>
    <div class="stars"></div>
    <div class="container">
        <div class="minecraft-text">Box PvP</div>
        
        <div class="ip-section">
            <div class="server-ip" onclick="copyIP()">vexomc.play.hosting</div>
            <button class="copy-btn" onclick="copyIP()">⚔️ Join Server</button>
        </div>
        
        <div class="status-bar">
            <div class="status"></div>
            <span>🔴 Server Online</span>
        </div>
        
        <!-- القايمة - Box PvP بس -->
        <div class="qaim">
            <div class="qaim-title">Box PvP</div>
            <div class="qaim-list">
                <div class="qaim-item">Box PvP</div>
            </div>
        </div>
        
        <div class="platforms">
            <a href="https://discord.gg/5r2Rh6WAu" class="platform discord" title="Discord"><i class="fab fa-discord"></i></a>
        </div>
    </div>
    
    <script>
        const IP = "vexomc.play.hosting";
        function copyIP(){
            navigator.clipboard.writeText(IP).then(()=>{
                const btn = document.querySelector(".copy-btn");
                const ipEl = document.querySelector(".server-ip");
                const oldText = btn.innerHTML;
                btn.innerHTML = "✅ Copied!";
                btn.style.background = "linear-gradient(135deg, #00ff00, #32cd32)";
                ipEl.style.background = "linear-gradient(135deg, #00ff00, #32cd32)";
                setTimeout(()=>{
                    btn.innerHTML = oldText;
                    btn.style.background = "";
                    ipEl.style.background = "";
                }, 2000);
            }).catch(()=>alert("Copy: "+IP));
        }
    </script>
</body>
</html>
