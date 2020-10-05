function addX(){
    for(var i = 0; i < ul.children.length; i++){
        let span = document.createElement('span');
        span.style.float = "right";
        span.onclick = function (){
            this.parentNode.remove();
        }
        let node = document.createTextNode('x');
        span.appendChild(node);
        if(list[i].childNodes.length == 1){
            list[i].appendChild(span);
        }
    }
}
function addList(){
    let addBtn = document.getElementById('addBtn');
    addBtn.onclick = function (){
        let inputValue = document.getElementById('myInput').value;
        let inputText = document.createTextNode(inputValue.toString());
        let newList = document.createElement('li');
        newList.appendChild(inputText);
        ul.appendChild(newList);
        addX();
    }
}
function dashedText(){
    for(var i = 0; i < list.length; i++){
        list[i].addEventListener('click', function(){
            this.classList.toggle('checked');
        })
    }
}
let ul = document.getElementById('myUL');
let list = document.getElementsByTagName('li');
addX();
addList();
dashedText();

