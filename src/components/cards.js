import { openPopup } from './modal.js'

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

// Функция удаления карточки
export function removeCard(element) {
  element.target.closest('.card').remove();
}

// Функция активации лайка
export function changeLikeStatus(like) {
  like.target.classList.toggle('card__like-button_is-active');
}

// Функция создания макета карточки
export function createCard(elemObj, removeCardFunction, addRemoveLike) {
  const cardTemplate = document.querySelector('#card-template').content;  
  const templateNode = cardTemplate.querySelector('.card').cloneNode('true');
  const cardImage = templateNode.querySelector('.card__image');
  cardImage.src = elemObj.link;
  templateNode.querySelector('.card__title').textContent = elemObj.name;
  cardImage.alt = elemObj.name;
  cardImage.addEventListener('click', openPopup);
  templateNode.querySelector('.card__delete-button').addEventListener('click', removeCardFunction);
  templateNode.querySelector('.card__like-button').addEventListener('click', addRemoveLike);
  return templateNode;
}

// Функция добавления карточки
export function addCard(element, toStart = false) {

  const cardSection = document.querySelector('.places__list');
  if (toStart === true) {
    cardSection.prepend(createCard(element, removeCard, changeLikeStatus));
  } else {
    cardSection.append(createCard(element, removeCard, changeLikeStatus));
  }
}