let enterButton = document.getElementById('enter');
let input = document.getElementById('user-input'); 
let ul = document.querySelector('ul');
let item = document.getElementsByTagName('li');
let resetBtn = document.querySelector('.reset');

// fonction qui retourne le nombre de characters
function inputLength(){
    return input.value.length;
}

// fonction qui store les éléments dans le localstorage
function storage(element){
    let index = window.localStorage.length;
    for(let i = 0; i <= index; i++)
    window.localStorage["list-"+i] = element.innerHTML;
}

// fonction qui récupère les éléments du local storage
function getValues(){
    if(localStorage){
        // let storageContent = window.localStorage.list;
        for(i = 0; i < localStorage.length; i++) {
            let x = sessionStorage["list"+i];
            ul.innerHTML = "<li>"+x+"</li>";
      }
    }
}
getValues()

function createListElement(){
    let li = document.createElement('li');
    // ajoute un texte au li
    li.appendChild(document.createTextNode(input.value));
    // ajoute le li à l'ul
    ul.appendChild(li);
    // on lance l'exécution du storage
    storage(li);
    // on vide la valeur de l'input une fois que le li est ajouté (pour avoir la barre de saisie vide)
    input.value = "";
     
    function endTask(){
        // le toggle permet de faire l'effet on/off
        li.classList.toggle("done");
    }

    // on met une écoute sur le click du li, qui exécutera la fonction endTask
    li.addEventListener("click", endTask);
    let ulNumberOfChildren = ul.childElementCount;
    if(ulNumberOfChildren > 1 && ulNumberOfChildren < 3){
        resetBtn.style.display = "inline";
        resetBtn.addEventListener('click', (e) => {
            if(confirm("Voulez-vous vraiment effacer toutes vos tâches en cours ?")){
                window.localStorage.clear();
                ul.innerHTML ="";
                resetBtn.style.display = "none";
            }
        })
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        li.remove();
        // fonction à coder pour retirer l'élément du local storage
        // localStorage.removeItem("list");
    });
}

function addListAfterClick(){
    // s'il y a une saisie dans le input
    if(inputLength() > 0 ){
        // alors je peux créer un élément de liste
        createListElement();
    }
    else{
        alert("Vous ne pouvez ajouter une tâche vide");
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