const canvas = document.querySelector("#tela");
let ctx = canvas.getContext("2d");
let width = 2400;
let height = 1200;
canvas.width = width;
canvas.height = height;

//Audios

let au = document.querySelector("#audioDoeu");
let danoSom = document.querySelector("#dano");
let musica1Som = document.querySelector("#musica1");
let superPowerUpSom = document.querySelector("#superPowerUp");
let powerUpSom = document.querySelector("#powerUp");
let musicaAberturaSom = document.querySelector("#musicaAbertura");
let moedaSom = document.querySelector("#moeda");
let moeda2Som = document.querySelector("#moeda2");
let gameOverSom = document.querySelector("#gameOver");

//Imagens

let chao1Img = new Image();
chao1Img.src = "img/chao1.png";
let chao2Img = new Image();
chao2Img.src = "img/chao2.png";
let peixeImg = new Image();
peixeImg.src = "img/peixe.png"
let coracaoImg = new Image();
coracaoImg.src = "img/coracao.png";
let lixosImg = new Image();
lixosImg.src = "./img/lixosConjunto.png";
let bolhasImg = new Image();
bolhasImg.src = "./img/bolhas.png";
let barreiraVerticalImg = new Image();
barreiraVerticalImg.src = "img/vertical.png";
let barreiraHorizontalImg = new Image();
barreiraHorizontalImg.src = "img/horizontal.png";
let bolhaImg = new Image();
bolhaImg.src = "img/bolha.png";
let powerUpImg = new Image();
powerUpImg.src = "img/powerUp.png";
let moedaImg = new Image();
moedaImg.src = "img/moeda.png";

//-----------------------------------------------------------------------------------------------//

//teclas

let botaoUp = document.querySelector("#bo1");
let botaoDown = document.querySelector("#bo2");

let keys = {
    w:{
        pressed:false,
    },
    s:{
        pressed:false,
    },
    d:{
        pressed:false,
    },
    a:{
        pressed:false,
    }
}

window.addEventListener("keydown", (evt)=>{
    if(evt.key){
        if(evt.key=="ArrowRight" || evt.key=='d'){
            keys.d.pressed = true;
            keys.a.pressed = false;
        }
        else if(evt.key=="ArrowLeft" || evt.key=='a'){
            keys.a.pressed = true;
            keys.d.pressed = false;
        }
        if(evt.key=="ArrowUp" || evt.key=='w'){
            keys.w.pressed = true;
            keys.s.pressed = false;
        }
        else if(evt.key=="ArrowDown" || evt.key=='s'){
            keys.s.pressed = true;
            keys.w.pressed = false;
        }
    }
});

botaoUp.addEventListener("touchstart", (evt)=>{
    keys.w.pressed = true;
    keys.s.pressed = false;
});
botaoDown.addEventListener("touchstart", (evt)=>{
    keys.s.pressed = true;
    keys.w.pressed = false;
});

window.addEventListener("keyup", (evt)=>{
    if(evt.key){
        if(evt.key=="ArrowRight" || evt.key=='d'){
            keys.d.pressed = false;
        }
        else if(evt.key=="ArrowLeft" || evt.key=='a'){
            keys.a.pressed = false;
        }
        if(evt.key=="ArrowUp" || evt.key=='w'){
            keys.w.pressed = false;
        }
        else if(evt.key=="ArrowDown" || evt.key=='s'){
            keys.s.pressed = false;
        }
    }
});

botaoUp.addEventListener("touchend", (evt)=>{
    keys.w.pressed = false;
});
botaoDown.addEventListener("touchend", (evt)=>{
    keys.s.pressed = false;
});

//-----------------------------------------------------------------------------------------------//

