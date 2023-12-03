const initialCards = [
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
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
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
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

const modal = document.querySelector(".modal");
const exitButton = modal.querySelector(".modal__close");
const saveButton = modal.querySelector(".modal__save");
const profileForm = document.forms["profileForm"];

const modalName = modal.querySelector(".modal__input_type_name");
const modalDescription = modal.querySelector(".modal__input_type_description");

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

profileForm.addEventListener("submit", handleFormSubmit);

editButton.addEventListener("click", () => {
  toggleModal();
  fillProfileInputs();
});

exitButton.addEventListener("click", toggleModal);
