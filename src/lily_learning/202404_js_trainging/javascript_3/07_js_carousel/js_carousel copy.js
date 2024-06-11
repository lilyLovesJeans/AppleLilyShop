const carsouselInner = document.querySelector('.carousel-inner');
const slides = carsouselInner.children;
const imgCount = slides.length;
const slides_position = [];
const slideDots = document.querySelector('.slide-dots');

// Generate dots
for (let i = 0; i < imgCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('slide-dot');
    dot.dataset.index = i;
    slideDots.appendChild(dot);
}

// Set the active dot
function setActiveDot(index) {
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[index].classList.add('active-dot');
}

// Initialize the carousel
function showDefault() {
    for (let i = 0; i < imgCount; i++) {
        slides[i].style.left = i * 100 + `%`;
        slides_position[i] = i * 100;
    }
    setActiveDot(0);
}

function showDefault_left() {
    for (let i = 0; i < imgCount; i++) {
        slides[i].style.left = slides_position[i] + `%`;
    }
    setActiveDot(currentIndex);
}

function skipSlide(targetSlide, dist) {
    slides_position.forEach((x, i, positions) => {
        positions[i] = x - dist;
        slides[i].style.left = `${positions[i]}%`;
    });
    setActiveDot(targetSlide);
}

const rightSlideBtn = document.querySelector('.right-slide-btn');
var currentIndex = 0;
rightSlideBtn.addEventListener('click', function () {
    let dist = 100;
    if (currentIndex < (imgCount - 1)) {
        currentIndex += 1;
        skipSlide(currentIndex, dist);
    } else {
        currentIndex = 0;
        showDefault();
    }
});

const leftSlideBtn = document.querySelector('.left-slide-btn');
leftSlideBtn.addEventListener('click', function () {
    let dist = 100;
    if (currentIndex === 0) {
        currentIndex = imgCount - 1;
        showDefault_left();
        skipSlide(currentIndex, dist * (imgCount - 1));
    } else {
        currentIndex -= 1;
        skipSlide(currentIndex, -dist);
    }
});

// Add click event to dots
slideDots.addEventListener('click', function (e) {
    if (e.target.classList.contains('slide-dot')) {
        const targetIndex = Number(e.target.dataset.index);
        const dist = 100 * (targetIndex - currentIndex);
        skipSlide(targetIndex, dist);
        currentIndex = targetIndex;
    }
});

showDefault();