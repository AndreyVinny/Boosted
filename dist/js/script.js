let menu = document.querySelector('.nav_menu'),
    burger = document.querySelector('.ham_menu'),
    body = document.querySelector('body');


burger.addEventListener('click', AddActive)

function AddActive () {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('active');
}

let navLink = document.querySelectorAll('.nav_item');

navLink.forEach(n => n.addEventListener('click', closeMenu));

function closeMenu () {
    burger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.toggle('active');

}

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

const animItems = document.querySelectorAll('._anim_items');

if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for(let i=0; i < animItems.length; i++){
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active');
            } else {
                if(!animItem.classList.contains('_anim_no_hide')){
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
         const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;

         return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }

    setTimeout(() => {
        animOnScroll()
    }, 700);
}

const videos = document.querySelectorAll('.video');

let generateUrl = function(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
};

let createIframe = function(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay; encrypted-media');
	iframe.setAttribute('src', generateUrl(id));

	return iframe;
};

videos.forEach((el) => {
	let videoHref = el.getAttribute('data-video');

	let deletedLength = 'https://youtu.be/'.length;

	let videoId = videoHref.substring(deletedLength, videoHref.length);

	let img = el.querySelector('img');
	let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
	img.setAttribute('src', youtubeImgSrc);

	el.addEventListener('click', (e) => {
		e.preventDefault();

		let iframe = createIframe(videoId);
		el.querySelector('img').remove();
		el.appendChild(iframe);
		el.querySelector('button').remove();
	});
});

