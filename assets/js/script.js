document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to characters
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        character.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effect to calculate button
    const calculateBtn = document.querySelector('.calculate-btn');
    calculateBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    calculateBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    calculateBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Animate age cards on result
    const ageCards = document.querySelectorAll('.age-card');
    ageCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add confetti effect when showing results
    function createConfetti() {
        const colors = ['#00a0e9', '#ff6b00', '#4a90e2', '#f39c12'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Balloon Animation Function
    function createBalloonAnimation() {
        const balloonContainer = document.createElement('div');
        balloonContainer.className = 'balloon-container';
        document.body.appendChild(balloonContainer);

        // Create multiple balloons
        for (let i = 0; i < 10; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Randomize balloon position, size, and color
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.top = `${100 + Math.random() * 50}%`;
            balloon.style.width = `${60 + Math.random() * 40}px`;
            balloon.style.height = `${80 + Math.random() * 40}px`;
            
            // Random gradient colors
            const colors = [
                'linear-gradient(to bottom, #ff6b6b, #ff4757)',
                'linear-gradient(to bottom, #4ecdc4, #45b7d1)',
                'linear-gradient(to bottom, #feca57, #ff9ff3)',
                'linear-gradient(to bottom, #48dbfb, #ff9ff3)'
            ];
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

            // Add pop animation after random delay
            setTimeout(() => {
                balloon.classList.add('balloon-pop');
                setTimeout(() => {
                    balloon.remove();
                }, 500);
            }, 3000 + Math.random() * 2000);

            balloonContainer.appendChild(balloon);
        }

        // Remove balloon container after all balloons are gone
        setTimeout(() => {
            balloonContainer.remove();
        }, 6000);
    }

    // Magical Sparkle Animation Function
    function createMagicalSparkle(event) {
        const calculateBtn = event.target;
        
        // Add magic active class
        calculateBtn.classList.add('magic-active');
        
        // Create multiple sparkles
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'magic-sparkle';
            
            // Randomize sparkle position around the button
            const rect = calculateBtn.getBoundingClientRect();
            sparkle.style.left = `${event.clientX - rect.left + (Math.random() * 100 - 50)}px`;
            sparkle.style.top = `${event.clientY - rect.top + (Math.random() * 100 - 50)}px`;
            
            // Random size and opacity
            const size = 10 + Math.random() * 30;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            // Add to button
            calculateBtn.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
        
        // Remove magic active class after animation
        setTimeout(() => {
            calculateBtn.classList.remove('magic-active');
        }, 1000);
        
        // Trigger existing animations
        createConfetti();
        createBalloonAnimation();
    }

    // If results are shown, trigger confetti
    if (document.querySelector('.result-container')) {
        createConfetti();
    }

    // Live counter with millisecond precision
    let animationFrameId;

    function updateLiveCounter() {
        const birthdateInput = document.getElementById('birthdate');
        if (!birthdateInput.value) return;

        const birthDate = new Date(birthdateInput.value);
        const now = new Date();
        
        if (birthDate > now) return;

        const diff = now - birthDate;
        
        // Calculate all time units
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const milliseconds = Math.floor(diff % 1000);

        // Update all time units with animations
        const elements = {
            years: document.getElementById('live-years'),
            months: document.getElementById('live-months'),
            days: document.getElementById('live-days'),
            hours: document.getElementById('live-hours'),
            minutes: document.getElementById('live-minutes'),
            seconds: document.getElementById('live-seconds'),
            milliseconds: document.getElementById('live-milliseconds')
        };

        // Update values with leading zeros
        if (elements.years) elements.years.textContent = years.toString().padStart(2, '0');
        if (elements.months) elements.months.textContent = months.toString().padStart(2, '0');
        if (elements.days) elements.days.textContent = days.toString().padStart(2, '0');
        if (elements.hours) elements.hours.textContent = hours.toString().padStart(2, '0');
        if (elements.minutes) elements.minutes.textContent = minutes.toString().padStart(2, '0');
        if (elements.seconds) elements.seconds.textContent = seconds.toString().padStart(2, '0');
        if (elements.milliseconds) elements.milliseconds.textContent = milliseconds.toString().padStart(3, '0');

        // Add pulse animations on changes
        if (milliseconds === 0) {
            elements.seconds?.classList.add('pulse');
            setTimeout(() => elements.seconds?.classList.remove('pulse'), 100);
        }
        if (seconds === 0 && milliseconds === 0) {
            elements.minutes?.classList.add('pulse');
            setTimeout(() => elements.minutes?.classList.remove('pulse'), 100);
        }
        if (minutes === 0 && seconds === 0 && milliseconds === 0) {
            elements.hours?.classList.add('pulse');
            setTimeout(() => elements.hours?.classList.remove('pulse'), 100);
        }
        if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
            elements.days?.classList.add('pulse');
            setTimeout(() => elements.days?.classList.remove('pulse'), 100);
        }

        // Request next frame
        animationFrameId = requestAnimationFrame(updateLiveCounter);
    }

    function startLiveCounter() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        updateLiveCounter();
    }

    // Start the live counter if birthdate is set
    if (document.getElementById('birthdate').value) {
        startLiveCounter();
    }

    // Update counter when birthdate changes
    document.getElementById('birthdate').addEventListener('change', function() {
        if (this.value) {
            startLiveCounter();
        } else if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    // Clean up animation frame on page unload
    window.addEventListener('unload', function() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    const ageForm = document.getElementById('age-form');
    const birthdateInput = document.getElementById('birthdate');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const resultContainer = document.getElementById('result-container');

    // Result elements
    const resultYears = document.getElementById('result-years');
    const resultMonths = document.getElementById('result-months');
    const resultDays = document.getElementById('result-days');
    const totalDays = document.getElementById('total-days');
    const totalHours = document.getElementById('total-hours');
    const totalMinutes = document.getElementById('total-minutes');

    // Function to calculate age
    function calculateAge(birthDate) {
        const currentDate = new Date();
        const birthDateTime = new Date(birthDate);

        if (birthDateTime > currentDate) {
            throw new Error("Birthday can't be in the future!");
        }

        const diffMs = currentDate - birthDateTime;
        const totalDaysLived = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        const years = currentDate.getFullYear() - birthDateTime.getFullYear();
        const months = currentDate.getMonth() - birthDateTime.getMonth();
        const days = currentDate.getDate() - birthDateTime.getDate();

        // Adjust years and months if needed
        let adjustedYears = years;
        let adjustedMonths = months;
        let adjustedDays = days;

        if (days < 0) {
            adjustedMonths--;
            const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            adjustedDays = prevMonthLastDay + days;
        }

        if (months < 0 || (months === 0 && days < 0)) {
            adjustedYears--;
            adjustedMonths += 12;
        }

        return {
            years: adjustedYears,
            months: adjustedMonths,
            days: adjustedDays,
            totalDays: totalDaysLived
        };
    }

    // Form submission handler
    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const birthdate = birthdateInput.value;

        try {
            const age = calculateAge(birthdate);

            // Hide error, show results
            errorMessage.style.display = 'none';
            resultContainer.style.display = 'block';

            // Update result elements
            resultYears.textContent = age.years;
            resultMonths.textContent = age.months;
            resultDays.textContent = age.days;

            // Update fun facts
            totalDays.textContent = age.totalDays.toLocaleString();
            totalHours.textContent = (age.totalDays * 24).toLocaleString();
            totalMinutes.textContent = (age.totalDays * 1440).toLocaleString();

            // Trigger animations
            createConfetti();
            createBalloonAnimation();

        } catch (error) {
            // Show error message
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
            resultContainer.style.display = 'none';
        }
    });
});
