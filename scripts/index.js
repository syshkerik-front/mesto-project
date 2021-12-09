const profile = document.querySelector(".profile")
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const editButton = profile.querySelector(".button_action_edit");
const addButton = profile.querySelector(".button_action_add");


const popupProfile = document.querySelector("#editprofile");
const closeButtonProfile = popupProfile.querySelector(".button_action_close");
const saveButton = popupProfile.querySelector(".popup__button");
const formElement = popupProfile.querySelector(".popup__admin");
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#description");

const popupPlace = document.querySelector("#addplace");
const placeInput = popupPlace.querySelector("#place");
const linkInput = popupPlace.querySelector("#link");
const closeButtonPlace = popupPlace.querySelector(".button_action_close");
const createButton = popupPlace.querySelector(".popup__button");

const cardsContainer = document.querySelector(".photo-grid__list");

const cardTemplate = document.querySelector("#card-template").content;

const popupPhoto = document.querySelector("#popup-photo");
const closeButtonPhoto = popupPhoto.querySelector(".button_action_close");
const photoLink = popupPhoto.querySelector(".popup__image-popup");
const photoCaption = popupPhoto.querySelector(".popup__caption");

const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
	];

function openPopup(popup) {
	popup.classList.add("popup_opened");
}

function closePopup(popup) {
	popup.classList.remove("popup_opened");
}


function openWindowProfile() {	
	openPopup(popupProfile);
	nameInput.value = profileName.textContent;
	jobInput.value = profileDescription.textContent;
}

function editProfile(evt) {
	evt.preventDefault();
	
	profileName.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	closePopup(popupProfile);
}

function createCard (link, name) {
	const newCard = cardTemplate.querySelector(".card").cloneNode(true);

	const newCardPhoto = newCard.querySelector(".card__photo");
	newCardPhoto.alt = name;
	newCardPhoto.src = link;
	newCardPhoto.addEventListener('click', function(){ resizePhoto(newCardPhoto); });
	newCard.querySelector(".card__title").textContent = name;

	const newCardLike = newCard.querySelector(".card__like");
	newCardLike.addEventListener('click', function(){ toggleLikes(newCardLike); });

	const newCardDelete = newCard.querySelector(".card__delete");
	newCardDelete.addEventListener('click', function(){ deleteCard(newCardDelete); });
	return newCard;
}

function addInitialCards() {
	let newCard;

	initialCards.forEach(function(card) {
		newCard = createCard(card.link, card.name);
		cardsContainer.append(newCard);
	})
}

function toggleLikes(like) {
	like.classList.toggle("card__like_active");
}

function addCard(evt) {
	evt.preventDefault();

	const newCard = createCard(linkInput.value, placeInput.value);
	cardsContainer.prepend(newCard);
	linkInput.value = '';
	placeInput.value = '';
	closePopup(popupPlace);
}

function deleteCard(item) {
	const deleteElement = item.closest(".card");
	deleteElement.remove();
}

function resizePhoto(item) {
	openPopup(popupPhoto);
	photoLink.src = item.src;
	photoLink.alt = item.alt;
	photoCaption.textContent = item.alt;
}

editButton.addEventListener('click', openWindowProfile);
addButton.addEventListener('click', function(){ openPopup(popupPlace); });
closeButtonProfile.addEventListener('click', function(){ closePopup(popupProfile); });
closeButtonPlace.addEventListener('click', function(){ closePopup(popupPlace); });
closeButtonPhoto.addEventListener('click', function(){ closePopup(popupPhoto); });

popupProfile.addEventListener('submit', editProfile);
popupPlace.addEventListener('submit', addCard);

addInitialCards();