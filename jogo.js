const sprites = new Image()
sprites.src = 'sprites.png'

const canvas = document.querySelector('#game-canvas')
const contexto = canvas.getContext('2d')

const som_punch = new Audio()
som_punch.src = './punch.wav'
let animation_frame =0

function fazColisaoObstaculo(par){
    if (flappyBird.x >= par.x){
        const alturaCabecaFlappy = flappyBird.y
        const alturaPeFlappy = flappyBird.y + flappyBird.altura
        const bocaCanoCeuY = par.y + canos.altura
        const bocaCanoChaoY = par.y + canos.altura + canos.espacamentoentrecanos
        if(alturaCabecaFlappy <=  bocaCanoCeuY){
            return true
        }
        if(alturaPeFlappy >= bocaCanoChaoY){
            return true
        }
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25, 
    x: 10,
    y: 50,
    pulo: 4.6, 
    pula() {
        flappyBird.velocidade = -flappyBird.pulo
    },

    desenha(){
    contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY,
        flappyBird.largura, flappyBird.altura,
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
        )
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        if(fazColisao()){
            som_punch.play()
            telaAtiva = telainicio
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade
        flappyBird.atualizaframe()
    },
    movimentos:[
        {spriteX: 0, spriteY:0,},
        {spriteX: 0, spriteY:26,},
        {spriteX: 0, spriteY:52,},
        {spriteX: 0, spriteY:26,},

    ],
    frameatual:0,
    atualizaframe(){
        if((animation_frame % 7)===0){
        flappyBird.frameatual = flappyBird.frameatual + 1
        flappyBird.frameatual = flappyBird.frameatual % flappyBird.movimentos.length
        flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameatual].spriteX
        flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameatual].spriteY 
    }
}
}

function fazColisao(){
   if( flappyBird.y + flappyBird.altura > chao.y){
       return true
   }
   else{
       return false
   }
}

const canos={
    largura: 52,
    altura: 400,
    ceu:{
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao:{
        spriteX: 0,
        spriteY: 169
    },
    pares:[],
    
    desenha(){
        const espacamentoentrecanos = 80;
        for(i=0;i<canos.pares.length;i++){
            canos.ceu.x =canos.pares[i].x
            canos.ceu.y = canos.pares[i].y
        
        contexto.drawImage(
            sprites,
            canos.ceu.spriteX,canos.ceu.spriteY,
            canos.largura,canos.altura,
            canos.ceu.x,canos.ceu.y,
            canos.largura,canos.altura, 
        )
        const canochaoX = canos.ceu.x
        const canochaoY = canos.altura+espacamentoentrecanos + canos.ceu.y
        contexto.drawImage(
            sprites,
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canochaoX, canochaoY,
            canos.largura,canos.altura
        )
    }

},
    atualiza(){
        console.log("Numero de obstáculos: " + canos.pares.length)
        const passou100Frames = (animation_frame % 100 === 0)
        if (passou100Frames){
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),
            }
            canos.pares.push(novoPar)
        }

        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i]
            par.x = par.x -2

        if(par.x + canos.largura <= 0){
            canos.pares.shift()
        }

        if(fazColisaoObstaculo(par)){
            som_punch.play()
            telaAtiva = telainicio
            return
            
        }

        }
    }

}

const fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204, 
    x: 0,
    y: 480 - 204,

    desenha(){
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0,0,canvas.width, canvas.height)
    contexto.drawImage(
        sprites,
        fundo.spriteX, fundo.spriteY,
        fundo.largura, fundo.altura,
        fundo.x, fundo.y,
        fundo.largura, fundo.altura,
        )
    contexto.drawImage(
        sprites,
        fundo.spriteX, fundo.spriteY,
        fundo.largura, fundo.altura,
        fundo.x + fundo.largura, fundo.y,
        fundo.largura, fundo.altura,
        )
    contexto.drawImage(
        sprites,
        fundo.spriteX, fundo.spriteY,
        fundo.largura, fundo.altura,
        fundo.x + fundo.largura, fundo.y,
        fundo.largura, fundo.altura,
        )
    },
    atualiza(){
        if((animation_frame % 10)===0){
            fundo.x = fundo.x - 0.5
            fundo.x = fundo.x %(fundo.largura /2)
        }
    }
}

const chao = {
    spriteX: 0,
    spriteY: 613,
    largura: 224,
    altura: 109, 
    x: 0,
    y: 370,
    
    desenha(){
    contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
        )
    contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x + chao.largura, chao.y,
        chao.largura, chao.altura,
            )
    },
    atualiza(){
        chao.x = chao.x -1
        chao.x = chao.x %(chao.largura /2)
    }
}

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152, 
    x: 70,
    y: 70,
        
        desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
            )
        }
}

const telainicio ={
    desenha(){
        fundo.desenha()
        chao.desenha()
        flappyBird.desenha()
        inicio.desenha()
    },
    click(){
        telaAtiva =telajogo
    }
}

const telajogo = {
    desenha(){
     
        fundo.atualiza()
        fundo.desenha()
        canos.desenha()
        canos.atualiza()
        chao.desenha()
        chao.atualiza()
        flappyBird.desenha()
        flappyBird.atualiza()
   
     
    },
    click(){
        flappyBird.pula()
    }
}

var telaAtiva = telainicio

function mudatelaAtiva(){
    telaAtiva.click()
}

window.addEventListener("click", mudatelaAtiva)


function loop(){
    telaAtiva.desenha()
    requestAnimationFrame(loop)
    animation_frame = animation_frame + 1
}


loop();