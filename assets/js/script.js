document.addEventListener('DOMContentLoaded', () => {
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

    // Live counter elements
    const liveYears = document.getElementById('live-years');
    const liveMonths = document.getElementById('live-months');
    const liveDays = document.getElementById('live-days');
    const liveHours = document.getElementById('live-hours');
    const liveMinutes = document.getElementById('live-minutes');
    const liveSeconds = document.getElementById('live-seconds');
    const liveMilliseconds = document.getElementById('live-milliseconds');

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

    function startLiveCounter() {
        function updateLiveCounter() {
            const now = new Date();
            liveYears.textContent = now.getFullYear().toString().padStart(2, '0');
            liveMonths.textContent = (now.getMonth() + 1).toString().padStart(2, '0');
            liveDays.textContent = now.getDate().toString().padStart(2, '0');
            liveHours.textContent = now.getHours().toString().padStart(2, '0');
            liveMinutes.textContent = now.getMinutes().toString().padStart(2, '0');
            liveSeconds.textContent = now.getSeconds().toString().padStart(2, '0');
            liveMilliseconds.textContent = now.getMilliseconds().toString().padStart(3, '0');
        }

        // Initial update
        updateLiveCounter();

        // Update every 10ms for milliseconds
        setInterval(updateLiveCounter, 10);
    }

    ageForm.addEventListener('submit', (e) => {
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

            // Start live counter
            startLiveCounter();

        } catch (error) {
            // Show error message
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
            resultContainer.style.display = 'none';
        }
    });
});
