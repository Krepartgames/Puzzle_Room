var fundo,cofreImg,tecladoImg,tecladoQue,sofaImg,quadroImg,imageCha,imageFera,ImageCodi,imagePor;
var quadro,sofa,cofre,teclado, armario, chave, porta;
var mochila, iconeCha, iconeFera, iconeCodi;
var TemFerramenta = false ;
var TemChave = false ;
var TemCodigo = false ;
var CofreAberto = false;
var tecladoQuebrado1 = true ;
var portaFechada = true ;
var enviar , FundoCofre;
var coletSond, winSond;
var mostrarCodi = false;
var caixa,tecladoBig,tecla8,tecla0,tcla3,tecla7,teclaErro,teclaApaga,codiBig;
var senha = "";
var senha8 = false;
var senha0 = false;
var senha3 = false;
var senha7 = false;

function preload(){
   fundo = loadImage("./Sprite/fundo.jpg")
   cofreImg = loadImage("./Sprite/cofre.png")
   tecladoImg = loadAnimation("./sprite/teclado.png")
   sofaImg = loadImage("./sprite/sofa.png")
   quadroImg = loadImage("./sprite/quadro.png")
   tecladoQue = loadAnimation("./sprite/tecladoQuebrado.png")
   imageCha = loadImage("./sprite/chave.png")
   imageFera = loadImage("./sprite/ferramentas.png")
   ImageCodi  = loadImage("./sprite/Codigo.png")
   imagePor = loadImage("./sprite/Saida.jpg")
   coletSond = loadSound("./sprite/coleta.mp3")
   winSond = loadSound("./sprite/Vitoria.mp3")
}

function setup() {
  createCanvas(1500,800);

  cofre = createSprite(600,230)
  cofre.addImage(cofreImg)
  cofre.scale = 0.3

  teclado = createSprite(600,230)
  teclado.addAnimation("quebrado",tecladoQue)
  teclado.scale = 0.05

  quadro = createSprite(600,230)
  quadro.addImage(quadroImg)
  quadro.scale = 0.30

  mochila = createSprite(1400,100,200,200)
  mochila.shapeColor = "cyan"

  iconeCha = createSprite(1350,50)
  iconeCha.addImage(imageCha)
  iconeCha.scale = 0.03

  iconeFera = createSprite(1450,50)
  iconeFera.addImage(imageFera)
  iconeFera.scale = 0.03

  iconeCodi = createSprite(1400,150)
  iconeCodi.addImage(ImageCodi)
  iconeCodi.scale = 0.03

  iconeCha.visible = false;
  iconeFera.visible = false;
  iconeCodi.visible = false;

  porta = createSprite(215,400)
  porta.addImage(imagePor)
  porta.visible = false;
  porta.scale = 0.55

  sofa = createSprite(630,630)
  sofa.addImage(sofaImg)
  sofa.scale = 1.7

  armario = createSprite(1350,600,200,200)
  armario.visible = false;

  FundoCofre = createSprite(600,230,104,104)
  FundoCofre.shapeColor = "SlateBlue";
  FundoCofre.visible = false;

  chave = createSprite(600,230)
  chave.addImage(imageCha)
  chave.scale = 0.02;
  chave.visible = false;

  caixa = createSprite(750,400,1500,800)
  caixa.shapeColor = "blue"
  caixa.visible = false;

  tecladoBig = createSprite(750,400)
  tecladoBig.addAnimation("Axi",tecladoImg)
  tecladoBig.scale = 0.3
  tecladoBig.visible = false;

  codiBig = createSprite(1200,400)
  codiBig.addImage(ImageCodi)
  codiBig.scale = 0.2
  codiBig.visible = false;
  
  teclaErro = createSprite(750,490,400,400)
  teclaErro.visible = false;

  teclaApaga = createSprite(635,650)
  teclaApaga.visible = false;

  tecla8 = createSprite(750,530)
  tecla8.visible = false;
  
  tecla0 = createSprite(750,650)
  tecla0.visible = false;

  tecla3 = createSprite(870,330)
  tecla3.visible = false;


  tecla7 = createSprite(635,530)
  tecla7.visible = false;

}

