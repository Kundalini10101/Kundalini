const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Function to initialize the canvas size and drops
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate columns based on the new width
    const columns = Math.floor(canvas.width / fontSize); 
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height; // Start drops at random positions
    }
}

// Characters for binary code
const binaryChars = '01';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize); 
const drops = [];

// Initialize the canvas and drops
initializeCanvas();

// Draw the characters
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Alternate between white and green for color effect
    ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#00FF00';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0; // Reset drop
        }
        drops[i]++;
    }
}

// Update the canvas every 50 milliseconds
setInterval(drawMatrix, 50);

// Listen for window resize events
window.addEventListener('resize', () => {
    initializeCanvas(); // Reinitialize canvas size and drops
});

