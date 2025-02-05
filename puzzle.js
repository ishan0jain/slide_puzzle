const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let gridSize = 3;
let tileSize;
let tiles = [];
let emptyTile = { x: 2, y: 2 }; // Default empty tile position

// Handle Image Upload
document.getElementById("imageInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        img.src = URL.createObjectURL(file);
    }
});

// Generate Puzzle
function generatePuzzle() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    tileSize = 300 / gridSize; // Fixed Canvas Size
    canvas.width = canvas.height = 300;
    
    img.onload = function () {
        tiles = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                tiles.push({ x: j, y: i, correctX: j, correctY: i });
            }
        }
        tiles.pop(); // Remove last tile (empty space)
        drawPuzzle();
    };
}

// Draw Puzzle Grid
function drawPuzzle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiles.forEach(tile => {
        ctx.drawImage(img, 
            tile.correctX * tileSize, tile.correctY * tileSize, tileSize, tileSize, 
            tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
    });
}

// Shuffle Puzzle
function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        let neighbors = getMovableTiles();
        let randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(randomTile, emptyTile);
    }
    drawPuzzle();
}

// Get Movable Tiles
function getMovableTiles() {
    let moves = [];
    let { x, y } = emptyTile;
    if (x > 0) moves.push({ x: x - 1, y });
    if (x < gridSize - 1) moves.push({ x: x + 1, y });
    if (y > 0) moves.push({ x, y: y - 1 });
    if (y < gridSize - 1) moves.push({ x, y: y + 1 });
    return moves;
}

// Swap Tiles
function swapTiles(tile1, tile2) {
    let tempX = tile1.x, tempY = tile1.y;
    tile1.x = tile2.x; tile1.y = tile2.y;
    tile2.x = tempX; tile2.y = tempY;
    emptyTile = tile1;
}

// Calculate Moves (Simplified for Now)
function calculateMoves() {
    alert("Calculating optimal moves...");
}

// Show Solution (To be implemented)
function showSolution() {
    alert("Solution will be shown here...");
}

canvas.addEventListener("click", function (event) {
    let rect = canvas.getBoundingClientRect();
    let clickX = event.clientX - rect.left;
    let clickY = event.clientY - rect.top;
    let clickedTile = tiles.find(tile => 
        clickX > tile.x * tileSize && clickX < (tile.x + 1) * tileSize &&
        clickY > tile.y * tileSize && clickY < (tile.y + 1) * tileSize
    );

    if (clickedTile && getMovableTiles().some(t => t.x === clickedTile.x && t.y === clickedTile.y)) {
        swapTiles(clickedTile, emptyTile);
        drawPuzzle();
    }
});
