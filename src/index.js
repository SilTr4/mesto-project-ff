import "../pages/index.css";
import {
  addClass,
  closePopup,
  handleProfileFormSubmit,
  handleProfileImageFormSubmit,
  popupUserProfileImage,
  handleUserCardFormSubmit,
  popupFormPlace,
  popupFormProfile,
  openProfilePopup,
  openPlacePopup,
  findPopup,
  openProfileImagePopup,
} from "./components/modal.js";
import { enableValidation, config } from "./components/validation.js";

const content = document.querySelector(".page");

const popups = content.querySelectorAll(".popup");

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const userProfileImageButton = content.querySelector(".profile__image");

// События для кликов по кнопкам
profileEditButton.addEventListener("click", openProfilePopup);
profileAddButton.addEventListener("click", openPlacePopup);
userProfileImageButton.addEventListener("click", openProfileImagePopup);

// События для форм
popupFormProfile.addEventListener("submit", handleProfileFormSubmit);
popupFormPlace.addEventListener("submit", handleUserCardFormSubmit);
popupUserProfileImage.addEventListener("submit", handleProfileImageFormSubmit);

// Добавление плавности и слушателя событий для попапов
popups.forEach((element) => {
  addClass(element, "popup_is-animated");
  element.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(findPopup(evt.target));
    }
  });
});

enableValidation(config);
