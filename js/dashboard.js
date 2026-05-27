// Handles data saving and UI updates for the Dashboard

const STORAGE_KEY = 'ecoguide_dashboard_logs';

function getLogs() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveLog(logEntry) {
    const logs = getLogs();
    logs.push(logEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function clearLogs() {
    localStorage.removeItem(STORAGE_KEY);
    updateDashboardUI();
}

function calculateDashboardStats() {
    const logs = getLogs();
    
    let totalKg = 0;
    let totalCo2 = 0;

    logs.forEach(log => {
        totalKg += Number(log.quantity);
        totalCo2 += Number(log.co2Saved);
    });

    let level = "Beginner 🌱";
    if (totalKg > 10) level = "Eco Warrior 🌿";
    if (totalKg > 50) level = "Earth Guardian 🌍";

    return {
        totalKg: totalKg.toFixed(1),
        totalCo2: totalCo2.toFixed(1),
        level: level,
        logs: logs.reverse() // latest first
    };
}

function updateDashboardUI() {
    const stats = calculateDashboardStats();
    
    document.getElementById('dash-kg').innerText = stats.totalKg + " kg";
    document.getElementById('dash-co2').innerText = stats.totalCo2 + " kg";
    document.getElementById('dash-level').innerText = stats.level;

    const historyContainer = document.getElementById('dash-history');
    historyContainer.innerHTML = '';

    if (stats.logs.length === 0) {
        historyContainer.innerHTML = '<div class="empty-state">No actions logged yet. Start segregating your waste!</div>';
        return;
    }

    // Only show top 10 recent actions to prevent overflow
    stats.logs.slice(0, 10).forEach(log => {
        const item = document.createElement('div');
        item.className = 'history-item';
        
        // Format the date
        const dateObj = new Date(log.date);
        const dateString = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        item.innerHTML = `
            <div class="details">
                <span class="text-accent">+${log.quantity}kg</span> ${log.typeLabel}
                <div class="method" style="font-size: 0.8rem; color: #a0aec0;">${log.method}</div>
            </div>
            <div class="date">${dateString}</div>
        `;
        historyContainer.appendChild(item);
    });
}

// Bind clear button
document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('btn-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to erase all your eco-progress history?")) {
                clearLogs();
            }
        });
    }
});
