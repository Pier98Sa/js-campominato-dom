/*Funzioni*/
//funzione per la creazione di elementi nel DOM
const createGridElement = (classe) => {
    const node = document.createElement('div');
    node.classList.add('square');
    node.classList.add(classe);
    return node;
}

//funzione per la creazione di un numero randomico
function numRandom (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funzione per l'avvio del programma
function play(){
    const tentativi = [];
    console.log(tentativi);
    const NUM_BOMBS = 16;
    //reset della griglia ad ogni click
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = "";

    let esito = document.getElementById('Risultato');
    esito.innerHTML = "";

    //inizializzazione della costante per intercettare il livello di difficoltà
    const level = document.getElementById("level").value;

    let numBox;
    let size ;

    //ciclo if else if per determinare il numero di box
    if(level == "Easy"){
        numBox = 100;
        size = "easy";
    }else if (level == "Hard"){
        numBox = 81;
        size = "hard";
    }else if (level == "Crazy"){
        numBox = 49;
        size = "crazy";
    }

    
    generaCampoMinato(numBox,size);
    const bombs = createBombs (NUM_BOMBS, numBox);
    console.log(bombs);
    /*Funzioni della funzione play*/

    //funzione per generare le box che compongono il campo minato
    function generaCampoMinato(numBox,size){

        //creazione dei quadrati nell'HTML
        for (let i = 1; i<=numBox; i++) {
            //richiamo della funzione per scrivere all'interno del HTML
            const node = createGridElement(size);
    
            //aggiunta del numero all'interno del box
            node.innerText += i;
    
            //aggiunta dell'ascoltatore di eventi sui box
            node.addEventListener('click',handleCellClick);
    
            gridElement.appendChild(node);
        }
    
        return true;
    }

    //funzione per aggiungere la classe clicked e rimuovere l'ascoltatore di eventi dal box dove applicata
    //funziona che intercetta la presenza di una bomba all'interno del box
    function handleCellClick(){
        this.classList.add('clicked');
        this.removeEventListener('click',handleCellClick);
    
        const cell = parseInt(this.innerText);
    
        if(bombs.includes(cell)){
            
            gameOver();
            esito.innerHTML = 'Peccato, hai perso :-( Hai azzeccato ' + tentativi.length + '  tentativi. Gioca ancora...' ;
            
            //elimino gli eventListner 
            let squares =  document.querySelectorAll('.square');

            for (let i = 1; i<=numBox; i++) {
               let square = squares[i - 1];  
               square.removeEventListener('click',handleCellClick);
                
            }

        }else{  
            tentativi.push(cell);

            if(tentativi.length == numBox - NUM_BOMBS ){
                esito.innerHTML = 'COMPLIMENTI HAI VINTO !!!!';
                
                //elimino gli eventListner 
                let squares =  document.querySelectorAll('.square');

                for (let i = 1; i<=numBox; i++) {
                let square = squares[i - 1];  
                square.removeEventListener('click',handleCellClick);
                    
                }
            }
        }
    
    }

    //funzione per sapere se siamo capitati su una bomba
    function gameOver(){
        const quadrati = document.getElementsByClassName('square');

        for(let i = 0; i < quadrati.length; i++){
            if (bombs.includes(parseInt(quadrati[i].innerText))){
                quadrati[i].classList.add('bomb');
            }
            //rimuovere ascoltatori di eventi
        }
    }
    
    //funzione per la creazione e l'inserimento delle bombe
    function createBombs (numeroBombe, numeroCelle){

        const bombsCreate = [];
    
        while(bombsCreate.length < numeroBombe){
            
            const bombs = numRandom(1,numeroCelle);
    
            if(!bombsCreate.includes(bombs)){
                bombsCreate.push(bombs);
            }
        }
        return bombsCreate;
    }

   
}


/*variabili del programma*/
let buttonPlay = document.getElementById("play");

//avviamento del programma al click sul button Play
buttonPlay.addEventListener('click', play);