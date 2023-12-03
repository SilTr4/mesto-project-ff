import { openImgPopup } from './modal.js'

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardSection = document.querySelector('.places__list');

// Функция удаления карточки
export function removeCard(e) {
  e.target.closest('.card').remove();
}

// Функция активации лайка
export function changeLikeStatus(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

// Клонирование шаблона
function cloneTemplate() {
  const cardTemplate = document.querySelector('#card-template').content;  
  return cardTemplate.querySelector('.card').cloneNode('true');
}

// Функция создания макета карточки
export function createCard(elemObj, removeCardFunction, addRemoveLike) {
  const cardElement = cloneTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = elemObj.link;
  cardElement.querySelector('.card__title').textContent = elemObj.name;
  cardImage.alt = elemObj.name;
  cardImage.addEventListener('click', openImgPopup);
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', addRemoveLike);
  return cardElement;
}

// Функция добавления карточки
export function addCard(element, toStart = false) {
  const card = createCard(element, removeCard, changeLikeStatus);
  if (toStart === true) {
    cardSection.prepend(card);
  } else {
    cardSection.append(card);
  }
}