// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Dropdown UI Logic ---
    const customSelect = document.getElementById('custom-select-ui');
    const customSelectText = document.getElementById('custom-select-text');
    const realSelect = document.getElementById('waste-type');
    const options = document.querySelectorAll('.custom-option');

    if (customSelect) {
        customSelect.addEventListener('click', function() {
            this.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', function() {
                // Update text visually
                customSelectText.innerText = this.innerText;
                customSelectText.style.color = '#fff';
                
                // Set the hidden required native select value perfectly
                const selectedValue = this.getAttribute('data-value');
                realSelect.value = selectedValue;
                
                // Trigger change event just in case
                realSelect.dispatchEvent(new Event('change'));

                // Update styling
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        // Close dropdown when clicking completely outside
        window.addEventListener('click', function(e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    // --- DOM Elements ---
    const navHome = document.getElementById('nav-home');
    const navDashboard = document.getElementById('nav-dashboard');
    
    const viewHome = document.getElementById('view-home');
    const viewResult = document.getElementById('view-result');
    const viewDashboard = document.getElementById('view-dashboard');

    const form = document.getElementById('disposal-form');
    const btnBack = document.getElementById('btn-back');
    const btnLog = document.getElementById('btn-log');

    // Global state object for current recommendation
    let currentRecommendation = null;

    // --- Navigation Logic ---
    function switchView(viewId) {
        // Hide all views
        viewHome.classList.remove('active');
        viewResult.classList.remove('active');
        viewDashboard.classList.remove('active');

        // Remove active state from nav links
        navHome.classList.remove('active');
        navDashboard.classList.remove('active');

        // Scroll to top automatically on view switch
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (viewId === 'home') {
            viewHome.classList.add('active');
            navHome.classList.add('active');
        } else if (viewId === 'dashboard') {
            viewDashboard.classList.add('active');
            navDashboard.classList.add('active');
            updateDashboardUI(); // Trigger data refresh
        } else if (viewId === 'result') {
            viewResult.classList.add('active');
        }
    }

    navHome.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
    });

    navDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('dashboard');
    });

    btnBack.addEventListener('click', () => {
        switchView('home');
    });


    // --- Recommendation Form Logic ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const typeKey = document.getElementById('waste-type').value;
        const typeLabel = document.getElementById('waste-type').options[document.getElementById('waste-type').selectedIndex].text;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const isSegregated = document.getElementById('segregated').checked;

        if (!typeKey) {
            alert('Please select a waste type from the dropdown.');
            return;
        }

        const data = wasteRules[typeKey];
        if(!data) {
            console.error("Rule not found for key:", typeKey);
            return;
        }

        // Determine method text
        let method = data.method;
        
        const totalCo2Saved = (data.co2SavedPerKg * quantity).toFixed(2);

        // Inject standard text into DOM
        document.getElementById('res-method').innerText = method;
        document.getElementById('res-reasoning').innerText = data.reasoning;
        document.getElementById('res-decomposition').innerText = data.decomposition;
        document.getElementById('res-co2').innerText = totalCo2Saved;

        // Populate Primary Steps
        const ulSteps = document.getElementById('res-steps');
        ulSteps.innerHTML = ''; // clear old
        
        // Handle unsegregated warning dynamically
        if (!isSegregated) {
             const li = document.createElement('li');
             li.innerHTML = "<b style='color: var(--danger); font-size: 1.1em;'>CRITICAL FIRST STEP:</b> You marked this as unsegregated. You MUST carefully separate this waste from any other garbage to avoid contamination.";
             ulSteps.appendChild(li);
        }
        
        // Push actual steps
        data.steps.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = step;
            ulSteps.appendChild(li);
        });

        // Populate DIY Ideas as Cards
        const diyGrid = document.getElementById('res-diy');
        diyGrid.innerHTML = ''; // clear old
        
        if (data.diyIdeas && data.diyIdeas.length > 0) {
            data.diyIdeas.forEach((diy, idx) => {
                const card = document.createElement('div');
                card.className = `diy-card glass`;
                card.innerHTML = `
                    <div class="diy-icon"><i class="fa-solid fa-paintbrush"></i></div>
                    <div class="diy-content">
                        <h4>${diy.title}</h4>
                        <p>${diy.desc}</p>
                    </div>
                `;
                diyGrid.appendChild(card);
            });
        } else {
             diyGrid.innerHTML = "<p>No DIY ideas cataloged for this specific material yet.</p>";
        }

        // Store current recommendation for Logging
        currentRecommendation = {
            typeKey: typeKey,
            typeLabel: typeLabel,
            quantity: quantity,
            isSegregated: isSegregated,
            method: method,
            co2Saved: totalCo2Saved,
            date: new Date().toISOString()
        };

        // Reset log button state
        btnLog.innerHTML = `<i class="fa-solid fa-chart-line"></i> Add Points to Dashboard`;
        btnLog.disabled = false;
        btnLog.style.background = "var(--primary-gradient)"; // Reset gradient
        btnLog.style.color = "#000";
        btnLog.classList.add('heartbeat'); // restart pulse
        
        // Switch to result view
        switchView('result');
    });


    // --- Logging Logic ---
    btnLog.addEventListener('click', () => {
        if (!currentRecommendation) return;

        saveLog(currentRecommendation);
        
        btnLog.innerHTML = "<i class='fa-solid fa-check'></i> Successfully Logged!";
        btnLog.disabled = true;
        btnLog.style.background = "rgba(0, 230, 118, 0.2)"; // dim it significantly
        btnLog.style.color = "var(--accent-color)";
        btnLog.classList.remove('heartbeat'); // stop pulse
        
        // Optionally auto-redirect to dashboard
        setTimeout(() => {
            switchView('dashboard');
            // reset custom dropdown text visually
            customSelectText.innerText = "Select a waste type...";
            customSelectText.style.color = "var(--text-secondary)";
            options.forEach(opt => opt.classList.remove('selected'));
            form.reset(); // clear form for next time
        }, 1500);
    });

    // Initialize Dashboard UI in background
    updateDashboardUI();
    
    // START PARTICLE SYSTEM
    initParticleSystem();
});


