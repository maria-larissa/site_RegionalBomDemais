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
const menuNav = document.querySelector(".nav-bar .menu-mobile") 
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



// botão submenu
const btnSubmenu = document.getElementById("btn-abrir-submenu");
const submenu = document.querySelector(".submenu");
var visivel = false;

btnSubmenu.addEventListener("click", function(){
  console.log(visivel);
  console.log("Clicou no botao do submenu");
  if(!visivel){
    submenu.style.visibility = "visible"
    visivel = true;
  }else{
    submenu.style.visibility = "hidden"
    visivel = false;
  }
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
  console.log(section);
  
  var distancia = getDistanciaTop(section) - 75;

  smoothScrollTo(0 , distancia, 800);
}

menuItens.forEach((link) => {
    link.addEventListener("click", scrollToSection)
  }
)


// carrossel mobile



// DownArrow
const btnDownArrow = document.getElementById("btn-descer");
btnDownArrow.onclick = function(){
  console.log("Apertou no botão DownArrow");
  down.style.display = "none";
}
// function esconderDownArrow(){
// }

// window.addEventListener("wheel", function() {

// });

// onwheel = (event) => {};

// window.addEventListener('scroll', function(){ animarScroll(); })
