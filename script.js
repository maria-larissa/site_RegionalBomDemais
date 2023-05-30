window.onload = (event) => {
  // console.log("page is fully loaded");
  // Página sempre começa na primeira secção
  window.scroll(0, 0);
  // delay para mostrar o card da banda
  setTimeout(mostrarCardBanda, 3000);
}


// CARD BANDA
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const menu = document.querySelector(".menu");
const cardFotoBanda = document.querySelector(".card-foto-banda");

// Vetor com todos os elementos que irão ter filtro blur
var listElementosBlur = [main, header, footer, menu];



function mostrarCardBanda(){
  listElementosBlur.forEach(function(element){
    element.classList.add("card-blur");
  })
  cardFotoBanda.style.display = "flex";
}

function esconderCardBanda(){
  cardFotoBanda.style.display = "none";
  listElementosBlur.forEach(function(element){
    element.classList.remove("card-blur");
  })

}


// Se clicar no botão para fechar o card-banda
const btnFecharCardBanda = document.getElementById("icone-close-card-banda");
btnFecharCardBanda.onclick = function(){
  //display block para card foto banda 
  // console.log("Apertou no botão fechar");
  esconderCardBanda();
}
  

// MENU HAMBURGUER
const menuNav = document.querySelector('.menu-mobile'); 
const btnAbrirMenu = document.getElementById("icone-menu");
const btnFecharMenu = document.getElementById("icone-close");

btnAbrirMenu.onclick = function(){
  // if(!cardConteudoPrincipal.classList.contains("card-blur")){
    // console.log("Clicou botão menu");
    // menuNav.style.display = "block";
  // }
  
  if(! (listElementosBlur.forEach(function(element){
    element.classList.contains("card-blur");
  }))){
    menuNav.style.display = "flex";
    // main.style.display = "none";
  }
}

btnFecharMenu.onclick = function() {
  // menuNav.style.display = "none";
  // if(!cardConteudoPrincipal.classList.contains("card-blur")){
  //   menuNav.style.display = "none";
  // }

  if(! (listElementosBlur.forEach(function(element){
      element.classList.contains("card-blur");
  }  ))){
    menuNav.style.display = "none";
    // main.style.display = "block";

  }
}

// Caso clique em algum link do menu mobile esconde o menu mobile
const elementosMenuMobile = document.querySelectorAll('.menu-mobile .link-menu');
elementosMenuMobile.forEach( element => {
  element.addEventListener('click',() =>{
    console.log("clicou");
    menuNav.style.display = "none";
  })
})




// botão submenu
const btnSubmenu = document.getElementById("btn-abrir-submenu");
const submenu = document.querySelector(".submenu");
var visivel = false;

btnSubmenu.addEventListener("click", function(){
  // console.log(visivel);
  // console.log("Clicou no botao do submenu");
  if(!visivel){
    submenu.style.visibility = "visible";
    visivel = true;
  }else{
    submenu.style.visibility = "hidden";
    visivel = false;
  }
})

// Caso clique em algum link do submenu esconde o submenu
const elementosSubmenu = document.querySelectorAll(".link-submenu");
elementosSubmenu.forEach( element => {
  element.addEventListener('click',() =>{
    submenu.style.visibility = "hidden";
    visivel = false;
  })
})

// SCROLL sections do site

// Selecionando somente os elementos do menu com links internos, ou seja começão com #
const menuItens = document.querySelectorAll(".menu nav a[href^='#']");


// Redefinindo a animação do scroll
// Função do Clément Bourgoin
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  // Duração de tempo padrao
  duration = typeof duration !== "undefined" ? duration : 400;


  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
} 

function getDistanciaTop(element){
  // Calculando a distância de cada section ao top da tela, medida em pixels
  const distanciaTopo = element.offsetTop;
  // console.log(distanciaTopo);
  return distanciaTopo;
}

function scrollToSection(event){
  // Concerta scroll brusco e id do elemento no link da página
  event.preventDefault();
  
  // Pegando cada elemento ao ser clicado
  const elemento = event.target;
  // console.log(elemento);
  
  // Pegando o link alvo do elemnto clicado
  const idAlvo = elemento.getAttribute("href");
  
  // Armazenando a section alvo
  const section = document.querySelector(idAlvo);
  // console.log(section);
  
  var distancia = getDistanciaTop(section) - 75;

  smoothScrollTo(0 , distancia, 800);
}

menuItens.forEach((link) => {
    link.addEventListener("click", scrollToSection)
  }
)


// carrossel mobile
const controlesCarrosel = document.querySelectorAll('.controles-carrossel');
// console.log(controlesCarrosel);
let elementoAtual = 0;

let eventosCarrossel = document.querySelectorAll('.evento');
const quantidadeEventosCarrossel = eventosCarrossel.length;

// sempre que a página estiver carregada o primeiro evento sempre é centralizado
if(document.readyState == 'loading'){
  // console.log(document.readyState);
  eventosCarrossel[0].scrollIntoView({
    inline: "center",
    block:    "nearest",
    behavior: "smooth",
  })
}

controlesCarrosel.forEach(controle => {
  controle.addEventListener('click', () =>{
    // Saber se o click foi na seta da esquerda
    const setaesquerda = controle.classList.contains('seta-esquerda');
    
    
    if(setaesquerda){
      // volta p/ evento anterior
      elementoAtual -= 1;
    }
    else{
      // passa p/ próximo evento
      elementoAtual += 1;
    }


    // scroll infinito do carrossel. Chega no final volta pro primeiro, se tiver no primeiro volta pro final
    if(elementoAtual >= quantidadeEventosCarrossel){
      elementoAtual = 0;
    }if(elementoAtual < 0){
      elementoAtual = quantidadeEventosCarrossel -1 ; 
    }

    // Retira a classa elemntos atual de todo ao clicar nas setas
    eventosCarrossel.forEach(evento => evento.classList.remove('evento-atual'));

    // Centraliza o elemnto
    eventosCarrossel[elementoAtual].scrollIntoView({
      inline: "center",
      block:    "nearest",
      behavior: "smooth",
    })
    
    // Colocar a class elementos atual somente no evento correto
    eventosCarrossel[elementoAtual].classList.add('evento-atual');
  })
})


