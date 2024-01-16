import { Promise } from "core-js";
import { addCard } from "./cards";
import {
  popupFormPlace,
  popupFormProfile,
  popupUserProfileImage,
  addClass,
  removeClass
} from "./modal";

const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "7499e221-37df-4f14-b7ff-99655bec5a65",
    "content-type": "application/json",
  },
};
const userField = document.querySelector(".profile");
export let userId = null;

function getUserInfo() {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => showUserInfo(res))
    .catch((err) => {
      console.log(err)});
}

function showUserInfo(userObject) {
  userId = userObject._id;
  const userName = userField.querySelector(".profile__title");
  const userDescription = userField.querySelector(".profile__description");
  const userAvatar = userField.querySelector(".profile__image");
  userName.textContent = userObject.name;
  userDescription.textContent = userObject.about;
  userAvatar.style = `background-image: url(${userObject.avatar})`;
}

function getServersData() {
  return Promise.all([getUserInfo(), getUsersImages()]);
}

function getUsersImages() {
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cards) => cards.forEach(addCard))
    .catch((err) => {
      console.log(err)});
}

export function editUserData(userName, description) {
  const button = searchFormButton(popupFormProfile);
  renderLoading(button, true);
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: userName,
      about: description,
    }),
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => renderLoading(button, false));
}

export function addNewCard(usersName, usersLink) {
  const button = searchFormButton(popupFormPlace);
  renderLoading(button, true);
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: usersName,
      link: usersLink,
    }),
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((card) => addCard(card, true))
    .catch((err) => {
      console.log(err)})
    .finally(() => renderLoading(button, false));
}

export function deleteCard(imgId) {
  fetch(`${config.baseUrl}/cards/${imgId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  }).catch((err) => {
      console.log(err)});
}

export function toLikeImage(imgId, likes, like, likeClass) {
  fetch(`${config.baseUrl}/cards/likes/${imgId}`, {
    method: "PUT",
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {likes.textContent = res.likes.length;
      addClass(like, likeClass)})
    .catch((err) => {
      console.log(err)});
}

export function toDislikeImage(imgId, likes, like, likeClass) {
  fetch(`${config.baseUrl}/cards/likes/${imgId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {likes.textContent = res.likes.length;
      removeClass(like, likeClass)})
    .catch((err) => {
      console.log(err)});
}

export function editUserProfileImage(imgLink) {
  const button = searchFormButton(popupUserProfileImage);
  renderLoading(button, true);
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: imgLink,
    }),
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();}
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => showUserInfo(res))
    .catch((err) => {
      console.log(err)})
    .finally(() => renderLoading(button, false));
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

getServersData();
