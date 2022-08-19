
const gifs=['bobross','bobross','explody','explody','fiesta','fiesta','metal','metal','revertit','revertit','triplets','triplets','unicorn','unicorn']
let paraJogar=[]
let quantasCartas=0;
let qtd_cartas_viradas=0;
function comecandoAJogar(){
    quantasCartas=0
    paraJogar=[]
    while(quantasCartas < 4 || quantasCartas%2 !== 0 || quantasCartas>14){
        quantasCartas=prompt('quantas cartas?')
        console.log(quantasCartas)
    }
    for(let i=0;i<quantasCartas;i++){
        paraJogar.push(gifs[i])
    }
    paraJogar.sort(comparador)
    colocandoCartas()
}



function colocandoCartas(){
    console.log(paraJogar)
    const listaDeCartas = document.querySelector('ul')
    listaDeCartas.innerHTML
    if(quantasCartas !== 0){
        listaDeCartas.innerHTML=''
        for(let i=0; i<quantasCartas;i++){
            listaDeCartas.innerHTML+=`<li>
            <div class="carta" onclick="virarCarta(this)">
                <div class="frente face">
                    <img src="img-game/front.png"/>
                </div>
                <div class="costas face oculta">
                    <img src="img-game/${paraJogar[i]}parrot.gif" />
                </div>
            </div>
        </li>`
        
        }
    }
}
        
/*4cartas, 6cartas, 8cartas, 10cartas, 12cartas, 14cartas*/


function embaralharCartas(){

}

console.log(cartasDeCosta.sort(comparador)); // Após esta linha, a minhaArray estará embaralhada


// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

function virarCarta(C){
    if(qtd_cartas_viradas === 2){
        const naoTocar=document.querySelector('.naoToque')
        naoTocar.classList.remove('escondida')
        qtd_cartas_viradas=0
        setTimeout(naoEsconder,6000)
    }
    C.classList.add('virar')
    const lista=C.children
    lista[0].classList.add('oculta')
    lista[1].classList.remove('oculta')
    setTimeout(virarCartaDeCostas,5000)
    qtd_cartas_viradas++
}


function virarCartaDeCostas(){
    const carta=document.querySelector('.virar')
    carta.classList.remove('virar')
    const lista=carta.children
    lista[0].classList.remove('oculta')
    lista[1].classList.add('oculta')
}

function naoEsconder(){
    const naoTocar=document.querySelector('.naoToque')
    naoTocar.classList.add('escondida')
}