function draw() {
  background(fundo);
  fill("red") 
  textSize(20) 
  text(mouseX + ', ' + mouseY, 20,20)

  if(mostrarCodi){
    jogoSenha()
  }


  if(portaFechada){
    Play()
  } else{
    textAlign("center","center")
    textSize(50)
    text("YOU WIN",750,400)
  }

  drawSprites();

  textSize(60)
  text(senha, 690,190)
}

function Play(){
  moveItems()
  getItems()
  KeepItems()
  testandoSenha()
}

function moveItems(){
  if ( mousePressedOver(quadro)){
    var moveQua = quadro.y = quadro.y + 30
    var rotaQua = quadro.rotation = quadro.rotation + 5
    if (moveQua > 550){
      quadro.y = 550
    }
    if (rotaQua > 30){
      quadro.rotation = 30
    }
  }
  if ( mousePressedOver(sofa)){
    var sofaMove = sofa.x = sofa.x + 25
    if (sofaMove > 900){
      sofa.x = 900
    }

  }
}

function getItems(){
  if(mousePressedOver(armario) && !TemFerramenta){
    TemFerramenta = true
    coletSond.play()
  }
  if(mousePressedOver(teclado) && tecladoQuebrado1 && quadro.y > 400 && TemFerramenta){
    TemFerramenta = false;
    iconeFera.remove()
    teclado.addAnimation("consertado",tecladoImg)
    teclado.changeAnimation("consertado")
    console.log("teclado consertado")
    tecladoQuebrado1 = false;
  }

  if(mousePressedOver(teclado) && !tecladoQuebrado1 && !CofreAberto && !mostrarCodi){
    mostrarCodi = true;
    coletSond.play()
  }

  if (sofa.x === 900 && TemCodigo == false && !CofreAberto){
    TemCodigo = true;
    coletSond.play()
  }

  if(mousePressedOver(chave) && CofreAberto && TemChave == false){
    chave.visible = false;
    TemChave = true;
    iconeCha.visible = true
    coletSond.play()
  }

  if (mousePressedOver(porta) && TemChave && portaFechada){
    iconeCha.visible = false;
    porta.visible = true
    portaFechada = false
    winSond.play()
  }
}

function KeepItems(){
  
  if (TemFerramenta){
    iconeFera.visible = true;
  }

  if(TemCodigo){
    iconeCodi.visible = true
  }
}

function testandoSenha(){
  if(senha == 8037 && !CofreAberto){
    CofreAberto = true
    console.log("CofreAberto")
    FundoCofre.visible = true;
    chave.visible = true;
    iconeCodi.visible = false;
    caixa.visible = false;
    tecladoBig.visible = false;
    codiBig.visible = false;
    mostrarCodi = false;
    senha = ""
    TemCodigo = false;
  }
}

function jogoSenha(){
  console.log(senha)
  caixa.visible = true;
  tecladoBig.visible = true;
  if(TemCodigo){
    codiBig.visible = true;
  }
  if(mousePressedOver(teclaApaga)){
    caixa.visible = false;
    tecladoBig.visible = false;
    codiBig.visible = false;
    mostrarCodi = false;
    senha = ""
    senha8 = false;
    senha0 = false;
    senha3 = false;
    senha7 = false;
  }

  if(mousePressedOver(tecla8) && !senha8){
    senha += 8
    senha8 = true;
    coletSond.play()
  }

  if(mousePressedOver(tecla0) && !senha0){
    senha += 0
    senha0 = true;
    coletSond.play()
  }

  if(mousePressedOver(tecla3) && !senha3){
    senha += 3
    senha3 = true;
    coletSond.play()
  }

  if(mousePressedOver(tecla7) && !senha7){
    senha += 7
    senha7 = true;
    coletSond.play()
  }

}