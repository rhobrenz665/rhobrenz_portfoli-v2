import './styles/main.scss';

import Glide from '@glidejs/glide';
import TypeIt from 'typeit';
import ScrollReveal from 'scrollreveal';

new Glide('.glide', {
  type: 'carousel',
  perView: 2,
  breakpoints: {
    800: {
      perView: 1,
    },
  },
}).mount();

// Type It
new TypeIt('#type1', {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type('Designer', { delay: 700 })
  .pause(800)
  .delete(9)
  .type('Developer', { delay: 700 })
  .pause(800)
  .delete(9)
  .go();

new TypeIt('#type2', {
  speed: 120,
  loop: true,
  waitUntilVisible: true,
})
  .type('Designer', { delay: 400 })
  .pause(500)
  .delete(9)
  .type('Developer', { delay: 400 })
  .pause(500)
  .delete(9)
  .go();

const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true,
});

// Scroll Reveal Header
scrollReveal.reveal('.banner__content', {});
scrollReveal.reveal('.btn', { delay: 200 });
scrollReveal.reveal('.banner__image', { delay: 400 });
scrollReveal.reveal('.scroll_icon', { delay: 600 });

// Scroll Reveal About
scrollReveal.reveal('.about__left', {});
scrollReveal.reveal('.about__right', { delay: 300 });

// Scroll Reveal Skills
scrollReveal.reveal('.skills__left', { delay: 300 });
scrollReveal.reveal('.skills__right', {});

// Scroll Reveal Projects
scrollReveal.reveal('.work__box', { delay: 300 });

// Scroll Reveal Contact
scrollReveal.reveal('.contact__container', {});
scrollReveal.reveal('.contact__info', { delay: 100 });
scrollReveal.reveal('.contact__form', { delay: 300 });

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navigation');
  const windowPosition = window.scrollY > 0;

  nav.classList.toggle('fix__nav', windowPosition);
});

// const links = document.querySelectorAll('.nav__link');
// const sections = document.querySelectorAll('.section');

// function changeLinkState() {
//   let index = sections.length;
//   while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
//   console.log(window.scrollY);
//   links.forEach(link => link.classList.remove('active'));
//   links[index].classList.add('active');
// }

// const throttle = (fn, limit) => {
//   let flag = true;
//   return function () {
//     let context = this;
//     let args = arguments;
//     if (flag) {
//       fn.apply(context, args);
//       flag = false;
//       setTimeout(() => {
//         flag = true;
//       }, limit);
//     }
//   };
// };

// window.onscroll = throttle(changeLinkState, 100);

const navOpen = document.querySelector('.nav__toggle');
const navContainer = document.querySelector('.nav__menu');
const navList = document.querySelector('.nav__list');

navOpen.addEventListener('click', menuOnClick);

function menuOnClick() {
  document.querySelector('.nav__toggle').classList.toggle('change');
  document.querySelector('.navigation').classList.toggle('change-bg');

  const listHeight = navList.getBoundingClientRect().height;
  const containerHeight = navContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    navContainer.style.height = `${listHeight + 10}px`;
  } else {
    navContainer.style.height = '0px';
  }
}
