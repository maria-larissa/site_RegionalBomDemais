// Faz aparecer banner banda só uma vez
const cardConteudoPrincipal = document.querySelector(".card-conteudo-principal");
// var contShowCardBanda = 0;
const cardFotoBanda = document.querySelector(".card-foto-banda");


window.onload = (event) => {
  console.log("page is fully loaded");
  // Página sempre começa na primeira secção
  window.scroll(0, 0);
  // delay para mostrar o card da banda
  setTimeout(mostrarCardBanda, 500);
}

function mostrarCardBanda(){
  // const cardBanda = document.querySelector(".card-banda");
  cardConteudoPrincipal.classList.add("card-blur");
  cardFotoBanda.style.display = "flex";
  // contShowCardBanda++;
}

function esconderCardBanda(){
  cardFotoBanda.style.display = "none";
  cardConteudoPrincipal.classList.remove("card-blur");
}


// Se clicar no botão para fechar o card-banda
const btnFecharCardBanda = document.getElementById("icone-close-card-banda");
btnFecharCardBanda.onclick = function(){
  //display block para card foto banda 
  console.log("Apertou no botão fechar");
  esconderCardBanda();
}
  

// MENU HAMBURGUER
const menuNav = document.querySelector(".menu nav") 
const btnAbrirMenu = document.getElementById("icone-menu");
const btnFecharMenu = document.getElementById("icone-close");

btnAbrirMenu.onclick = function(){
  if(!cardConteudoPrincipal.classList.contains("card-blur")){
    menuNav.style.display = "block";
  }
}

btnFecharMenu.onclick = function() {
  // menu1.style.display = "none";
  if(!cardConteudoPrincipal.classList.contains("card-blur")){
    menuNav.style.display = "none";
  }
}


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
  console.log(distanciaTopo);

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



window.addEventListener('scroll', function(){ animarScroll(); })