let hitbox = false;
let tempoJogo = Date.now();
let vidaStatus = true;
function loopGame(){
    if(Date.now() - tempoJogo >= (1000/60)){
        if(vidaStatus){
            ctx.clearRect(0, 0, width, height)
            peixe.frame = frame(peixe.frame, peixe.maxFrame);
            powerUps.frame = frame(powerUps.frame, powerUps.maxFrame);
            for (let m=0; m<moeda.length; m++){
                moeda[m].frame = frame(moeda[m].frame, moeda[m].maxFrame);
            }
            powerUpAtributos.dobroPontoStatus = tempo(powerUpAtributos.dobroPonto, powerUpAtributos.dobroPontoMax);
            powerUpAtributos.dobroVelocidadeStatus = tempo(powerUpAtributos.dobroVelocidade, powerUpAtributos.dobroVelocidadeMax);
            bolha.status = tempo(bolha.tempo, bolha.tempoMax);
            mapa();
            movimento();

            carregarBackground();
            carregarChao();
            carregarPeixe();
            if (bolha.status || bolha.statusPowerUp){carregarBolha()}
            carregarBarreiras();
            alocarPowerUp();
            carregarPowerUp();
            alocarMoeda();
            carregarMoeda();
            carregarBackground2();
            carregarPontos();
            carregarCoracao();
            
            colisao(peixeHitbox.x, peixeHitbox.y, peixeHitbox.w, peixeHitbox.h, 0);
            colisaoPowerUp(peixeHitbox.x, peixeHitbox.y, peixeHitbox.w, peixeHitbox.h);
            colisaoMoeda(peixeHitbox.x, peixeHitbox.y, peixeHitbox.w, peixeHitbox.h);
            niveis();
            tempoJogo = Date.now();   
        }
        else{
            gameOverCarregar();
        }
    }
    window.requestAnimationFrame(loopGame);
}

let menu = true;
function loopMenu(){
    if(Date.now() - tempoJogo >= (1000/60) && menu){
        peixe.frame = frame(peixe.frame, peixe.maxFrame);
        carregarBackground();
        carregarChao();
        carregarMenu();
        carregarBackground2();
        tempoJogo = Date.now();
    }
    if(menu){
        requestAnimationFrame(loopMenu);
    }
}

//-----------------------------------------------------------------------------------------------//

//Tempo

function tempo (tempoAtual, tempoMax){
    let status = true;
    if(Date.now() - tempoAtual >= tempoMax){
        status = false;
    }
    return status;
}

//Frame

let tempoFrame = 0;
function frame (frame, maxFrame){
    tempoFrame++;
    if(tempoFrame == 3){
        tempoFrame = 0;
        frame++;
        if(frame == maxFrame){
            frame = 0;
        }
    }
    return frame;
}

//Começar

let comecou = false;
botaoUp.addEventListener("click", ()=>{
    if(!comecou){
        opcoesMenu.style.display = "block";
        comecou = true;
        musicaAberturaSom.play();
        loopMenu();
    }
});

//menu

let peixeMenu = {
    sx:0,
    sy:0,
    sw:112,
    sh:64,
    x:400,
    y:-100,
    w:224,
    h:128,
    rotation:30,
    accelX:3,
    direcao:false
}

function carregarMenu(){
    if(peixeMenu.rotation>0){
        ctx.translate(peixeMenu.x + peixeMenu.w/2, peixeMenu.y + peixeMenu.h/2);
        ctx.rotate((peixeMenu.rotation * Math.PI) / 180);
        ctx.drawImage(peixeImg, peixeMenu.sx, peixeMenu.sy, peixeMenu.sw, peixeMenu.sh, -peixeMenu.w/2, -peixeMenu.h/2, peixeMenu.w, peixeMenu.h);
        ctx.rotate(-1*(peixeMenu.rotation * Math.PI) / 180);
        ctx.translate((peixeMenu.x + peixeMenu.w/2)*-1, (peixeMenu.y + peixeMenu.h/2)*-1);

        if(peixeMenu.accelX<6)
        peixeMenu.accelX+=0.1;

        peixeMenu.y += (peixeMenu.rotation/4);
        peixeMenu.rotation-=0.3;

    }
    else {

        if(peixeMenu.x >= (canvas.width / 2) - (peixeMenu.w / 2)){
            peixeMenu.direcao = false;
        }
        else {
            peixeMenu.direcao = true;
        }

        if(peixeMenu.direcao && peixeMenu.accelX < 6){
            peixeMenu.accelX+=0.5;       
        }
        else if(!peixeMenu.direcao){
            peixeMenu.accelX-=0.5;
        }
        ctx.drawImage(peixeImg, peixeMenu.sx, peixeMenu.sy, peixeMenu.sw, peixeMenu.sh, peixeMenu.x, peixeMenu.y, peixeMenu.w, peixeMenu.h);
    
    }
    
    
    peixeMenu.x+=peixeMenu.accelX;
    peixeMenu.sx = 112 * peixe.frame;

}

const jogar = document.getElementById("jogar");
const opcoesMenu = document.getElementById("menu");
jogar.addEventListener("click", ()=>{
    ajusteTela();
    tela = true;    
    opcoesMenu.style.display = "none";
    menu = false;
    musicaAberturaSom.pause();
    musica1Som.play();
    loopGame();
});

