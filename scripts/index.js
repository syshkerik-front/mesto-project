let editButton = document.querySelector(".button_action_edit");
let addButton = document.querySelector(".button_action_add");
let popupProfile = document.querySelector("#editprofile");
let closeButtonProfile = popupProfile.querySelector(".button_action_close");
let saveButton = popupProfile.querySelector(".popup__button");
let popupPlace = document.querySelector("#addplace");
let closeButtonPlace = popupPlace.querySelector(".button_action_close");
let createButton = popupPlace.querySelector(".popup__button");
let likeButtons = document.querySelectorAll(".card__like");
let deleteButtons = document.querySelectorAll(".card__delete");
let cardsContainer = document.querySelector(".photo-grid__list");
const formElement = popupProfile.querySelector(".popup__admin");
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#description");
const cardTemplate = document.querySelector("#card-template").content;
let popupPhoto = document.querySelector("#popup-photo");
let closeButtonPhoto = popupPhoto.querySelector(".button_action_close");
let photos = cardsContainer.querySelectorAll(".card__photo");

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

function openWindowProfile() {
	let profileName = document.querySelector(".profile__name");
	let profileDescription = document.querySelector(".profile__description");
	
	popupProfile.classList.add("popup_opened");
	nameInput.value = profileName.textContent;
	jobInput.value = profileDescription.textContent;
}

function closeWindowProfile() {
	popupProfile.classList.remove("popup_opened");
}

function editProfile(evt) {
	evt.preventDefault();
	let profileName = document.querySelector(".profile__name");
	let profileDescription = document.querySelector(".profile__description");
	
	profileName.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;
	closeWindowProfile();
}

function addInitialCards() {
	for (let i = 0; i < initialCards.length; i++) {
		let newCard = cardTemplate.querySelector(".card").cloneNode(true);
		newCard.querySelector(".card__photo").src = initialCards[i].link;
		newCard.querySelector(".card__title").textContent = initialCards[i].name;
		cardsContainer.append(newCard);
	}
	likeButtons = document.querySelectorAll(".card__like");
	deleteButtons = document.querySelectorAll(".card__delete");
	photos = cardsContainer.querySelectorAll(".card__photo");
	for (let i = 0; i < initialCards.length; i++) {
		photos[i].alt = initialCards[i].name;
	}
}

function openWindowPlace() {
	popupPlace.classList.add("popup_opened");
}

function closeWindowPlace() {
	popupPlace.classList.remove("popup_opened");
}

function toggleLikes() {
	likeButtons.forEach(function(item) {
		item.addEventListener('click', function() {
			item.classList.toggle("card__like_active");
		});
	});
}

function addCard(evt) {
	evt.preventDefault();

	const placeInput = popupPlace.querySelector("#place");
	const linkInput = popupPlace.querySelector("#link");

	let newCard = cardTemplate.querySelector(".card").cloneNode(true);
	newCard.querySelector(".card__photo").src = linkInput.value;
	newCard.querySelector(".card__title").textContent = placeInput.value;
	cardsContainer.prepend(newCard);

	let likeButton = document.querySelector(".card__like");
	likeButton.addEventListener('click', function() {
		likeButton.classList.toggle("card__like_active");
	});

	let deleteButton = document.querySelector(".card__delete");
	deleteButton.addEventListener ('click', function() {
		let deleteElement = deleteButton.closest(".card");
		deleteElement.remove();
	});

	let photoLink = popupPhoto.querySelector(".popup__image-popup");
	photoLink.src = linkInput.value;

	let photoCaption = popupPhoto.querySelector(".popup__caption");
	photoCaption.textContent = placeInput.value;

	let photo = document.querySelector(".card__photo");
	photo.addEventListener ('click', function() {
		popupPhoto.classList.add("popup_opened");
		popupPhoto.classList.add("popup_photo");
	})

	linkInput.value = '';
	placeInput.value = '';
	closeWindowPlace();
}

function deleteCard() {
	deleteButtons.forEach(function(item) {
		item.addEventListener('click', function() {
			let deleteElement = item.closest(".card");
			deleteElement.remove();
		});
	});
}

function resizePhoto() {
	let i = 0;
	photos.forEach(function(item) {
		item.addEventListener('click', function() {
			popupPhoto.classList.add("popup_opened");
			popupPhoto.classList.add("popup_photo");

			let photoLink = popupPhoto.querySelector(".popup__image-popup");
			photoLink.src = item.src;

			let photoCaption = popupPhoto.querySelector(".popup__caption");
			photoCaption.textContent = item.alt;
		});
	});
}

function closeWindowPhoto() {
	popupPhoto.classList.remove("popup_opened");
	popupPhoto.classList.remove("popup_photo");
}

editButton.addEventListener('click', openWindowProfile);
addButton.addEventListener('click', openWindowPlace);
closeButtonProfile.addEventListener('click', closeWindowProfile);
closeButtonPlace.addEventListener('click', closeWindowPlace);
closeButtonPhoto.addEventListener('click', closeWindowPhoto);
popupProfile.addEventListener('submit', editProfile);
popupPlace.addEventListener('submit', addCard);
addInitialCards();
toggleLikes();
deleteCard();
resizePhoto();