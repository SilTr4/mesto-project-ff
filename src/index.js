import '../pages/index.css';
import { initialCards, addCard } from './components/cards.js';
import { addClass, openPopup, closePopup, handleFormSubmit, addUserCard, popupFormPlace, popupFormProfile } from './components/modal.js'
const content = document.querySelector('.page');

const allPopaps = content.querySelectorAll('.popup');

const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');

content.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup__close')) {
      closePopup(evt.target);
  }
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
});

// События для кликов по кнопкам
profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click', openPopup);

// Для нажатия клавиш
content.addEventListener('keydown', evt => {
  const isPopupAvtive = content.querySelector('.popup_is-opened');
  if (isPopupAvtive && evt.key === 'Escape') {
    closePopup(isPopupAvtive);
  }
});

// События для форм
popupFormProfile.addEventListener('submit', handleFormSubmit);
popupFormPlace.addEventListener('submit', addUserCard);

// Создание стартовых карточеу
initialCards.forEach(addCard);

// Добавление плавности для попапов
allPopaps.forEach(element => {
  addClass(element, 'popup_is-animated')
});