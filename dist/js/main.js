"use strict";

// QUERY SELECTORS

const numbers = document.querySelectorAll(".numbers");
const containerGrid1 = document.querySelector(".container-grid--1");
const content = document.querySelector(".content");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const operations = document.querySelector(".operations");
const tabs = document.querySelectorAll(".operations__tab");
const navLinks = document.querySelector(".links");
const navBar = document.querySelector(".navbar");
const navLink = document.querySelectorAll(".link");
const sectionAll = document.querySelectorAll(".section");
const headLineDisplay = document.querySelector(".head-line-display");
const headLine = document.querySelector(".head-line");
const display = document.querySelector(".display");
const btnWork = document.querySelector(".btn-work");
const work = document.querySelector("#work");
const allItems = document.querySelectorAll(".item");
const itemsContainer = document.querySelector(".items");

// NAVBAR ADDING CLASS ACTIVE TO LINKS

navBar.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".link");
  if (!clicked) return;

  const linkHash = clicked.getAttribute("href");

  console.log(linkHash);
  document
    .querySelector(`${linkHash}`)
    .scrollIntoView({ block: "center", behavior: "smooth" });

  navLink.forEach((t) => {
    t.classList.remove("active");
  });

  clicked.classList.add("active");
});

// NAVBAR FROM TRANSPARENT TO BG ON SCROLL
btnWork.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(work);
  work.scrollIntoView({ block: "end", behavior: "smooth" });
});

let scrolled = false;

window.onscroll = function () {
  if (window.pageYOffset > 110) {
    navBar.classList.remove("top");
  } else {
    navBar.classList.add("top");
    scrolled = false;
  }
};

// BUTTON EVENT HANDLER SCROLL TO SECTION

//  COUNTER FUNCTION

const realizationCallBack = function (entries) {
  entries.forEach((entrie) => {
    const isVisible = entrie.isIntersecting;

    // IF IS INTERSECTING VISIBLE THEN  START COUNTER FUNCTION

    if (isVisible === true) {
      function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
      numbers.forEach((number) => {
        let obj = number;
        const finishedValue = number.dataset.value;

        animateValue(obj, 0, finishedValue, 700);
      });

      realizationObserver.unobserve(containerGrid1);
    }
  });
};

// OBSERVING CONTAINER GRID

const realizationOptions = {
  root: null,
  threshold: 0.8,
};

const realizationObserver = new IntersectionObserver(
  realizationCallBack,
  realizationOptions
);

realizationObserver.observe(containerGrid1);

// OBSERVING SECTIONS

const sectionCallback = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("section-hidden");
  }
};

const sectionOptions = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(
  sectionCallback,
  sectionOptions
);

sectionAll.forEach(function (section) {
  sectionObserver.observe(section);
});

// OPERATIONS FUNCTION SLECTING ACTIVE CLASS AND DISPLAYING IT

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");

  const trans = e.target.parentElement.parentElement.children;
  console.log(trans[clicked.dataset.tab]);
  console.log(clicked.dataset.tab);
  if (!clicked) return;

  tabs.forEach((t) => {
    t.classList.remove("operations__tab-active");
  });
  clicked.classList.add("operations__tab-active");

  tabContent.forEach((t) => {
    console.log(t);

    t.classList.remove("operations__content--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
});

// OBSERVING FUNCTION SELECTING

const operationsCallback = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("operations-hidden");
  }
};

const operationsOptions = {
  root: null,
  threshold: 0.1,
};

const operationsObserver = new IntersectionObserver(
  operationsCallback,
  operationsOptions
);

operationsObserver.observe(operations);

itemsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".item");
  console.log(clicked);
});

// class TypeWriter {
//   constructor(txtElement, words, wait = 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
//   }

//   type() {
//     // Current index of word
//     const current = this.wordIndex % this.words.length;
//     // Get full text of current word
//     const fullTxt = this.words[current];

//     // Check if deleting
//     if (this.isDeleting) {
//       // Remove char
//       this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//       // Add char
//       this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     // Insert txt into element
//     this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//     // Initial Type Speed
//     let typeSpeed = 300;

//     if (this.isDeleting) {
//       typeSpeed /= 2;
//     }

//     // If word is complete
//     if (!this.isDeleting && this.txt === fullTxt) {
//       // Make pause at end
//       typeSpeed = this.wait;
//       // Set delete to true
//       this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === '') {
//       this.isDeleting = false;
//       // Move to next word
//       this.wordIndex++;
//       // Pause before start typing
//       typeSpeed = 500;
//     }

//     setTimeout(() => this.type(), typeSpeed);
//   }
// }

// // Init On DOM Load
// document.addEventListener('DOMContentLoaded', init);

// // Init App
// function init() {
//   const txtElement = document.querySelector('.txt-type');
//   const words = JSON.parse(txtElement.getAttribute('data-words'));
//   const wait = txtElement.getAttribute('data-wait');
//   // Init TypeWriter
//   new TypeWriter(txtElement, words, wait);
// }
