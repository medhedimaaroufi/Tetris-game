window.addEventListener('DOMContentLoaded',() => {
  $('.notification').hide();
  $('#letsPlay').hide();
  $('.navbar').hide();
  $('.nav').hide();
  $('.nav').hover(
    () => {
      $('.navbar').show();
      $('.navbar-list').show();
    },
    () => {
      $('.navbar').hide();
      $('.navbar-list').hide();
    }
  );
  $('.navbar').hover(
    () => {
      $('.navbar').show();
      $('.navbar-list').show();
      $('.nav').hide();
    },
    () => {
      $('.navbar').hide();
      $('.navbar-list').hide();
      $('.nav').show();
    }
  );
  $('.history').hide() ;
  $('.Rules').hide();
  $('.copyright').hide();
  cookies();
  $('.Game').hide();
  $('.close').click(()=>{
    $('.Rules').hide();
    $('.Game').show();
    document.getElementById('opening').play() ;
    paused=false;
  });

  function RuleShw() {
    document.getElementById('click').play() ;
    $('.Game').hide(); 
    $('.Rules').show();
    $('#letsPlay').hide();
    $('.history').hide();
    $('.copyright').hide();
    $('.doNotShow').hide();
    $('#doNotShow').hide();
    paused=true;
  }
  $('#rls').click(RuleShw);

  function History() {
    document.getElementById('click').play() ;
    $('.Game').hide() ; 
    $('#letsPlay').hide();
    $('.history').show();  
    $('.Rules').hide() ; 
    $('.copyright').hide();
    paused=true;
  }
  $('#his').click(History)


  function copyright(){
    document.getElementById('click').play() ;
    paused=true;
    $('.Game').hide(); 
    $('.history').hide();
    $('.Rules').hide();
    $('.copyright').show();
    $('.about-us').hide();
    $('#letsPlay').show();
    setTimeout(function() {
      $('.about-us').show();
    }, 2000);
    
  }
  $('#copyright').click(copyright);

  function backGame(){
    $('.copyright').hide();
    $('.Game').show();
    document.getElementById('opening').play() ;
    $('#letsPlay').hide();
    document.getElementById('click').play() ;
    paused=false;
  }
  
  $('#backGame').click(backGame);
  
  $('.back').click(()=>{
    $('.history').hide();
    $('.Game').show();
    document.getElementById('opening').play() ;
    document.getElementById('click').play() ;
    paused=false;
  })

  function cookies() {
    
    let ind=0;
    let o=true;
    while (ind<localStorage.length && localStorage.key(ind)!='-2') {
      if (ind==localStorage.length-1) o=false;
      ind++;
    }
    if (o) {
      $('.cookies').hide();
      $('.Rules').show();
      $('.nav').show();
      
    }
    $('.cookiesbtn').on('click',() => {
      document.getElementById('click').play() ;
      localStorage.setItem('-2','');
      $('.cookies').hide();
      $('.Rules').show();
      $('.nav').show();
    });
  }
  
  function doNotShow() {
    document.getElementById('click').play() ;
    $('#doNotShow').change(() => { document.getElementById('click').play() ; 
      localStorage.setItem('-1','');
    });
    let ind=0;
    let o=true;
    while (ind<localStorage.length && localStorage.key(ind)!='-1') {
      if (ind==localStorage.length-1) o=false;
      ind++;
    }
    if (o) {
      $('.Rules').hide();
      $('.Game').show();
      document.getElementById('opening').play() ;
    }
  }
  



  doNotShow();
  const GRID_WIDTH = 10
  const GRID_HEIGHT = 20
  const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT
  const colores=[
      'URL(images/yellow_block.png)',
      'URL(images/peach_block.png)',
      'URL(images/green_block.png)',
      'URL(images/blue_block.jpg)',
      'URL(images/navy_block.png)',
      'URL(images/purple_block.png)',
      'URL(images/pink_block.png)'
    ]
  
  
  function createLoad() {
    var loadLevel=document.querySelector('.load-level');
    for (let i = 0; i < 17; i++) {
      let child=document.createElement('div');
      child.classList.add('n'+String(i));
      loadLevel.appendChild(child);
    }
    for (let i = 20; i >= 0; i--) {
      $('.n'+String(i)).hide();
    }
    return loadLevel;
  }

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
  
  function createHighScore() {
    for (let index = 0; index < 5; index++) {
      localStorage.setItem(index,'name');
    }
    let sortedIndex=[];
    let max=localStorage.key(0);
    let n=5*(localStorage.length>=5)+localStorage.length*(localStorage.length<5);
    for (let j = 0 ; j< n; j++){
      for (let i = 1; i < localStorage.length; i++) {
        let INsortedIndex=sortedIndex.some(index => index == localStorage.key(i));
        if (!INsortedIndex && parseInt(localStorage.key(i))>max)
          max = localStorage.key(i);
      }
      sortedIndex[sortedIndex.length]=max;
      max=localStorage.key(0);
    }
    var ch='';
    for (let i = 0; i < 5; i++) {
      if (sortedIndex[i]>10) ch+='<tr><td class="hisName">' + (localStorage[sortedIndex[i]] +'</td><td class="hisScore">'+ sortedIndex[i]) + '</td></tr>';
    }
    $('.listScore').html(ch);
    return sortedIndex;
  }


  let loadLevel=createLoad();
  const grid = createGrid();
  const sortedIndex=createHighScore();
  let squares = Array.from(grid.querySelectorAll('div'));
  let level=1000;
  let timerId=setInterval(null,level);
  let possibleToChange=0;
  let myLines=0;

  const iTetromino = [
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    ]
    
  const oTetromino = [
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
      [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
    ]
  
  const tTetromino = [
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
    ]
  
  const lTetromino = [
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
      [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
      [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
      [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
    ]
  
  const jTetromino = [
      [1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2, 2],
      [GRID_WIDTH+2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2, GRID_WIDTH * 2],
      [1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2, GRID_WIDTH +1],
      [GRID_WIDTH*2, GRID_WIDTH + 1, GRID_WIDTH+ 2, GRID_WIDTH ],
    ]

  const zTetromino = [
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
      [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
      [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    ]
  
  const sTetromino = [
      [GRID_WIDTH + 1, GRID_WIDTH, GRID_WIDTH * 2+2, GRID_WIDTH * 2 + 1],
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 ],
      [GRID_WIDTH + 1, GRID_WIDTH, GRID_WIDTH * 2+2, GRID_WIDTH * 2 + 1],
      [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 ]
    ]
  
    
  const theTetrominoes = [iTetromino, oTetromino, tTetromino, lTetromino, jTetromino, zTetromino, sTetromino]
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
      if (myLines>15 && e.keyCode===88 && possibleToChange < 5 ) //press X
        changeNextTet();
  }

  document.addEventListener('keydown', control)
  
  function generate() {
    return Math.floor(Math.random()*theTetrominoes.length)
  }
  
  let random=generate()
  let nextrandom=generate()
  let started=false;
  let paused=false;
  let ovr=false;
  drawNext(nextrandom)
  let current=theTetrominoes[random]
  let col=3;
  let line=0;
  draw(line*GRID_WIDTH+col,random);
  $('.grid').hide();
  $('.previous-grid').hide();
  $('.load-level').hide();
  $('.gameOver').hide();
  $('.av').hide();
  $('#myName').hide();
  const myName=document.getElementById('myName').value
  
  function moveDown(){
    if (!paused)
      if (!ovr){
        remove(line*GRID_WIDTH+col,random);
        line++;
        draw(line*GRID_WIDTH+col,random);
        freeze();
        
        ovr=gameOver();
        if(ovr){
          const myName=document.getElementById('myName').value;
          localStorage.setItem(myName,String(myScore));
        }

      }
  }
  
 

  function moveRight() { 
    remove(line*GRID_WIDTH+col,random);
    const isAtRightEdge = theTetrominoes[random][orient].some(index => (line*GRID_WIDTH+ col + index) % GRID_WIDTH === GRID_WIDTH - 1)
    if (!isAtRightEdge) 
      if (col==9){
        line++;
        col=0;
      }
      else col++;
    if (theTetrominoes[random][orient].some(index => squares[line*GRID_WIDTH+ col + index].classList.contains('Freezed'))) {
      if (col==0){
        line--;
        col=9;
      }
      else col--;
    }
    draw(line*GRID_WIDTH+col,random);
 }

 function moveLeft() { 
  remove(line*GRID_WIDTH+col,random);
  const isAtLeftEdge = theTetrominoes[random][orient].some(index => (line * GRID_WIDTH + col + index) % GRID_WIDTH === 0)
  if (!isAtLeftEdge) 
    if (col==0){
      line--;
      col=9;
    }
    else col--;
  if (theTetrominoes[random][orient].some(index => squares[line * GRID_WIDTH + col + index].classList.contains('Freezed'))) {
    if (col==9){
      line++;
      col=0;
    }
    else col++;
  }
  draw(line*GRID_WIDTH+col,random);

 }

 
 function checkCollisionAfterRotation() {
  const nextOrientation = (orient + 1) % 4; // Calculate the next orientation after rotation

  for (let i = 0; i < 4; i++) {
    const index = theTetrominoes[random][nextOrientation][i];
    const nextPosition = line * GRID_WIDTH + col + index;

    // Check collision with walls
    const isAtLeftEdge = (nextPosition )% GRID_WIDTH === 9 && col < 4;
    const isAtRightEdge = (nextPosition ) % GRID_WIDTH === 0 && col > 6;
    console.log(isAtLeftEdge,isAtRightEdge);
    // Check collision with other tet
    const isOccupied = squares[nextPosition].classList.contains('Freezed');
    if (isAtLeftEdge || isAtRightEdge){
      $('.notification').show();
      setTimeout(() => {
        $('.notification').hide();
      },1500);
    }
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

  function store() {
    if (document.getElementById('myName').value != '' && myScore > sortedIndex[sortedIndex.length-1]){
      if (!(sortedIndex.some(index => index == myScore)))
        localStorage.removeItem(sortedIndex[sortedIndex.length-1]);
      localStorage.setItem(String(myScore),document.getElementById('myName').value);
    }
  }
  
  document.addEventListener('keydown', function (e) {
    if (e.keyCode==13) //enter
      {
        store();
        $('#myName').hide();
      }
  });

  //Start & Restart
  const dashboard=$('.dashboard')
  let Start=document.querySelector('.start');
  Start.addEventListener('click',repeated);



  function repeated(){
    document.getElementById('click').play();
    
    switchLevel();

    $('.welcome').hide();    
    $('.grid').show();
    $('.previous-grid').show();
    $('.load-level').show();
    $('.av').show();
    document.querySelector('.Game').setAttribute('style','');
    started=true;
    timerId = setInterval(moveDown, level);

    
    Start.setAttribute('value','Restart');
    $('.dashboard .buttons').html('<input type="button" value="RESTART" class="restart button"><input type="button" value="PAUSE" class="pause button">')
    
    let x = 0;
    $('.restart').click(function (){
      if (++x >0) {
        document.getElementById('opening').play() ;
        document.getElementById('click').play() ;
        store();
        location.reload();
      }
    });

    $('.pause').click(function () {
      document.getElementById('click').play() ;
      paused=true;
      $('.grid').hide();
      $('.previous-grid').hide();
      $('.welcome').show();
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


function gameOver() {
  let i=GRID_WIDTH+3;
  let over=true;
  while (i<16 && !squares[i].classList.contains('Freezed')) {
    if (i==15) over=false;
    i++;
  }

  if(over){
    $('.grid').hide();
    $('.previous-grid').hide();
    $('.pause').hide();
    $('.gameOver').show();
    document.getElementById('endgame').play() ;
    if (sortedIndex[sortedIndex.length-1]< myScore && !sortedIndex.some(scr => scr == myScore)) $('#myName').show();
    $('.restart').val('Retry');
    document.querySelector('.restart').classList.add('gameOverbtn');
    return true;
  }
  return false;
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
            document.getElementById('vaniche').play() ;
            l++;
          });
          const squaresRemoved = squares.splice(i,GRID_WIDTH) ;
          squares=squaresRemoved.concat(squares) ;
          squares.forEach(cell=>grid.appendChild(cell)) ; 
        }
      }
      
    }
    return l/10;
  }

  let myScore=parseInt($('#score').val(),10);


  function checkLevel() {
    if(myLines%16==1) {
      $('.n16').show()
    }
    if(myLines%16==2){
      $('.n16').hide();
      $('.n0').show();
      $('.n15').show();
    }
    if(myLines%16>2){
      $('.n0').show();
      $('.n15').show();
      $('.n16').hide();
      for (let index = 1; index < myLines%16-1; index++) {
        $('.n'+String(index)).show()
      }
    }
    if(myLines%16==0){
      for (let index = 16; index >= 0; index--) {
        $('.n'+String(index)).hide();
      }
    }
  }

  function score(l) {
    myLines+=l;
    checkLevel();
    checkRow();
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

  

  function freeze(){
    let stop=theTetrominoes[random][orient].some(index => (squares[(line+1)*GRID_WIDTH+col+index].className=='endGrid' || squares[(line+1)*GRID_WIDTH+col+index].className=='Freezed'));
    if (stop){
      theTetrominoes[random][orient].forEach(index => {
        squares[line*GRID_WIDTH+col+index].setAttribute('class','Freezed');
      });
      score(checkRow());
      line=0;
      col=4;
      orient=0;
      random=nextrandom;
      let level1=level;
      switchLevel()
 
      if (level!=level1) {
        document.getElementById('levelUp').play();
        possibleToChange=0;
        clearInterval(timerId);
        timerId=null;
        timerId=setInterval(moveDown,level);
      }
      removeNext(nextrandom);
      nextrandom=generate();
      drawNext(nextrandom);
    }
  }

  function switchLevel() {
    if (myLines<=15){
      $('.load-level-text').html('Level 1');}
    else if (myLines>15 && myLines<= 30){
        level=850;
        $('.load-level-text').html('Level 2');
      }
      else if(myLines>30 && myLines<= 45)
        {level=600;
        $('.load-level-text').html('Level 3');
        }
        else if(myLines>45 && myLines<=60 )
          {level=500;
            $('.load-level-text').html('Level 4');
          }
          else if(myLines>60 && myLines<=75 )
            {level=400;
              $('.load-level-text').html('Level 5');
            }
            else if(myLines>75 && myLines<=90 )
              {level=300;
                $('.load-level-text').html('Level 6');
              }
              else if(myLines>90 && myLines<=105 )
                {level=200;
                  $('.load-level-text').html('Level 7');
                }
                else if (myLines>105) $('.load-level-text').html('Level +999');
    }

  function changeNextTet() {
    possibleToChange++;
    removeNext(nextrandom);
    nextrandom=generate();
    drawNext(nextrandom);
  }
  
}) 