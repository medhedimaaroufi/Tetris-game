window.addEventListener('DOMContentLoaded',() => {
    $('.Game').hide();
    $('.close').click(()=>{
      $('.Rules').hide();
      $('.Game').show();
    });
  
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
        for (let i = 0; i < GRID_WIDTH; i++) {
          let child=document.createElement('div');
          child.classList.add('endGrid');
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
    
    function draw(current, tetromino) {
      for (let i = 0; i < 4; i++) {
        let position=theTetrominoes[tetromino][orient][i]
        squares[current+position].style.backgroundImage=colores[tetromino];
        squares[current+position].setAttribute('class','block');
      }
    }

    function remove(current,tetromino) {
      for (let i = 0; i < 4; i++) {
        let position=theTetrominoes[tetromino][orient][i]
        squares[current+position].style.backgroundImage = 'none' ;
        squares[current+position].classList.remove('block');
      }
    }

    let previous=$('.previous-grid div');
    function drawNext(tetromino) {
      for (let i = 0; i < 4; i++) {
        let pos=theTetrominoes[tetromino][0][i]
        pos=Math.floor(pos/GRID_WIDTH)*4+(pos%GRID_WIDTH);
        previous[pos].style.backgroundImage=colores[tetromino];
        previous[pos].setAttribute('class','block');
      }
    }

    function removeNext(tetromino) {
      for (let i = 0; i < 4; i++) {
        let pos=theTetrominoes[tetromino][0][i]
        pos=Math.floor(pos/GRID_WIDTH)*4+(pos%GRID_WIDTH);
        previous[pos].style.backgroundImage = 'none' ;
        previous[pos].classList.remove('block');
      }
    }

    function control(e) {
      if (started && !paused){
        if (e.keyCode===37)   //ArrowLeft
          moveLeft()
        if (e.keyCode===38)   //ArrowUp
          Rotate()
        if (e.keyCode===39)   //ArrowRight
          moveRight()
        if (e.keyCode===32 || e.keyCode===40)   //ArrowDown or space
          moveDown()
        }
    }

    document.addEventListener('keydown', control)
    
    function generate() {
      return Math.floor(Math.random()*theTetrominoes.length)
    }
    
    let random=generate()
    let nextrandom=generate()
    let started=false;
    let paused=false;
    drawNext(nextrandom)
    let current=theTetrominoes[random]
    let col=3;
    let line=0;
    draw(line*GRID_WIDTH+col,random);
    $('.grid').hide();
    $('.previous-grid').hide();
    
    function moveDown(){
      remove(line*GRID_WIDTH+col,random);
      line++;
      draw(line*GRID_WIDTH+col,random);
      //checkRow(); 
      freeze();}
    
    function checkCollision(direction) {
      for (let i = 0; i < 4; i++) {
        const index = theTetrominoes[random][orient][i];
        const nextPosition = line * GRID_WIDTH + col + index;
    
        // Check collision with walls
        const isAtLeftEdge = nextPosition % GRID_WIDTH === 0;
        const isAtRightEdge = (nextPosition + 1) % GRID_WIDTH === 0;
    
        // Check collision with other tet
        const isOccupied = squares[nextPosition].classList.contains('Freezed');
    
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

        }
      }
    
      return false; // No risk
    }

    function moveRight() { 
      remove(line*GRID_WIDTH+col,random);
      if(!(checkCollision('right'))){
        col++ ; }
      draw(line*GRID_WIDTH+col,random);
   }
  
   function moveLeft() { 
    remove(line*GRID_WIDTH+col,random);
    if(!(checkCollision('left'))){
    col-- ;}
    draw(line*GRID_WIDTH+col,random);
   }

   
   function checkCollisionAfterRotation() {
    const nextOrientation = (orient + 1) % 4; // Calculate the next orientation after rotation
  
    for (let i = 0; i < 4; i++) {
      const index = theTetrominoes[random][nextOrientation][i];
      const nextPosition = line * GRID_WIDTH + col + index;
  
      // Check collision with walls
      const isAtLeftEdge = nextPosition % GRID_WIDTH === 0;
      const isAtRightEdge = (nextPosition + 1) % GRID_WIDTH === 0;
  
      // Check collision with other tet
      const isOccupied = squares[nextPosition].classList.contains('Freezed');
  
      if (isAtLeftEdge || isAtRightEdge || isOccupied) {
        return true; // Collision detected
      }
    }
  
    return false; // No risque 
  }
  
   function Rotate(){
    remove(line*GRID_WIDTH+col,random);
    if(!checkCollisionAfterRotation()){
      orient = (orient + 1) % 4;
    }
    draw(line*GRID_WIDTH+col,random);
   }


    //Start & Restart
    const dashboard=$('.dashboard')
    let level=1000;
    let Start=document.querySelector('.start');
    Start.addEventListener('click',repeated);

    function repeated(){
      $('.grid').show();
      $('.previous-grid').show();
      started=true;
      var timerId = setInterval(moveDown, level);
      Start.setAttribute('value','Restart');
      $('.dashboard .buttons').html('<input type="button" value="RESTART" class="restart button"><input type="button" value="PAUSE" class="pause button">')
      
      let x = 0;
      $('.restart').click(function (){
        if (++x >0) {
          location.reload();
        }
      });

      $('.pause').click(function () {
        paused=true;
        $('.grid').hide();
        $('.previous-grid').hide();
        clearInterval(timerId);
        timerId=null;
        $('.pause').val('RESUME');
        $('.pause').removeClass('pause').addClass('resume');
        $('.resume').click(function (){
        paused=false;
        $('.grid').show();
        $('.previous-grid').show();
        $('.resume').val('PAUSE');
        $('.resume').removeClass('resume').addClass('pause');
        repeated();
      });
      });

      
    }

    function filterRow(row) {
      for (let index = 0; index < GRID_WIDTH; index++) {
        squares[row*GRID_WIDTH+index].remove();

        const div= document.createElement('div');
        var existingChild = grid.firstChild;
        grid.insertBefore(div, existingChild);
      }
    }
    


   function checkRow() {
    let l = 0 ;
    
        for (let index = 0; index < 4; index++){
          for (let i = 0; i < GRID_SIZE; i += GRID_WIDTH) {
          const row = Array.from(squares.slice(i, i + GRID_WIDTH));
          if (row.every((square) => square.classList.contains('Freezed'))) {
            // Remove the row and move the above rows down
            row.forEach((square) => {
              square.style.backgroundImage = 'none';
              square.classList.remove('Freezed');
              l++;
            });
            //squares = [...squares.slice(0, i), ...squares.slice(i + GRID_WIDTH)];
            //squares.forEach((square) => grid.insertBefore(square,grid.children[0]));
            const squaresRemoved = squares.splice(i,GRID_WIDTH) ;
            squares=squaresRemoved.concat(squares) ;
            squares.forEach(cell=>grid.appendChild(cell)) ; 
          }
        }
        
      }
      return l/10;
    }

    function freeze(){
      let stop=theTetrominoes[random][orient].some(index => (squares[(line+1)*GRID_WIDTH+col+index].className=='endGrid' || squares[(line+1)*GRID_WIDTH+col+index].className=='Freezed'));
      if (stop){
        theTetrominoes[random][orient].forEach(index => {
          squares[line*GRID_WIDTH+col+index].setAttribute('class','Freezed');
        });
        score(checkRow());
        line=0
        col=4
        orient=0
        random=nextrandom
        removeNext(nextrandom)
        nextrandom=generate()
        drawNext(nextrandom)
      }
    }
    


    let myScore=parseInt($('#score').val(),10);
    let myLines=0
    function score(l) {
      myLines+=l;
      switch (l) {
        case 1:
          myScore+=40;
          break;
        case 2:
          myScore+=100;
          break;
        case 3:
          myScore+=300;
          break;
        case 4:
          myScore+=1200;
          break;
      }
      $('#score').val(myScore);
      $('#lines').val(myLines);
    }



    //TO DO: 20-12-2023
    //Game Over
    //translate
    //rotate

}) 


