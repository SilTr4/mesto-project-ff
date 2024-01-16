import { config, clearValidation } from './validation.js';
import { editUserData, addNewCard, editUserProfileImage } from './api.js';

export const popupFormProfile = document.forms.edit_profile;
const profileNameField = popupFormProfile.elements.name;
const profileTypeField = popupFormProfile.elements.description;

const profilePopup = popupFormProfile.closest('.popup');

export const popupFormPlace = document.forms.new_place;
const placeNameField = popupFormPlace.elements.place_name;
const placeLinkField = popupFormPlace.elements.link;

export const popupUserProfileImage = document.forms['new_profile-image'];
const avatarLinkField = popupUserProfileImage.elements.link;

const placePopup = popupFormPlace.closest('.popup');

const imgPopup = document.querySelector('.popup_type_image');
const profileInfo = document.querySelector('.profile__info');
const profileImagePopup = document.querySelector('.popup_type_edit-profile');

// Функция заполнения полей попапа
function fillPopupProfile (nameField, typeField) {
  nameField.value = profileInfo.querySelector('.profile__title').textContent;
  typeField.value = profileInfo.querySelector('.profile__description').textContent;
}

// Функция открытия попап профайла
export function openProfilePopup() {
  fillPopupProfile(profileNameField, profileTypeField);
  openPopup(profilePopup);
}

// Функция открытия попапа добавления карточек
export function openPlacePopup() {
  openPopup(placePopup);
}

export function openProfileImagePopup() {
  openPopup(profileImagePopup);
}

// Функция открытия попапа изображений
export function openImgPopup(evt) {
  const popupImage = imgPopup.querySelector('.popup__image');
  const currentImg = evt.target;
  popupImage.src = currentImg.src;
  popupImage.alt = currentImg.alt;
  imgPopup.querySelector('.popup__caption').textContent = currentImg.closest('.card').querySelector('.card__title').textContent;
  openPopup(imgPopup);
}

// Функция открытия попапа
export function openPopup(nodeElement) {
  const className = 'popup_is-opened';
  addClass(nodeElement, className);
  // Событие для нажатия клавиш
  window.addEventListener('keydown', closePopupByEscapeButton);
}

// Функция закрытия попапа клавишей ESC
function closePopupByEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
}

// Функция добавления класса
export function addClass(nodeElement, className) {
  nodeElement.classList.add(className);
}

export function removeClass(nodeElement, className) {
  nodeElement.classList.remove(className);
}

export function findPopup(currentElem) {
  const parentElement = currentElem.closest('.popup');
  return parentElement;
}

// Функция закрытия попапа
export function closePopup(currentPopup) {
  removeClass(currentPopup, 'popup_is-opened');
  // Снятие события
  window.removeEventListener('keydown', closePopupByEscapeButton);
  // Проверка валидации
  if (currentPopup !== imgPopup) {
    currentPopup.querySelector('.popup__form').reset();
    clearValidation(currentPopup.querySelector(config.formSelector), config);
  }
}

// Функция редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profilePopup = evt.target;
  const profileName = profileInfo.querySelector('.profile__title');
  const profilType = profileInfo.querySelector('.profile__description');
  profileName.textContent = profileNameField.value;
  profilType.textContent = profileTypeField.value;
  editUserData(profileNameField.value, profileTypeField.value);
  closePopup(findPopup(profilePopup));
}

// Функция добавления карточки пользователя
export function handleUserCardFormSubmit(evt) {
  evt.preventDefault();
  const placePopap = evt.target;
  const userName = placeNameField.value;
  const userLink = placeLinkField.value;  
  const usersValue = {
    name: userName,
    link: userLink
  };

  addNewCard(usersValue.name, usersValue.link);
  
  closePopup(findPopup(placePopap));
}

export function handleProfileImageFormSubmit(evt) {
  evt.preventDefault();
  const profileImagePopap = findPopup(evt.target);
  const userLink = avatarLinkField.value;  
  editUserProfileImage(userLink);
  
  
  closePopup(profileImagePopap);
}

fillPopupProfile(profileNameField, profileTypeField);