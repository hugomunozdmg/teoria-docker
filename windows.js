
const Xmargin = 100;
const Ymargin = 25;
const word = "WINDOWS";
const colors = [
    "\x1b[31m", // Red
    "\x1b[32m", // Green
    "\x1b[33m", // Yellow
    "\x1b[34m", // Blue
    "\x1b[35m", // Magenta
    "\x1b[36m", // Cyan
];

const reset = "\x1b[0m";
const hideCursor = "\x1b[?25l";
const showCursor = "\x1b[?25h";
const clearScreen = "\x1b[2J";
const home = "\x1b[H";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let x = Math.floor(Math.random() * (Xmargin - word.length - 1)) + 1;
let y = Math.floor(Math.random() * (Ymargin - 1)) + 1;

let vx = 3;
let vy = 1;
let colorIndex = 0;
let running = true;

function draw() {
    const screen = Array.from(
        { length: Ymargin + 1 },
        (_, row) => {
            if (row === 0 || row === Ymargin) {
                return ".".repeat(Xmargin + 1);
            }

            return "." + " ".repeat(Xmargin - 1) + ".";
        }
    );

    // Place the word inside the frame.
    const line = screen[y].split("");
    line.splice(x, word.length, ...word);
    screen[y] = line.join("");

    // Render the frame in one operation.
    process.stdout.write(
        home +
        screen.map((line, i) =>
            line + colors[colorIndex]
        ).join("\n")
    );
}

function move() {
    x += vx;
    y += vy;

    if (x <= 1 || x + word.length >= Xmargin) {
        vx = -vx;
        changeColor();
    }
    if (y <= 1 || y >= Ymargin - 1) {
        vy = -vy;
        changeColor();
    }
}

function changeColor() {
    colorIndex = (colorIndex + 1) % colors.length;
}

async function animate() {
    process.stdout.write(clearScreen + hideCursor);

    // Restore the cursor even when interrupted.
    const cleanup = () => {
        running = false;
        process.stdout.write(reset + showCursor + "\n");
    };

    process.once("SIGINT", cleanup);

    try {
        while (running) {
            draw();
            move();
            await sleep(60);
        }
    } finally {
        process.stdout.write(reset + showCursor);
    }
}

animate();