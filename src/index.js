import '../pages/index.css';
import { initialCards, addCard } from './components/cards.js';
import { addClass, closePopup, handleProfileFormSubmit, handleUserCardFormSubmit, popupFormPlace, popupFormProfile, openProfilePopup, openPlacePopup, findPopup } from './components/modal.js'
const content = document.querySelector('.page');

const popups = content.querySelectorAll('.popup');

const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');

// События для кликов по кнопкам
profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openPlacePopup);


// События для форм
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
popupFormPlace.addEventListener('submit', handleUserCardFormSubmit);

// Создание стартовых карточеу
initialCards.forEach(addCard);

// Добавление плавности и слушателя событий для попапов
popups.forEach(element => {
  addClass(element, 'popup_is-animated')
  element.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(findPopup(evt.target));
    }
  });
});