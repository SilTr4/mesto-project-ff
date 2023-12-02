import { addCard } from './cards.js';

export const popupFormProfile = document.forms.edit_profile;
const profileNameField = popupFormProfile.elements.name;
const profileTypeField = popupFormProfile.elements.description;

export const popupFormPlace = document.forms.new_place;
const placeNameField = popupFormPlace.elements.place_name;
const placeLinkField = popupFormPlace.elements.link;

// Функция открытия попапа
export function openPopup(nodeElement) {
  const className = 'popup_is-opened';
  let node;
  // Если нажатая кнопка - это кнопка редактирования профайла
  if (nodeElement.target.classList.contains('profile__edit-button')) {
      node = document.querySelector('.popup_type_edit');
      profileNameField.value = nodeElement.target.previousElementSibling.textContent;
      profileTypeField.value = nodeElement.target.nextElementSibling.textContent;
      
  // Если нажатая кнопка - это кнопка добавлнения карточки
  } else if (nodeElement.target.classList.contains('profile__add-button')) {
      node = document.querySelector('.popup_type_new-card');

  // Если нажатая кнопка - это картинка
  } else if (nodeElement.target.classList.contains('card__image'))  {    // img-section
      node = document.querySelector('.popup_type_image');
      node.querySelector('.popup__image').src = nodeElement.target.src;
      node.querySelector('.popup__caption').textContent = nodeElement.target.closest('.card').querySelector('.card__title').textContent;
  }
  addClass(node, className);
}

// Функция добавления класса
export function addClass(nodeElement, className) {
  nodeElement.classList.add(className);
}

// Функция закрытия попапа
export function closePopup(nodeElement) {
  const parentElement = nodeElement.closest('.popup');
  if (parentElement.classList.contains('popup_type_image')) {
    parentElement.querySelector('.popup__image').src = '';
    parentElement.querySelector('.popup__caption').textContent = '';
  }
  parentElement.classList.remove('popup_is-opened');
}

// Функция редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileName = profileEditButton.previousElementSibling;
  const profilType = profileEditButton.nextElementSibling;
  profileName.textContent = profileNameField.value;
  profilType.textContent = profileTypeField.value;
  closePopup(evt.target);
}

// Функция добавления карточки пользователя
export function addUserCard(evt) {
  evt.preventDefault();
  const userName = placeNameField.value;
  const userLink = placeLinkField.value;  
  const usersValue = {
    name: userName,
    link: userLink
  };

  addCard(usersValue, true);
  placeNameField.value = '';
  placeLinkField.value = ''; 
  closePopup(evt.target);
}
