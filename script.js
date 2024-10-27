const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const fontSize = 16;
const drops = [];
let columns = 0;
let matrixSpeed = 50; // Speed of matrix animation

// Initialize canvas
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }
}

// Draw the matrix code
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;
    for (let i = 0; i < drops.length; i++) {
        const char = '01'[Math.floor(Math.random() * 2)];

        const randomColor = Math.random();
        if (randomColor <= 0.65) {
            const purpleShades = ['#A020F0', '#BA55D3', '#9370DB', '#DDA0DD'];
            ctx.fillStyle = purpleShades[Math.floor(Math.random() * purpleShades.length)];
        } else {
            ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#00FF00';
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Update matrix animation speed dynamically
let matrixInterval = setInterval(drawMatrix, matrixSpeed);

commands.speedup = () => {
    matrixSpeed = Math.max(10, matrixSpeed - 10);
    clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrix, matrixSpeed);
    return "Matrix speed increased!";
};

commands.slowdown = () => {
    matrixSpeed = Math.min(200, matrixSpeed + 10);
    clearInterval(matrixInterval);
    matrixInterval = setInterval(drawMatrix, matrixSpeed);
    return "Matrix speed decreased!";
};

// Start matrix and adjust for screen size
window.addEventListener('resize', initializeCanvas);
initializeCanvas();
