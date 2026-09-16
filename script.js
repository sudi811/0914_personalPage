// Live Real-Time Clock & Metadata Dashboard

function updateClock() {
    const now = new Date();

    // Hours, Minutes, Seconds
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Period (AM/PM)
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = String(hours % 12 || 12).padStart(2, '0');

    // Update Time elements
    const timeMainElem = document.getElementById('live-time');
    const timePeriodElem = document.getElementById('time-period');
    if (timeMainElem) {
        timeMainElem.textContent = `${displayHours}:${minutes}:${seconds}`;
    }
    if (timePeriodElem) {
        timePeriodElem.textContent = period;
    }

    // Format Date: e.g. "Monday, September 14, 2026"
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    const dateElem = document.getElementById('live-date');
    if (dateElem) {
        dateElem.textContent = dateStr;
    }

    // Day of week
    const dayOfWeekElem = document.getElementById('day-of-week');
    if (dayOfWeekElem) {
        dayOfWeekElem.textContent = now.toLocaleDateString('en-US', { weekday: 'short' });
    }

    // Day of Year
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dayOfYearElem = document.getElementById('day-of-year');
    if (dayOfYearElem) {
        dayOfYearElem.textContent = `Day ${dayOfYear}`;
    }

    // Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Taipei';
    const timezoneElem = document.getElementById('user-timezone');
    if (timezoneElem) {
        timezoneElem.textContent = timezone.split('/')[1] || timezone;
    }

    // Timezone Tag (e.g. UTC+8)
    const offset = -now.getTimezoneOffset() / 60;
    const offsetStr = `UTC${offset >= 0 ? '+' : ''}${offset}`;
    const timezoneTag = document.getElementById('timezone-tag');
    if (timezoneTag) {
        timezoneTag.textContent = offsetStr;
    }
}

// Interactive card tilt / mouse highlight effect
function initInteractiveEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .profile-card, .clock-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    initInteractiveEffects();
});
