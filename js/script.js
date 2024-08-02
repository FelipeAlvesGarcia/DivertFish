const canvas = document.querySelector("#tela");
var ctx = canvas.getContext("2d");
var width = 2400;
var height = 1200;
canvas.width = width;
canvas.height = height;
let botaoUp = document.querySelector("#bo1");
let botaoDown = document.querySelector("#bo2");


//console.log(window.innerWidth)
//console.log(innerHeight)

//-----------------------------------------------------------------------------------------------//

var au = document.querySelector("#audioDoeu");

//menu

let peixeMenu = {
    sx:0,
    sy:0,
    sw:112,
    sh:64,
    x:-30,
    y:-100,
    w:224,
    h:128,
    rotation:30
}

function carregarMenu(){
    if(peixeMenu.rotation>0){
        ctx.translate(peixeMenu.x + peixeMenu.w/2, peixeMenu.y + peixeMenu.h/2);
        ctx.rotate((peixeMenu.rotation * Math.PI) / 180);
        ctx.drawImage(peixeImg, peixeMenu.sx, peixeMenu.sy, peixeMenu.sw, peixeMenu.sh, -peixeMenu.w/2, -peixeMenu.h/2, peixeMenu.w, peixeMenu.h);
        ctx.rotate(-1*(peixeMenu.rotation * Math.PI) / 180);
        ctx.translate((peixeMenu.x + peixeMenu.w/2)*-1, (peixeMenu.y + peixeMenu.h/2)*-1);
        peixeMenu.x+=3;
        peixeMenu.y+=5;
        if(peixeMenu.rotation>0){
            peixeMenu.rotation-=0.3;
        }
    }
    else{
        ctx.drawImage(peixeImg, peixeMenu.sx, peixeMenu.sy, peixeMenu.sw, peixeMenu.sh, peixeMenu.x, peixeMenu.y, peixeMenu.w, peixeMenu.h);
    }
    peixeMenu.sx = 112*framePeixe;
    console.log("X: " + peixeMenu.x + "\nY: " + peixeMenu.y + "\nRotação:" + peixeMenu.rotation * Math.PI + "º");
}

//Background

var background = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    x:0,
    y:0,
    w:width,
    h:height,
}

function carregarBackground(){
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#295aff");
    gradient.addColorStop(0.7, "#000095");
    gradient.addColorStop(1, "#06006a");
    ctx.fillStyle = gradient;
    //ctx.fillStyle = "rgb(0,50,255)";
    ctx.fillRect(background.x, background.y, background.w, background.h);
    carregarChao();
}

var background2 = {
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

var chao1Img = new Image();
chao1Img.src = "img/chao1.png";
var chao2Img = new Image();
chao2Img.src = "img/chao2.png";

var chao = [];
chao[0] = {x:0, y:0, w:4800, img:chao1Img, variacao:5};
chao[1] = {x:4800, y:0,  w:4800, img:chao1Img, variacao:5};
chao[2] = {x:0, y:160, w:4800, img:chao2Img, variacao:8};
chao[3] = {x:4800, y:160, w:4800, img:chao2Img, variacao:8};

function carregarChao (){
    for(var i=0; i<chao.length; i++){
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
            //console.log(chao[i].x - chao[i-1].x);
            ctx.fillStyle = "rgba(0,50,255,20%)";
            ctx.fillRect(background.x, background.y, background.w, background.h);
        }
    }
}

//Peixe

var peixeImg = new Image();
peixeImg.src = "img/peixe.png"
var peixe;
var peixeHitbox;
var framePeixe = 0;

peixe = {
    sx:0,
    sy:0,
    sw:112,
    sh:64,
    x:600,
    y:536,
    w:112,
    h:64
}
function carregarPeixe(){
    peixe.sx = 112 * framePeixe;
    peixeHitbox = {
        x:peixe.x + 8,
        y:peixe.y + 8,
        w:peixe.w - 16,
        h:peixe.h - 16
    }
    
    ctx.drawImage(peixeImg, peixe.sx, peixe.sy, peixe.sw, peixe.sh, peixe.x, peixe.y, peixe.w, peixe.h);
    ctx.fillStyle = "rgb(255,155,0)"
    //ctx.fillRect(peixe.x, peixe.y, peixe.w, peixe.h) //peixe
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.fillRect(peixeHitbox.x, peixeHitbox.y, peixeHitbox.w, peixeHitbox.h) //hitbox do peixe
}

//Corações do peixe (vida)

var frameCoracao = 0;
var coracaoImg = new Image();
coracaoImg.src = "img/coracao.png";
var coracao = {
    sx:0,
    sy:0,
    sw:160,
    sh:48,
    x:width - 176,
    y:16,
    w:160,
    h:48,
}
function carregarCoracao(){
    coracao.sx = frameCoracao * 160,
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.drawImage(coracaoImg, coracao.sx, coracao.sy, coracao.sw, coracao.sh, coracao.x, coracao.y, coracao.w, coracao.h);
}

