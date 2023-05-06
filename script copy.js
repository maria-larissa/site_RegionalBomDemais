// Página sempre começa na primeira secção
window.scroll(0, 0);


// MENU HAMBURGUER
const menuNav = document.querySelector(".menu nav") 
const btnAbrirMenu = document.getElementById("icone-menu");
const btnFecharMenu = document.getElementById("icone-close");

btnAbrirMenu.onclick = function(){
  // menu1.style.display = "block";
  menuNav.style.display = "block";
}

btnFecharMenu.onclick = function() {
  // menu1.style.display = "none";
  menuNav.style.display = "none";
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


// ANIMAÇÃO card banda

// Pegando todos os elementos que terma animação
const elementosAnimar = document.querySelectorAll('[data-cardAnime]');
console.log(elementosAnimar);
const classeAnimacao = "animar";

function animarScroll(){
  const windowTopo = window.pageYOffset;
  // console.log(windowTopo);
  
  // Pegando os elementos
  elementosAnimar.forEach(function(element){
    // Comparando a distancia página ao topo com a distancia do elemento ao topo
    opacidade = element.getAttribute("opacity");
    if(windowTopo > element.offsetTop){
      // Adicionando a classe de animação aos elemento
      element.classList.add(classeAnimacao);
    }
    else{
      element.classList.remove(classeAnimacao);
    }
  })

}

window.addEventListener('scroll', function(){ animarScroll(); })