//Background

let background = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    x:0,
    y:0,
    w:width,
    h:height,
}
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#295aff");
gradient.addColorStop(0.7, "#000095");
gradient.addColorStop(1, "#06006a");

function carregarBackground(){
    ctx.fillStyle = gradient;
    ctx.fillRect(background.x, background.y, background.w, background.h);
}

let background2 = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    x:0,
    y:0,
    w:width,
    h:height,
}
function carregarBackground2(){
    ctx.fillStyle = "rgba(0,50,255,15%)";
    ctx.fillRect(background2.x, background2.y, background2.w, background2.h);
}

//Chao

let chao = [];
chao[0] = {x:0, y:0, w:4800, img:chao1Img, variacao:5};
chao[1] = {x:4800, y:0,  w:4800, img:chao1Img, variacao:5};
chao[2] = {x:0, y:160, w:4800, img:chao2Img, variacao:8};
chao[3] = {x:4800, y:160, w:4800, img:chao2Img, variacao:8};

function carregarChao (){
    for(let i=0; i<chao.length; i++){
        if((i+2)%2 == 0){
            if(chao[i].x < -chao[i+1].w){
                chao[i].x = chao[i+1].x+chao[i].w-chao[i].variacao+(nadar-10);
            }
            else if(vidaStatus){
                chao[i].x -= chao[i].variacao+(nadar-10);
            }
        }
        else{
            if(chao[i].x < -chao[i-1].w){
                chao[i].x = chao[i-1].x+chao[i].w;
            }
            else if(vidaStatus){
                chao[i].x -= chao[i].variacao+(nadar-10);
            }
        }
        ctx.drawImage(chao[i].img, 0, 0, chao[i].w, height, chao[i].x, chao[i].y, chao[i].w, height);
        if(i+2%2 == 1){
            //ajustar o x do chao
            if(chao[i].x - chao[i-1].x == 4800 || chao[i].x - chao[i-1].x == -4800){
            }else{
                chao[i-1].x -= (nadar-10);
            }
            ctx.fillStyle = "rgba(0,50,255,20%)";
            ctx.fillRect(background.x, background.y, background.w, background.h);
        }
    }
}

//Peixe

let peixeHitbox = {};
let peixe = {
    sx:0,
    sy:0,
    sw:112,
    sh:64,
    x:600,
    y:536,
    w:112,
    h:64,
    frame:0,
    maxFrame:8
}

function carregarPeixe(){
    peixe.sx = 112 * peixe.frame;
    peixeHitbox = {
        x:peixe.x + 8,
        y:peixe.y + 8,
        w:peixe.w - 16,
        h:peixe.h - 16
    }
    ctx.drawImage(peixeImg, peixe.sx, peixe.sy, peixe.sw, peixe.sh, peixe.x, peixe.y, peixe.w, peixe.h);
    ctx.fillStyle = "rgb(255,155,0)"
    //ctx.fillRect(peixe.x, peixe.y, peixe.w, peixe.h) //peixe
    if(hitbox){
        ctx.fillStyle = "rgba(255,255,255,0.5)"
        ctx.fillRect(peixeHitbox.x, peixeHitbox.y, peixeHitbox.w, peixeHitbox.h)
    }
}

//Vida

let coracao = {
    sx:0,
    sy:0,
    sw:160,
    sh:48,
    x:width - 176,
    y:16,
    w:160,
    h:48,
    frame:0
}

function carregarCoracao(){
    coracao.sx = coracao.frame * 160,
    ctx.drawImage(coracaoImg, coracao.sx, coracao.sy, coracao.sw, coracao.sh, coracao.x, coracao.y, coracao.w, coracao.h);
}

//Barreiras

let quantidadeLixos = 10;
let barreiraWidth;
let barreiraHeight;
let barreiras = [];
let propriedades = [];
propriedades[0] = {miw:0, maw:3, mih:3, mah:3, multh:1, multw:15};
propriedades[1] = {miw:0, maw:3, mih:3, mah:3, multh:1, multw:15};
propriedades[2] = {miw:0, maw:3, mih:3, mah:3, multh:1, multw:15};
propriedades[3] = {miw:3, maw:3, mih:1, mah:5, multh:3, multw:1};
propriedades[4] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[5] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[6] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[7] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[8] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[9] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[10] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[11] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[12] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[13] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[14] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};
propriedades[15] = {miw:2, maw:2, mih:2, mah:2, multh:1, multw:1};

