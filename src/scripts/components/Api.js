export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => this._checkResponse(res))
      .catch(console.log)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: '2924de2c-ae46-4a4c-8bf8-6b1d4464169e',
    'Content-Type': 'application/json',
  },
})
