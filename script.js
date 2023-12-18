window.addEventListener('DOMContentLoaded',() => {
    const GRID_WIDTH = 10
    const GRID_HEIGHT = 20
    const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT
    const colores=[
        'URL(images/blue_block.jpg)',
        'URL(images/purple_block.png)',
        'URL(images/green_block.png)',
        'URL(images/peach_block.png)',
        'URL(images/yellow_block.png)',
        'URL(images/pink_block.png)',
        'URL(images/navy_block.png)'
    ]

    function createGrid() {
        var grid=document.querySelector('.grid');
        for (let i = 0; i < GRID_SIZE; i++) {
            let child=document.createElement('div');
            grid.appendChild(child);
        }
        var previous=document.querySelector('.previous-grid');
        for (let i = 0; i < 16; i++) {
            let element = document.createElement('div');
            previous.appendChild(element);
        }
        return grid;
    }

    const grid = createGrid();
    let squares = Array.from(grid.querySelectorAll('div'));
  
    const lTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
        [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
      ]
    
    const zTetromino = [
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
        [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
      ]
    
    const tTetromino = [
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
        [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
      ]
    
    const oTetromino = [
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
        [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
      ]
    
    const iTetromino = [
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
        [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
      ]
    
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]



    let orient=0;
    function draw(pos , piece){
          for (let i = 0; i < 4; i++) {
            let position=theTetrominoes[piece][orient][i] ;
            squares[position + pos].style.backgroundImage=colores[piece];
            squares[position + pos ].classList.add('block');
          }
        }
    function remove(pos , piece){
      for (let i = 0; i < 4; i++) {
        let position=theTetrominoes[piece][orient][i]
        squares[position + pos].style.backgroundImage='none';
        squares[position + pos ].classList.remove('block');
      }
    }

    function control(e) {
      if (e.keyCode===37)   //ArrowLeft
        left()
      if (e.keyCode===38)   //ArrowUp
        rotate()
      if (e.keyCode===39)   //ArrowRight
        right()
      if (e.keyCode===40)   //ArrowDown 
        gravity()
    }

    document.addEventListener('keydown', control)

    let random=Math.floor(Math.random()*theTetrominoes.length)
    let line = 0 ;
    let col = 2 ; 
    function gravity() {
      remove(line*GRID_WIDTH+col,random);
      if(!checkCollision('down')){
          line++;}
          draw(line*GRID_WIDTH+col,random) ;

    }
    function right() { 
      remove(line*GRID_WIDTH+col,random);
      if(!checkCollision('right')){ col++ ; }
        draw(line*GRID_WIDTH+col,random);
   }
  
   function left() { 
    remove(line*GRID_WIDTH+col,random);
    if(!checkCollision('left')){
    col-- ;}
    draw(line*GRID_WIDTH+col,random);
   }
   //function that checks if their is any collision after the rotation 
   function checkCollisionAfterRotation() {
    const nextOrientation = (orient + 1) % 4; // Calculate the next orientation after rotation
  
    for (let i = 0; i < 4; i++) {
      const index = theTetrominoes[random][nextOrientation][i];
      const nextPosition = line * GRID_WIDTH + col + index;
  
      // Check collision with walls
      const isAtLeftEdge = nextPosition % GRID_WIDTH === 0;
      const isAtRightEdge = (nextPosition + 1) % GRID_WIDTH === 0;
  
      // Check collision with other tet
      const isOccupied = squares[nextPosition].classList.contains('block');
  
      if (isAtLeftEdge || isAtRightEdge || isOccupied) {
        return true; // Collision detected
      }
    }
  
    return false; // No risque 
  }
  
   function rotate(){
    remove(line*GRID_WIDTH+col,random);
    if(!checkCollisionAfterRotation()){
    orient++;
    orient%4;}
    draw(line*GRID_WIDTH+col,random);
   }
   const displayWidth = 4
   const displaySquares = document.querySelectorAll('.previous-grid div')
   let displayIndex = 0
 
     const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
  ] 

  function displayNextTet(){
    let nextrandom=Math.floor(Math.random()*theTetrominoes.length)
    
        // tnadhaf el tet la9dim
      displaySquares.forEach(function(square) {
      square.classList.remove('block');
      square.style.backgroundImage = 'none';
      });
        // display el tet el jdid 
      smallTetrominoes[nextrandom].forEach(function(index) {
      const displaySquare = displaySquares[displayIndex + index];
      displaySquare.classList.add('block');
      displaySquare.style.backgroundImage = colores[nextrandom];
      });
    }

    //function that checks the collision !
    function checkCollision(direction) {
      for (let i = 0; i < 4; i++) {
        const index = theTetrominoes[random][orient][i];
        const nextPosition = line * GRID_WIDTH + col + index;
    
        // Check collision with walls
        const isAtLeftEdge = nextPosition % GRID_WIDTH === 0;
        const isAtRightEdge = (nextPosition + 1) % GRID_WIDTH === 0;
    
        // Check collision with other tet
        const isOccupied = squares[nextPosition].classList.contains('block');
    
        // Check collision with the bottom
        const isAtBottom = nextPosition >= GRID_SIZE - GRID_WIDTH;
    
        switch (direction) {
          case 'left':
            if (isAtLeftEdge || isOccupied) {
              return true; // Collision with left wall or other tet
            }
            break;
          case 'right':
            if (isAtRightEdge || isOccupied) {
              return true; // Collision with right wall or other tet
            }
            break;
          case 'down':
            if (isAtBottom || isOccupied) {
              return true; // Collision with the bottom or other tet below
            }
            break;
          default:
            break;
        }
      }
    
      return false; // No risque
    }
    
    function freeze() {
      for (let i = 0; i < 4; i++) {
        const index = theTetrominoes[random][orient][i];
        const position = line * GRID_WIDTH + col + index;
        squares[position].style.backgroundImage = colores[random];
        squares[position].classList.add('frozen'); 
      }
      checkRow();
      //spawnNewTetromino();
    }
    
    function unfreeze() {
      for (let i = 0; i < 4; i++) {
        const index = theTetrominoes[random][orient][i];
        const position = line * GRID_WIDTH + col + index;
        squares[position].classList.remove('frozen');
      }
    }
    
    function checkRow() {
      for (let i = 0; i < GRID_SIZE; i += GRID_WIDTH) {
        const row = Array.from(squares.slice(i, i + GRID_WIDTH));
        if (row.every((square) => square.classList.contains('frozen'))) {
          // Remove the row and move the above rows down
          row.forEach((square) => {
            square.style.backgroundImage = 'none';
            square.classList.remove('frozen');
          });
          squares = [...squares.slice(0, i), ...squares.slice(i + GRID_WIDTH)];
          squares.forEach((square) => grid.appendChild(square));
        }
      }
    }


    let isGameRunning = false ;
    let x=1;
    let Start=document.getElementById('startBtn');
    let Pause=document.getElementById('pauseBtn');
    Start.addEventListener('click',function () {
      var timerId = setInterval(gravity, 1000);
      Start.setAttribute('value','Restart');
      x++;
      if (x>2) {
        location.reload();
      }
    Pause.addEventListener('click',function(){
      if(Pause.value === 'Pause'){ 
        Pause.setAttribute('value','Resume') ; 
        freeze() ; }
      else if (Pause.value === 'Resume'){
        Pause.setAttribute('value','Pause') ;
        unfreeze() ;
      }
     

    })
      displayNextTet() ;
    });


    console.log(squares);



      })
