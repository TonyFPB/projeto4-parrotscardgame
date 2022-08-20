
const gifs=['bobross','bobross','explody','explody','fiesta','fiesta','metal','metal','revertit','revertit','triplets','triplets','unicorn','unicorn']
let paraJogar=[]
let quantasCartas=0;
let qtd_cartas_viradas=0;
let vitoria=0;
let resetar='';

function comecandoAJogar(){
    //Funcao que pergunta a quantidade de cartas ja embaralhando elas em uma lista
    quantasCartas=0
    paraJogar=[]
    while(quantasCartas < 4 || quantasCartas%2 !== 0 || quantasCartas>14){
        quantasCartas=Number(prompt('quantas cartas?'))
        console.log(quantasCartas)
    }
    for(let i=0;i<quantasCartas;i++){
        paraJogar.push(gifs[i])
    }
    paraJogar.sort(comparador)
    colocandoCartas()
}

function comparador() {
    //Funcao aux 
	return Math.random() - 0.5; 
}


function colocandoCartas(){
    //Funcao que imprime as cartas no DOM
    vitoria=0
    resetar=''

    const listaDeCartas = document.querySelector('ul')

    if(quantasCartas !== 0){
        listaDeCartas.innerHTML=''
        for(let i=0; i<quantasCartas;i++){
            listaDeCartas.innerHTML+=`<li>
            <div class="naoToqueCarta oculta escondida"></div>
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
        
//4cartas, 6cartas, 8cartas, 10cartas, 12cartas, 14cartas

let carta1='';
let cartaDiv1;

let carta2='';
let cartaDiv2;

function virarCarta(C){
    //Funcao para virar as cartas
    qtd_cartas_viradas++  //1
    if(qtd_cartas_viradas === 2){
        C.classList.add('virar')
        carta2 = C.innerHTML
        cartaDiv2=C

        const lista=C.children
        lista[0].classList.add('oculta')
        lista[1].classList.remove('oculta')

        const naoTocar=document.querySelector('.naoToque')
        naoTocar.classList.remove('escondida')
        setTimeout(naoEsconder,1100)

        verificar(carta1,carta2)

        qtd_cartas_viradas=0
        console.log(carta1)
        console.log(carta2)
        console.log(carta1 === carta2)

        carta1='1'
        carta2='2'
    }
    else if(qtd_cartas_viradas !== 2){
    
    C.classList.add('virar')
    carta1 = C.innerHTML
    cartaDiv1=C

    const lista=C.children
    lista[0].classList.add('oculta')
    lista[1].classList.remove('oculta')

    }
}

function verificar(a,b){
    //Funcao que verifica se duas cartas sao iguais se forem elas permanecem viradas
    //se nao elas retornam ao seu estado inicial
    //carta1 carta2
    //cartaDiv1 cartaDiv2
    if(a===b){
        vitoria+=2
        cartaDiv1.classList.add('virar')
        const lista1=cartaDiv1.children
        lista1[0].classList.add('oculta')
        lista1[1].classList.remove('oculta')

        cartaDiv2.classList.add('virar')
        const lista2=cartaDiv2.children
        lista2[0].classList.add('oculta')
        lista2[1].classList.remove('oculta')
        
        const liPai1=cartaDiv1.parentNode
        liPai1.children[0].classList.remove('escondida')

        const liPai2=cartaDiv2.parentNode
        liPai2.children[0].classList.remove('escondida')
    
    }
    else if(a!==b){
        setTimeout(virarCartaDeCostas,1000,cartaDiv1)
        setTimeout(virarCartaDeCostas,1000,cartaDiv2)
    }

    setTimeout(jogar_de_novo,1500)

}
function virarCartaDeCostas(divisao){
    //Funçao para retornar as cartas viradas parar seu estado inicial
    divisao.classList.remove('virar')
    const lista=divisao.children
    lista[0].classList.remove('oculta')
    lista[1].classList.add('oculta')
}

function naoEsconder(){
    //Funcao aux que impede do jogador de clicar em 3 ou mais cartas
    const naoTocar=document.querySelector('.naoToque')
    naoTocar.classList.add('escondida')
}
function jogar_de_novo(){
    if(vitoria === quantasCartas){
        resetar_ou_nao()
    }
    
}
function resetar_ou_nao(){
    //Funcao que reseta ou nao o jogo dependendo da resposta no prompt
    while(resetar !== 'sim'){
        resetar = prompt('Quer jogar de novo? Digite sim ou nao')
        if(resetar ==='não'){
            break
        }
    }
    if (resetar === 'sim'){
        quantasCartas=0
        paraJogar=[]
        comecandoAJogar()
    }
    else if(resetar === 'não'){
        const final =document.querySelector('ul')
        final.innerHTML='<h1>Obrigado por jogar!</h1>'
    }
}
setTimeout(comecandoAJogar,500)