//Barreira de lixo

let quantidadeLixos = 3;
let lixosImg = new Image();
lixosImg.src = "./img/lixosConjunto.png";
let bolhasImg = new Image();
bolhasImg.src = "./img/bolhas.png";
var numeroBarreiras = 16; //9
var barreiraWidth;
var barreiraHeight;
var barreiras = [];
var propriedades = [];
propriedades[0] = {miw:0, maw:50, mih:3, mah:3};
propriedades[1] = {miw:0, maw:50, mih:3, mah:3};
propriedades[2] = {miw:0, maw:50, mih:3, mah:3};
propriedades[3] = {miw:2, maw:2, mih:2, mah:2};
propriedades[4] = {miw:2, maw:2, mih:2, mah:2};
propriedades[5] = {miw:2, maw:2, mih:2, mah:2};//4-20 4-8
propriedades[6] = {miw:2, maw:2, mih:2, mah:2};
propriedades[7] = {miw:2, maw:2, mih:2, mah:2};
propriedades[8] = {miw:2, maw:2, mih:2, mah:2};
propriedades[9] = {miw:2, maw:2, mih:2, mah:2};
propriedades[10] = {miw:2, maw:2, mih:2, mah:2};
propriedades[11] = {miw:2, maw:2, mih:2, mah:2};
propriedades[12] = {miw:2, maw:2, mih:2, mah:2};
propriedades[13] = {miw:2, maw:2, mih:2, mah:2};
propriedades[14] = {miw:2, maw:2, mih:2, mah:2};
propriedades[15] = {miw:3, maw:3, mih:5, mah:15};

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
        w:barreiraWidth*48,
        h:barreiraHeight*48,
        f:0
    }    
    /*if(i == 1){
        barreiras[1].y = (height-barreiras[1].h)/2;
    }
    else if(i == 2){
        barreiras[2].y = height-barreiras[2].h;
    }
    else if(i > 2){*/
        /*if(i%2 == 0){
            barreiras[i].y = ale(600+(barreiras[1].h/2), ((height - barreiras[2].h) - barreiras[i].h));
        }
        else{
            barreiras[i].y = ale(barreiras[0].h, (600-(barreiras[1].h)/2) - barreiras[i].h);
        }*/
        //barreiras[i].y = ale(144, 1200-144-96);
        barreiras[i].y = ale(0, 1200-barreiras[i].h);
        if(i>2 && i<15){
            barreiras[i].f = ale(0, quantidadeLixos-1);
        }
    //}
}   

