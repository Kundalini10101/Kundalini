const input = document.getElementById('input');
const output = document.getElementById('output');
const commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
let historyIndex = commandHistory.length;

// Matrix Animation Variables
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const fontSize = 16;
const drops = [];
let columns = 0;
let matrixSpeed = 50; // Speed of matrix animation

// Initialize canvas for Matrix
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

// Start matrix and adjust for screen size
window.addEventListener('resize', initializeCanvas);
initializeCanvas();

// Append content to output and auto-scroll
function appendToOutput(content) {
    output.innerHTML += `${content}<br>`;
    output.scrollTop = output.scrollHeight; // Auto-scroll to bottom
}

// Adjust voice parameters for more attractive, feminine tone
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set the language
    speech.pitch = 1.5; // Increase pitch for more feminine tone
    speech.rate = 1.2; // Increase rate for a slightly faster, more attractive delivery
    window.speechSynthesis.speak(speech);
}

// Add command aliases for case-insensitive matching
const commandAliases = {
    randomnumber: 'randomNumber',
    songlyrics: 'songLyrics',
    moviequote: 'movieQuote',
    showerthought: 'showerThought',
    inspireme: 'inspireMe',
    funfact: 'funFact',
    yesorno: 'yesOrNo',
    successkid: 'successKid',
    confusednickyoung: 'confusedNickYoung',
    mockingspongebob: 'mockingSpongebob',
    rolldice: 'rollDice',
    flipcoin: 'flipCoin',
    tonguetwister: 'tongueTwister'
};

// Handle user input for commands
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim().toLowerCase(); // Normalize to lowercase
        if (!command) return;

        const args = command.split(' ').slice(1);
        const fullCommand = command.split(' ')[0];
        const response = handleCommand(fullCommand, args);
        
        appendToOutput(`> ${command}<br>${response}`);
        speakText(response); // Speak the response
        commandHistory.push(command);
        localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
        historyIndex = commandHistory.length;
        input.value = '';
    } else if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            input.value = '';
            historyIndex = commandHistory.length;
        }
    }
});

// Handle various commands
function handleCommand(command, args) {
    const normalizedCommand = commandAliases[command] || command; // Map command aliases
    if (commands[normalizedCommand]) {
        return typeof commands[normalizedCommand] === 'function' ? commands[normalizedCommand](args) : commands[normalizedCommand];
    } else {
        return `Command not found: ${command}. Type 'help' to see the list of available commands.`;
    }
}

