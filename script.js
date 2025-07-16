
document.addEventListener('DOMContentLoaded', function() {
    

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('loading');
    });


    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);


    sections.forEach(section => {
        observer.observe(section);
    });


    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });


    createParticles();


    typeWriter();
    

    initializeFullscreen();
    

    setTimeout(() => {
        loadConvertedGame();
    }, 500);
});


function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}


const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid #ff6b35';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            heroTitle.style.borderRight = 'none';
        }
    }, 100);
}


function initializeFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const exitFullscreen =
        document.exitFullscreen ||
        document.msExitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen;
    const requestFullscreen =
        document.body.requestFullscreen ||
        document.body.msRequestFullscreen ||
        document.body.mozRequestFullScreen ||
        document.body.webkitRequestFullscreen;
    
    function isFullscreen() {
        return !!(
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }
    
    function toggleFullscreen() {
        if (isFullscreen()) {
            exitFullscreen.call(document);
        } else {
            requestFullscreen.call(document.body);
        }
    }
    
    fullscreenBtn.addEventListener('click', () => {
        fullscreenBtn.blur();
        toggleFullscreen();
    });
    
    function handleFullscreenChange() {
        if (isFullscreen()) {
            document.body.classList.add('fullscreen');
        } else {
            document.body.classList.remove('fullscreen');
        }
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
}


function loadConvertedGame() {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContent = document.getElementById('game-content');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    
    console.log('Loading screen element:', loadingScreen);
    console.log('Game content element:', gameContent);
    
    if (!loadingScreen || !gameContent || !startBtn || !stopBtn) {
        console.error('Required elements not found');
        return;
    }
    

    loadingScreen.style.display = 'flex';
    gameContent.style.display = 'none';
    
    console.log('Loading screen should now be visible');
    

    const iframe = document.createElement('iframe');
    iframe.src = 'game.html';
    iframe.style.cssText = `
        width: 100% !important;
        height: 402px !important;
        border: none !important;
        border-radius: 10px !important;
        background: transparent !important;
        display: block !important;
        position: relative !important;
        z-index: 1 !important;
    `;
    

    gameContent.innerHTML = '';
    gameContent.appendChild(iframe);
    
    console.log('Iframe created and added to game content');
    

    iframe.addEventListener('load', () => {
        console.log('Iframe loaded successfully');
        showGame();
    });
    

    setTimeout(() => {
        if (loadingScreen.style.display !== 'none') {
            console.log('Fallback: Showing game after timeout');
            showGame();
        }
    }, 18000);
    
    function showGame() {
        console.log('showGame function called');
        console.log('Loading screen display:', loadingScreen.style.display);
        console.log('Game content display:', gameContent.style.display);
        

        loadingScreen.style.display = 'none';
        gameContent.style.display = 'block';
        

        if (iframe) {
            iframe.style.cssText = `
                width: 100% !important;
                height: 402px !important;
                border: none !important;
                border-radius: 10px !important;
                background: transparent !important;
                display: block !important;
                position: relative !important;
                z-index: 1 !important;
            `;
            console.log('Iframe styles applied');
        }
        

        startBtn.disabled = false;
        
        console.log('Game loaded and displayed successfully!');
        console.log('Final loading screen display:', loadingScreen.style.display);
        console.log('Final game content display:', gameContent.style.display);
    }
    

    iframe.addEventListener('error', () => {
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="dragon-ball-loader">
                    <div class="dragon-ball"></div>
                    <div class="energy-rings">
                        <div class="ring ring-1"></div>
                        <div class="ring ring-2"></div>
                        <div class="ring ring-3"></div>
                    </div>
                    <div class="loading-text">
                        <h3>Loading Failed</h3>
                        <p>Please refresh the page</p>
                    </div>
                </div>
            </div>
        `;
    });
    

    startBtn.addEventListener('click', () => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ action: 'start' }, '*');
        }
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });
    
    stopBtn.addEventListener('click', () => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ action: 'stop' }, '*');
        }
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
    

    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'gameState') {
            if (event.data.state === 'running') {
                startBtn.disabled = true;
                stopBtn.disabled = false;
            } else if (event.data.state === 'stopped') {
                startBtn.disabled = false;
                stopBtn.disabled = true;
            }
        }
    });
    
    console.log('Loading converted Scratch game with native fullscreen...');
}


document.addEventListener('keydown', function(e) {

    if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.click();
        }
    }
    

    if (e.key === 'Escape') {
        if (document.fullscreenElement || document.webkitFullscreenElement || 
            document.mozFullScreenElement || document.msFullscreenElement) {
            const fullscreenBtn = document.getElementById('fullscreen-btn');
            if (fullscreenBtn) {
                fullscreenBtn.click();
            }
        }
    }
}); 