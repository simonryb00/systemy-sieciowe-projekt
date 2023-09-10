const THUMBNAILS = document.querySelectorAll(".thumbnail img"); // do stałej przypisujemy selektor elementu który chcemy znalezc 
const POPUP = document.querySelector(".popup"); //element popup
const POPUP_CLOSE = document.querySelector(".popup__close"); //x zamykajacy popupa
const POPUP_IMG = document.querySelector(".popup__img");
const NO_POPUP_ELEMENTS = document.querySelectorAll(".no-popup-element");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const showNextImg = () => {
    if (currentImgIndex === THUMBNAILS.length - 1) { //jesli to ostatni element to strzalka w przod cofa do pierwszego elementu
        currentImgIndex = 0;
    }
    else {
        currentImgIndex++;
    }

    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

const showPrevImg = () => {
    if (currentImgIndex === 0) { //jesli to ostatni element to strzalka w przod cofa do pierwszego elementu
        currentImgIndex = THUMBNAILS.length - 1;
    }
    else {
        currentImgIndex--;
    }

    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

THUMBNAILS.forEach((thumbnail, index) => {
    const showPopUp = (e) => { //po kliknieciu na zdjecie usuwana jest klasa hidden i popup sie otwiera
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src;  // źródłowi elementu popup_img wstrzykiwane jest zródło elementu na który klikamy (tutaj miniaturki);
        currentImgIndex = index;
        THUMBNAILS.forEach(element => {       // zeby nie skakac po miniaturkach zdjec bedacymi za popupem gdy popup jest odpalony
            element.setAttribute("tabindex", -1);
        });

        NO_POPUP_ELEMENTS.forEach(element => {       // zeby nie skakac po elementach bedacymi za popupem gdy popup jest odpalony
            element.setAttribute("tabindex", -1);
        });
    }; // wykona sie tyle razy ile elementow w node liscie

    thumbnail.addEventListener("click", showPopUp);

    thumbnail.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.keyCode === 13) {
            showPopUp(e);
        }
    })
});

const closePopup = () => {
    POPUP.classList.add("fade-out");
    setTimeout(() => {
        POPUP.classList.add("hidden"); // po kliknieciu na x przypisywana jest klasa hidden i popup sie zamyka
        POPUP.classList.remove("fade-out");
    }, 300)

    THUMBNAILS.forEach(element => {       // zeby nie skakac po elementach bedacymi za popupem gdy popup jest odpalony
        element.setAttribute("tabindex", 1);
    });

    NO_POPUP_ELEMENTS.forEach(element => {       // zeby nie skakac po elementach bedacymi za popupem gdy popup jest odpalony
        element.setAttribute("tabindex", 1);
    });

};

POPUP_CLOSE.addEventListener("click", closePopup);

ARROW_RIGHT.addEventListener("click", showNextImg);

ARROW_LEFT.addEventListener("click", showPrevImg);

document.addEventListener("keydown", (e) => {

    if (!POPUP.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keyCode === 39) {
            showNextImg();
        }

        if (e.code === "ArrowLeft" || e.keyCode === 37) {
            showPrevImg();
        }

        if (e.code === "Escape" || e.keyCode === 27) {
            closePopup();
        }
    }
    // console.log(e);

});

POPUP.addEventListener("click", (e) => {  // jesli kliknie sie na puste pole dookola popupu (nie na strzalke, zdjecie itp.) to popup sie zamyka
    if (e.target === POPUP) {
        closePopup();
    }
});


