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

// Detect if user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Adjust voice parameters for more attractive, feminine tone, and slow down speech for both mobile and desktop
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set the language
    speech.pitch = 1.5; // High pitch for feminine tone

    // Adjust speech rate based on device
    if (isMobileDevice()) {
        speech.rate = 0.9; // Slower on mobile
    } else {
        speech.rate = 1.0; // Slower, but natural on desktop
    }

    window.speechSynthesis.speak(speech);
}

// Select the audio element for background music
const backgroundMusic = document.getElementById('backgroundMusic');

// Music Commands
const commands = {
    playMusic: () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            return "Playing background music.";
        } else {
            return "Music is already playing.";
        }
    },

    pauseMusic: () => {
        if (!backgroundMusic.paused) {
            backgroundMusic.pause();
            return "Background music paused.";
        } else {
            return "Music is already paused.";
        }
    },

    stopMusic: () => {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset music to the beginning
        return "Background music stopped.";
    },

    setVolume: (args) => {
        const volume = parseFloat(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 1) {
            return "Please enter a valid volume (between 0 and 1).";
        }
        backgroundMusic.volume = volume;
        return `Volume set to ${volume * 100}%`;
    },

    clear: () => {
        output.innerHTML = '';  // Clear the terminal output
        return "Terminal cleared! All set for new commands.";
    },

    help: () => `
        Available commands: help, clear, echo, about, date, time, joke, greet, magic8ball, weather, trivia, fortune, 
        riddle, asciiart, compliments, palindrome, tongueTwister, math, marketcap, meme, doge, successKid, 
        confusedNickYoung, mockingSpongebob, rollDice, flipCoin, motivate, inspireMe, funFact, yesOrNo, reverse, 
        define, songLyrics, randomNumber, translate, movieQuote, showerThought, insult, spoon, neo, speedup, 
        slowdown, togglelight, playMusic, pauseMusic, stopMusic, setVolume.
    `,

    echo: (args) => args.join(" "),

    about: () => [
        "I am Kundalini, your guide in the digital realm.",
        "Unveiling the mysteries of the Matrix, I am Kundalini.",
        "I'm here to assist you, wherever you are in the Matrix.",
        "Welcome to the world of Kundalini—a realm of truth."
    ][Math.floor(Math.random() * 4)],

    date: () => [
        `Today's date is ${new Date().toLocaleDateString()}.`,
        `The Matrix clock shows ${new Date().toLocaleDateString()}.`,
        `It is ${new Date().toLocaleDateString()} in the real world.`,
        `Check your calendar—today is ${new Date().toLocaleDateString()}.`
    ][Math.floor(Math.random() * 4)],

    time: () => [
        `The current time is ${new Date().toLocaleTimeString()}.`,
        `It's ${new Date().toLocaleTimeString()}—time to act.`,
        `Matrix time shows ${new Date().toLocaleTimeString()}.`,
        `Now is ${new Date().toLocaleTimeString()}—let's go!`
    ][Math.floor(Math.random() * 4)],

    joke: () => [
        "Why don’t skeletons fight each other? They don’t have the guts!",
        "What’s orange and sounds like a parrot? A carrot!",
        "Why was the computer cold? It left its Windows open!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ][Math.floor(Math.random() * 4)],

    greet: (args) => {
        const name = args.length > 0 ? args.join(" ") : "there";
        return [
            `Hello, ${name}! Welcome to the terminal.`,
            `Hi, ${name}! Ready to dive into the Matrix?`,
            `Greetings, ${name}! Let's uncover some truths.`,
            `Welcome back, ${name}! What's on your mind?`
        ][Math.floor(Math.random() * 4)];
    },

    magic8ball: () => [
        "The 8-Ball says: 'Yes, definitely!'",
        "Outlook not so good, says the 8-Ball.",
        "The Matrix is uncertain—ask again later.",
        "Signs point to 'Yes'."
    ][Math.floor(Math.random() * 4)],

    weather: () => [
        "It's sunny with a slight chance of Matrix rain.",
        "It's pouring in the Matrix—stay inside.",
        "Cloudy with a chance of glitches.",
        "Clear skies in the Matrix—let's hack away."
    ][Math.floor(Math.random() * 4)],

    trivia: () => [
        "Did you know? Honey never spoils.",
        "Fun fact: The Eiffel Tower grows taller in the summer.",
        "Bananas are berries, but strawberries aren't.",
        "Octopuses have three hearts!"
    ][Math.floor(Math.random() * 4)],

    fortune: () => [
        "Your future is bright—keep going!",
        "Something amazing is coming your way!",
        "Stay focused—good things are ahead!",
        "Prepare yourself—opportunities are on the horizon."
    ][Math.floor(Math.random() * 4)],

    riddle: () => [
        "What has keys but can’t open locks? (Answer: A piano)",
        "I speak without a mouth and hear without ears. What am I? (Answer: An echo)",
        "The more you take, the more you leave behind. What am I? (Answer: Footsteps)",
        "What runs, but never walks? (Answer: A river)"
    ][Math.floor(Math.random() * 4)],

    asciiart: () => [
        "( ͡° ͜ʖ ͡°)",
        "(╯°□°）╯︵ ┻━┻",
        "¯\\_(ツ)_/¯",
        "( •_•)>⌐■-■ (⌐■_■)"
    ][Math.floor(Math.random() * 4)],

    compliments: () => [
        "You're amazing—keep up the great work!",
        "Your energy is infectious—people love being around you!",
        "You're a natural at what you do.",
        "The world is better with you in it."
    ][Math.floor(Math.random() * 4)],

    palindrome: () => [
        "A man, a plan, a canal: Panama!",
        "Madam, in Eden, I’m Adam.",
        "Able was I ere I saw Elba.",
        "No lemon, no melon."
    ][Math.floor(Math.random() * 4)],

    tongueTwister: () => [
        "She sells seashells by the seashore.",
        "Peter Piper picked a peck of pickled peppers.",
        "How can a clam cram in a clean cream can?",
        "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair."
    ][Math.floor(Math.random() * 4)],

    math: (args) => {
        try {
            return [
                `The result of ${args.join(" ")} is ${eval(args.join(" "))}.`,
                `Calculated: ${eval(args.join(" "))}.`,
                `Here you go: ${eval(args.join(" "))}.`,
                `Your math problem is solved: ${eval(args.join(" "))}.`
            ][Math.floor(Math.random() * 4)];
        } catch {
            return "Invalid math expression.";
        }
    },

    marketcap: () => [
        "The current market cap of Bitcoin is on the rise.",
        "Market cap is fluctuating—stay tuned!",
        "Crypto is booming—check out the market cap!",
        "Take me to Goatse, it's time."
    ][Math.floor(Math.random() * 4)],

    meme: () => [
        "Success Kid is proud of you!",
        "Here's a classic: 'Distracted Boyfriend.'",
        "How about the 'Is this a pigeon?' meme?",
        "'Mocking Spongebob' is trending again!"
    ][Math.floor(Math.random() * 4)],

    doge: () => [
        "Much wow. Very moon. Such meme.",
        "Dogecoin to the moon!",
        "Many success. Much crypto. Very profit.",
        "Dogecoin: the meme that became a movement."
    ][Math.floor(Math.random() * 4)],

    successKid: () => [
        "You've done it! Success Kid approves!",
        "Success Kid says: 'You got this!'",
        "Victory is yours—Success Kid celebrates!",
        "You're unstoppable—Success Kid is on your side!"
    ][Math.floor(Math.random() * 4)],

    confusedNickYoung: () => [
        "Nick Young: 'Wait, what?'",
        "Confused Nick Young can't believe what he's seeing.",
        "Nick Young: 'Huh? Really?'",
        "Nick Young is very confused!"
    ][Math.floor(Math.random() * 4)],

    mockingSpongebob: () => [
        "MoCkInG sPoNgEbOb: 'WhAt DiD yOu SaY?'",
        "Spongebob: 'Oh ReAlLy?'",
        "mOcKiNg SpOnGeBoB Is HeRe.",
        "BoB mOcKs YoU sPoNgE!"
    ][Math.floor(Math.random() * 4)],

    rollDice: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}!`,

    flipCoin: () => Math.random() < 0.5 ? "Heads!" : "Tails!",

    motivate: () => [
        "Keep pushing forward! You're doing great!",
        "Believe in yourself—you're almost there!",
        "Success is just around the corner—don't stop!",
        "You have the power to achieve greatness—keep going!"
    ][Math.floor(Math.random() * 4)],

    inspireMe: () => [
        "You are capable of achieving amazing things!",
        "Greatness is within your reach—go for it!",
        "Your journey is just beginning. Keep pushing forward!",
        "Success is built on persistence—stay strong!"
    ][Math.floor(Math.random() * 4)],

    funFact: () => [
        "Fun fact: Honey never spoils.",
        "Did you know? Bananas are berries!",
        "Octopuses have three hearts!",
        "The Eiffel Tower can grow taller in the summer."
    ][Math.floor(Math.random() * 4)],

    yesOrNo: () => Math.random() < 0.5 ? "Yes!" : "No!",

    reverse: (args) => args.join(" ").split("").reverse().join(""),

    define: (args) => [
        `${args[0]}: A cool word, indeed!`,
        `${args[0]}: That's quite the term!`,
        `${args[0]}: Very interesting!`,
        `${args[0]}: Let's explore it further!`
    ][Math.floor(Math.random() * 4)],

    songLyrics: () => [
        "♪ We're no strangers to love, you know the rules, and so do I... ♪",
        "♪ Is this the real life? Is this just fantasy? ♪",
        "♪ Sweet dreams are made of this, who am I to disagree? ♪",
        "♪ Don't stop believin'... hold on to that feelin'... ♪"
    ][Math.floor(Math.random() * 4)],

    randomNumber: (args) => {
        if (args.length < 2 || isNaN(args[0]) || isNaN(args[1])) {
            return "Please provide two valid numbers for the random number range.";
        }
        const min = parseInt(args[0]);
        const max = parseInt(args[1]);
        return `Your random number is: ${Math.floor(Math.random() * (max - min + 1)) + min}`;
    },

    translate: (args) => [
        `Translation of ${args[0]}: 'Matrix speak'.`,
        `In the Matrix, ${args[0]} means something more.`,
        `The Matrix translation of ${args[0]} is intriguing.`,
        `${args[0]}? Let's see what it means in Matrix terms.`
    ][Math.floor(Math.random() * 4)],

    movieQuote: () => [
        `"There is no spoon." — The Matrix`,
        `"I'm the king of the world!" — Titanic`,
        `"May the Force be with you." — Star Wars`,
        `"To infinity... and beyond!" — Toy Story`
    ][Math.floor(Math.random() * 4)],

    showerThought: () => [
        "Do fish ever get thirsty?",
        "If you think about it, all your decisions are based on the information you have at that moment.",
        "Time flies like an arrow; fruit flies like a banana.",
        "What if the purpose of life is to find its purpose?"
    ][Math.floor(Math.random() * 4)],

    insult: () => [
        "You're slower than a Windows update.",
        "I'd explain it to you, but I left my English-to-Dingbat dictionary at home.",
        "You're like a software update. Whenever I see you, I think, 'Not now.'",
        "You must be a lost packet—I'm not receiving your signal."
    ][Math.floor(Math.random() * 4)],

    spoon: () => [
        "There is no spoon.",
        "Look closer, you’ll see the spoon doesn’t exist.",
        "The spoon is a figment of your imagination.",
        "Focus—not on the spoon—but on yourself."
    ][Math.floor(Math.random() * 4)],

    neo: () => [
        "I know kung fu.",
        "Neo, you are the chosen one.",
        "Wake up, Neo.",
        "The Matrix has you, Neo."
    ][Math.floor(Math.random() * 4)],

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
    tonguetwister: 'tongueTwister',
    playmusic: 'playMusic',
    pausemusic: 'pauseMusic',
    stopmusic: 'stopMusic',
    setvolume: 'setVolume',
    help: 'help',
    clear: 'clear',
    echo: 'echo',
    // Other command aliases...
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
