// carousel-notes
const carouselInner = document.querySelector('.carousel-inner');
const slideLeftBtn = document.querySelector('.slide-left-btn');
const slideRightBtn = document.querySelector('.slide-right-btn');
const slideDots = document.querySelector('.slide-dots');

// carousel-variables
const slides = carouselInner.children;

const slides_position = [];
let currentSlideIndex = 0;

// carousel-functions
function defaultShow(){
  for (i = 0; i < slides.length; i++){
    slides_position[i] = i * 100;
    slides[i].style.left = `${slides_position[i]}%`;

  }
}


function skipSlide(targetSlide) {
  const dist = (targetSlide - currentSlideIndex) * 100;
  slides_position.forEach((x, i, positions) => {
    positions[i] = x - dist;
    slides[i].style.left = `${positions[i]}%`;
  });
  currentSlideIndex = targetSlide;
}



function showDots(amount) {
  let dotHtml ='';
  for(i = 0; i < amount ; i++){
    if (i === 0){
      dotHtml += `<div class="dot full" data-no='${i}'></div>`;
    } else{
      dotHtml += `<div class="dot" data-no='${i}'></div>`;
    } 
  }
  slideDots.innerHTML = dotHtml;
}

function switchDot(currentSlide, targetSlide) {
  slideDots.children[currentSlide].classList.remove("full");
  slideDots.children[targetSlide].classList.add("full");
  skipSlide(targetSlide);
}

// carousel-event listener
slideLeftBtn.addEventListener("click",function(){
  if(currentSlideIndex === 0){
    return;
  } else{
    switchDot(currentSlideIndex, currentSlideIndex -1);
  }
})
// slideLeftBtn.addEventListener("click", () => {
//   if (currentSlideIndex === 0) {
//     return;
//   } else {
//     switchDot(currentSlideIndex, currentSlideIndex - 1);
//   }
// });

slideRightBtn.addEventListener("click", () => {
  if (currentSlideIndex === slides.length - 1) {
    return;
  } else {
    switchDot(currentSlideIndex, currentSlideIndex + 1);
  }
});
slideDots.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches(".dot")) {
    const targetSlide = Number(target.dataset.no);
    switchDot(currentSlideIndex, targetSlide);
  }
});

// main
defaultShow();
showDots(slides.length);