// player de músicas
const barraProgresso = document.getElementById("barra-progresso");
const musica = document.getElementById("musica");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnPlayMusica = document.getElementById("btn-play-musica");
const btnPausarMusica = document.getElementById("btn-pausar-musica");
const btnMusicaAnterior = document.getElementById("btn-musica-anterior");
const btnProximaMusica = document.getElementById("btn-proxima-musica");
let tituloMusica = document.querySelector(".player-musicas h1");
let artistaMusica = document.querySelector(".player-musicas p");
let idMusica = 0;
let listaMusicas = [
  {
    titulo: "A Morte do Vaqueiro",
    artista: "Regional bom demais",
    src: "CSS/musicas/A Morte do Vaqueiro - Regional bom demais.mp3"
  },
  {
    titulo: "Anunciação",
    artista: "Regional bom demais",
    src: "CSS/musicas/Anunciação - Regional bom demais.mp3"
  },
  {
    titulo: "Até mais ver",
    artista: "Regional bom demais",
    src: "CSS/musicas/Até mais ver -Regional bom demais.mp3"
  },
  {
    titulo: "Colo de menina",
    artista: "Regional bom demais",
    src: "CSS/musicas/Colo de menina - Regional bom demais.mp3"
  },
  {
    titulo: "É Proibido Cochilar",
    artista: "Regional bom demais",
    src: "CSS/musicas/É Proibido Cochilar - Regional bom demais.mp3"
  },
  {
    titulo: "Espumas ao vento - Regional bom demais",
    artista: "Regional bom demais",
    src: "CSS/musicas/Espumas ao vento - Regional bom demais.mp3"
  },
  {
    titulo: "Pagode russo",
    artista: "Regional bom demais",
    src: "CSS/musicas/Pagode russo - Regional bom demais.mp3"
  },
  {
    titulo: "Pra Todo Mundo",
    artista: "Regional bom demais",
    src: "CSS/musicas/Pra Todo Mundo - Regional bom demais .mp3"
  },
  {
    titulo: "Respeita Januário",
    artista: "Regional bom demais",
    src: "CSS/musicas/Respeita Januário - Regional bom demais.mp3"
  },
  {
    titulo: "Xote dos milagres",
    artista: "Regional bom demais",
    src: "CSS/musicas/Xote dos milagres - Regional bom demais.mp3"
  },
]
let quantidademusicas = listaMusicas.length;
console.log(quantidademusicas);
console.log(tituloMusica);
console.log(artistaMusica);


// Atualiza barra de progesso ao selecionar música
musica.onloadedmetadata = function(){
  barraProgresso.max = musica.duration;
  barraProgresso.value = musica.currentTime;
  console.log(listaMusicas[idMusica].titulo);
  console.log(listaMusicas[idMusica].artista);
  tituloMusica.textContent = listaMusicas[idMusica].titulo;
  artistaMusica.textContent = listaMusicas[idMusica].artista;
}

// Atulização da barra de progresso enquanto toca música
if(musica.play()){
  setInterval(() => {
    barraProgresso.value = musica.currentTime;
  }, 450);
}



btnPlayPause.onclick = function(){
  if(btnPlayPause.classList.contains("play")){
    musica.play();
    btnPlayPause.classList.remove("play");
    btnPlayPause.classList.add("pause");
    btnPlayMusica.style.display = "none";
    btnPausarMusica.style.display = "block";
    
  }else{
    musica.pause();
    btnPlayPause.classList.add("play");
    btnPlayPause.classList.remove("pause");
    btnPausarMusica.style.display = "none";
    btnPlayMusica.style.display = "block";
  }
};



barraProgresso.onchange = function(){
  musica.play();
  btnPlayPause.classList.remove("play");
  btnPlayPause.classList.add("pause");
  musica.currentTime = barraProgresso.value;
}


btnMusicaAnterior.onclick = function(){
  btnPlayPause.classList.add("play");
  btnPlayPause.classList.remove("pause");
  btnPausarMusica.style.display = "none";
  btnPlayMusica.style.display = "block";
  if(idMusica == 0){
    idMusica = quantidademusicas - 1;
  }else{
    idMusica -= 1;
  }
  musica.setAttribute("src", listaMusicas[idMusica].src);
}

btnProximaMusica.onclick = function(){
  btnPlayPause.classList.add("play");
  btnPlayPause.classList.remove("pause");
  btnPausarMusica.style.display = "none";
  btnPlayMusica.style.display = "block";
  if(idMusica == quantidademusicas -1){
    idMusica = 0;
  }else{
    idMusica += 1;
  }
  musica.setAttribute("src", listaMusicas[idMusica].src);
}

if(idMusica <= 0){
  idMusica = quantidademusicas - 1;
}
if(idMusica >= quantidademusicas - 1){
  idMusica = 0;
}


// DownArrow
const btnDownArrow = document.getElementById("btn-descer");
btnDownArrow.onclick = function(){
  // console.log("Apertou no botão DownArrow");
  down.style.display = "none";
}
// function esconderDownArrow(){
// }

// window.addEventListener("wheel", function() {

// });

// onwheel = (event) => {};

// window.addEventListener('scroll', function(){ animarScroll(); })
