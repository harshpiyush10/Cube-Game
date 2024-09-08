document.addEventListener('DOMContentLoaded', () => {
    const leftCube = document.querySelector('.left-cube');
    const rightCube = document.querySelector('.right-cube');
    const rotateButton = document.querySelector('.rotate-button');
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');
    const currentPlayerDisplay = document.getElementById('current-player');
    
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1; 
    const faceColors = ['red', 'orange', 'blue', 'green', 'white', 'yellow'];

    function getRandomRotation() {
        const randomX = Math.floor(Math.random() * 4) * 90; // random rotation in X (0, 90, 180, 270)
        const randomY = Math.floor(Math.random() * 4) * 90; // random rotation in Y (0, 90, 180, 270)
        // console.log(randomX);
        return { x: randomX, y: randomY };
    }

    console.log(faceColors);

    function getFaceColor(rotation) {
        const { x, y } = rotation;
    
        // Normalize X and Y to ensure they are between 0 and 360 degrees
        const xRot = (x % 360 + 360) % 360;
        const yRot = (y % 360 + 360) % 360;
    
        // Mapping for cube face colors based on rotation angles
        if (xRot === 0) { 
            if (yRot === 0) return faceColors[0]; // Front face (Red)
            if (yRot === 90) return faceColors[3]; // Right face (Green)
            if (yRot === 180) return faceColors[1]; // Back face (Orange)
            if (yRot === 270) return faceColors[2]; // Left face (Blue)
        } else if (xRot === 90) {
            return faceColors[4]; // Top face (White)
        } else if (xRot === 270) {
            return faceColors[5]; // Bottom face (Yellow)
        } else if (xRot === 180) {
            // When the cube is upside down, handle the reversed faces
            if (yRot === 0) return faceColors[1]; // Back face (Orange)
            if (yRot === 90) return faceColors[2]; // Left face (Blue)
            if (yRot === 180) return faceColors[0]; // Front face (Red)
            if (yRot === 270) return faceColors[3]; // Right face (Green)
        }
    
        // Default fallback, just in case
        return faceColors[0]; 
    }
    
    

    function rotateCube(cube) {
        const rotation = getRandomRotation();
        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        return rotation; 
    }

    function updateScore(leftColor, rightColor) {
        console.log(leftColor + " : " + rightColor);
        if (leftColor === rightColor) {
            if (currentPlayer === 1) {
                player1Score += 1;
                player1ScoreDisplay.innerText = player1Score;
            } else {
                player2Score += 1;
                player2ScoreDisplay.innerText = player2Score;
            }
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.innerText = `Current Player: Player ${currentPlayer}`;
    }

    rotateButton.addEventListener('click', () => {
        // Rotate both cubes and get their colors
        const leftRotation = rotateCube(leftCube);
        const rightRotation = rotateCube(rightCube);

        const leftColor = getFaceColor(leftRotation);
        const rightColor = getFaceColor(rightRotation);

        // Update the score based on the colors
        updateScore(leftColor, rightColor);

        // Switch to the next player
        switchPlayer();
    });
});
