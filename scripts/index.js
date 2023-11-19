let index = 0;
const cardSection = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardAddButton = document.querySelector('.profile__add-button');

function removeCard(element) {
  element.closest('.card').remove();
}

function createCard() {
  if (index === initialCards.length) {
    index = 0;
  }
  const templateNode = cardTemplate.querySelector('.card').cloneNode('true');
  templateNode.querySelector('.card__image').src = initialCards[index].link;
  templateNode.querySelector('.card__title').textContent = initialCards[index].name;
  templateNode.querySelector('.card__delete-button').addEventListener('click', function(evt){
    removeCard(evt.target);
  });
  cardSection.append(templateNode);
  index++;
}

for (let i = 0; i < initialCards.length; i++) {
  createCard();
}
cardAddButton.addEventListener('click', createCard);