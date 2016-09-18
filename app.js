window.onload = function(){
    var numColumns = 50;
    var lastRowCreated;
    var rules =[[1,1,1],[0,0,0],[1,0,0]];
    var colors = {
    backgrounds: ['404040','585858','191919','2b2b2b','7e8f7c'],
             cells: ['6dbdd6','b71427','ffe658','118c4e','ff9009','df3d82','7d1935','f5f3ee','fff056']
    };

    runIteration();

    function runIteration(){
        generateCss(randColors());
        generateFirstRow();
        setInterval(function(){
                generateRow();
                },500);
    }

    function generateFirstRow(){
        var row = document.createElement('div');
        for (var i=0; i<numColumns; i++){
            var cell = document.createElement('div');
            if (Math.random() >= 0.5){
                cell.className = 'cell active';
            } else {
                cell.className = 'cell';
            }
            row.appendChild(cell);
        }
        lastRowCreated = row;
        document.getElementById('mainWrapper').appendChild(row);
    }

    function generateRow(){
        var row = document.createElement('div');
        for (var i=0; i<numColumns; i++){
            var cell = document.createElement('div');
            var lastCell = state(lastRowCreated.children[i]);
            if (i==0){
                var prevCell = state(lastRowCreated.children[numColumns-1]);
            } else {
                var prevCell = state(lastRowCreated.children[i-1]);
            }
            if (i==numColumns-1){
                var nextCell = state(lastRowCreated.children[0]);
            } else {
                var nextCell = state(lastRowCreated.children[i+1]);
            }
            if (matchesRules(prevCell, lastCell, nextCell)){
                cell.className = 'cell';
            } else {
                cell.className = 'cell active';
            }
            row.appendChild(cell);
        }
        lastRowCreated = row;
        document.getElementById('mainWrapper').appendChild(row);
    }

    function matchesRules(prevCell, lastCell, nextCell){
        for (var i=0; i<rules.length; i++){
            if (prevCell == rules[i][0] && lastCell == rules[i][1] && nextCell == rules[i][2]){
                return true;
            }
        }
        return false;
    }

    function state(cell){
        return cell.classList.contains('active') ? 1 : 0;
    }

    function randColors(){
        var background = colors.backgrounds[getRandInt(colors.backgrounds.length)];
        var color1 = colors.cells[getRandInt(colors.cells.length)];
        var color2;
        do {
            color2 = colors.cells[getRandInt(colors.cells.length)];
        } while(color2 != color1);
        return {'background':background, 'color1':color1, 'color2':color2};
    }

    function getRandInt(max){
        return Math.floor(Math.random()*max);
    }

    function generateCss(colors){
        var cssString = "<style>\
            * {margin: 0;padding: 0;}\
            #mainWrapper {width: 100vw;height: 100vh;background-color:#"+ colors['background'] + ";}\
            #mainWrapper div {height: 2vw;}\
            .cell {width: 2vw;background-color:#"+ colors['color1'] + ";display: inline-block;}\
            .active {background-color:#"+ colors['color2'] +" !important;}\
            </style>";
        document.write(cssString);
    }
}
