const chapterContainer = document.getElementById('chapter-container');
const locationContainer = document.getElementById('location-container');
const nameContainer = document.getElementById('name-container');
const textContainer = document.getElementById('text-container');

const script = [
    { type: "chapter", text: "Prologue" },
    { type: "location", text: "February 13th, 2045; 12:30 - A weird room" },
    { name: "", text: "A series of pods are organized in different rows and columns. Stairs like the ones that are used in large public libraries are used to reach the pods. At the centre of the colossal structure, we see a glass ceiling." },
    { name: "", text: "My eyes suddenly open as I hear a voice with a peculiar cadence" },
    { name: "A voice", text: "It's not that bad." },
    { name: "A voice", text: "You know what? It is actually quite cute." },
    { name: "A voice", text: "I almost envy you." },
    { name: "", text: "A Character appears at the centre of the screen. He appears cheerful in a way that contrasts strikingly with the gothic environment. He points at the high ceiling, which appears to be at least a whopping thirty metres in height." },
    { name: "???", text: "At least you have high ceilings." },
    { name: "???", text: "It's a shame though. They could have made a couple of floors more. Or a penthouse." },
    { name: "???", text: "Oooh, at least some kind of a loft situation." },
    { name: "???", text: "Instead, they just chose to put as many beds as possible. *sigh*." },
    { name: "???", text: "Aesthetics are defaced on a daily basis in this city." },
    { name: "???", text: "*grins* But you have more chances to make friends though!" },
];

let currentLine = 0;
let isTyping = false;
let typingSpeed = 30; // milliseconds per character

// Typewriter sound setup
const typewriterSound = new Audio('data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YU8GAACAvwIA3r8BAHgAAAB4vwEA3j8CAH6/AQB0AAAA3j8CAIi/AQB6AAAAeL8BANw/AgCCvwEAdgAAAHa/AQDaPwIAhr8BAHgAAAB2vwEA2D8CAIy/AQB8AAAAfL8BANg/AgCQvwEAfgAAAIC/AQDYPwIAkr8BAIAAAAB+vwEA1j8CAJa/AQCCAAAAgr8BANw/AgCUvwEAgAAAAHq/AQDaPwIAmL8BAIAAAAB6vwEA3D8CAJ6/AQCEAAAAfr8BAN4/AgCivwEAhAAAAH6/AQDePwIAoL8BAIIAAACAv');
typewriterSound.volume = 0.2;

function playTypewriterSound() {
    typewriterSound.currentTime = 0;
    typewriterSound.play();
}

function typeWriter(text, index = 0) {
    if (index < text.length && isTyping) {
        textContainer.textContent += text.charAt(index);
        if (text.charAt(index) !== ' ' && text.charAt(index) !== '\n') {
            playTypewriterSound();
        }
        setTimeout(() => typeWriter(text, index + 1), typingSpeed);
    } else {
        isTyping = false;
    }
}

function displayFullText() {
    isTyping = false;
    const currentItem = script[currentLine - 1];
    if (currentItem && currentItem.text) {
        textContainer.textContent = currentItem.text;
    }
}

function displayNextLine() {
    if (currentLine < script.length) {
        const currentItem = script[currentLine];
        
        if (currentItem.type === "chapter") {
            chapterContainer.textContent = currentItem.text;
            locationContainer.textContent = "";
            nameContainer.textContent = "";
            textContainer.textContent = "";
        } else if (currentItem.type === "location") {
            locationContainer.textContent = currentItem.text;
            nameContainer.textContent = "";
            textContainer.textContent = "";
        } else {
            nameContainer.textContent = currentItem.name;
            textContainer.textContent = "";
            isTyping = true;
            typeWriter(currentItem.text);
        }
        
        currentLine++;
    } else {
        chapterContainer.textContent = '';
        locationContainer.textContent = '';
        nameContainer.textContent = '';
        textContainer.textContent = "End of demo. Thank you for playing!";
    }
}

textContainer.addEventListener('click', () => {
    if (isTyping) {
        displayFullText();
    } else {
        displayNextLine();
    }
});

textContainer.addEventListener('dblclick', displayFullText);

// Start the game
displayNextLine();
