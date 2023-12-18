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
        squares[current+position].classList.add('block');
      }
    }

    function remove(current,tetromino) {
      for (let i = 0; i < 4; i++) {
        let position=theTetrominoes[tetromino][orient][i]
        squares[current+position].style.backgroundImage = 'none' ;
        squares[current+position].classList.remove('block');
      }
    }

    function control(e) {
      if (e.keyCode===37)   //ArrowLeft
        moveLeft()
      if (e.keyCode===38)   //ArrowUp
        Rotate()
      if (e.keyCode===39)   //ArrowRight
        moveRight()
      if (e.keyCode===40)   //ArrowDown 
        moveDown()
    }

    document.addEventListener('keydown', control)

    
    let random=Math.floor(Math.random()*theTetrominoes.length)
    let col=3;
    let line=0;
    draw(line*GRID_WIDTH+col,random);
    
    
    function moveDown(){
      remove(line*GRID_WIDTH+col,random);
      line++;
      draw(line*GRID_WIDTH+col,random);
    }

    function moveLeft() {
      remove(line*GRID_WIDTH+col,random);
      col--;
      draw(line*GRID_WIDTH+col,random);
    }
    
    function moveRight() {
      remove(line*GRID_WIDTH+col,random);
      col++;
      draw(line*GRID_WIDTH+col,random);
    }

    function Rotate() {
      remove(line*GRID_WIDTH+col,random);
      orient++;
      orient%=4;
      draw(line*GRID_WIDTH+col,random);
    }


    
    let x=1;
    let Start=document.querySelector('.start');
    Start.addEventListener('click',function () {
      var timerId = setInterval(moveDown, 1000);
      Start.setAttribute('value','Restart');
      x++;
      if (x>2) {
        location.reload();
      }
    });



    //TO DO: 18-12-2023
    //hot fam talga fam
    //contour il grid
    //next tetromino
    //button pause
    
})