let enterButton = document.getElementById('enter');
let input = document.getElementById('user-input'); 
let ul = document.querySelector('ul');
let item = document.getElementsByTagName('li');
let resetBtn = document.querySelector('.reset');

// fonction qui retourne le nombre de characters
function inputLength(){
    return input.value.length;
}
let index;
if(localStorage.length != 0){
    index = localStorage.length;
}
else{
    index = 0;
}
// fonction qui store les éléments dans le localstorage
function storage(element){
    // actuellement à chaque tour de boucle je réécrit la valeur correspondant à la clé i par celle de element
    window.localStorage.setItem("list-"+index,element.innerHTML );
    index++;
}

// fonction qui récupère les éléments du local storage
function getValues(){
    if(localStorage.length != 0){
        let index = window.localStorage.length;
        let li = 0;
        // boucle qui récupère la valeur de la clé list de i et l'entoure de balises HTML
        for(let i = 0; i < index; i++) {
            let x = localStorage.getItem("list-"+i);
            let storageLi = "<li>"+x+"</li>";
            // console.log(storageLi)
            // deleteElement(x);
            ul.innerHTML += storageLi;
            // deleteElement(y);
        }
        let ulElements = ul.childNodes;
        for(let i = 1; i < ulElements.length; i++){
            // console.log(ulElements[i])
            deleteElement(ulElements[i]);
            ulElements[i].addEventListener("click", endTask);
            function endTask(){
                // le toggle permet de faire l'effet on/off
                ulElements[i].classList.toggle("done");
            }
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
    deleteElement(li)
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
        resetBtn.style.visibility = "visible";
        resetBtn.addEventListener('click', (e) => {
            if(confirm("Voulez-vous vraiment effacer toutes vos tâches en cours ?")){
                window.localStorage.clear();
                index = 0;
                ul.innerHTML ="";
                resetBtn.style.visibility = "hidden";
            }
        })
    }
}

function deleteElement(element){
    let deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("X"));
    element.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        element.remove();
        // console.log(element)
        localStorage.removeItem(element);
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