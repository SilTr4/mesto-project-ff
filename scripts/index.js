const cardSection = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardAddButton = document.querySelector('.profile__add-button');

function removeCard(element) {
  element.closest('.card').remove();
}

function createCard(elemObj, removeCardFunction) {
  const templateNode = cardTemplate.querySelector('.card').cloneNode('true');
  templateNode.querySelector('.card__image').src = elemObj.link;
  templateNode.querySelector('.card__title').textContent = elemObj.name;
  templateNode.querySelector('.card__image').alt = elemObj.name;
  templateNode.querySelector('.card__delete-button').addEventListener('click', function(evt){
    removeCardFunction(evt.target);
  });
  return templateNode;
}

initialCards.forEach(element => {
  cardSection.append(createCard(element, removeCard));
});