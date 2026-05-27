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
    
    // START PARALLAX SYSTEM
    initParallaxSystem();
});


// --- Animation 1: Floating Parallax Eco-Objects --- //
function initParallaxSystem() {
    const parallaxItems = document.querySelectorAll('.parallax-item');
    
    // Slight delay to prevent jarring movement on load
    setTimeout(() => {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate center of screen
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // How far is mouse from center (-1 to 1 roughly)
            const percentX = (mouseX - centerX) / centerX;
            const percentY = (mouseY - centerY) / centerY;
            
            parallaxItems.forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed')) || 0;
                
                // Opposite direction movement based on speed factor
                const moveX = percentX * speed * -150; 
                const moveY = percentY * speed * -150;
                
                // Apply transform without breaking the CSS rotate animation by using matrix or just translate
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }, 500);
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
