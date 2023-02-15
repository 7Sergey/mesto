// console.log('hello');
const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__button-close');

openPopup.addEventListener('click', toggleClass)//пишем функцию без скобок, чтобы она сразу не вызвалась
closePopup.addEventListener('click', toggleClass)

function toggleClass() {//параметр event передается с addEventListener. 
  popup.classList.toggle('popup_opened');// .toggle() позволяет отобразить или скрыть выбранные элементы. 
  // Если элемент изначально отображается, то он будет скрыт, если элемент скрыт, то он будет отображен.
}


//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
popup.addEventListener('click', function (event) {
  console.log('target :', event.target);//сюда попадает тот элемент, по которому кликнули
  console.log('currentTarget :', event.currentTarget);//тот элемент, на который мы повесили addEventListener. То есть класс .popup, который лежит в переменной popup
  if (event.target === event.currentTarget) {
    toggleClass();
  }
})



// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name')
let jobInput = formElement.querySelector('.popup__input_type_job')

// находим элементы с именем и работой пользователя
const userNameElement = document.querySelector('.profile__title')
const userJobElement = document.querySelector('.profile__subtitle')
// находим инпуты имени и работы в форме
const userNameInput = document.querySelector('.popup__input_type_name')
const userJobInput = document.querySelector('.popup__input_type_job')
// записываем в эти поля значения с текущих значений юзера
userNameInput.value = userNameElement.textContent;
userJobInput.value = userJobElement.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  userNameElement.textContent = nameInput.value;
  userJobElement.textContent = jobInput.value;
  toggleClass();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);




