const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');


// Находим форму в DOM
const formProfile = popupProfile.querySelector('.popup__form')//форму в переменную для обработки сабмита
// находим элементы с именем и работой пользователя
const userNameElement = document.querySelector('.profile__title')//на странице
const userJobElement = document.querySelector('.profile__subtitle')


const userNameInput = popupProfile.querySelector('.popup__input_type_name')//поля в форме
const userJobInput = popupProfile.querySelector('.popup__input_type_job')

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

popupProfile.addEventListener('click', (event) => {//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
  if (event.target === event.currentTarget) {
  togglePopup(popupProfile);
  }
})
popupProfileOpen.addEventListener('click', () => {//открытие попапа профиля
  userNameInput.value = userNameElement.textContent;
  userJobInput.value = userJobElement.textContent;
  togglePopup(popupProfile);
})
popupProfileClose.addEventListener('click', () => {//закрытие попапа профиля
  togglePopup(popupProfile)
})

formProfile.addEventListener('submit', handleFormSubmit);//слушатель сохранения изменений в форме профиля




//ПРОЕКТНАЯ РАБОТА 5

const initialCards = [
  {
    name: 'Архыз',
    image: 'https://picsum.photos/00?card1'
  },
  {
    name: 'Челябинская область',
    image: 'https://picsum.photos/00?card2'
  },
  {
    name: 'Иваново',
    image: 'https://picsum.photos/00?card3'
  },
  {
    name: 'Камчатка',
    image: 'https://picsum.photos/00?card4'
  },
  {
    name: 'Холмогорский район',
    image: 'https://picsum.photos/00?card5'
  },
  {
    name: 'Байкал',
    image: 'https://picsum.photos/00?card6'
  }
];

// const elements = document.querySelector('.elements');

// const createCard = (card) => {
//   const cardTemplate = document.querySelector('.template').value.cloneNode(true);
//   const cardTitle = card.querySelector('.card__title');
// }

