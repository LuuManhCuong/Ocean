

let ocean = document.querySelector('.ocean')
let dayNight = document.querySelector('.dayNight')
let menuToggle = document.querySelector('.menuToggle')
let audio = document.querySelector('.header-video audio')
let navigation = document.querySelector('.navigation')
let menuItems = document.querySelectorAll('.navigation li')


audio.volume = 0.2
setTimeout(function(){ 
    audio.volume = 0
}, 10000);

// chế độ darkmode lưu vào localstorage
let darkMode = localStorage.getItem('darkMode', 'enable');
const enableDarkMode = () => {
    // 1. add class dark to the body
    var darkMode = ocean.classList.add('dark')
    dayNight.classList.add('active')
    // 2. update darkMode in the localStorage
    localStorage.setItem('darkMode', 'enabled')
}
const disableDarkMode = () => {
    // 1. add class dark to the body
    var darkMode = ocean.classList.remove('dark')
    dayNight.classList.remove('active')
    // 2. update darkMode in the localStorage
    localStorage.setItem('darkMode', null)
}

if(darkMode === 'enabled'){
    enableDarkMode()
}
dayNight.onclick = function() {
    darkMode = localStorage.getItem('darkMode');
    if(darkMode !== 'enabled'){
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

menuToggle.onclick = () => {
    menuToggle.classList.toggle('active')
    navigation.classList.toggle('active')
    menuItems.forEach((menuItem) => {
        let navigation = document.querySelector('.navigation')
        menuItem.onclick = function() {
            menuToggle.classList.toggle('active')
            navigation.classList.toggle('active')
        }
    })
}



// countdown
function countDown() {
    const countDate = new Date('december 25, 2021 00:00:00').getTime()
    const now = new Date().getTime()
    // khoảng thời gian đếm ngược mili giây
    const gap = countDate - now

    // how the time work?
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    // tính ra thời gian cụ thể
    // floor(x): trả về kiểu double = một số nguyên và không lớn hơn đối số (vd: 3.14 -> 3.0)
    // chia số dư %: lấy phần dư thời gian còn lại 
    const textDay = Math.floor(gap / day)
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSecond = Math.floor((gap % minute) / second)

    // render html
    document.querySelector('.sale-time__days__number').innerText = textDay
    document.querySelector('.sale-time__hours__number').innerText = textHour
    document.querySelector('.sale-time__munites__number').innerText = textMinute
    document.querySelector('.sale-time__seconds__number').innerText = textSecond

    if (textDay <= 0 && textHour <= 0 && textMinute <= 0 && textSecond <= 0) {
        document.querySelector('.sale-time__btn').style.color = 'red'
        document.querySelector('.sale-time__btn').textContent = "Noel 2021"
        document.querySelector('.sale-time__days__number').innerText = "0"
        document.querySelector('.sale-time__hours__number').innerText = "0"
        document.querySelector('.sale-time__munites__number').innerText = "0"
        document.querySelector('.sale-time__seconds__number').innerText = "0"
    }
}
countDown();
setInterval(countDown, 1000);

// // slider
var indexValue = 3;
showImg(indexValue);

function btn_slide(e) {
    showImg(indexValue = e);
}
var autoSlide = function() {
    setInterval(() => {
        showImg(indexValue)
        indexValue++
    }, 3000);
}
autoSlide();



function showImg(e) {
    var i;
    const imgs = document.querySelectorAll('.slider__img')
    const sliders_btn = document.querySelectorAll('.slider-btn span')

    if(e > imgs.length ) {indexValue = 1}
    if(e < 1) {indexValue = imgs.length}

    for(i = 0; i < imgs.length; i++){
        imgs[i].style.display = "none";
    }
    for(i = 0; i < sliders_btn.length; i++){
        sliders_btn[i].style.backgroundColor = "white";
    }
    imgs[indexValue - 1].style.display = "block"
    sliders_btn[indexValue - 1].style.backgroundColor = "rgb(63,208,212)"
}


// rest Api tour & comment
var toursApi = 'https://luumanhcuong.github.io/fakeApiOcean1/tours.json'
var commentsApi ='https://luumanhcuong.github.io/fakeApiOcean1/comment.json'

function loadApi() {
    getTourApi(renderTours);
    getCommentApi(renderComments);
    handleCreateComment();
}
loadApi();

function getTourApi(callBack) {
    fetch(toursApi)
        .then(function(response) {
            return response.json();
        })
        .then(callBack)
}

function renderTours(data) {
    var tours = data.tours
    var listToursBlock = document.querySelector('.render-tours')
    var htmls = tours.map((tour) => {
        return `
        <div class="col l-2-4 tour-content">
            <div class="tour-item">
                <img src="${tour.img}" alt="img">
                <h2>${tour.name}</h2>
                <p>${tour.description}</p>
                <div class="Tour-item__price">${tour.price}</div>
                <ul>
                    <li>
                        <i class="fas fa-star"></i>
                    </li>
                    <li>
                        <i class="fas fa-star"></i>
                    </li>
                    <li>
                        <i class="fas fa-star"></i>
                    </li>
                    <li>
                        <i class="fas fa-star"></i>
                    </li>
                    <li>
                        <i class="far fa-star"></i>
                    </li>
                </ul>
                <div class="tour-item__booknow-btn">Book Now</div>
            </div>
        </div>
        `
    });
    listToursBlock.innerHTML = htmls.join('')

    // slick tour
    $(document).ready(function(){
        $('.render-tours').slick({
            slidesToShow: 5,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2000,
            Infinity: true,
            prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            dots: true,
            responsive: [
                {
                  breakpoint: 1060,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                  }
                },
                {
                  breakpoint: 740,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    Infinity: false,
                    centerMode: true,
                    centerPadding: '10px',
                    dots: false,
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
    });
}






function serviceDestination(number, time) {
    var destinationNb = document.querySelector('.service__destinations h2')

    var timeStart = 0;
    setInterval(() =>{
        timeStart++; 
        if(timeStart++ >=number){
            timeStart = number
        }  
        destinationNb.innerText =  timeStart;

    }, time/number)
}


function serviceTourPack(number, time) {
    var tourPackNb = document.querySelector('.service__tour-pack h2')
    var cruisesNb = document.querySelector('.service__cruises h2')

    var timeStart = 0;
    setInterval(() =>{
        timeStart++; 
        if(timeStart++ >=number){
            timeStart = number
        }  
        tourPackNb.innerText =  timeStart;

    }, time/number)
}


function serviceCruises(number, time) {
    var cruisesNb = document.querySelector('.service__cruises h2')

    var timeStart = 0;
    setInterval(() =>{
        timeStart++; 
        if(timeStart++ >=number){
            timeStart = number
        }  
        cruisesNb.innerText =  timeStart;

    }, time/number)
}


function serviceSupport(number, time) {
    var hourSupportNb = document.querySelector('.service__hour-support h2')

    var timeStart = 0;
    setInterval(() =>{
        timeStart++; 
        if(timeStart++ >=number){
            timeStart = number
        }  
        hourSupportNb.innerText =  timeStart;

    }, time/number)
}
 // service auto number
 function autoNumber() {
    serviceDestination(104, 3000)
    serviceTourPack(95, 3000)
    serviceCruises(58, 3000)
    serviceSupport(91, 3000)
}
autoNumber()


// comment
function getCommentApi(callBack) {
    fetch(commentsApi)
        .then((response) => {
            return response.json();
        })
        .then(callBack)
}

function renderComments(data) {
    var comments = data.comments
    var listCommentBlock = document.querySelector('.render-comments');
    var htmls = comments.map((comment) => {
        
        return`
        <div class="col l-4 c-12">
            <div class="user_id_${comment.id} form-review__user">
                <div class="form-review__user_icon" onclick="likeFc(${comment.id})">
                    <i class="like far fa-heart"></i>
                    <i class="liked fas fa-heart"></i>
                    <span>${comment.like}</span>
                </div>
                <img src="${comment.avata}" alt="img">
                <div class="form-review__user__name">
                    <h2>${comment.name}</h2>
                    <p>${comment.date}</p>
                </div>
                <div class="form-review__user__comment">
                    <p>${comment.comment}</p>
                </div>
                <button onclick="handleDeleteComment(${comment.id})" class="form-delete" name="form-delete">delete</button>
                <button onclick="handleUpdateComment(${comment.id})" class="form-update" name="form-update">edit</button>
                
            </div>
        </div>
        `
        
    })
    listCommentBlock.innerHTML = htmls.join('')

    // slick comment
    $(document).ready(function(){
        $('.render-comments').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            dots: true,
            responsive: [
                {
                  breakpoint: 1023,
                  settings: {
                    slidesToShow: 2,
                    arrows: false,
                    slidesToScroll: 1,
                  }
                },
                {
                    breakpoint: 1060,
                    settings: {
                      slidesToShow: 3,
                      arrows: false,
                      slidesToScroll: 1,
                    }
                  },
                {
                  breakpoint: 740,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                      dots:false
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
              ]
        });
    });
    
}

// handle create comment
function createComment(data, callBack) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(commentsApi, options)
        .then((response) => {
            response.json();
        })
        .then(callBack)
}
function handleCreateComment() {
    var title = document.querySelector('.form-input__user__title').textContent = "Create a comment"

    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();
    let getDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    var today = document.querySelector('.form-input__user__name p').textContent = getDate
    var sendBtn = document.querySelector('.form-submit')
    sendBtn.onclick = function() {
        var userAvatar = document.querySelector('input[name="user__avatar"]').value
        var userComment = document.querySelector('.form-input__user__comment .user__comment').value
        var userName = document.querySelector('input[name="user__name"]').value
        let like = 0;
        
        let senData = {
            avata: userAvatar,
            name: userName,
            comment: userComment,
            date: getDate,
            like: like
        }

        createComment(senData)
    }
}

// handle delete comment
function handleDeleteComment(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(commentsApi +"/"+id, options)
        .then((response) => {
            response.json();
        })
        .then(function() {
            var userDelete = document.querySelector('.user_id_' + id)
            if(userDelete) {
                userDelete.remove()
            }
        })
}


// handle edit comment
function UpdateComment(id, data, callBack) {
    var options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(commentsApi + "/" +id, options)
        .then((response) => {
            response.json();
        })
        .then(callBack)
}

function handleUpdateComment(id) {
    var userParent = document.querySelector('.user_id_' + id)
    var editUserAvatar = userParent.querySelector('img').src
    var userAvatar = document.querySelector('input[name="user__avatar"]')
    userAvatar.value = editUserAvatar

    var editUserComment = userParent.querySelector('.form-review__user__comment p').innerText
    var userComment = document.querySelector('.form-input__user__comment .user__comment')
    userComment.value = editUserComment

    var editUserName = userParent.querySelector('.form-review__user__name h2').innerText
    var userName = document.querySelector('input[name="user__name"]')
    userName.value = editUserName
    
    var saveBtn = document.querySelector('.form-submit')
    saveBtn.textContent = "save"
    var title = document.querySelector('.form-input__user__title').textContent = "Edit comment"

    var cancelBtn = document.querySelector('.form-cancel')
    cancelBtn.style.display = "block"

    saveBtn.onclick = function() {
        var newAvatar = userAvatar.value
        var newName = userName.value
        var newComment = userComment.value

        let senData = {
            avata: newAvatar,
            name: newName,
            comment: newComment,
        }
        UpdateComment(id, senData)
    }

    cancelBtn.onclick = function() {
        handleDeleteComment();
    }
}



//  chức năng thả tim ______________________________đang có bug
window.onload = function clickLike(){ 
    let clicked = false;
    var parrentLikeBtn = document.querySelector('.render-comments');
    parrentLikeBtn.onclick = function(e) {
        if(!clicked){
            clicked = true;
            var likeBtn = e.target.closest('.form-review__user_icon:not(.form-delete)') || e.target.closest('.form-review__user_icon:not(.form-update)')
            if(likeBtn) {
                var numberOfLike = likeBtn.querySelector('span').textContent++
                likeBtn.classList.add("active");
            }
            
        } else {
            clicked = false;
            var likeBtn = e.target.closest('.form-review__user_icon:not(.form-delete)') || e.target.closest('.form-review__user_icon:not(.form-update)')
            if(likeBtn) {
                var numberOfLike = likeBtn.querySelector('span').textContent--
                likeBtn.classList.toggle("active");
            }
        }
    }
};
