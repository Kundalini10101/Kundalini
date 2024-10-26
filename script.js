const input = document.getElementById('input');
const output = document.getElementById('output');

const commands = {
    help: () => "Available commands: help, clear, echo, about, date, time...",
    clear: () => { output.innerHTML = ""; },
    echo: (args) => args.join(" "),
    about: () => `
        I am Kundalini, and I am here with a purpose...
    `,
    date: () => new Date().toLocaleDateString(),
    time: () => new Date().toLocaleTimeString(),
    joke: () => "Why did the scarecrow win an award? Because he was outstanding in his field!",
    greet: (args) => args.length > 0 ? `Hello, ${args.join(" ")}!` : "Hello!",
    rollDice: () => `You rolled a ${Math.floor(Math.random() * 6) + 1}!`,
    flipCoin: () => Math.random() < 0.5 ? "Heads!" : "Tails!",
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
