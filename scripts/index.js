let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

function createCard(data) {
  let cardTemplate = document.querySelector("#card").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__image").setAttribute("src", data.link);
  cardElement.querySelector(".card__image").setAttribute("alt", data.name);
  return cardElement;
}

cardsContainer = document.querySelector(".cards__list");

for (i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i]);
  cardsContainer.append(card);
}

var profile = document.querySelector(".profile");
var editButton = profile.querySelector(".profile__edit-button");
let addButton = profile.querySelector(".profile__add-button");

var profileName = profile.querySelector(".profile__name");
var profileDescription = profile.querySelector(".profile__description");

var modal = document.querySelector(".modal");
let exitButton = modal.querySelector(".modal__close");
let saveButton = modal.querySelector(".modal__save");
var form = document.querySelector(".modal__form");

var modalName = modal.querySelector(".modal__input-name");
var modalDescription = modal.querySelector(".modal__input-description");

function toggleModal() {
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
  modal.classList.toggle("modal_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  modal.classList.toggle("modal_opened");
}

form.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", toggleModal);
exitButton.addEventListener("click", toggleModal);