// --- Interactive Network Particle Background --- //
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    
    // track mouse position globally
    let mouse = {
        x: null,
        y: null,
        radius: 120 // Radius of interaction
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', function() { 
        mouse.x = undefined; 
        mouse.y = undefined; 
    });

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            // Screen boundaries bounce mapping
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            
            // Mouse Repulsion logic
            let collisionDx = mouse.x - this.x;
            let collisionDy = mouse.y - this.y;
            let distance = Math.sqrt(collisionDx * collisionDx + collisionDy * collisionDy);
            let forceDirectionX = collisionDx / distance;
            let forceDirectionY = collisionDy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx/10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy/10;
                }
            }
            
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function createParticles() {
        particlesArray = [];
        // Determine number based on screen size (prevent lag)
        let total = (canvas.height * canvas.width) / 12000;
        
        for (let i = 0; i < total; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let dx = (Math.random() * 2) - 1;
            let dy = (Math.random() * 2) - 1;
            let color = 'rgba(0, 230, 118, 0.8)';
            particlesArray.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    function connectLineNodes() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Draw line if nodes are close
                if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                    let opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(0, 230, 118,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function launchAnimationLoop() {
        requestAnimationFrame(launchAnimationLoop);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectLineNodes();
    }

    createParticles();
    launchAnimationLoop();
}

// --- Animation 2: Mouse-Tracking Spotlight Borders ---
const glassCards = document.querySelectorAll('.glass');
document.addEventListener('mousemove', (e) => {
    glassCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        // Calculate mouse position relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Set CSS variables that powers the spotlight border
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
