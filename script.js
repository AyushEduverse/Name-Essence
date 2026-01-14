document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultSection = document.getElementById('resultSection');
    const inputSection = document.querySelector('.input-section');
    const resetBtn = document.getElementById('resetBtn');

    // UI Elements
    const displayName = document.getElementById('displayName');
    const personality = document.getElementById('personality');
    const luckyNumber = document.getElementById('luckyNumber');
    const element = document.getElementById('element');
    const destiny = document.getElementById('destiny');
    const description = document.getElementById('description');
    const auraCircle = document.getElementById('auraCircle');

    const data = {
        personalities: ['Radiant', 'Mystical', 'Tenacious', 'Visionary', 'Harmonious', 'Fearless', 'Eloquent', 'Wise'],
        elements: ['Aether', 'Wildfire', 'Crystal Stream', 'Ancient Earth', 'Aurora Borealis', 'Starlight', 'Oceanic Abyss', 'Solar Flare'],
        destinies: ['The Architect', 'The Guardian', 'The Pathfinder', 'The Muse', 'The Sage', 'The Alchemist', 'The Voyager', 'The Luminary'],
        descriptions: [
            "Your name vibrates with the energy of a natural leader. You possess an innate ability to inspire others and manifest your dreams into reality.",
            "There is a deep, tranquil wisdom in your essence. You see the world through a lens of empathy and profound understanding.",
            "You carry the spark of innovation. Your mind is a forge of new ideas, always pushing the boundaries of what is possible.",
            "Your spirit is anchored in resilience. Like a mountain, you stand firm against the storms of life, emerging stronger every time.",
            "Harmony follows in your wake. You have a gift for bringing people together and finding beauty in the smallest details of existence.",
            "The energy of adventure flows through you. You are destined to explore uncharted territories, both in the world and within the mind.",
            "A creative fire burns within you. Your essence is that of a storyteller, weaving magic through your words and actions.",
            "You possess the aura of a protector. Your presence provides a sanctuary for those around you, grounded in truth and integrity."
        ],
        colors: [
            'conic-gradient(from 0deg, #fbbf24, #db2777, #4f46e5, #fbbf24)',
            'conic-gradient(from 0deg, #10b981, #3b82f6, #6366f1, #10b981)',
            'conic-gradient(from 0deg, #f43f5e, #fb923c, #facc15, #f43f5e)',
            'conic-gradient(from 0deg, #a855f7, #ec4899, #ef4444, #a855f7)',
            'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #d946ef, #06b6d4)'
        ]
    };

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    function analyze() {
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.style.borderColor = '#ef4444';
            setTimeout(() => nameInput.style.borderColor = 'rgba(255, 255, 255, 0.1)', 2000);
            return;
        }

        const hash = hashCode(name.toLowerCase());

        // Map hash to data
        const pIndex = hash % data.personalities.length;
        const eIndex = (hash >> 2) % data.elements.length;
        const dIndex = (hash >> 4) % data.destinies.length;
        const descIndex = (hash >> 1) % data.descriptions.length;
        const cIndex = hash % data.colors.length;
        const luck = (hash % 100) + 1;

        // Apply to UI
        displayName.textContent = name;
        personality.textContent = data.personalities[pIndex];
        luckyNumber.textContent = luck;
        element.textContent = data.elements[eIndex];
        destiny.textContent = data.destinies[dIndex];
        description.textContent = data.descriptions[descIndex];
        auraCircle.style.background = data.colors[cIndex];

        // Transitions
        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    analyzeBtn.addEventListener('click', analyze);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') analyze();
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        nameInput.value = '';
        nameInput.focus();
    });
});
