export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose) //слушатель для закрытия
    // console.log('Открыл попап')
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose) // снятие слушателя для закрытия
    // console.log('Закрыл попап')
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        //если цель -- вне попапа -- закрываем
        this.close()
      } else if (e.target.classList.contains('popup__close')) {
        // если цель -- кнопка закрытия, закрыть попап
        this.close()
      }
    })
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}
