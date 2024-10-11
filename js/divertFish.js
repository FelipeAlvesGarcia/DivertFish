const canvas = document.querySelector("#tela");
let ctx = canvas.getContext("2d");
let width = 2400;
let height = 1200;
canvas.width = width;
canvas.height = height;
let divMain = document.querySelector('main');

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
chao1Img.src = "imgDivertFish/chao1.png";
let chao2Img = new Image();
chao2Img.src = "imgDivertFish/chao2.png";
let peixeImg = new Image();
peixeImg.src = "imgDivertFish/peixe.png"
let coracaoImg = new Image();
coracaoImg.src = "imgDivertFish/coracao.png";
let lixosImg = new Image();
lixosImg.src = "./imgDivertFish/lixosConjunto.png";
let bolhasImg = new Image();
bolhasImg.src = "./imgDivertFish/bolhas.png";
let bolhaAtaqueImg = new Image();
bolhaAtaqueImg.src = "./imgDivertFish/bolhaAtaque.png";
let barreiraVerticalImg = new Image();
barreiraVerticalImg.src = "imgDivertFish/vertical.png";
let barreiraHorizontalImg = new Image();
barreiraHorizontalImg.src = "imgDivertFish/horizontal.png";
let bolhaImg = new Image();
bolhaImg.src = "imgDivertFish/bolha.png";
let powerUpImg = new Image();
powerUpImg.src = "imgDivertFish/powerUp.png";
let moedaImg = new Image();
moedaImg.src = "imgDivertFish/moeda.png";

//-----------------------------------------------------------------------------------------------//

//celular

const joyStick = document.querySelector("#joyStick");
let ctxJ = joyStick.getContext("2d");
let widthJ = 120;
let heightJ = 120;
joyStick.width = widthJ;
joyStick.height = heightJ;
let joystickStatus = false;

let Xc = widthJ/2;
let Yc = heightJ/2;
let Xn = Xc;
let Yn = Yc;
let raioCentro = 20;
let raio = 60;

joyStick.addEventListener('touchstart', (event) =>{
    const rect = joyStick.getBoundingClientRect();
    Xn = event.touches[0].clientX - rect.left;
    Yn = event.touches[0].clientY - rect.top;
    //console.log("\nSX -> "+rect.left);
    //console.log("SY -> "+rect.top);
    direcaoCelular();
});

joyStick.addEventListener('touchmove', (event) =>{  
    const rect = joyStick.getBoundingClientRect();
    let auxX = Xn;
    let auxY = Yn;
    Xn = event.changedTouches[0].clientX - rect.left;
    Yn = event.changedTouches[0].clientY - rect.top;
    if(((Xc - Xn)*(Xc - Xn)) + ((Yc - Yn)*(Yc - Yn)) > (raio-raioCentro)*(raio-raioCentro)){
        const angle = Math.atan2(Yn - heightJ / 2, Xn - widthJ / 2);
        Xn = widthJ / 2 + Math.cos(angle) * (raio-raioCentro);
        Yn = heightJ / 2 + Math.sin(angle) * (raio-raioCentro);
    }
    direcaoCelular();
});

joyStick.addEventListener('touchend', (event) =>{
    Xn = Xc;
    Yn = Yc;
    direcaoCelular();
});

function controle (){
    ctxJ.clearRect(0, 0, widthJ, heightJ);
    //base
    ctxJ.beginPath();
    ctxJ.arc(Xc, Yc, raio, 0, Math.PI * 2);
    ctxJ.fillStyle = 'rgba(100,100,100, 1)';
    ctxJ.fill();
    //joystick
    ctxJ.beginPath();
    ctxJ.arc(Xn, Yn, raioCentro, 0, Math.PI * 2);
    ctxJ.fillStyle = 'rgba(50,50,50, 1)';
    ctxJ.fill();
}

