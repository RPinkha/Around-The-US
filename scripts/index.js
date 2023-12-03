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
  let cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  return cardElement;
}

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});

const profile = document.querySelector(".profile");
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

function fillProfileInputs() {
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
}

function toggleModal() {
  modal.classList.toggle("modal_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  toggleModal();
}

form.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", () => {
  toggleModal();
  fillProfileInputs();
});

exitButton.addEventListener("click", toggleModal);