function estruturarBarreiras(i){
    barreiraWidth = ale(propriedades[i].miw, propriedades[i].maw)
    barreiraHeight = ale(propriedades[i].mih, propriedades[i].mah)
    barreiras[i] = {
        sx:64,
        sy:0,
        sw:64,
        sh:64,
        x:width,
        y:0,
        w:barreiraWidth*48*propriedades[i].multw,
        h:barreiraHeight*48*propriedades[i].multh,
        frame:0
    }  
    if(i<3){
        barreiras[i].frame = (barreiras[i].w/720);
        barreiras[i].sx = 2160;
        barreiras[i].sw = barreiras[i].w;
        barreiras[i].sh = barreiras[i].h;
    }
    if(i == 3){
        barreiras[i].frame = (barreiras[i].h/144)-1;
        barreiras[i].sx = 144;
        barreiras[i].sw = barreiras[i].w;
        barreiras[i].sh = barreiras[i].h;
    }
    if(i>3){
        barreiras[i].frame = ale(0, quantidadeLixos-1);
    }
    barreiras[i].y = ale(0, 1200-barreiras[i].h);
}   

function primeirasBarreiras(){
    for(let i=0; i<propriedades.length; i++){
        estruturarBarreiras(i);
    }
    for(let i=0; i<propriedades.length; i++){
        if(i < 3){
            barreiras[i].x = ((i+1)*(width/3))+width;
        }
        else{
            barreiras[i].x = width+((i-2)*200);
        }
    }    
}
primeirasBarreiras();

function carregarBarreiras(){
    for(let n=0; n<propriedades.length; n++){
        if(n>3){
            ctx.globalAlpha = 0.6;
            ctx.drawImage(bolhasImg, 0, 0, 2000, 2000, barreiras[n].x-16, barreiras[n].y+16, barreiras[n].w, barreiras[n].h);
            ctx.drawImage(bolhasImg, 0, 0, 2000, 2000, barreiras[n].x+16, barreiras[n].y+16, barreiras[n].w, barreiras[n].h);
            ctx.globalAlpha = 1;
            ctx.drawImage(lixosImg, barreiras[n].sx*barreiras[n].frame, barreiras[n].sy, barreiras[n].sw, barreiras[n].sh, barreiras[n].x, barreiras[n].y, barreiras[n].w, barreiras[n].h);
        }
        else if(n<3){
            ctx.drawImage(barreiraHorizontalImg, barreiras[n].sx*barreiras[n].frame, barreiras[n].sy, barreiras[n].sw, barreiras[n].sh, barreiras[n].x, barreiras[n].y, barreiras[n].w, barreiras[n].h);
        }
        else{
            ctx.drawImage(barreiraVerticalImg, barreiras[n].sx*barreiras[n].frame, barreiras[n].sy, barreiras[n].sw, barreiras[n].sh, barreiras[n].x, barreiras[n].y, barreiras[n].w, barreiras[n].h);
        }
        if(hitbox){
            ctx.fillStyle = "rgba(255,0,0, 0.5)";
            ctx.fillRect(barreiras[n].x+8, barreiras[n].y+8, barreiras[n].w-16, barreiras[n].h-16);    
        }
    }
}

function colisao(x, y, w, h, tipo){
    let testeColisao = true;
    for(let n = 0; n<propriedades.length; n++){
        if(x + w < barreiras[n].x+8) continue;
        if(x > barreiras[n].x+8 + barreiras[n].w-16)continue
        if(y + h < barreiras[n].y+8)continue
        if(y > barreiras[n].y+8 + barreiras[n].h-16)continue
        if(barreiras[n].h == 0 || barreiras[n].w == 0)continue
        if(bolha.status) continue
        if(tipo == 0){
            bolha.tempo = Date.now();
            if(coracao.frame == 5){
                coracao.frame++;
            }
            else{
                coracao.frame += 2;
            } 
            danoSom.play();
            bolha.status = true;    
            if(coracao.frame >= 6){
                gameOver();
                gameOverSom.play();
                vidaStatus = false;
            }     
        }
        testeColisao = false;
        return testeColisao;
    }
    return testeColisao;
}

//Pontos

let quantidadePontos = 0;
let pontos = {
    nx:16,
    ny:50,
    fonte:"49px serif",
}
function carregarPontos(){
    if(vidaStatus){
        quantidadePontos += velocidade/40; 
        if(powerUpAtributos.dobroPontoStatus){
            quantidadePontos += velocidade/40;   
        }      
    }
    ctx.font = pontos.fonte;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText(Math.round(quantidadePontos), pontos.nx, pontos.ny);
}

