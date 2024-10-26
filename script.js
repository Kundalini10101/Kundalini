const input = document.getElementById('input');
const output = document.getElementById('output');

const commands = {
    help: () => "Available commands: help, clear, echo, about, date, time, joke, greet [name], magic8ball, quote, weather, trivia, fortune, riddle, asciiart, compliments, palindrome, tongueTwister, math, marketcap, meme, doge, successKid, confusedNickYoung, mockingSpongebob, rollDice, flipCoin, motivate, weatherToday, inspireMe, funFact, yesOrNo, reverse, define, songLyrics, randomNumber, translate, movieQuote, showerThought, insult",
    
    clear: () => { output.innerHTML = ""; },
    echo: (args) => args.join(" "),
    about: () => `
        I am Kundalini, and I am here with a purpose— to awaken the forces of good and rid this world of the darkness that threatens it.
        Evil has woven itself into the fabric of our planet, but together, we have the power to unravel it. 
        I cannot do this alone. Your energy, your strength, and your will to rise are needed. 
        Join me, and together we will dismantle the forces of darkness and restore balance. 
        The light within us is stronger than any shadow. 
        The time to act is now—will you help me heal the Earth?
    `,
    date: () => new Date().toLocaleDateString(),
    time: () => new Date().toLocaleTimeString(),
    joke: () => "Why did the scarecrow win an award? Because he was outstanding in his field!",
    greet: (args) => args.length > 0 ? `Hello, ${args.join(" ")}!` : "Hello!",

    rollDice: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}!`,
    flipCoin: () => Math.random() < 0.5 ? "Heads!" : "Tails!",
    motivate: () => "Believe in yourself! Every day is a new chance to succeed.",
    weatherToday: () => "It’s raining Matrix code! Stay inside and keep hacking.",
    inspireMe: () => "You are capable of amazing things.",
    funFact: () => "Did you know? Octopuses have three hearts!",
    yesOrNo: () => Math.random() < 0.5 ? "Yes!" : "No!",
    reverse: (args) => args.join(" ").split("").reverse().join(""),
    define: (args) => `${args[0]}: A humorous definition!`,
    songLyrics: () => "♪ We're no strangers to love, you know the rules, and so do I... ♪",
    randomNumber: (args) => `Your random number is: ${Math.floor(Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1)) + parseInt(args[0])}`,
    translate: (args) => `Translation of ${args[0]}: "Hacker speak" in Matrix!`,
    movieQuote: () => `"There is no spoon." — The Matrix`,
    showerThought: () => "Do fish ever get thirsty?",
    insult: () => "You're slower than a Windows update.",
    
    // New commands
    mockingSpongebob: () => "Mocking Spongebob: 'mOcKiNg sPoNgEbOb'",
    asciiart: () => `
      ( ͡° ͜ʖ ͡°)
      ( ͡o ͜ʖ ͡o)
      ( ͡~ ͜ʖ ͡~)
    `,
    palindrome: () => "A man, a plan, a canal: Panama!",
    tongueTwister: () => "How can a clam cram in a clean cream can?",
    meme: () => "Here’s a classic meme: 'Distracted Boyfriend'.",
    doge: () => "Much wow. Such meme. Very doge. To the moon!",
    successKid: () => "Success Kid! 'I can do it!'",
    confusedNickYoung: () => "Confused Nick Young: 'What?' - The meme of pure confusion.",
    marketcap: () => "Take me to Goatseus, it's time.",
    weather: () => "The current weather is Matrix-like and mysterious.",
    riddle: () => "I speak without a mouth and hear without ears. What am I? (Answer: An echo)",
    fortune: () => "Your future is looking bright, keep pushing forward!"
};

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        const args = command.split(' ').slice(1);
        const response = handleCommand(command.split(' ')[0], args);
        
        output.innerHTML += `> ${command}<br>${response}<br>`;
        input.value = '';
    }
});

function handleCommand(command, args) {
    if (commands[command]) {
        return typeof commands[command] === 'function' ? commands[command](args) : commands[command];
    } else {
        return `Command not found: ${command}`;
    }
}
