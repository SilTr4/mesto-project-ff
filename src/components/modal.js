import { addCard } from './cards.js';

export const popupFormProfile = document.forms.edit_profile;
const profileNameField = popupFormProfile.elements.name;
const profileTypeField = popupFormProfile.elements.description;

const profilePopup = popupFormProfile.closest('.popup');

export const popupFormPlace = document.forms.new_place;
const placeNameField = popupFormPlace.elements.place_name;
const placeLinkField = popupFormPlace.elements.link;

const placePopup = popupFormPlace.closest('.popup');

const imgPopup = document.querySelector('.popup_type_image');
const profileInfo = document.querySelector('.profile__info');

// Функция открытия попап профайла
export function openProfilePopup() {
  profileNameField.value = profileInfo.querySelector('.profile__title').textContent;
  profileTypeField.value = profileInfo.querySelector('.profile__description').textContent;
  openPopup(profilePopup);
}

// Функция открытия попапа добавления карточек
export function openPlacePopup() {
  openPopup(placePopup);
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

// Функция закрытия попапа
export function closePopup(popupProfile) {
  const parentElement = popupProfile.closest('.popup');
  parentElement.classList.remove('popup_is-opened');
  // Снятие события
  window.removeEventListener('keydown', closePopupByEscapeButton);
}

// Функция редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profilePopup = evt.target;
  const profileName = profileInfo.querySelector('.profile__title');
  const profilType = profileInfo.querySelector('.profile__description');
  profileName.textContent = profileNameField.value;
  profilType.textContent = profileTypeField.value;
  closePopup(profilePopup);
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

  addCard(usersValue, true);
  popupFormPlace.reset();

  closePopup(placePopap);
}
