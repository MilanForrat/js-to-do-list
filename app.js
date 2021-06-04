let enterButton = document.getElementById('enter');
let input = document.getElementById('user-input'); 
let ul = document.querySelector('ul');
let item = document.getElementsByTagName('li');

// fonction qui retourne le nombre de characters
function inputLength(){
    return input.value.length;
}

function createListElement(){

    let li = document.createElement('li');
    // ajoute un texte au li
    li.appendChild(document.createTextNode(input.value));
    // ajoute le li à l'ul
    ul.appendChild(li);
    // on vide la valeur de l'input une fois que le li est ajouté (pour avoir la barre de saisie vide)
    input.value = "";


    function endTask(){
        // le toggle permet de faire l'effet on/off
        li.classList.toggle("done");
    }

    // on met une écoute sur le click du li, qui exécutera la fonction endTask
    li.addEventListener("click", endTask);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteListItem);

    //fonction qui efface un li
    function deleteListItem(){
        // je lance un display none en css
        li.classList.add('delete');
    }
}

function addListAfterClick(){
    // s'il y a une saisie dans le input
    if(inputLength() > 0 ){
        // alors je peux créer un élément de liste
        createListElement();
    }
}

function addListAfterKeyPress(e){
    //si la touche 13 est pressée
    if(inputLength() > 0 && e.which === 13){
        createListElement();
    }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeyPress);