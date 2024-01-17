import { openImgPopup, userId } from '../index.js'
import { deleteCard, toLikeImage, toDislikeImage } from './api.js';
import { removeClass, addClass } from './modal.js';

const cardSection = document.querySelector('.places__list');

// Функция удаления карточки
export function removeCard(e, imgId) {
  e.target.closest('.card').remove();
  deleteCard(imgId)
  .catch((err) => {
    console.log(err)});
}

// Функция активации лайка
export function changeLikeStatus(e, imgId, likes) {
  const likeClass = 'card__like-button_is-active';
  const like = e.target;
  if (like.classList.contains(likeClass)) {
    toDislikeImage(imgId)
    .then((res) => {likes.textContent = res.likes.length;
      removeClass(like, likeClass)})
    .catch((err) => {
      console.log(err)});
  } else {
    toLikeImage(imgId)
    .then((res) => {likes.textContent = res.likes.length;
      addClass(like, likeClass)})
    .catch((err) => {
    console.log(err)});
  }
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
      removeCardFunction(evt, cardElement.dataset.imgId)});
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
  const card = createCard(element, removeCard ,changeLikeStatus);
  if (toStart === true) {
    cardSection.prepend(card);
  } else {
    cardSection.append(card);
  }
}