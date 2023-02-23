const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');

const userNameElement = document.querySelector('.profile__title')//на странице
const userJobElement = document.querySelector('.profile__subtitle')

const formProfile = popupProfile.querySelector('.popup__form')//форму в переменную для обработки сабмита
const userNameInput = popupProfile.querySelector('.popup__input_type_name')//поля в форме
const userJobInput = popupProfile.querySelector('.popup__input_type_job')


//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupNewCard = document.querySelector('.popup_new_card');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const popupNewCardClose = popupNewCard.querySelector('.popup__button-close');

const cardName = document.querySelector('.elements__title')//на странице
const cardImage = document.querySelector('.elements__image')

const formNewCard = popupNewCard.querySelector('.popup__form')//форму в переменную для обработки сабмита
const formCardName = popupNewCard.querySelector('.popup__input_type_name')//поля в форме
const formCardImage = popupNewCard.querySelector('.popup__input_type_image')

//функция переключения класса видимости для всех попапов
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
}

const handleFormSubmit = (evt) => {//отправка формы профиля evt -- параметр, передаваемый кликом
  evt.preventDefault(); // Отмена дефолтной отправки формы с перезагрузкой страницы
  userNameElement.textContent = userNameInput.value;//запись в профиль значений из инпутов
  userJobElement.textContent = userJobInput.value;
  togglePopup(popupProfile);
}


popupProfileOpen.addEventListener('click', () => {//открытие попапа профиля
  userNameInput.value = userNameElement.textContent;
  userJobInput.value = userJobElement.textContent;
  togglePopup(popupProfile);
})

formProfile.addEventListener('submit', handleFormSubmit);// сохранения изменений в форме профиля

popupProfileClose.addEventListener('click', () => {//закрытие попапа профиля
  togglePopup(popupProfile)
})

popupProfile.addEventListener('click', (event) => {//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
  if (event.target === event.currentTarget) {
  togglePopup(popupProfile);
  }
})




//ПРОЕКТНАЯ РАБОТА 5

const initialCards = [
  {
    name: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');

const createCard = (card) => {
  const newCard = document.querySelector('.template').content.cloneNode(true);
  const cardTitleTemplate = newCard.querySelector('.card__title');
  cardTitleTemplate.textContent = card.name
  const cardImageTemplate = newCard.querySelector('.card__image')
  cardImageTemplate.setAttribute('src', card.image)
  cardImageTemplate.setAttribute('alt', card.name)
  const likeButton = newCard.querySelector('.card__trash-button')
  likeButton.addEventListener('click', handleDeleteButtonClick)
  elements.append(newCard)
}

initialCards.forEach(createCard);



function handleDeleteButtonClick(event) {//удаление карточки
  const button = event.target;
  const card = button.closest('.card')//возможна проблема из-за того, что .card -- div, а не form
  card.remove()
}

