import { findPopup } from "../index.js";

// Функция открытия попапа
export function openPopup(nodeElement) {
  const className = 'popup_is-opened';
  addClass(nodeElement, className);
  // Событие для нажатия клавиш
  window.addEventListener('keydown', closePopupByEscapeButton);
}

// Функция закрытия попапа клавишей ESC
export function closePopupByEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
}

// Функция закрытия попапа кликом по верлею
export function closePopupByClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(findPopup(evt.target));
  }
}

// Функция добавления класса
export function addClass(nodeElement, className) {
  nodeElement.classList.add(className);
}

// Функция удаления класса
export function removeClass(nodeElement, className) {
  nodeElement.classList.remove(className);
}

// Функция закрытия попапа
export function closePopup(currentPopup) {
  removeClass(currentPopup, 'popup_is-opened');
  // Снятие события
  window.removeEventListener('keydown', closePopupByEscapeButton);
}