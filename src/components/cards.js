import { openImgPopup } from './modal.js'
import { userId } from './api.js';
import { deleteCard, toLikeImage, toDislikeImage } from './api.js';

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
export function removeCard(e, imgId) {
  e.target.closest('.card').remove();
  deleteCard(imgId);
}

// Функция активации лайка
export function changeLikeStatus(e, imgId, likes) {
  const likeClass = 'card__like-button_is-active';
  const like = e.target;
  if (like.classList.contains(likeClass)) {
    toDislikeImage(imgId, likes, like, likeClass);
  } else {
    toLikeImage(imgId, likes, like, likeClass);
  }
}

// Клонирование шаблона
function cloneTemplate() {
  const cardTemplate = document.querySelector('#card-template').content;  
  return cardTemplate.querySelector('.card').cloneNode('true');
}

// Функция создания макета карточки
export function createCard(elemObj, addRemoveLike) {
  const cardElement = cloneTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const likes = cardElement.querySelector('.card__like-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = elemObj.link;
  cardElement.dataset.imgId = elemObj._id
  cardElement.querySelector('.card__title').textContent = elemObj.name;
  cardImage.alt = elemObj.name;
  likes.textContent = elemObj.likes.length;
  cardImage.addEventListener('click', openImgPopup);
  if (elemObj.owner._id === userId) {
    deleteButton.addEventListener('click', evt => {
      removeCard(evt, cardElement.dataset.imgId)});    //addEventListener('click', removeCardFunction);
  } else {
    deleteButton.remove();
  }
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  if (elemObj.likes.some(user => user._id === userId)){
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', evt => addRemoveLike(evt, cardElement.dataset.imgId, likes));
  return cardElement;
}

// Функция добавления карточки
export function addCard(element, toStart = false) {
  const card = createCard(element, changeLikeStatus);
  if (toStart === true) {
    cardSection.prepend(card);
  } else {
    cardSection.append(card);
  }
}