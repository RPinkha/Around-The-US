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
    name: "Las Vegas",
    link: "https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/2023-06/7b05e031-2d80-4d0a-bbd5-9c28a7ef8d8e.jpeg?h=2ce89a5c&itok=ow9jLMty",
  },
  {
    name: "Mertyl Beach",
    link: "https://www.montereybaysuites.com/wp-content/uploads/2023/01/myrtle-beach-shoreline-1184735168.jpg",
  },
];

//--------------------SELECT CARDS CONTAINER-------------------->>
const cardsContainer = document.querySelector(".cards__list");

//--------------------SELECT ALL CLOSE BUTTONS ELEMENTS-------------------->>
const modalList = Array.from(document.querySelectorAll(".modal"));
const closeButtons = document.querySelectorAll(".modal__close");

//--------------------PROFILE ELEMENTS-------------------->>
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

//--------------------PROFILE EDIT MODAL ELEMENTS-------------------->>
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileForm = document.forms["profileForm"];
const profileNameInput = modalProfileEdit.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = modalProfileEdit.querySelector(
  ".modal__input_type_description"
);

//--------------------ADD IMAGE MODAL ELEMENTS-------------------->>
const modalAddImage = document.querySelector("#modal-add-card");
const imageAddForm = document.forms["addCardForm"];
const modalImageTitle = modalAddImage.querySelector(".modal__input_type_title");
const modalImageLink = modalAddImage.querySelector(
  ".modal__input_type_image-link"
);

//-----------------IMAGE PREVIEW MODAL ELEMENTS------------------>>
const modalImagePreview = document.querySelector("#image-preview-modal");
const previewImage = modalImagePreview.querySelector(".modal__image");
const previewImageTitle = modalImagePreview.querySelector(
  ".modal__image-title"
);

//------------------FUNCTION THAT CREATS CARDS------------------>>
function createCard(data) {
  const cardTemplate = document.querySelector("#card").content; //moved
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); //moved
  const cardTitle = cardElement.querySelector(".card__title"); //moved
  const cardImage = cardElement.querySelector(".card__image"); //moved
  cardTitle.textContent = data.name; //moved
  cardImage.setAttribute("src", data.link); //moved
  cardImage.setAttribute("alt", data.name); //moved
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    previewImage.setAttribute("src", data.link);
    previewImage.setAttribute("alt", data.name);
    previewImageTitle.textContent = data.name;
    openModal(modalImagePreview);
  });
  return cardElement;
}

//--------------------ADDING INITIAL CARDS------------------------>>
initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});

//---------------CLOSE MODALS WITH ESCAPE KEY FUNCTIONS--------------->>
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//---------------CLOSE MODALS PRESSING OUTSIDE OF MODAL--------------->>
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

//--------------------OPEN AND CLOSE MODAL FUNCTIONS-------------------->>
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

//--------------------PROFILE EDIT MODAL FUNCTIONS-------------------->>
function fillProfileInputs() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(modalProfileEdit);
}

//--------------------ADD IMAGE MODAL FUNCTIONS-------------------->>
function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const userCard = {};
  userCard["name"] = modalImageTitle.value;
  userCard["link"] = modalImageLink.value;
  const card = createCard(userCard);
  cardsContainer.prepend(card);
  imageAddForm.reset();
  closeModal(modalAddImage);
}

//--------------------PROFILE EDIT MODAL EVENTS-------------------->>
editButton.addEventListener("click", () => {
  openModal(modalProfileEdit);
  fillProfileInputs();
});
profileForm.addEventListener("submit", handleProfileFormSubmit);

//--------------------ADD IMAGE MODAL EVENTS-------------------->>
addButton.addEventListener("click", () => openModal(modalAddImage));
imageAddForm.addEventListener("submit", handleAddImageFormSubmit);

//--------------------MODAL CLOSE EVENT LOOP-------------------->>
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});