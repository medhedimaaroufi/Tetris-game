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
        if (e.keyCode===40)   //ArrowDown 
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
      freeze();
    }

    function moveLeft() {
      
      let sumleft=0;
      for(let i=0;i<4;i++){
        let index=theTetrominoes[random][orient][i];
        sumleft+=((line*GRID_WIDTH+col+index)%GRID_WIDTH>0);
      }
      let stopLeft=(sumleft==4);
      if (stopLeft){
        remove(line*GRID_WIDTH+col,random);
        col--;
        draw(line*GRID_WIDTH+col,random);
      }
    }

    function moveRight() {
      let sumright=0;
      for(let i=0;i<4;i++){
        let index=theTetrominoes[random][orient][i];
        sumright+=((line*GRID_WIDTH+col+index)%GRID_WIDTH<9);
      }
      let stopRight=(sumright==4);
      if (stopRight){
        remove(line*GRID_WIDTH+col,random);
        col++;
        draw(line*GRID_WIDTH+col,random);
      }
    }

    function Rotate() {
      remove(line*GRID_WIDTH+col,random);
      orient++;
      orient%=4;
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

    function freeze(){
      let stop=theTetrominoes[random][orient].some(index => (squares[(line+1)*GRID_WIDTH+col+index].className=='endGrid' || squares[(line+1)*GRID_WIDTH+col+index].className=='Freezed'));
      if (stop){
        theTetrominoes[random][orient].forEach(index => {
          squares[line*GRID_WIDTH+col+index].setAttribute('class','Freezed');
          console.log(squares[line*GRID_WIDTH+col+index]);
        });
        line=0
        col=4
        orient=0
        random=nextrandom
        removeNext(nextrandom)
        nextrandom=generate()
        drawNext(nextrandom)
      }
    }
    
    console.log(previous)
    


    //TO DO: 19-12-2023
    //Game Over
    //check Row
})
