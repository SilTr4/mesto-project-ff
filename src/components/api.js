import { config } from "../index.js"


function handleResponse(result) {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleResponse);
}

export function getInitialData() {
  return Promise.all([getUserInfo(), getUsersImages()]);
}

function getUsersImages() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(handleResponse);
  }
  
export function editUserData(userName, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: userName,
      about: description,
    }),
    headers: config.headers,
  })
    .then(handleResponse);
  }
  
export function addNewCard(usersName, usersLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: usersName,
      link: usersLink,
    }),
    headers: config.headers
  })
    .then(handleResponse);
  }
  
export function deleteCard(imgId) {
  return fetch(`${config.baseUrl}/cards/${imgId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(handleResponse);
}

export function toLikeImage(imgId) {
  return fetch(`${config.baseUrl}/cards/likes/${imgId}`, {
    method: "PUT",
    headers: config.headers
  })
    .then(handleResponse);
  }

export function toDislikeImage(imgId) {
  return fetch(`${config.baseUrl}/cards/likes/${imgId}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then(handleResponse);
}

export function editUserProfileImage(imgLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: imgLink,
    }),
    headers: config.headers
  })
    .then(handleResponse);
}