const minimoDeslocamento = raioCentro;
let deltaX, deltaY;
let a;
function direcaoCelular(){
    deltaX = Xn - Xc;
    deltaY = Yn - Yc;
    deltaY = -1*deltaY;
    //console.log("DX = "+deltaX);
    //console.log("DY = "+deltaY);
    if((deltaX >= minimoDeslocamento || deltaX <= -minimoDeslocamento) || (deltaY >= minimoDeslocamento || deltaY <= -minimoDeslocamento)){
        // SX SY 1 SX SY
        // EX EY 1 EX EY
        // X  Y  1 X  Y 
        a = deltaY / deltaX;
        //console.log("a = "+a)
        keys.d.pressed = false;
        keys.a.pressed = false;
        keys.w.pressed = false;
        keys.s.pressed = false;
        if(deltaX == 0 || deltaY == 0){
            if(deltaX == 0){
                if(deltaY > 0){keys.w.pressed = true} else{keys.s.pressed = true};
            }
            else if(deltaY == 0){
                if(deltaX > 0){keys.a.pressed = true} else{keys.d.pressed = true};
            }    
        }
        else{
            if(a > 0.4040 && a <= 4.3315){
                //console.log("eixo +XY");
                if(deltaY > 0){keys.w.pressed = true; keys.d.pressed = true} else{keys.s.pressed = true; keys.a.pressed = true};
            }
            else if(a < -0.4040 && a >= -4.3315){
                //console.log("eixo -XY");
                if(deltaY > 0){keys.w.pressed = true; keys.a.pressed = true} else{keys.s.pressed = true; keys.d.pressed = true};
            }
            else if(a <= 0.4040 && a >= -0.4040){
                //console.log("eixo X");
                if(deltaX > 0){keys.d.pressed = true} else{keys.a.pressed = true};
            }
            else if(a > 4.3315 || a < -4.3315){
                //console.log("eixo Y");
                if(deltaY > 0){keys.w.pressed = true} else{keys.s.pressed = true};
            }   
        }
    }
    else{
        keys.d.pressed = false;
        keys.a.pressed = false;
        keys.w.pressed = false;
        keys.s.pressed = false;
    }
    //console.log(direcao);
    //console.log(velocidade);*/
}

//teclas

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

//-----------------------------------------------------------------------------------------------//

let hitbox = false;
let tempoJogo = Date.now();
let vidaStatus = true;
let jogo = false;

let lastTime = Date.now();