//Bolha

let bolha = {
    sx:0,
    sy:0,
    sw:144,
    sh:144,
    x:peixe.x - 16,
    y:peixe.y - 40,
    w:peixe.w + 32,
    h:peixe.w + 32,
    tempo:0,
    tempoMax:2500,
    status:false,
}

function carregarBolha(){
    bolha.x = peixe.x - 16,
    bolha.y = peixe.y - 40,
    ctx.globalAlpha = 0.65;
    ctx.drawImage(bolhaImg, bolha.sx, bolha.sy, bolha.sw, bolha.sh, bolha.x, bolha.y, bolha.w, bolha.h);
    ctx.globalAlpha = 1;
}

//Poderes

function carregarMenuPoderes (){
    
}

//Power Up

let powerUpAtributos = {
    dobroPonto : Date.now(),
    dobroPontoMax : 10000,
    dobroPontoStatus : false,
    dobroVelocidade : Date.now(),
    dobroVelocidadeMax : 9000,
    dobroVelocidadeStatus : false,
}

let powerUps = {
    sx:64,
    sy:0,
    sw:64,
    sh:64,
    x:-width,
    y:0,
    w:48,
    h:48,
    tipo:ale(0, 4),
    frame:0,
    maxFrame:7
}

let minTempoPower = 100;
let maxTempoPower = 200;
let tempoPowerPassado = ale(minTempoPower, maxTempoPower);
let tempoPower = tempoPowerPassado + quantidadePontos;
function alocarPowerUp (){
    powerUps.x -= velocidade;
    if(tempoPower <= quantidadePontos){
        tempoPowerPassado = (maxTempoPower-tempoPowerPassado) + ale(minTempoPower, maxTempoPower);
        tempoPower = tempoPowerPassado + quantidadePontos;
        powerUps.tipo = ale(0, 4);
        powerUps.x = width;
        let espacoLivre;
        do{
            espacoLivre = true;
            powerUps.y = ale(0, 1200 - powerUps.h);
            if(!colisao(powerUps.x, powerUps.y, powerUps.w, powerUps.h, 1)){
                espacoLivre = false;
            }
        }while(!espacoLivre);
    }
}

function colisaoPowerUp(x, y, w, h){
    if((x + w >= powerUps.x)
    &&(x <= powerUps.x + powerUps.w)
    &&(y + h >= powerUps.y)
    &&(y <= powerUps.y + powerUps.h)){
        powerUps.x -= width;
        if(powerUps.tipo == 0){
            powerUpSom.play();
            if(coracao.frame > 0)
                coracao.frame -= 2;
        }
        else if(powerUps.tipo == 1){
            powerUpSom.play();
            bolha.tempo = Date.now();
            bolha.status = true;    
        }
        else if(powerUps.tipo == 2){
            powerUpSom.play();
            powerUpAtributos.dobroPonto = Date.now();
            powerUpAtributos.dobroPontoStatus = true;
        }
        else if(powerUps.tipo == 3){
            powerUpSom.play();
            powerUpAtributos.dobroVelocidade = Date.now();
            powerUpAtributos.dobroVelocidadeStatus = true;
        }
        else if(powerUps.tipo == 4){
            superPowerUpSom.play();
            for(let i=0; i<barreiras.length; i++){
                barreiras[i].y = -height;
            }
        }
    }
}

function carregarPowerUp (){
    powerUps.sx = 64 * powerUps.frame;
    ctx.drawImage(powerUpImg, powerUps.sx, powerUps.sy, powerUps.sw, powerUps.sh, powerUps.x, powerUps.y, powerUps.w, powerUps.h);
}

//Moeda

let quantidadeMoeda = 0;
let moeda = [];
moeda[0] = {sx:96, sy:0, sw:96, sh:96, x:width*(4/3), y:-200, w:48, h:48, frame:0, maxFrame:6}
moeda[1] = {sx:96, sy:0, sw:96, sh:96, x:width*(5/3), y:-200, w:48, h:48, frame:2, maxFrame:6}
moeda[2] = {sx:96, sy:0, sw:96, sh:96, x:width*(6/3), y:-200, w:48, h:48, frame:4, maxFrame:6}