// Full list of 40 commands with 3 responses each
const commands = {
    help: () => [
        "Available commands: help, clear, echo, about, date, time, joke, greet, magic8ball, weather, trivia, fortune, riddle, asciiart, compliments, palindrome, tongueTwister, math, marketcap, meme, doge, successKid, confusedNickYoung, mockingSpongebob, rollDice, flipCoin, motivate, inspireMe, funFact, yesOrNo, reverse, define, songLyrics, randomNumber, translate, movieQuote, showerThought, insult, spoon, neo, speedup, slowdown, togglelight",
        "Commands list: help, clear, echo, about, date, time, joke, greet, magic8ball, weather, trivia, fortune, riddle, asciiart, compliments, palindrome, tongueTwister, math, marketcap, meme, doge, successKid, confusedNickYoung, mockingSpongebob, rollDice, flipCoin, motivate, inspireMe, funFact, yesOrNo, reverse, define, songLyrics, randomNumber, translate, movieQuote, showerThought, insult.",
        "Try any of these commands: help, clear, echo, about, date, time, joke, greet, magic8ball, weather, trivia, fortune, riddle, asciiart, compliments, palindrome, tongueTwister, math, marketcap, meme, doge, successKid, confusedNickYoung, mockingSpongebob, rollDice, flipCoin, motivate, inspireMe, funFact, yesOrNo, reverse, define, songLyrics, randomNumber, translate, movieQuote, showerThought, insult."
    ][Math.floor(Math.random() * 3)],

    clear: () => [
        "Terminal cleared! All set for new commands.",
        "Screen wiped clean—ready for the next input.",
        "All clear! Type a new command."
    ][Math.floor(Math.random() * 3)],

    echo: (args) => args.join(" "),

    about: () => [
        "I am Kundalini, your guide in the digital realm.",
        "Kundalini: The force of truth in the digital space.",
        "Unraveling the digital mysteries, I am Kundalini."
    ][Math.floor(Math.random() * 3)],

    date: () => [
        `Today's date is ${new Date().toLocaleDateString()}.`,
        `It's ${new Date().toLocaleDateString()} today.`,
        `The Matrix date shows ${new Date().toLocaleDateString()}.`
    ][Math.floor(Math.random() * 3)],

    time: () => [
        `Current time: ${new Date().toLocaleTimeString()}.`,
        `It's ${new Date().toLocaleTimeString()} right now.`,
        `Matrix clock says ${new Date().toLocaleTimeString()}.`
    ][Math.floor(Math.random() * 3)],

    joke: () => [
        "Why don’t skeletons fight each other? They don’t have the guts!",
        "What’s orange and sounds like a parrot? A carrot!",
        "My computer told me it needed a break, so it went to sleep."
    ][Math.floor(Math.random() * 3)],

    greet: (args) => {
        const name = args.length > 0 ? args.join(" ") : "there";
        return [
            `Hello, ${name}! Welcome to the terminal.`,
            `Hi, ${name}! Great to see you!`,
            `Greetings, ${name}! Let’s start our journey.`
        ][Math.floor(Math.random() * 3)];
    },

    magic8ball: () => [
        "The 8-Ball says: 'Yes, definitely!'",
        "Outlook not so good, says the 8-Ball.",
        "Ask again later."
    ][Math.floor(Math.random() * 3)],

    weather: () => [
        "It’s sunny with a slight chance of Matrix rain.",
        "Rain in the Matrix—better stay in and hack.",
        "Partly cloudy with a chance of matrix glitches."
    ][Math.floor(Math.random() * 3)],

    trivia: () => [
        "Did you know? Honey never spoils.",
        "The Eiffel Tower can be 15 cm taller in the summer.",
        "Bananas are berries, but strawberries aren’t."
    ][Math.floor(Math.random() * 3)],

    fortune: () => [
        "Great things are coming your way—stay tuned!",
        "You will find what you seek sooner than you think.",
        "Your future is bright, just keep moving forward."
    ][Math.floor(Math.random() * 3)],

    riddle: () => [
        "What has keys but can’t open locks? (Answer: A piano)",
        "I speak without a mouth and hear without ears. What am I? (Answer: An echo)",
        "The more you take, the more you leave behind. What am I? (Answer: Footsteps)"
    ][Math.floor(Math.random() * 3)],

    asciiart: () => [
        "( ͡° ͜ʖ ͡°)",
        "(╯°□°）╯︵ ┻━┻",
        "¯\\_(ツ)_/¯"
    ][Math.floor(Math.random() * 3)],

    compliments: () => [
        "You’re doing amazing! Keep it up!",
        "Your energy is magnetic!",
        "You have limitless potential."
    ][Math.floor(Math.random() * 3)],

    palindrome: () => [
        "A man, a plan, a canal: Panama!",
        "Madam, in Eden, I’m Adam.",
        "Able was I ere I saw Elba."
    ][Math.floor(Math.random() * 3)],

    tongueTwister: () => [
        "She sells seashells by the seashore.",
        "Peter Piper picked a peck of pickled peppers.",
        "How can a clam cram in a clean cream can?"
    ][Math.floor(Math.random() * 3)],

    math: (args) => {
        if (args.length === 0) {
            return "Please enter a valid mathematical expression.";
        }
        try {
            const expression = args.join(" ");
            const result = eval(expression); // Evaluate the expression
            return `The result of ${expression} is ${result}.`;
        } catch (error) {
            return "Invalid mathematical expression. Please try again.";
        }
    },

    marketcap: () => [
        "The market cap is currently fluctuating—stay tuned!",
        "Crypto is on the rise—check out Bitcoin!",
        "Market cap update: things are heating up!"
    ][Math.floor(Math.random() * 3)],

    meme: () => [
        "Here’s a classic: ‘Distracted Boyfriend’.",
        "How about the ‘Success Kid’ meme for inspiration?",
        "‘Is this a pigeon?’ meme for the win!"
    ][Math.floor(Math.random() * 3)],

    doge: () => [
        "Much wow. Very moon. Such meme.",
        "To the moon, Doge!",
        "Dogecoin: much wow, very meme!"
    ][Math.floor(Math.random() * 3)],

    successKid: () => [
        "Success Kid says: You did it!",
        "Victory is yours—Success Kid approved!",
        "Success is within reach!"
    ][Math.floor(Math.random() * 3)],

    confusedNickYoung: () => [
        "Nick Young: 'Wait, what?'",
        "Confused face: 'Huh?'",
        "Nick Young is very confused!"
    ][Math.floor(Math.random() * 3)],

    mockingSpongebob: () => [
        "mOcKiNg sPoNgEbOb: 'wHaT dId YoU sAy?'",
        "Mocking Spongebob: 'tHiS iS sO fUnNy!'",
        "Spongebob: 'rEaLlY?'"
    ][Math.floor(Math.random() * 3)],

    rollDice: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}!`,

    flipCoin: () => Math.random() < 0.5 ? "Heads!" : "Tails!",

    motivate: () => [
        "Keep pushing forward! You’ve got this!",
        "Believe in yourself—success is near!",
        "Every step brings you closer to greatness!"
    ][Math.floor(Math.random() * 3)],

    inspireMe: () => [
        "You are capable of amazing things!",
        "Greatness is within your reach—go for it!",
        "Your journey is just beginning. Keep pushing forward!"
    ][Math.floor(Math.random() * 3)],

    funFact: () => [
        "Fun fact: Honey never spoils.",
        "Did you know? Bananas are berries!",
        "Octopuses have three hearts!"
    ][Math.floor(Math.random() * 3)],

    yesOrNo: () => Math.random() < 0.5 ? "Yes!" : "No!",

    reverse: (args) => args.join(" ").split("").reverse().join(""),

    define: (args) => `${args[0]}: A humorous definition!`,

    songLyrics: () => [
        "♪ We're no strangers to love, you know the rules, and so do I... ♪",
        "♪ Is this the real life? Is this just fantasy? ♪",
        "♪ Sweet dreams are made of this, who am I to disagree? ♪"
    ][Math.floor(Math.random() * 3)],

    randomNumber: (args) => {
        if (args.length < 2 || isNaN(args[0]) || isNaN(args[1])) {
            return "Please provide two valid numbers for the random number range.";
        }
        const min = parseInt(args[0]);
        const max = parseInt(args[1]);
        return `Your random number is: ${Math.floor(Math.random() * (max - min + 1)) + min}`;
    },

    translate: (args) => `Translation of ${args[0]}: 'hacker speak' in Matrix!`,

    movieQuote: () => `"There is no spoon." — The Matrix`,

    showerThought: () => [
        "Do fish ever get thirsty?",
        "If you think about it, all your decisions are based on the information you have at that moment.",
        "Time flies like an arrow; fruit flies like a banana."
    ][Math.floor(Math.random() * 3)],

    insult: () => [
        "You're slower than a Windows update.",
        "I'd explain it to you, but I left my English-to-Dingbat dictionary at home.",
        "You're like a software update. Whenever I see you, I think, 'Not now.'"
    ][Math.floor(Math.random() * 3)],

    spoon: () => "There is no spoon.",

    neo: () => "I know kung fu.",

    speedup: () => {
        matrixSpeed = Math.max(10, matrixSpeed - 10);
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, matrixSpeed);
        return "Matrix speed increased!";
    },

    slowdown: () => {
        matrixSpeed = Math.min(200, matrixSpeed + 10);
        clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, matrixSpeed);
        return "Matrix speed decreased!";
    },

    togglelight: () => {
        document.body.classList.toggle('light-mode');
        return "Light mode toggled!";
    }
};
