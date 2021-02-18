
/******* Guarda el valor del input ********/

let palabraOculta;
let letraOculta;
let pos;
let letrasEncontradas = [];
let letra = [];
let imgs = [];
let contador = 0;
let acumulador = 0;
const seccionPalabra = document.getElementById("seccionPalabra");
const boton = document.getElementById("btnOcultar");
const input = document.getElementById("palabra");
const teclado = document.getElementById("seccionTeclado");
const ABC = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N', 'Ñ','O','P','Q','R','S','T','U','V','W','X','Y', 'Z']


/**** Obteniendo imagenes *****/
for( i = 1; i <= 9 ; i++ ) {
    let img = document.getElementById('img' + [i]);
    imgs.push(img);
}


/*** Teclado ****/

for ( i = 0; i < ABC.length; i ++) {

    const div = document.createElement("div");
    div.className = 'btn btn--small fuente fuente--titulo-secundario btn--teclado';
    div.id =  'div' + i ;

    const texto = document.createElement("strong");
    texto.textContent = ABC[i];
    texto.className = 'letraTeclado';

    div.appendChild(texto);
    teclado.appendChild(div);

}

boton.addEventListener("click", ocultarPalabra);

teclado.addEventListener('click', e => {

    let letraPresionada = e.target.textContent;
    let letraEncontrada = palabraOculta.indexOf(letraPresionada);
    let posicion;

    if ( letraEncontrada !== -1) {

        while ( letraEncontrada !== -1) {
            letrasEncontradas.push(letraEncontrada);
            letraEncontrada = palabraOculta.indexOf(letraPresionada, letraEncontrada + 1);
        }

        for( i = 0 ; i < letrasEncontradas.length ; i ++) {
            posicion = letrasEncontradas[i];
            letra[[posicion]].className = 'letra-descubierta';
            
         } 

    } else { 
        imgs[contador].setAttribute('src', 'img/partes/img'+contador+'.png');
        contador++;
    }

    for( i = 0; i < palabraOculta.length ; i++) {
        if (letra[i].className  == 'letra-descubierta') {
            acumulador++
        } else {
            acumulador = 0;
            i = palabraOculta.length;
        }
            console.log(acumulador);
    }

    if(acumulador == palabraOculta.length){
        ganar();
    }
    
    if( contador == 9){
        perder()
    }
    
})

function ocultarPalabra(){

    palabraOculta = input.value.toUpperCase().replace(/\s+/g, '');
    
    for ( i = 0 ; i < palabraOculta.length ; i ++ ) { 
        let elemento;
        let o = 'letra' + [i];
        const div = document.createElement("div");
        div.className = 'contenedor-let-oculta';

        letraOculta = document.createElement("strong");
        letraOculta.textContent = palabraOculta[i];
        letraOculta.className = 'letra-oculta';
        letraOculta.id = 'letra' + [i];

        
        div.appendChild(letraOculta);
        seccionPalabra.appendChild(div);

        elemento = document.getElementById(o);
        letra.push(elemento);
   }

   input.value = '';
   input.disabled = true;
   boton.removeEventListener("click", ocultarPalabra);
  
}

function ganar(){
    alert('Felicidades haz adivinado la palabra oculta : ' +palabraOculta+', presiona aceptar para jugar de nuevo  =D.') ;
    setInterval("actualizar()",1000);
}


function perder(){
    alert('AHORCADO, haz agotado tus oportunidades de salvar a nuestro amigo D=, presiona aceptar para intentarlo de nuevo.')
    setInterval("actualizar()",1000);
}

function actualizar(){
    location.reload();
}

function pulsar(e) {
    tecla = (document) ? e.keyCode :e.which;
    return (tecla!=13);
  }