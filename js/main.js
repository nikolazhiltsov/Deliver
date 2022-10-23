let yoyo = document.documentElement.getAttribute('page');

if (window.innerWidth <= 768) {
  let header = document.querySelector('header');
  let slsl = document.querySelector('.slider');
  header.style.height = `${window.innerHeight}px`;
  slsl.style.height = `${window.innerHeight}px`;
}

if(yoyo == 'home'){
$(document).ready(function(){
    $('.slider').slick({
        prevArrow:".slick-prev",
        nextArrow:".slick-next",
        dots: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2500,
        appendDots: $('.slider-container'),
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        draggable: false,
        swipe: false,
        lazyLoad: 'progressive',
    });
})
}

document.documentElement.addEventListener('mousedown', (e) => {
    let posX = e.offsetX;
    let posY = e.offsetY;
    if(e.target.closest('.pulse')){
        e.target.style.setProperty('--x', posX + 'px');
        e.target.style.setProperty('--y', posY + 'px');
        e.target.classList.add('pulseActive');
        e.target.addEventListener('animationend', () =>{
            e.target.classList.remove('pulseActive');
        })
    }
})

const menuButton = document.querySelectorAll('.button__new__menu');
const newMenu = document.querySelector('.new__navbar');

function newMenuActive(e){
    newMenu.classList.toggle('active');
    document.body.classList.toggle('shadowActive');
    let newMenuButton = menuButton[1].classList[1];
    if(e.target.closest(`.${newMenuButton}`)){
        newMenu.style.zIndex = '1000';
        setTimeout(() => {
            newMenu.style.zIndex = null;
        }, 1000);
    }
}

menuButton[0].addEventListener('click',newMenuActive);
menuButton[1].addEventListener('click',newMenuActive);

document.body.addEventListener('click',(e)=>{
    if(e.target.closest('.shadowActive') && !e.target.closest('.new__navbar') && !e.target.closest('.button__new__menu')){
        document.body.classList.toggle('shadowActive');
        newMenu.classList.remove('active');
        newMenu.style.zIndex = '1000';
        setTimeout(() => {
            newMenu.style.zIndex = null;
        }, 1000);
    }
})

const navbar = document.querySelector('.navbar');
const navbarHeader = document.querySelectorAll('.navbar__header');
const navbarFooter = document.querySelector('.navbar__footer');

let headerHeight = parseInt(getComputedStyle(document.querySelector('header')).height);
let navbarHeight = parseInt(getComputedStyle(document.querySelector('.navbar')).height);
let navbarHeaderHeight = parseInt(getComputedStyle(document.querySelector('.navbar__header')).height);
let navbarFooterHeight = parseInt(getComputedStyle(document.querySelector('.navbar__footer')).height);

let elY = 0;
let scrollY = 0;

function navbarAnim(){
    if(window.scrollY > 0){
      navbar.classList.add('navbarScroll');
    }else{
      navbar.classList.remove('navbarScroll');
    }

    const height = navbarHeaderHeight + 2;
    const pos = window.pageYOffset;
    const diff = scrollY - pos;

    elY = Math.min(0, Math.max(-height, elY + diff));
    navbar.style.position = pos >= height ? 'fixed' : pos === 0 ? 'absolute' : navbar.style.position;
    navbar.style.transform = `translateY(${navbar.style.position === 'fixed' ? elY : 0}px)`;

    scrollY = pos;
}

navbarAnim();
window.onscroll = navbarAnim;


const mediaQuery_768 = window.matchMedia('(max-width: 768px)')

let animItems = document.querySelectorAll("[data-scroll-anim]");
let mediaQueryItems = document.querySelectorAll('.mediaQuery');
let elements = []

for (let i = 0; i < mediaQueryItems.length; i++) {
  elements[i] = mediaQueryItems[i];
}

function handleTabletChange_768(e) {
    for (let i = 0; i < elements.length; i++) {
        let elementsItem = elements[i].children;
        if(e.matches) {
            if(!elements[i].classList.contains('done_768')){
              elements[i].classList.add('done_768');
              elements[i].removeAttribute('data-scroll-anim')
              elements[i].classList.remove('scrollAnimLadder')
              for (let i = 0; i < elementsItem.length; i++) {
                elementsItem[i].setAttribute('data-scroll-anim','');
              }
              animItems = document.querySelectorAll("[data-scroll-anim]");
            }
          } else {
            if(elements[i].classList.contains('done_768')){
              elements[i].classList.remove('done_768');  
              elements[i].setAttribute('data-scroll-anim','');
              elements[i].classList.add('scrollAnimLadder');
              for (let i = 0; i < elementsItem.length; i++) {
                elementsItem[i].removeAttribute('data-scroll-anim');
              }
              animItems = document.querySelectorAll("[data-scroll-anim]");
            }
          }
    }
}
mediaQuery_768.addEventListener('change',handleTabletChange_768)
handleTabletChange_768(mediaQuery_768)

if(animItems.length > 0){
    window.addEventListener('scroll',scrollTrigger);
    function scrollTrigger(){
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 100;
        
        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        
        if(animItemHeight > window.innerHeight){
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        function scrollIf(anyHeight) {
          if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight - anyHeight)){
            animItem.classList.add('scrollAnimActive');
          }else{
            animItem.classList.remove('scrollAnimActive');
          }   
        }

        if(document.documentElement.getAttribute('page') == 'home'){
          scrollIf(0);
        }else{
          scrollIf(navbarFooterHeight);
        }

      }
    }
    function offset(el){
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
  
    setTimeout(scrollTrigger(),400)
}

let navbarItem = document.querySelectorAll('.navbar__footer__item');
let footerNavbarItem = document.querySelectorAll('.quick-links a');

for (let i = 0; i < navbarItem.length; i++) {
  if (navbarItem[i].id == yoyo) {
      navbarItem[i].removeAttribute('href');
      navbarItem[i].classList.add('pageActive');
  }
  if(i < footerNavbarItem.length){
  if (footerNavbarItem[i].id == yoyo) footerNavbarItem[i].removeAttribute('href');
  }
}

if (document.querySelector('.logo a img').id == yoyo) {
  document.querySelector('.logo a').removeAttribute('href');
}

function menuPage(e){
  if(e.target.closest('.navbar') || e.target.closest('.quick-links a')){
    if(yoyo == e.target.id){
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
    }
  }
}

navbar.addEventListener('click',menuPage);
document.querySelector('.quick-links').addEventListener('click',menuPage);

let scrollbarWidth = window.innerWidth - parseInt(getComputedStyle(document.querySelector('header')).width);
let fixedElements = document.querySelectorAll('.hystfixed');

if(document.querySelector('[data-hystmodal]')){
const myModal = new HystModal({
    linkAttributeName: 'data-hystmodal',
    catchFocus: true,
    waitTransitions: false,
    closeOnEsc: false,
    backscroll: true,
    beforeOpen: function(modal){
      for (let i = 0; i < fixedElements.length; i++) {
        fixedElements[i].style.width = `calc(100% - ${scrollbarWidth}px)`;
      }
    },
    afterClose: function(modal){
      for (let i = 0; i < fixedElements.length; i++) {
        fixedElements[i].style.width = null;
      }
    },
});
}