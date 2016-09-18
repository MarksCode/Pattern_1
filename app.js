var numColumns = 50;
var lastRowCreated;
var rules =[[1,1,1],[0,0,0],[1,0,0]];

window.onload = function(){
    generateFirstRow();
    setInterval(function(){
        generateRow();
    },500);
}

function generateFirstRow(){
    var row = document.createElement('div');
    row.className = 'row';
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
