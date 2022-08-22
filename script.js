
const gifs=['bobross','bobross','explody','explody','fiesta','fiesta','metal','metal','revertit','revertit','triplets','triplets','unicorn','unicorn']
let paraJogar=[]
let quantasCartas=0;
let qtd_cartas_viradas=0;
let vitoria=0;
let resetar='';
let Jogadas=0;
let Tempo=0;
let parador;

function comecandoAJogar(){
    //Funcao que pergunta a quantidade de cartas ja embaralhando elas em uma lista
    quantasCartas=0
    paraJogar=[]
    while(quantasCartas < 4 || quantasCartas%2 !== 0 || quantasCartas>14){
        quantasCartas=Number(prompt('Quantas cartas?'))
    }
    for(let i=0;i<quantasCartas;i++){
        paraJogar.push(gifs[i])
    }
    paraJogar.sort(comparador)
    colocandoCartas()
    parador=setInterval(atualizaTempo,1000)
}

function comparador() {
    //Funcao aux 
	return Math.random() - 0.5; 
}


function colocandoCartas(){
    //Funcao que imprime as cartas no DOM
    vitoria=0
    resetar=''
    Tempo=0
    Jogadas=0
    const listaDeCartas = document.querySelector('ul')

    if(quantasCartas !== 0){
        listaDeCartas.innerHTML=''
        for(let i=0; i<quantasCartas;i++){
            listaDeCartas.innerHTML+=`<li>
            <div class="naoToqueCarta oculta escondida"></div>
            <div class="carta" onclick="virarCarta(this)">
                <div class="frente face">
                    <img src="img-game/front.png" alt="Imagem das costas da carta"/>
                </div>
                <div class="costas face oculta">
                    <img src="img-game/${paraJogar[i]}parrot.gif" alt="Gif da frente da carta"/>
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
    atualizaJogadas()
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

    const liPai1=C.parentNode
    liPai1.children[0].classList.remove('escondida')

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

    setTimeout(jogar_de_novo,500)

}
function virarCartaDeCostas(divisao){
    //Funçao para retornar as cartas viradas parar seu estado inicial
    divisao.classList.remove('virar')
    const lista=divisao.children
    lista[0].classList.remove('oculta')
    lista[1].classList.add('oculta')
    const liPai=divisao.parentNode
    if(liPai.children[0].classList.length < 3){
        liPai.children[0].classList.add('escondida')
    }
}

function naoEsconder(){
    //Funcao aux que impede do jogador de clicar em 3 ou mais cartas
    const naoTocar=document.querySelector('.naoToque')
    naoTocar.classList.add('escondida')
}
function jogar_de_novo(){
    if(vitoria === quantasCartas){
        clearInterval(parador)
        alert(`PARABENS!!!!!! Você ganhou o jogo em ${Tempo} segundos e ${Jogadas} jogadas!`)
        resetar_ou_nao()
    }
    
}
function resetar_ou_nao(){
    //Funcao que reseta ou nao o jogo dependendo da resposta no prompt
    while(resetar !== 'sim'){
        resetar = prompt('Quer jogar de novo? Digite sim ou não.')
        if(resetar ==='não'){
            break
        }
    }
    if (resetar === 'sim'){
        quantasCartas=0
        paraJogar=[]
        Jogadas=0
        document.querySelector('.jogadas').innerHTML=`Jogadas: ${Jogadas} `
        comecandoAJogar()
    }
    else if(resetar === 'não'){
        const final =document.querySelector('ul')
        final.innerHTML='<h1>Obrigado por jogar!</h1>'
    }
}

function atualizaTempo(){
    Tempo+=1;
    document.querySelector('.tempo').innerHTML=`Tempo: ${Tempo} `
}

function atualizaJogadas(){
    Jogadas+=1
    document.querySelector('.jogadas').innerHTML=`Jogadas: ${Jogadas} `
}

function musica(classe){
    const audio = document.querySelector('audio')
    const play =document.querySelector('.play')
    const pause=document.querySelector('.pause')
    const raise =document.querySelector('.raise')
    const lower=document.querySelector('.decrease')
    if(classe === play){
        audio.play()
    }
    else if(classe === pause){
        audio.pause()
    }
    else if(classe === raise && audio.volume <= 0.9){
        audio.volume+=0.1  
    }
    else if(classe === lower && audio.volume >= 0.1){
        audio.volume-=0.1
    }
}
setTimeout(comecandoAJogar,500)