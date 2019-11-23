// Place content from contentful
const createContent = (importedContent) => {
         const arrayOfImages = importedContent.includes.Asset.map(i => {
             return { id: i.sys.id, url: i.fields.file.url }
        })
        const galleriesContent = importedContent.items[1].fields;
        const galleries = Object.keys(galleriesContent).reduce((result, x) => {
            result[x] = galleriesContent[x].map(i => {
                return arrayOfImages.find(img => img.id == i.sys.id).url;
            })
            return result
        }, {})
        imageGallery(galleries);
};

const imageGallery = (galleries) => {
    const galleryImages = document.getElementById('galleryImages')
    const arrowUp = document.getElementById('arrowUp');
    const arrowDown = document.getElementById('arrowDown');
    const galleryCategories = document.getElementById('galleryCategories');
    let currentNum = 0;
    const currentImgNumber = document.getElementById('currentImgNumber');
    const totalImgNumber = document.getElementById('totalImgNumber');
    let currentGallery = galleries.gallery1;
    let lastImage = currentGallery.length-1;
    let currentGalleryName = "gallery1";
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    changeImage(0);
    changeLastImage(currentGallery);
    changeGallerySize(currentGallery);

    arrowUp.addEventListener('click',() => {
        if(currentNum > 0) {
            currentNum -= 1;
        }else {
            currentNum = lastImage;
        }
        changeImage(currentNum);
        changeImageNum(currentNum);
    });
    arrowDown.addEventListener('click',() => {
        if(currentNum < lastImage) {
            currentNum += 1;
        } else {
            currentNum = 0;
        }
        changeImage(currentNum);
        changeImageNum(currentNum);
    })

    function changeImage(num) {
        galleryImages.style.backgroundImage =`url(https:${currentGallery[num]})`;
    };
    function changeImageNum(num){
        currentImgNumber.innerHTML = num + 1;
    };

    //  gallery - galleryCategories
    galleryCategories.addEventListener('click', (event) => {
        currentGallery = galleries[event.target.dataset.gallery];
        currentGalleryName = event.target.dataset.gallery;
        changeImage(0);
        changeImageNum(0);
        changeGallerySize(currentGallery);
        changeLastImage(currentGallery);
    });

    function changeGallerySize(x) {
        totalImgNumber.innerHTML = x.length;
    };
    function changeLastImage(x) {
        lastImage = x.length-1;
    };

    // scroll through gallery with arrow keys (up-down)
    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            //left <- show Prev image
            if(currentNum > 0) {
                currentNum -= 1;
            }else {
                currentNum = lastImage;
            }
            changeImage(currentNum);
            changeImageNum(currentNum);

        } else if (e.keyCode == '40') {
            // right -> show next image
            if(currentNum < lastImage) {
                currentNum += 1;
            }else {
                currentNum = lastImage;
            }
            changeImage(currentNum);
            changeImageNum(currentNum);
        }
    };

    // scroll through gallery with swipe
    galleryImages.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);

    galleryImages.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesure();
    }, false);

    function handleGesure() {
        let swiped = 'swiped: ';
        if (touchendX < touchstartX) {
            if(currentNum > 0) {
                currentNum -= 1;
            }else {
                currentNum = lastImage;
            }
            changeImage(currentNum);
            changeImageNum(currentNum);
        }
        if (touchendX > touchstartX) {
            if(currentNum > 0) {
                currentNum -= 1;
            }else {
                currentNum = lastImage;
            }
            changeImage(currentNum);
            changeImageNum(currentNum);
        }
    }
};

// contact me page, animation
let contactMePage = document.getElementById('contactMePage');
let contactMeBtn = document.getElementById('contactMeBtn');
let closeContactMeBtn = document.getElementById('closeContactMeBtn');

contactMeBtn.addEventListener('click', () => {
    contactMePage.classList.add('tracing-paper-animation')
});
closeContactMeBtn.addEventListener('click', () => {
    contactMePage.classList.remove('tracing-paper-animation')
});

// fetch API
const getData = () => {
    fetch('https://cdn.contentful.com/spaces/f9xo8mopdqv5/entries?access_token=qhRzmjNkUqjGoxsy5kJxQwl1k6xRjS41B15ShXWW3bE') // Call the fetch function passing the url of the API as a parameter
    .then(response => response.json())
    .then(data => {
        createContent(data);
    })
    .catch(error => console.error(error))
};

(function(){
    getData();
})();

//animatioooon
const tl = new TimelineMax();
const sidebar1 = document.querySelector('.sidebar1');
const mainbar = document.querySelector('.mainbar');
const sidebar2 = document.querySelector('.sidebar2');

tl.fromTo(sidebar1, 1, {x: -100}, {x: 0})
.fromTo(sidebar2, 1, {x: 200}, {x: 0}, "-=1.2");
