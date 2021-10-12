let position = 0;
let slidesToShow;
const conteiner = document.querySelector('.slider-conteiner');
let size = document.querySelector('body');
// let slidesToShow = 5;

if(size.clientWidth >= 1650){
    slidesToShow = 7
} else if(size.clientWidth >= 1350){
    slidesToShow = 5
} else if(size.clientWidth >= 950){
    slidesToShow = 4
} else if(size.clientWidth >= 420){
    slidesToShow = 3
} else {
    slidesToShow = 1
}


const slidesToScroll = 1,
      track = document.querySelector('.slider_track'),
      btnPrev = document.querySelector('.btn_prev'),
      btnNext = document.querySelector('.btn_next'),
      items = document.querySelectorAll('.slider_item'),
      itemCount = items.length,
      itemWidth = conteiner.clientWidth / slidesToShow,
      movePosition = slidesToScroll * itemWidth;


items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`
});



btnNext.addEventListener('click', Next = () => {
    const itemsLeft = itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    track.style.transform = `translateX(${position}px)`;
    clearTimeout(time)
    autoSlide();
    repeat()
});

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;

    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    track.style.transform = `translateX(${position}px)`;
    clearTimeout(time)
    autoSlide();
    repeat()
});


let autoSlide = () => {
    time = setTimeout(Next, 5000)
}

autoSlide();

const repeat = () => {
    if (position == 0){
        position = -(itemCount - slidesToShow) * itemWidth;
    }
    else if  (position <= -(itemCount - slidesToShow) * itemWidth) {
        position = 0
    }
}