function alocarMoeda (){
    for(let i=0; i<moeda.length; i++){
        if(moeda[i].x < -200){
            moeda[i].x = width;
            let espacoLivre;
            do{
                espacoLivre = true;
                moeda[i].y = ale(0, 1200 - moeda[i].h);
                if(!colisao(moeda[i].x, moeda[i].y, moeda[i].w, moeda[i].h, 1)){
                    espacoLivre = false;
                }
            }while(!espacoLivre);
        }    
        moeda[i].x -= velocidade;
    }
}

function colisaoMoeda(x, y, w, h){
    for(let i=0; i<moeda.length; i++){
        if((x + w >= moeda[i].x)
            &&(x <= moeda[i].x + moeda[i].w)
            &&(y + h >= moeda[i].y)
            &&(y <= moeda[i].y + moeda[i].h)){
            let som = ale(0, 1);
            if(som == 0){
                moedaSom.play();
            }
            else{
                moeda2Som.play();
            }
            moeda[i].y = -200;
            quantidadeMoeda++;
            console.log("MOEDAS = "+quantidadeMoeda);
        }
    }
}

function carregarMoeda (){
    for(let i=0; i<moeda.length; i++){
        ctx.drawImage(moedaImg, moeda[i].sx*moeda[i].frame, moeda[i].sy, moeda[i].sw, moeda[i].sh, moeda[i].x, moeda[i].y, moeda[i].w, moeda[i].h); 
    }
}

//tela

let main = document.querySelector('main');
function ajusteTela (){
    /*if(screen.orientation.type == "portrait-primary" || screen.orientation.type == "portrait-secondary"){
        screen.orientation.lock("landscape-primary");
    }*/
    main.requestFullscreen();
}

//gameOver

const pergunta = document.querySelector("#pergunta");
const lixoPergunta = document.querySelector("#lixoPergunta");
const alternativas = document.querySelector("#alternativas");
const alterA = document.querySelector("#alterA");
const alterB = document.querySelector("#alterB");
const alterC = document.querySelector("#alterC");

function gameOver (){
    pergunta.style.display = "flex";
}

function gameOverCarregar(){
    console.log("Game Over");
    musica1Som.pause();
    carregarBackground();
    carregarChao();
    carregarPeixe();
    carregarBarreiras();
    carregarPowerUp();
    carregarMoeda();
    carregarBackground2();
    carregarPontos();
    carregarCoracao();
}

alterB.addEventListener("click", ()=>{
    keys.d.pressed = false;
    keys.a.pressed = false;
    keys.w.pressed = false;
    keys.s.pressed = false;
    dobroPonto = false;
    dobroVelocidade = false;
    vidaStatus = true;
    musica1Som.play();
    coracao.frame = 4;
    bolha.tempo = Date.now();
    bolha.status = true;  
    for(let i=0; i<barreiras.length; i++){
        barreiras[i].y = -height;
    }
    pergunta.style.display = "none";
});

//movimento

let gravidade = 1.4;
let nadar = 10;
function movimento(){
    if(keys.w.pressed && peixeHitbox.y >0){
        peixe.y -= nadar; 
        if(powerUpAtributos.dobroVelocidadeStatus){
            peixe.y -= nadar/2;
        }
    }
    else if (keys.s.pressed && peixeHitbox.y+peixeHitbox.h<height){
        peixe.y += nadar; 
        if(powerUpAtributos.dobroVelocidadeStatus){
            peixe.y += nadar/2;
        }
    }
    else if(peixeHitbox.y+peixeHitbox.h<height){
        peixe.y += gravidade; 
    }
    if(keys.d.pressed && peixeHitbox.x+peixeHitbox.w<width){
        peixe.x += nadar;
        if(powerUpAtributos.dobroVelocidadeStatus){
            peixe.x += nadar/2;
        }
    }
    else if(keys.a.pressed && peixeHitbox.x>0){
        peixe.x -= nadar;
        if(powerUpAtributos.dobroVelocidadeStatus){
            peixe.x -= nadar/2;
        }
    }
}

//mapa

let velocidade = 14;
function mapa(){
    for(let i=0; i<propriedades.length; i++){
        if(barreiras[i].x+barreiras[i].w>0){
            barreiras[i].x -= velocidade;
            //barreiras[i].y += 0.3;
        }  
        else{
            estruturarBarreiras(i);
        }    
    }
}

//random

function ale(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//niveis

let variacao = 300;
let nivel = 1;
function niveis (){
    if(quantidadePontos-(variacao*nivel)>=0){
        nivel++;
        velocidade += 1;
        nadar += 0.25;
    }
}