const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for binary code
const binaryChars = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Draw the characters
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#00FF00';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Update the canvas every 50 milliseconds
setInterval(drawMatrix, 50);

}

// Update the canvas every 50 milliseconds
setInterval(drawMatrix, 50);

}

// Update the canvas every 50 milliseconds
setInterval(drawMatrix, 50);
