/*
  Laan Rose
  CSC 337
  Final Project
  Checkers

  Javascript file for final.html. Handles user input, moving pieces, and AI decision-making.
*/

(function() {

    "use strict";
    
    // Flags for determinging how to handle user input
    let selectOnClick = 1;  
    let moveOnClick = 0;    
    // Current position of a selected checkers piece.
    let selectedX = 0;      
    let selectedY = 0;
    
    /** Initializes the game board, buttons, score, and begins a new game.*/
    window.onload = function() {
        // Import final_service.js
        let service = document.createElement('script');
        service.src = "/final_service.js";
        document.head.appendChild(service);
        
        // Initialize buttons.
        let rstbtn = document.getElementById("restartbtn");
        rstbtn.onclick = newGame;
        let savebtn = document.getElementById("savebtn");
        savebtn.onclick = saveGame;
        let loadbtn = document.getElementById("loadbtn");
        loadbtn.onclick = loadGame;
        
        // Initialize 8x8 game board.
        initBoard();
        initPieces();
        
        // Begin a new game. Replace with a load-game method later.
        newGame();
    };
    
    /** Clears the score & board. */
    function newGame() {
        // Reset pieces
        resetBoard();
        // Reset score
        let bscore = document.getElementById("blackscorelbl");
        bscore.innerHTML = "0";
        let wscore = document.getElementById("redscorelbl");
        wscore.innerHTML = "0";
        
        // Reset event handling status.
        selectOnClick = 1;
        moveOnClick = 0;
    }
    
    /** Adds board pieces to the game board.*/
    function initPieces() {
        // Make most pieces clear
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                createPiece(x, y, "clear");
            }
        }
        // Create 12 black pieces
        document.getElementById("pc" + 0 + "," + 0).src = "black.png";
        document.getElementById("pc" + 2 + "," + 0).src = "black.png";
        document.getElementById("pc" + 4 + "," + 0).src = "black.png";
        document.getElementById("pc" + 6 + "," + 0).src = "black.png";
        document.getElementById("pc" + 1 + "," + 1).src = "black.png";
        document.getElementById("pc" + 3 + "," + 1).src = "black.png";
        document.getElementById("pc" + 5 + "," + 1).src = "black.png";
        document.getElementById("pc" + 7 + "," + 1).src = "black.png";
        document.getElementById("pc" + 2 + "," + 2).src = "black.png";
        document.getElementById("pc" + 4 + "," + 2).src = "black.png";
        document.getElementById("pc" + 6 + "," + 2).src = "black.png";
        document.getElementById("pc" + 0 + "," + 2).src = "black.png";
        
        // Create 12 red pieces
        document.getElementById("pc" + 0 + "," + 7).src = "red.png";
        document.getElementById("pc" + 2 + "," + 7).src = "red.png";
        document.getElementById("pc" + 4 + "," + 7).src = "red.png";
        document.getElementById("pc" + 6 + "," + 7).src = "red.png";
        document.getElementById("pc" + 1 + "," + 6).src = "red.png";
        document.getElementById("pc" + 3 + "," + 6).src = "red.png";
        document.getElementById("pc" + 5 + "," + 6).src = "red.png";
        document.getElementById("pc" + 7 + "," + 6).src = "red.png";
        document.getElementById("pc" + 2 + "," + 5).src = "red.png";
        document.getElementById("pc" + 4 + "," + 5).src = "red.png";
        document.getElementById("pc" + 6 + "," + 5).src = "red.png";
        document.getElementById("pc" + 0 + "," + 5).src = "red.png";
	}
    
    /** Resets the position of all checkers pieces to their new-game positions.*/
    function resetBoard() {
        // Make most pieces clear
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                document.getElementById("pc" + x + "," + y).src = "clear.png";
            }
        }
        
        // Create 12 black pieces
        document.getElementById("pc" + 0 + "," + 0).src = "black.png";
        document.getElementById("pc" + 2 + "," + 0).src = "black.png";
        document.getElementById("pc" + 4 + "," + 0).src = "black.png";
        document.getElementById("pc" + 6 + "," + 0).src = "black.png";
        document.getElementById("pc" + 1 + "," + 1).src = "black.png";
        document.getElementById("pc" + 3 + "," + 1).src = "black.png";
        document.getElementById("pc" + 5 + "," + 1).src = "black.png";
        document.getElementById("pc" + 7 + "," + 1).src = "black.png";
        document.getElementById("pc" + 2 + "," + 2).src = "black.png";
        document.getElementById("pc" + 4 + "," + 2).src = "black.png";
        document.getElementById("pc" + 6 + "," + 2).src = "black.png";
        document.getElementById("pc" + 0 + "," + 2).src = "black.png";
        
        // Create 12 red pieces
        document.getElementById("pc" + 1 + "," + 7).src = "red.png";
        document.getElementById("pc" + 3 + "," + 7).src = "red.png";
        document.getElementById("pc" + 5 + "," + 7).src = "red.png";
        document.getElementById("pc" + 7 + "," + 7).src = "red.png";
        document.getElementById("pc" + 0 + "," + 6).src = "red.png";
        document.getElementById("pc" + 2 + "," + 6).src = "red.png";
        document.getElementById("pc" + 4 + "," + 6).src = "red.png";
        document.getElementById("pc" + 6 + "," + 6).src = "red.png";
        document.getElementById("pc" + 1 + "," + 5).src = "red.png";
        document.getElementById("pc" + 3 + "," + 5).src = "red.png";
        document.getElementById("pc" + 5 + "," + 5).src = "red.png";
        document.getElementById("pc" + 7 + "," + 5).src = "red.png";
    }
    
    /** Creates a new checkers pices at the givens coordinates.
        @param {number} x the x-position
        @param {number} y the y-position
        @param {number} color the color of the piece
    */
    function createPiece(x, y, color) {
        // Get the board space where the piece will go.
        let piece = document.createElement("img");
        
        piece.id = "pc" + x + "," + y;
        piece.classList.add('checkerpc');
        
        if (color == "black") {
            piece.src = "black.png";
        }
        else if(color == "red") {
            piece.src = "red.png";
        }
        else {
            piece.src = "clear.png";
        }
                    
                    
        //rect.onclick = moveRect;
        let space = document.getElementById(x + "," + y);
        space.appendChild(piece);
    }
    
    /**
      Create and add the 64 board spaces.
    */
    function initBoard() {
        let puzzlearea = document.getElementById("boarddiv");
        puzzlearea.innerHTML = "";
        
        let count = 1;
        // Create 64 rectangles
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                
                // Create tile.
                let rect = document.createElement("div");
                rect.id = (x + "," + y);
                rect.classList.add('boardspace');
                    
                 // Set position
                let imgx = (x * -75);
                let imgy = (y * -75);
                let backpos = ('' + imgx + 'px ' + imgy + 'px');
                rect.style.left = (x*75) + 'px';
                rect.style.top = (525-(y*75)) + 'px';
                rect.style.backgroundPosition = backpos;
                    
                // Shade the board.
                let color = count % 2;
                if (color == 1) {
                    if (y % 2 == 0) {
                        rect.style.backgroundColor = "gray";
                    }
                }
                if (color == 0) {
                    if (y % 2 == 1) {
                        rect.style.backgroundColor = "gray";
                    }
                }
                    
                rect.onclick = function() { handleClick(x, y); };
                puzzlearea.appendChild(rect);
                count++;
            }
        }
	}

    /** Determines how to handle a click based on the game state.
        @param {number} x the x-position
        @param {number} y the y-position
    */
    function handleClick(x, y) {
        // A piece hasn't been selected- try to select a piece.
        if (selectOnClick == 1) {
            // Only select black pieces.
            if (document.getElementById("pc" + x + "," + y).src.includes("black.png") == true) {
                document.getElementById(x + "," + y).style.border = "3px solid black";
                
                selectedX = x;
                selectedY = y;
                
                selectOnClick = 0;
                moveOnClick = 1;
            }
        }
        
        // A piece has been selected- try to move it where the user clicked.
        else if (moveOnClick == 1) {
            if (isValidBlackMove(selectedX, selectedY, x, y, false) == true) {
                moveBlackPiece(selectedX, selectedY, x, y);

                // Remove selected piece's highlighting
                document.getElementById(selectedX + "," + selectedY).style.border = "";
                
                // Perform computer turn.
                computerTurn();
                
                // Begin looking for another piece to select.
                selectOnClick = 1;
                moveOnClick = 0;
            }
        }
    }

    /** Makes the AI perform a move.*/
    function computerTurn() {
        let hasMoved = false;
        
        // Try to capture black pieces.
        let i = 0;
        for (i = 0; i < 100; i++) {
            let piece = 0;
            
            // Pick a random red piece.
            let picked = false;
            let x = 0;
            let y = 0;
            while (picked == false) {
                x = Math.floor((Math.random() * 8));
                y = Math.floor((Math.random() * 8));
                piece = document.getElementById("pc" + x + "," + y);
                if (piece.src.includes("red.png")) {
                    picked = true;
                }
            }
            
            // Make this piece capture an enemy piece.
            if (hasValidRedMoves(x, y) == 2) {
                executeMove(x, y);
                hasMoved = true;
            }
        }
        
        // If no enemy pieces can be captured, force the computer to move a piece.
        while (hasMoved == false) {
            let piece = 0;
            
            // Pick a random red piece.
            let picked = false;
            let x = 0;
            let y = 0;
            while (picked == false) {
                x = Math.floor((Math.random() * 8));
                y = Math.floor((Math.random() * 8));
                piece = document.getElementById("pc" + x + "," + y);
                if (piece.src.includes("red.png")) {
                    picked = true;
                }
            }
            
            // Try to move piece.
            if (hasValidRedMoves(x, y) == 1) {
                executeMove(x, y);
                hasMoved = true;
            }
        }
    }
    
    /** Returns 0 if a given red piece can't move, 1 if it can, and 2 if it can
        move and capture a black piece at the same time. 
        @param {number} x the x-position
        @param {number} y the y-position
        @return {number} 0/1/2 if the piece can't move/can move/can move and capture a piece
    */
    function hasValidRedMoves(x, y) {
        let valid = 0;
        
        // Check SW
        let toX = x - 1;
        let toY = y - 1;
        if (toX >= 0 && toX <= 7 && toY >= 0) {
            let destSW = document.getElementById("pc" + toX + "," + toY);
            if (destSW.src.includes("clear.png")) {
                valid = 1;
            }
        }
        
        // Check SE
        toX = x + 1;
        toY = y - 1;
        if (toX >= 0 && toX <= 7 && toY >= 0) {
            let destSE = document.getElementById("pc" + toX + "," + toY);
            if (destSE.src.includes("clear.png")) {
                valid = 1;
            }
        }
        
        // Check if SW is capturable.
        toX = x - 2;
        toY = y - 2;
        if (toX >= 0 && toX <= 7 && toY >= 0) {
            let dest = document.getElementById("pc" + toX + "," + toY);
            let between = document.getElementById("pc" + (x-1) + "," + (y-1));
            if (dest.src.includes("clear.png") ==true && between.src.includes("black.png") ==true){
                valid = 2;
            }
        }
        
        // Check if SE is capturable.
        toX = x + 2;
        toY = y - 2;
        if (toX >= 0 && toX <= 7 && toY >= 0) {
            let dest = document.getElementById("pc" + toX + "," + toY);
            let between = document.getElementById("pc" + (x+1) + "," + (y-1));
            if (dest.src.includes("clear.png") ==true && between.src.includes("black.png") ==true){
                valid = 2;
            }
        }
             
        return valid;
    }
    
    /** Determines a move for the AI to do. Prioritizes moves that will capture enemy pieces.
        @param {number} x the x-position
        @param {number} y the y-position
    */
    function executeMove(x, y) {
        let hasMoved = false;
        
        // Try to move SW and capture a black piece.
        let toX = x - 2;
        let toY = y - 2;
        if (toX >= 0 && toX <= 7 && toY >= 0 && hasMoved == false) {
            let dest = document.getElementById("pc" + toX + "," + toY);
            let between = document.getElementById("pc" + (x-1) + "," + (y-1));
            if (dest.src.includes("clear.png") ==true && between.src.includes("black.png") ==true){
                moveRedPiece(x, y, toX, toY);
            }
        }
        
        // Try to move SE and capture a black piece.
        toX = x + 2;
        toY = y - 2;
        if (toX >= 0 && toX <= 7 && toY >= 0 && hasMoved == false) {
            let dest = document.getElementById("pc" + toX + "," + toY);
            let between = document.getElementById("pc" + (+1) + "," + (toY-1));
            if (dest.src.includes("clear.png") ==true && between.src.includes("black.png") ==true){
                moveRedPiece(x, y, toX, toY);
            }
        }
        
        // Try to move SW.
        toX = x - 1;
        toY = y - 1;
        if (toX >= 0 && toX <= 7 && toY >= 0 && hasMoved == false) {
            let destSW = document.getElementById("pc" + toX + "," + toY);
            if (destSW.src.includes("clear.png")) {
                moveRedPiece(x, y, toX, toY);
            }
        }
        
        // Try to move SE
        toX = x + 1;
        toY = y - 1;
        if (toX >= 0 && toX <= 7 && toY >= 0 && hasMoved == false) {
            let destSE = document.getElementById("pc" + toX + "," + toY);
            if (destSE.src.includes("clear.png")) {
                moveRedPiece(x, y, toX, toY);
            }
        }
    }
    
    /** Moves a red piece from one space to another.
        @param {number} fromX the original x-position
        @param {number} fromY the original y-position
        @param {number} toX the x-position to move to
        @param {number} toY the y-position to move to
    */
    function moveRedPiece(fromX, fromY, toX, toY) {
        let color = document.getElementById("pc" + fromX + "," + fromY).src;
        
        // Where our piece will land.
        let dest = document.getElementById("pc" + toX + "," + toY);
        
        // Remove pieces that get hopped over.
        if ((toX - fromX == -2) && (toY - fromY == -2) && dest.src.includes("clear.png")) {
            let between = document.getElementById("pc" + (fromX-1) + "," + (fromY-1));  
            let fromPc = document.getElementById("pc" + fromX + "," + fromY);  
            // Capture a black piece.
            if (between.src.includes("black.png") && fromPc.src.includes("red.png")) {
                between.src = "clear.png";
                addPoint("red");
            } 
        }
        
        if ((toX - fromX == 2) && (toY - fromY == -2) && dest.src.includes("clear.png")) {
            let between = document.getElementById("pc" + (fromX+1) + "," + (fromY-1)); 
            let fromPc = document.getElementById("pc" + fromX + "," + fromY);  
            // Capture a red piece.
            if (between.src.includes("black.png") && fromPc.src.includes("red.png")) {
                between.src = "clear.png";
                addPoint("red");
            } 
        }
        
        // Change place of pieces.
        document.getElementById("pc" + fromX + "," + fromY).src = "clear.png";
        document.getElementById("pc" + toX + "," + toY).src = color;
    } 
    
    /** Moves a black piece to a new coordinate and removes it from the last coordinate. 
        @param {number} fromX the original x-position
        @param {number} fromY the original y-position
        @param {number} toX the x-position to move to
        @param {number} toY the y-position to move to
    */
    function moveBlackPiece(fromX, fromY, toX, toY) {
        let color = document.getElementById("pc" + fromX + "," + fromY).src;
        let dest = document.getElementById("pc" + toX + "," + toY);
        
        // Remove pieces that get hopped over.
        if ((toX - fromX == 2) && (toY - fromY == 2) && dest.src.includes("clear.png")) {
            let between = document.getElementById("pc" + (fromX+1) + "," + (fromY+1));  
            let fromPc = document.getElementById("pc" + fromX + "," + fromY);  
            // Capture a red piece.
            if (between.src.includes("red.png") && fromPc.src.includes("black.png")) {
                between.src = "clear.png";
                addPoint("black");
            } 
        }
        if ((toX - fromX == -2) && (toY - fromY == 2) && dest.src.includes("clear.png")) {
            let between = document.getElementById("pc" + (fromX-1) + "," + (fromY+1)); 
            let fromPc = document.getElementById("pc" + fromX + "," + fromY);  
            // Capture a red piece.
            if (between.src.includes("red.png") && fromPc.src.includes("black.png")) {
                between.src = "clear.png";
                addPoint("black");
            } 
        }
        
        // Change place of pieces.
        document.getElementById("pc" + fromX + "," + fromY).src = "clear.png";
        document.getElementById("pc" + toX + "," + toY).src = color;
        
    }
    
    /** Returns true if the given to->from values are a legal move.
        @param {number} fromX the original x-position
        @param {number} fromY the original y-position
        @param {number} toX the x-position to move to
        @param {number} toY the y-position to move to
        @param {boolean} isKing whether the checkers piece is a 'king' or not
        @returns {boolean} whether the move is legal or not
    */
    function isValidBlackMove(fromX, fromY, toX, toY, isKing) {
        let valid = false;
        let dest = document.getElementById("pc" + toX + "," + toY); 
        
        if (isKing == false) {
            // Empty adjacent forward squares are legal.
            if ((toX - fromX == 1) && (toY - fromY == 1) && dest.src.includes("clear.png")) {
                valid = true;
            }
            if ((toX - fromX == -1) && (toY - fromY == 1) && dest.src.includes("clear.png")) {
                valid = true;
            }
            
            // Jumping over a red piece and capturing it is legal too.
            if ((toX - fromX == 2) && (toY - fromY == 2) && dest.src.includes("clear.png")) {
                let between = document.getElementById("pc" + (fromX+1) + "," + (fromY+1));  
                if (between.src.includes("red.png")) {
                    valid = true;
                }
            }
            if ((toX - fromX == -2) && (toY - fromY == 2) && dest.src.includes("clear.png")) {
                let between = document.getElementById("pc" + (fromX-1) + "," + (fromY+1));   
                if (between.src.includes("red.png")) {
                    valid = true;
                }
            }
            
        }
        
        return valid;
    }
    
    /** Adds a point to the specified player's score.
        @param {string} color the color of the piece
    */
    function addPoint(color) {
        if (color == "red") {
            let lbl = document.getElementById("redscorelbl");
            let scr = parseInt(lbl.innerHTML);
            scr++;
            lbl.innerHTML = scr + "";
        }
        else {
            let lbl = document.getElementById("blackscorelbl");
            let scr = parseInt(lbl.innerHTML);
            scr++;
            lbl.innerHTML = scr + "";
        }
    }

    /** Stores the score and positions of pieces to game.txt. */
    function saveGame() {
        let datastring = "";
        
        // Save format: x,y,color,x,y,color...
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                // Get color.
                let piece = document.getElementById("pc" + x + "," + y);
                let color = 0;
                if (piece.src.includes("black.png")) {
                    color = 1;
                }
                else if (piece.src.includes("red.png")) {
                    color = 2;
                }
                else if (piece.src.includes("clear.png")) {
                    color = 0;
                }
                
                datastring = datastring + x + "," + y + "," + color + ",";
            }
        }
        
        // Get score
        let rscore = parseInt(document.getElementById("redscorelbl").innerHTML);
        let bscore = parseInt(document.getElementById("blackscorelbl").innerHTML);
        datastring = datastring + rscore + "," + bscore;
        
        // Send data to be saved.
        const message = { savedata: datastring };
        const fetchOptions = {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(message)
        };

        // Send save data to the POST service to save it.
        let url = "http://final-project-checkerslvr.herokuapp.com";
        fetch(url, fetchOptions)
            .then(checkStatus)
            .then(function(responseText) {
                console.log(responseText);
                
                // Add a success message.
                document.getElementById("msgreport").innerHTML = "Successfully saved game!";
            })
            .catch(function(error) {
                console.log(error);
                
                // Add a failure message.
                document.getElementById("msgreport").innerHTML = "Failed to save game!";
            });
    }

    /** Loads the score and positions of pieces from game.txt. */
    function loadGame() {
        // Get save data.
        let url = "http://final-project-checkerslvr.herokuapp.com/process.env.PORT?param=load";
        fetch(url)
            .then(checkStatus)
            .then(function(data) {
                // Split messages and names into an array.
                data = data.split(",");
                
                // Clear old board.
                for (let x = 0; x < 8; x++) {
                    for (let y = 0; y < 8; y++) {
                        document.getElementById("pc" + x + "," + y).src = "clear.png";
                    }
                }
                
                // Load pieces.
                let pos = 0;
                for (let x = 0; x < 8; x++) {
                    for (let y = 0; y < 8; y++) {
                        let color = "clear.png";
                        if (data[pos+2] == "2") { color = "red.png"; }
                        if (data[pos+2] == "1") { color = "black.png"; }
                        
                        document.getElementById("pc" + data[pos] + "," + data[pos+1]).src = color;
                        
                        pos = pos + 3;
                    }
                }
                
                // Load score.
                document.getElementById("redscorelbl").innerHTML = data[pos];
                document.getElementById("blackscorelbl").innerHTML = data[pos+1];
            })
            // Display error message.
            .catch(function(error) {
                alert("Error in loadGame: " + error);
            });
    }
    
    /** Returns the response value, or an error if that's not possible.
        @param {string} response the response to send
        @returns {string} an error if one occurred
    */
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {  
            return response.text();
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }
    
})();