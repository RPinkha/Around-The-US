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

const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileEditExitBtn = modalProfileEdit.querySelector(".modal__close");
const profileForm = document.forms["profileForm"];

const modalProfileName = modalProfileEdit.querySelector(
  ".modal__input_type_name"
);
const modalProfileDescription = modalProfileEdit.querySelector(
  ".modal__input_type_description"
);

function fillProfileInputs() {
  modalProfileName.value = profileName.textContent;
  modalProfileDescription.value = profileDescription.textContent;
}

function openProfileModal() {
  modalProfileEdit.classList.add("modal_opened");
}

function closeProfileModal() {
  modalProfileEdit.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalProfileName.value;
  profileDescription.textContent = modalProfileDescription.value;
  closeProfileModal();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  openProfileModal();
  fillProfileInputs();
});

profileEditExitBtn.addEventListener("click", closeProfileModal);

const modalAddImage = document.querySelector("#modal-add-card");
const addImageExitBtn = modalAddImage.querySelector(".modal__close");
const imageAddForm = document.forms["addCardForm"];
const modalImageTitle = modalAddImage.querySelector(".modal__input_type_title");
const modalImageLink = modalAddImage.querySelector(
  ".modal__input_type_image-link"
);
function closeAddImageModal() {
  modalAddImage.classList.remove("modal_opened");
}

function openAddImageModal() {
  modalAddImage.classList.add("modal_opened");
}

addImageExitBtn.addEventListener("click", closeAddImageModal);

addButton.addEventListener("click", openAddImageModal);

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const userCard = {};
  userCard["name"] = modalImageTitle.value;
  userCard["link"] = modalImageLink.value;
  const card = createCard(userCard);
  cardsContainer.append(card);
  closeAddImageModal();
}

imageAddForm.addEventListener("submit", handleAddimageFormSubmit());