function loopGame(){
    // Calcular o tempo decorrido entre os frames
    let deltaTime = Date.now() - lastTime;
    lastTime = Date.now();
    console.log(deltaTime); 

    if(Date.now() - tempoJogo >= (1000/60)){
        if(vidaStatus){
            ctx.clearRect(0, 0, width, height)
            peixe.frame = frame(peixe.frame, peixe.maxFrame);
            for(let i=0; i<powerUps.length; i++){
                powerUps[i].frame = frame(powerUps[i].frame, powerUps[i].maxFrame);
            }
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
            if(tiro.status){tiroBolha()}
            alocarPowerUp();
            carregarPowerUp();
            alocarMoeda();
            carregarMoeda();
            carregarBackground2();
            carregarPontos();
            carregarCoracao();
            carregarMenuPoderes();
            if(joystickStatus){controle()}

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
    if(jogo){
        window.requestAnimationFrame(loopGame);
    }
}

let menu = true;
function loopMenu(){
    if(Date.now() - tempoJogo >= (1000/60) && menu){
        peixe.frame = frame(peixe.frame, peixe.maxFrame);
        moeda[1].frame = frame(moeda[1].frame, moeda[1].maxFrame);
        carregarBackground();
        carregarChao();
        carregarMenu();
        carregarBackground2();
        carregarMenuPoderes();
        carregarMenuMoeda();
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

let botaoComecar = document.getElementById("botaoComecar");
let comecou = false;
botaoComecar.addEventListener("click", ()=>{
    if(!comecou){
        opcoesMenu.style.display = "block";
        botaoComecar.style.display = "none";
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
    if(itens[0].equipado){
        peixeImg.src = "imgDivertFish/peixe.png";
    }
    else if(itens[1].equipado){
        peixeImg.src = "imgDivertFish/peixeDourado.png";
    }
    else if(itens[2].equipado){
        peixeImg.src = "imgDivertFish/tartaruga.png";
    }
    else{
        peixeImg.src = "imgDivertFish/tubarao.png";
    }
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
function iniciarJogo(){
    if(joystickStatus)
        poderesBotao.style.display = "block";
    teclasImgStatus = false;
    teclasImg.style.transform = `translatex(0px)`;
    lojaStatus = false;
    loja.style.transform = `translatey(0px)`;
    placarStatus = false;
    placar.style.transform = `translatey(0px)`;
    ctxJ.clearRect(0, 0, widthJ, heightJ);
    
    ajusteTela();
    tela = true;   
    opcoesMenu.style.display = "none";
    menu = false;
    vidaStatus = true;
    musicaAberturaSom.pause();
    musica1Som.play();
    keys.d.pressed = false;
    keys.a.pressed = false;
    keys.w.pressed = false;
    keys.s.pressed = false;
    powerUpAtributos.dobroPontoStatus = false;
    powerUpAtributos.dobroVelocidadeStatus = false;
    peixe.x = 600;
    peixe.y = 536;
    coracao.frame = 0;
    primeirasBarreiras();
    quantidadePontos = 0;
    menuPoderes.quantidade[0] = 1 + quantidadeBolhasProtecao; 
    menuPoderes.quantidade[1] = 1 + quantidadeBolhasAtaque;
    for(let i=0; i<moeda.length; i++){
        moeda[i].y += height;
    }
    for(let i=0; i<powerUps.length; i++){
        powerUps[i].y += height;
        powerUps[i].tempoPower = 200 * (i);
    }
    tiro.y += height;
    velocidade = 14;
    nivel = 1;
    chance = true;
    jogo = true;
    loopGame();
}
jogar.addEventListener("click", iniciarJogo);

//

let teclasMostrar = document.querySelector("#teclas");
let teclasImg = document.querySelector("#teclasImg");  
let teclasImgStatus = false;
teclasMostrar.addEventListener("click", ()=>{
    lojaStatus = false;
    loja.style.transform = `translatey(0px)`;
    let aux = window.innerHeight / 100 * 45 + 2;
    if(teclasImgStatus){
        aux = 0;
    };
    teclasImg.style.transform = `translatex(${aux}px)`;
    (teclasImgStatus) ? teclasImgStatus = false : teclasImgStatus = true;

});

//

let lojaBotao = document.querySelector("#lojaBotao");
let loja = document.querySelector("#loja");
let lojaStatus = false;
let lojaVoltar = document.querySelector("#voltarLoja");
lojaBotao.addEventListener("click", ()=>{
    teclasImgStatus = false;
    teclasImg.style.transform = `translatex(0px)`;
    let aux = window.innerWidth / 100 * 40 + 2;
    if(lojaStatus){
        aux = 0;
    }
    else{
        let itensLojaDelete = document.querySelector("#itens");
        itensLojaDelete.remove();
        carregarItensLoja();
    }
    loja.style.transform = `translatey(${-aux}px)`;
    (lojaStatus) ? lojaStatus = false : lojaStatus = true;
});
lojaVoltar.addEventListener("click", ()=>{
    teclasImgStatus = false;
    teclasImg.style.transform = `translatex(0px)`;
    let aux = window.innerWidth / 100 * 40 + 2;
    if(lojaStatus){
        aux = 0;
    };
    loja.style.transform = `translatey(${-aux}px)`;
    (lojaStatus) ? lojaStatus = false : lojaStatus = true;
});

//

let placar = document.querySelector("#placar");
let placarTabela = document.querySelector("#tabela");
let placarLideres = [];
function carregarPlacarLideres(){
    let placarBody = document.createElement('tbody');
    placarBody.id = "placarBody";
    let contPlacar;
    for(contPlacar = 1;contPlacar <=100; contPlacar++){
        if(placarLideres[contPlacar] == undefined){
            placarLideres[contPlacar] = {
                nome: "",
                pontuacao: 0,
                moedas: 0,
                rank: contPlacar
            }
        }
    }
    for(contPlacar = 1;contPlacar <=100; contPlacar++){
        for(let testePlacar = 1; testePlacar <contPlacar; testePlacar++){
            if(placarLideres[testePlacar].pontuacao < placarLideres[contPlacar].pontuacao){
                let auxNome = placarLideres[contPlacar].nome;
                let auxPontuacao = placarLideres[contPlacar].pontuacao;
                let auxMoedas = placarLideres[contPlacar].moedas;

                placarLideres[contPlacar].nome = placarLideres[testePlacar].nome;
                placarLideres[contPlacar].pontuacao = placarLideres[testePlacar].pontuacao;
                placarLideres[contPlacar].moedas = placarLideres[testePlacar].moedas;

                placarLideres[testePlacar].nome = auxNome;
                placarLideres[testePlacar].pontuacao = auxPontuacao;
                placarLideres[testePlacar].moedas = auxMoedas;
                
            }
        }
    }
    for(contPlacar = 1;contPlacar <=100; contPlacar++){
        let tr = document.createElement('tr');
        let tdRank = document.createElement('td');
        let tdNome = document.createElement('td');
        let tdPontos = document.createElement('td');
        let tdMoedas = document.createElement('td');
        tdRank.innerHTML = placarLideres[contPlacar].rank;
        tdNome.innerHTML = placarLideres[contPlacar].nome;
        tdPontos.innerHTML = placarLideres[contPlacar].pontuacao;
        tdMoedas.innerHTML = placarLideres[contPlacar].moedas;
        tr.appendChild(tdRank);
        tr.appendChild(tdNome);
        tr.appendChild(tdPontos);
        tr.appendChild(tdMoedas);
        placarBody.appendChild(tr);
    }  
    placarTabela.appendChild(placarBody);  
}carregarPlacarLideres();

let placarBotao = document.querySelector("#placarBotao");
let placarVoltar = document.querySelector("#placarVoltar");
let placarStatus = false;
placarBotao.addEventListener("click", ()=>{
    teclasImgStatus = false;
    teclasImg.style.transform = `translatex(0px)`;
    let aux = window.innerWidth / 100 * 40 + 2;
    if(placarStatus){
        aux = 0;
    }
    else{
        let placarDelete = document.querySelector("#placarBody");
        placarDelete.remove();
        carregarPlacarLideres();
    }
    placar.style.transform = `translatey(${-aux}px)`;
    (placarStatus) ? placarStatus = false : placarStatus = true;
});
placarVoltar.addEventListener("click", ()=>{
    teclasImgStatus = false;
    teclasImg.style.transform = `translatex(0px)`;
    let aux = window.innerWidth / 100 * 40 + 2;
    if(placarStatus){
        aux = 0;
    };
    placar.style.transform = `translatey(${-aux}px)`;
    (placarStatus) ? placarStatus = false : placarStatus = true;
});


//Loja

let itens = [];
itens[0] = {
    comprado:true,
    img:"imgDivertFish/peixeLoja.png",
    preco:0,
    nome:"Peixe Palhaço",
    equipado:true,
    skin:true
}
itens[1] = {
    comprado:false,
    img:"imgDivertFish/peixeDouradoLoja.png",
    preco:200,
    nome:"Peixe Dourado",
    equipado:false,
    skin:true
}
itens[2] = {
    comprado:false,
    img:"imgDivertFish/tartarugaLoja.png",
    preco:370,
    nome:"Tartaruga",
    equipado:false,
    skin:true
}
itens[3] = {
    comprado:false,
    img:"imgDivertFish/tubaraoLoja.png",
    preco:600,
    nome:"Tubarão",
    equipado:false,
    skin:true
}
itens[4] = {
    comprado:false,
    img:"imgDivertFish/bolhaAtaque.png",
    preco:9,
    nome:"Bolha Mágica",
    equipado:false,
    skin:false
}
itens[5] = {
    comprado:false,
    img:"imgDivertFish/bolha.png",
    preco:15,
    nome:"Bolha de Proteção",
    equipado:false,
    skin:false
}

let lojaMain = document.querySelector("#loja");
function carregarItensLoja (){
    let itensLoja = document.createElement('div');
    itensLoja.id = "itens";
    for(let i=0; i<itens.length; i++){
        let item = document.createElement('div');
        item.classList.add("item");

        let h3 = document.createElement('h3');
        h3.innerHTML = itens[i].nome;
        item.appendChild(h3);

        let imgItem = document.createElement('img');
        imgItem.src = itens[i].img;
        item.appendChild(imgItem);

        let statusItem = document.createElement('div');
        item.appendChild(statusItem);

        if(itens[i].comprado){
            statusItem.classList.add("statusComprado");
            let itemH4 = document.createElement('h4');
            if(itens[i].equipado){
                item.classList.add("equipado");
                itemH4.innerText = "Equipado";
            }
            else{
                item.classList.add("equipar");
                itemH4.innerText = "Equipar";

                item.addEventListener('click', () =>{
                    for(let j=0; j<itens.length; j++){
                        if(itens[j].equipado)
                            itens[j].equipado = false;
                    }
                    itens[i].equipado = true;
                    
                    let atualizaLoja = document.querySelector("#itens");
                    atualizaLoja.remove();
                    carregarItensLoja();  
                });
            }
            statusItem.appendChild(itemH4);
        }
        else{
            item.classList.add("comprar");
            statusItem.classList.add("statusComprar");

            let itemBotaoComprar = document.createElement('button');
            itemBotaoComprar.innerText = "Comprar";
            itemBotaoComprar.classList.add("botaoComprar");
            statusItem.appendChild(itemBotaoComprar);

            let itemValor = document.createElement('div');
            statusItem.appendChild(itemValor);
            let moedaValor = document.createElement('img');
            moedaValor.src = "imgDivertFish/moedaLoja.png";
            itemValor.appendChild(moedaValor);
            let precoValor = document.createElement('h4');
            precoValor.innerHTML = itens[i].preco;
            itemValor.appendChild(precoValor);

            if(itens[i].skin){
                itemBotaoComprar.addEventListener('click', () =>{
                    if(quantidadeMoedaTotal >= itens[i].preco){
                        quantidadeMoedaTotal -= itens[i].preco;
                        itens[i].comprado = true;

                        let atualizaLoja = document.querySelector("#itens");
                        atualizaLoja.remove();
                        carregarItensLoja();    
                    }
                });
            }
            else{
                itemBotaoComprar.addEventListener('click', () =>{
                    if(quantidadeMoedaTotal >= itens[i].preco){
                        quantidadeMoedaTotal -= itens[i].preco;
                        if(itens[i].preco == 15){
                            quantidadeBolhasProtecao += 1;
                        }
                        else{
                            quantidadeBolhasAtaque += 1;
                        }
                        menuPoderes.quantidade[0] = 1 + quantidadeBolhasProtecao; 
                        menuPoderes.quantidade[1] = 1 + quantidadeBolhasAtaque;

                        /*let atualizaLoja = document.querySelector("#itens");
                        atualizaLoja.remove();
                        carregarItensLoja();*/
                    }
                });
            }
        }
        itensLoja.appendChild(item);
    }
    lojaMain.appendChild(itensLoja);
}

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
            else if(vidaStatus || menu){
                chao[i].x -= chao[i].variacao+(nadar-10);
            }
        }
        else{
            if(chao[i].x < -chao[i-1].w){
                chao[i].x = chao[i-1].x+chao[i].w;
            }
            else if(vidaStatus || menu){
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
    if(itens[0].equipado){
        peixeImg.src = "imgDivertFish/peixe.png";
    }
    else if(itens[1].equipado){
        peixeImg.src = "imgDivertFish/peixeDourado.png";
    }
    else if(itens[2].equipado){
        peixeImg.src = "imgDivertFish/tartaruga.png";
    }
    else{
        peixeImg.src = "imgDivertFish/tubarao.png";
    }
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
    x:width - 208,
    y:32,
    w:160,
    h:48,
    frame:0
}

function carregarCoracao(){
    coracao.sx = coracao.frame * 160,
    ctx.drawImage(coracaoImg, coracao.sx, coracao.sy, coracao.sw, coracao.sh, coracao.x, coracao.y, coracao.w, coracao.h);
}

//Barreiras

let ultimaBarreira = 0;
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
        if(tipo == 0 && !bolha.status){
            if(n>3){
                ultimaBarreira = barreiras[n].frame;
            }
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
        if(tipo == 2){
            barreiras[n].y -= height;
        }
        testeColisao = false;
        return testeColisao;
    }
    return testeColisao;
}

//Pontos

let quantidadePontos = 0;
let pontos = {
    nx:32,
    ny:64,
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

let quantidadeBolhasProtecao = 0;
let quantidadeBolhasAtaque = 0;
let menuPoderes = {
    fonte:"40px serif",
    sx:0,
    sy:0,
    sw:144,
    sh:144,
    x:width-112,
    y:[],
    w:32,
    h:32,
    tipo:0,
    quantidade:[],
}
menuPoderes.y[0] = height - 64;
menuPoderes.y[1] = height - 112;
menuPoderes.quantidade[0] = 1; //bolha
menuPoderes.quantidade[1] = 1; //tiro

function carregarMenuPoderes (){
    ctx.font = menuPoderes.fonte;
    ctx.fillStyle = "rgb(255,255,255)";
    for(tipo = 0; tipo < menuPoderes.quantidade.length; tipo++){
        ctx.fillText(menuPoderes.quantidade[tipo], menuPoderes.x+menuPoderes.w+8, menuPoderes.y[tipo]+27);
        if(tipo == 0){
            ctx.drawImage(bolhaImg, menuPoderes.sx*menuPoderes.tipo, menuPoderes.sy, menuPoderes.sw, menuPoderes.sh, menuPoderes.x, menuPoderes.y[tipo], menuPoderes.w, menuPoderes.h);
        }
        else{
            ctx.drawImage(bolhaAtaqueImg, menuPoderes.sx*menuPoderes.tipo, menuPoderes.sy, menuPoderes.sw, menuPoderes.sh, menuPoderes.x, menuPoderes.y[tipo], menuPoderes.w, menuPoderes.h);
        }
    }
}

//
let celularBolhaProtecao = document.querySelector("#bolhaProtecao");
celularBolhaProtecao.addEventListener("click", ()=>{
    if(!bolha.status && menuPoderes.quantidade[0] > 0){
        bolha.tempo = Date.now();
        bolha.status = true;
        menuPoderes.quantidade[0]--;
        if(quantidadeBolhasProtecao > 0){
            quantidadeBolhasProtecao--;
        }
    }
});

window.addEventListener("keydown", (evt)=>{
    if(!bolha.status &&  evt.key == 'b' && menuPoderes.quantidade[0] > 0){
        bolha.tempo = Date.now();
        bolha.status = true;
        menuPoderes.quantidade[0]--;
        if(quantidadeBolhasProtecao > 0){
            quantidadeBolhasProtecao--;
        }
    }
});

//

let tiro = {
    sx:0,
    sy:0,
    sw:144,
    sh:144,
    x:peixeHitbox.x+peixeHitbox.w,
    y:peixeHitbox.y+((peixeHitbox.h-8)/2),
    w:32,
    h:32,
    status:false,
    velocidade:15,
}

function tiroBolha (){
    tiro.x += tiro.velocidade;
        colisao(tiro.x, tiro.y, tiro.w, tiro.h, 2);
    if(tiro.x > width){
        tiro.status = false;
    }
    ctx.drawImage(bolhaAtaqueImg, tiro.sx, tiro.sy, tiro.sw, tiro.sh, tiro.x, tiro.y, tiro.w, tiro.h);
}

let celularBolhaAtaque = document.querySelector("#bolhaAtaque");
celularBolhaAtaque.addEventListener("click", ()=>{
    if(!tiro.status && menuPoderes.quantidade[1] > 0){
        menuPoderes.quantidade[1]--;
        if(quantidadeBolhasAtaque > 0){
            quantidadeBolhasAtaque --;
        }
        tiro.x = peixeHitbox.x+peixeHitbox.w;
        tiro.y = peixeHitbox.y+((peixeHitbox.h-tiro.h)/2);
        tiro.status = true;
    }
});

window.addEventListener("keydown", (evt)=>{
    if(!tiro.status && evt.key == 'v' && menuPoderes.quantidade[1] > 0){
        menuPoderes.quantidade[1]--;
        if(quantidadeBolhasAtaque > 0){
            quantidadeBolhasAtaque --;
        }
        tiro.x = peixeHitbox.x+peixeHitbox.w;
        tiro.y = peixeHitbox.y+((peixeHitbox.h-tiro.h)/2);
        tiro.status = true;
    }
})

//Power Up

let powerUpAtributos = {
    dobroPonto : 0,
    dobroPontoMax : 10000,
    dobroPontoStatus : false,
    dobroVelocidade : 0,
    dobroVelocidadeMax : 10000,
    dobroVelocidadeStatus : false,
}

let minTempoPower = 200;
let maxTempoPower = 400;
let powerUps = []
powerUps[0] = {sx:64, sy:0, sw:64, sh:64, x:-width, y:0, w:48, h:48, tipo:ale(0, 5), frame:0, maxFrame:7, tempoPowerPassado: ale(minTempoPower, maxTempoPower), tempoPower : 0 + quantidadePontos}
powerUps[1] = {sx:64, sy:0, sw:64, sh:64, x:-width, y:0, w:48, h:48, tipo:ale(0, 5), frame:0, maxFrame:7, tempoPowerPassado: ale(minTempoPower, maxTempoPower), tempoPower : 200 + quantidadePontos}
powerUps[2] = {sx:64, sy:0, sw:64, sh:64, x:-width, y:0, w:48, h:48, tipo:ale(0, 5), frame:0, maxFrame:7, tempoPowerPassado: ale(minTempoPower, maxTempoPower), tempoPower : 400 + quantidadePontos}


function alocarPowerUp (){
    for(let i=0; i<powerUps.length; i++){
        powerUps[i].x -= velocidade;
        if(powerUps[i].tempoPower <= quantidadePontos){
            powerUps[i].tempoPowerPassado = (maxTempoPower-powerUps[i].tempoPowerPassado) + ale(minTempoPower, maxTempoPower);
            powerUps[i].tempoPower = powerUps[i].tempoPowerPassado + quantidadePontos;
            powerUps[i].tipo = ale(0, 5);
            powerUps[i].x = width;
            let espacoLivre;
            do{
                espacoLivre = true;
                powerUps[i].y = ale(0, 1200 - powerUps[i].h);
                if(!colisao(powerUps[i].x, powerUps[i].y, powerUps[i].w, powerUps[i].h, 1)){
                    espacoLivre = false;
                }
            }while(!espacoLivre);
        }    
    }
    
}

function colisaoPowerUp(x, y, w, h){
    for(let i=0; i<powerUps.length; i++){
        if((x + w >= powerUps[i].x)
        &&(x <= powerUps[i].x + powerUps[i].w)
        &&(y + h >= powerUps[i].y)
        &&(y <= powerUps[i].y + powerUps[i].h)){
            powerUps[i].x -= width;
            if(powerUps[i].tipo == 0){
                powerUpSom.play();
                if(coracao.frame > 0)
                    coracao.frame -= 2;
            }
            else if(powerUps[i].tipo == 1){
                powerUpSom.play();
                menuPoderes.quantidade[0]++;   
            }
            else if(powerUps[i].tipo == 2){
                powerUpSom.play();
                powerUpAtributos.dobroPonto = Date.now();
                powerUpAtributos.dobroPontoStatus = true;
            }
            else if(powerUps[i].tipo == 3){
                powerUpSom.play();
                powerUpAtributos.dobroVelocidade = Date.now();
                powerUpAtributos.dobroVelocidadeStatus = true;
            }
            else if(powerUps[i].tipo == 4){
                superPowerUpSom.play();
                for(let i=0; i<barreiras.length; i++){
                    barreiras[i].y = -height;
                }
            }
            else if(powerUps[i].tipo == 5){
                powerUpSom.play();
                menuPoderes.quantidade[1] += 2;
            }
        }    
    }
    
}

function carregarPowerUp (){
    for(let i=0; i<powerUps.length; i++){
        powerUps[i].sx = 64 * powerUps[i].frame;
        ctx.drawImage(powerUpImg, powerUps[i].sx, powerUps[i].sy, powerUps[i].sw, powerUps[i].sh, powerUps[i].x, powerUps[i].y, powerUps[i].w, powerUps[i].h);    
    }
}

//Moeda

let quantidadeMoeda = 0;
let quantidadeMoedaTotal = 0;
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

let somMoeda = 0;
function colisaoMoeda(x, y, w, h){
    for(let i=0; i<moeda.length; i++){
        if((x + w >= moeda[i].x)
            &&(x <= moeda[i].x + moeda[i].w)
            &&(y + h >= moeda[i].y)
            &&(y <= moeda[i].y + moeda[i].h)){
            if(somMoeda == 0){
                moedaSom.play();
                somMoeda = 1;
            }
            else{
                moeda2Som.play();
                somMoeda = 0;
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

let menuMoeda = {
    x:32,
    y:32,
    nx:32+moeda[1].w+10,
    ny:74,
    fonte:"57px serif",
}
function carregarMenuMoeda (){
    ctx.drawImage(moedaImg, moeda[1].sx*moeda[1].frame, moeda[1].sy, moeda[1].sw, moeda[1].sh, menuMoeda.x, menuMoeda.y, moeda[1].w, moeda[1].h); 
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.font = menuMoeda.fonte;
    ctx.fillText(quantidadeMoedaTotal, menuMoeda.nx, menuMoeda.ny);
}

//tela

let poderesBotao = document.querySelector("#poderes");
function ajusteTela (){
    /*if(screen.orientation.type == "portrait-primary" || screen.orientation.type == "portrait-secondary"){
        screen.orientation.lock("landscape-primary");
    }*/
    if(window.innerWidth < 1100){
        poderesBotao.style.display = "flex";
        joystickStatus = true;
    }
    divMain.requestFullscreen();
}

//gameOver

const pergunta = document.querySelector("#pergunta");
const lixoPerguntaImg = document.querySelector("#lixoPerguntaImg");
const alterA = document.querySelector("#alterA");
const alterB = document.querySelector("#alterB");
const alterC = document.querySelector("#alterC");
const alterD = document.querySelector("#alterD");
const alterE = document.querySelector("#alterE");

let alternativas = {
    a:false,
    b:false,
    c:false,
    d:false,
    e:false
}
chance = true;

function gameOver (){
    poderesBotao.style.display = "none";
    ctxJ.clearRect(0, 0, widthJ, heightJ);
    pergunta.style.display = "flex";
    lixoPerguntaImg.style.transform = "translateX(calc("+ultimaBarreira+" * -12vw))";
    if(ultimaBarreira == 0){
        alternativas = {a:false, b:false, c:false, d:true, e:false};
    }
    else if(ultimaBarreira < 3){
        alternativas = {a:true, b:false, c:false, d:false, e:false};
    }
    else if(ultimaBarreira < 6){
        alternativas = {a:false, b:false, c:true, d:false, e:false};
    }
    else if(ultimaBarreira < 10){
        alternativas = {a:false, b:true, c:false, d:false, e:false};
    }
}

function gameOverCarregar(){
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

function corretaVida (){
    keys.d.pressed = false;
    keys.a.pressed = false;
    keys.w.pressed = false;
    keys.s.pressed = false;
    powerUpAtributos.dobroPontoStatus = false;
    powerUpAtributos.dobroVelocidadeStatus = false;
    vidaStatus = true;
    musica1Som.play();
    coracao.frame = 4;
    bolha.tempo = Date.now();
    bolha.status = true;  
    for(let i=0; i<barreiras.length; i++){
        barreiras[i].y = -height;
    }
    pergunta.style.display = "none"; 
    ajusteTela();
    return false;
}

function finalizarJogo (){
    console.log("Voltar")
    pergunta.style.display = "none";
    opcoesMenu.style.display = "block";
    menu = true;
    tempoJogo = Date.now();
    nadar = 10;
    menuPoderes.quantidade[0] = 1 + quantidadeBolhasProtecao; 
    menuPoderes.quantidade[1] = 1 + quantidadeBolhasAtaque;
    jogo = false;
    vidaStatus = false;
    musicaAberturaSom.play();
    loopMenu();
}

let result = document.querySelector("#gameoverResult");
let jogarNovamente = document.querySelector("#jogarNovamente");
let voltarHome = document.querySelector("#voltarHome");
let pontosResult = document.querySelector("#pontosResult");
let pontosTotalResult = document.querySelector("#pontosTotalResult");
let lixeiraCorreta = document.querySelector("#lixeiraCorreta");
let moedasResult = document.querySelector("#moedasResult");
function resultados (alterCorreta){
    let pontuacaoTotal;
    if(alterCorreta){
        lixeiraCorreta.innerHTML = "Descarte do lixo: Correto (+ " + Math.round(quantidadePontos/10) + " pontos)";
        pontuacaoTotal = Math.round(quantidadePontos) + Math.round(quantidadePontos/10);
    }
    else{
        lixeiraCorreta.innerHTML = "Descarte do lixo: Incorreto (+ 0 pontos)";
        pontuacaoTotal = Math.round(quantidadePontos);
    }
        
    pontosResult.innerHTML = "Pontuação: " + Math.round(quantidadePontos);
    pontosTotalResult.innerHTML = "Pontuação Total: " + pontuacaoTotal;
    moedasResult.innerHTML = "Moedas pegas: " + quantidadeMoeda;
    quantidadeMoedaTotal += quantidadeMoeda;
    pergunta.style.display = "none";
    result.style.display = "flex";

    for(let n=100; n>0; n--){
        if(pontuacaoTotal >= placarLideres[n].pontuacao){
            if(n < 100){
                for(let m=n; m<100; m++){
                    placarLideres[m].pontuacao = placar[m-1].pontuacao;
                    placarLideres[m].nome = placar[m-1].nome;
                    placarLideres[m].moedas = placar[m-1].moedas;
                }
            }
            placarLideres[n].pontuacao = pontuacaoTotal;
            placarLideres[n].nome = "teste"+n;  
            placarLideres[n].moedas = quantidadeMoeda;
            console.log(quantidadeMoeda)
            break;
        }
    }
    quantidadeMoeda = 0;
    let placarDelete = document.querySelector("#placarBody");
    placarDelete.remove();
    carregarPlacarLideres();
}

jogarNovamente.addEventListener("click", ()=>{
    tempoJogo = Date.now();
    nadar = 10;
    vidaStatus = true;
    result.style.display = "none";
    iniciarJogo();
});

voltarHome.addEventListener("click", ()=>{
    result.style.display = "none";
    finalizarJogo();
});



alterA.addEventListener("click", ()=>{
    if(alternativas.a && chance){
        chance = corretaVida();
    }
    else{
        resultados(alternativas.a);
    }
});

alterB.addEventListener("click", ()=>{
    if(alternativas.b && chance){
        chance = corretaVida();
    }
    else{
        resultados(alternativas.b);
    }
});

alterC.addEventListener("click", ()=>{
    if(alternativas.c && chance){
        chance = corretaVida();
    }
    else{
        resultados(alternativas.c);
    }
});

alterD.addEventListener("click", ()=>{
    if(alternativas.d && chance){
        chance = corretaVida();
    }
    else{
        resultados(alternativas.d);
    }
});

alterE.addEventListener("click", ()=>{
    if(alternativas.e && chance){
        chance = corretaVida();
    }
    else{
        resultados(alternativas.e);
    }
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