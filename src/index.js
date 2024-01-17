import "../pages/index.css";
import {
  editUserData,
  addNewCard,
  editUserProfileImage,
  getInitialData,
} from "./components/api.js";
import {
  openPopup,
  closePopup,
  closePopupByClick,
  addClass,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { addCard } from "./components/card.js";

export const modalConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__text-error_active",
};

export const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "7499e221-37df-4f14-b7ff-99655bec5a65",
    "content-type": "application/json",
  },
};

export let userId = null;

const userField = document.querySelector(".profile");

const content = document.querySelector(".page");

const popups = content.querySelectorAll(".popup");

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const userProfileImageButton = content.querySelector(".profile__image");

export const popupFormProfile = document.forms.edit_profile;
const profileNameField = popupFormProfile.elements.name;
const profileTypeField = popupFormProfile.elements.description;

const profilePopup = popupFormProfile.closest(".popup");

export const popupFormPlace = document.forms.new_place;
const placeNameField = popupFormPlace.elements.place_name;
const placeLinkField = popupFormPlace.elements.link;

export const popupUserProfileImage = document.forms["new_profile-image"];
const avatarLinkField = popupUserProfileImage.elements.link;

const placePopup = popupFormPlace.closest(".popup");

const imgPopup = document.querySelector(".popup_type_image");
const profileInfo = document.querySelector(".profile__info");
const profileImagePopup = document.querySelector(".popup_type_edit-profile");

// Функция заполнения полей попапа
function fillPopupProfile(nameField, typeField) {
  nameField.value = profileInfo.querySelector(".profile__title").textContent;
  typeField.value = profileInfo.querySelector(
    ".profile__description"
  ).textContent;
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
  const popupImage = imgPopup.querySelector(".popup__image");
  const currentImg = evt.target;
  popupImage.src = currentImg.src;
  popupImage.alt = currentImg.alt;
  imgPopup.querySelector(".popup__caption").textContent = currentImg
    .closest(".card")
    .querySelector(".card__title").textContent;
  openPopup(imgPopup);
}

export function findPopup(currentElem) {
  const parentElement = currentElem.closest(".popup");
  return parentElement;
}

// Функция редактирования профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profilePopup = evt.target;
  const profileName = profileInfo.querySelector(".profile__title");
  const profilType = profileInfo.querySelector(".profile__description");
  const button = searchFormButton(popupFormProfile);
  renderLoading(button, true);
  editUserData(profileNameField.value, profileTypeField.value)
    .then((res) => {
      profileName.textContent = res.name;
      profilType.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(button, false));
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
    link: userLink,
  };

  const button = searchFormButton(popupFormPlace);
  renderLoading(button, true);
  addNewCard(usersValue.name, usersValue.link)
    .then((card) => addCard(card, true))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, false));
  closePopup(findPopup(placePopap));
}

export function handleProfileImageFormSubmit(evt) {
  evt.preventDefault();
  const profileImagePopap = findPopup(evt.target);
  const userLink = avatarLinkField.value;

  const button = searchFormButton(popupUserProfileImage);
  renderLoading(button, true);
  editUserProfileImage(userLink)
    .then((res) => showUserInfo(res))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(button, false));

  closePopup(profileImagePopap);
}

// Добавление плавности и слушателя событий для попапов
popups.forEach((element) => {
  addClass(element, "popup_is-animated");
  element.addEventListener("click", closePopupByClick);
});

function showUserInfo(userObject) {
  userId = userObject._id;
  const userName = userField.querySelector(".profile__title");
  const userDescription = userField.querySelector(".profile__description");
  const userAvatar = userField.querySelector(".profile__image");
  userName.textContent = userObject.name;
  userDescription.textContent = userObject.about;
  userAvatar.style = `background-image: url(${userObject.avatar})`;
}

function renderInitialData() {
  getInitialData()
    .then(([userData, usersImages]) => {
      showUserInfo(userData);
      usersImages.forEach(addCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showLoadingStatus(formButton) {
  formButton.textContent = "Сохранение...";
}

function hideLoadingStatus(formButton) {
  formButton.textContent = "Сохраненить";
}

function renderLoading(formButton, isLoading) {
  if (isLoading) {
    showLoadingStatus(formButton);
  } else {
    hideLoadingStatus(formButton);
  }
}

function searchFormButton(formElement) {
  return formElement.querySelector(".button");
}

// События для кликов по кнопкам
profileEditButton.addEventListener("click", (evt) => {
  clearValidation(popupFormProfile, modalConfig);
  openProfilePopup(evt);
});
profileAddButton.addEventListener("click", (evt) => {
  clearValidation(popupFormPlace, modalConfig);
  openPlacePopup(evt);
});
userProfileImageButton.addEventListener("click", (evt) => {
  clearValidation(popupUserProfileImage, modalConfig);
  openProfileImagePopup(evt);
});

// События для форм
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormPlace.addEventListener("submit", handleUserCardFormSubmit);
popupUserProfileImage.addEventListener("submit", handleProfileImageFormSubmit);

renderInitialData();

fillPopupProfile(profileNameField, profileTypeField);
enableValidation(modalConfig);
