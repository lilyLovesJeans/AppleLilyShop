
//抓取圖片顯示區的區域
const carsouselInner  = document.querySelector('.carousel-inner');
const slides = carsouselInner.children;

const imgCount = slides.length;
const slides_position = [];
//先將圖片展開於carsoousel_inner , 因為width設為100% ，左向右延伸依續為: 0, 100%,200%,300%,400% ...
function showDefault(){
    for (i = 0; i < imgCount; i++)
    {
        slides[i].style.left=i*100 +`%`;
        slides_position[i] = i*100;
        console.log(slides[i].style.left);
    }    
}

function showDefault_left() {
    for (let i = 0; i < imgCount; i++) {
        slides[i].style.left = slides_position[i] + `%`;
        console.log(slides[i].style.left);
    }
}


function skipSlide(targetSlide,dist) {
    // const dist = 100;
    slides_position.forEach((x, i, positions) => {
      positions[i] = x - dist;
      console.log('positions[i]: '+ positions[i]);
      slides[i].style.left = `${positions[i]}%`;
    });
  }

//抓取向右的按鈕鍵
const rightSlideBtn = document.querySelector('.right-slide-btn');

var currentIndex = 0;
rightSlideBtn.addEventListener('click',function(){
    let dist = 100;
    if(currentIndex < (imgCount -1)){
        currentIndex +=1; 
        skipSlide(currentIndex,dist);
    }
    else{
        currentIndex = 0;
        showDefault();
    }
    
})

//抓取向左的按鈕鍵
const leftSlideBtn = document.querySelector('.left-slide-btn');
leftSlideBtn.addEventListener('click', function () {
    let dist = 100;
    if (currentIndex === 0) {
        currentIndex = imgCount - 1;
        //向左鍵的預設值位置，從最後一張影像開始顯示
        showDefault_left(); 
        skipSlide(currentIndex, dist * (currentIndex));
    } else {
        currentIndex -= 1;
        skipSlide(currentIndex, -dist);
    }
});
showDefault();