function primeirasBarreiras(){
    for(var i=0; i<numeroBarreiras; i++){
        estruturarBarreiras(i);
    }
    for(var i=0; i<numeroBarreiras; i++){
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
    if(vidaStatus){
        atualizarBarreiras();
    }
    for(var n=0; n<numeroBarreiras; n++){
        if(n>2 && n<15){
            ctx.globalAlpha = 0.6;
            ctx.drawImage(bolhasImg, 0, 0, 2000, 2000, barreiras[n].x-16, barreiras[n].y+16, barreiras[n].w, barreiras[n].h);
            ctx.drawImage(bolhasImg, 0, 0, 2000, 2000, barreiras[n].x+16, barreiras[n].y+16, barreiras[n].w, barreiras[n].h);
            ctx.globalAlpha = 1;
            ctx.drawImage(lixosImg, barreiras[n].sx*barreiras[n].f, barreiras[n].sy, barreiras[n].sw, barreiras[n].sh, barreiras[n].x, barreiras[n].y, barreiras[n].w, barreiras[n].h);
        }
        else{
            ctx.fillStyle = "rgba(255,0,0,60%)";
            ctx.fillRect(barreiras[n].x, barreiras[n].y, barreiras[n].w, barreiras[n].h); 
        }
        //ctx.fillStyle = "rgb(0,0,0)";
        //ctx.fillRect(barreiras[n].x+8, barreiras[n].y+8, barreiras[n].w-16, barreiras[n].h-16);    
    }
}

//Pontos

var quantidadePontos = 0;
var pontos = {
    nx:16,
    ny:50,
    fonte:"49px serif",
}
function carregarPontos(){
    ctx.font = pontos.fonte;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText(Math.round(quantidadePontos), pontos.nx, pontos.ny);
}

//Bolha

var bolhaImg = new Image();
bolhaImg.src = "img/bolha.png";
var bolhaStatus = false;
var bolha;
function carregarBolha(){
    bolha = {
        sx:0,
        sy:0,
        sw:144,
        sh:144,
        x:peixe.x - 16,
        y:peixe.y - 40,
        w:peixe.w + 32,
        h:peixe.w + 32
    }
    if (bolhaStatus){
        ctx.fillStyle = "rgba(0,0,120, 0.6)";
        //ctx.fillRect(bolha.x, bolha.y, bolha.w, bolha.h); //bolha
        ctx.globalAlpha = 0.65;
        ctx.drawImage(bolhaImg, bolha.sx, bolha.sy, bolha.sw, bolha.sh, bolha.x, bolha.y, bolha.w, bolha.h);
        ctx.globalAlpha = 1;
    }
}
//-----------------------------------------------------------------------------------------------//

var tempo = Date.now();
var tempobolha = Date.now();
var vidaStatus = true;
var frame = 0;
function loop(){
    if(Date.now() - tempo >= (1000/60)){
        if(vidaStatus){
            frame++;
            if(frame == 3){
                frame = 0;
                framePeixe++;
                if(framePeixe == 7){
                    framePeixe = 0;
                }
            }
            carregarBackground();
            carregarPeixe();
            carregarBolha();
            movimento();
            carregarBarreiras();
            colisao();
            carregarBackground2();
            quantidadePontos += velocidade/40;   
            carregarPontos();
            carregarCoracao();
            niveis();
            tempo = Date.now();
            if(bolhaStatus && Date.now() - tempobolha >= 2500){
                bolhaStatus = false;
            }    
        }
        else{
            gameOver();
            console.log("GAME OVER");
        }
    }
    requestAnimationFrame(loop);
}

let menu = true;
function loopMenu(){
    if(Date.now() - tempo >= (1000/60)){
        frame++;
        if(frame == 3){
            frame = 0;
            framePeixe++;
            if(framePeixe == 7){
                framePeixe = 0;
            }
        }
        carregarBackground();
        carregarMenu();
        carregarBackground2();
        tempo = Date.now();
    }
    if(menu){
        requestAnimationFrame(loopMenu);
    }
}loop();

//-----------------------------------------------------------------------------------------------//

//tela

var tela = false;
function ajusteTela (){
    if(screen.orientation.type == "portrait-primary" || screen.orientation.type == "portrait-secondary"){
        screen.orientation.lock("landscape-primary");
    }
    canvas.requestFullscreen();
}

//colisão

function colisao(){
    for(var n = 0; n<numeroBarreiras; n++){
        //if((peixeHitbox.x+peixeHitbox.w >= barreiras[n].x)
        //&&(peixeHitbox.x <= barreiras[n].x+barreiras[n].w)
        //&&(peixeHitbox.y+peixeHitbox.h >= barreiras[n].y)
        //&&(peixeHitbox.y <= barreiras[n].y+barreiras[n].h)
        //&&(barreiras[n].h != 0 && barreiras[n].w != 0)
        //&&( ! bolhaStatus)){
        if(peixeHitbox.x+peixeHitbox.w < barreiras[n].x+8) continue;
        if(peixeHitbox.x > barreiras[n].x+barreiras[n].w-16)continue
        if(peixeHitbox.y+peixeHitbox.h < barreiras[n].y+8)continue
        if(peixeHitbox.y > barreiras[n].y+barreiras[n].h-16)continue
        if(barreiras[n].h == 0 || barreiras[n].w == 0)continue
        if(bolhaStatus) continue
        tempobolha = Date.now();
        frameCoracao += 2; 
        au.play();
        bolhaStatus = true;    
        if(frameCoracao >= 6){
            vidaStatus = false;
        } 
        
    }
}

    //peixe.x = coracao?.x??45; --> Testar se existe

//gameOver

function gameOver(){
    carregarBackground();
    carregarPeixe();
    carregarBarreiras();
    carregarBackground2();
    carregarPontos();
    carregarCoracao();
}

//movimento

var gravidade = 1.4;
var nadar = 10;
function movimento(){
    if(keys.w.pressed && peixeHitbox.y >0){
        peixe.y -= nadar; 
    }
    else if (keys.s.pressed && peixeHitbox.y+peixeHitbox.h<height){
        peixe.y += nadar; 
    }
    else if(peixeHitbox.y+peixeHitbox.h<height){
        peixe.y += gravidade; 
    }
    if(keys.w.pressed || keys.s.pressed){
        if(!tela){
            ajusteTela();
            tela = true;
        }
    }
}

//mapa - barreiras

var velocidade = 14;
function atualizarBarreiras(){
    for(var i=0; i<numeroBarreiras; i++){
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

var variacao = 300;
var nivel = 1;
function niveis (){
    console.log("Velocidade = "+velocidade+"\nNadar = "+nadar);
    if(quantidadePontos-(variacao*nivel)>=0){
        nivel++;
        velocidade += 1;
        nadar += 0.25;
    }
}
//-----------------------------------------------------------------------------------------------//

//teclas

var keys = {
    w:{
        pressed:false,
    },
    s:{
        pressed:false,
    },
}

window.addEventListener("keydown", (evt)=>{
    if(evt.key){
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