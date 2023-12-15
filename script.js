window.addEventListener('load',function createGrid() {
    var grid=document.querySelector('.grid');
    for (let i = 0; i <200; i++) {
        let child=document.createElement('div');
        grid.appendChild(child);
    }
})

