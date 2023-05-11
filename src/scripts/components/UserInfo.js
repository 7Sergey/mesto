class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector)
    this._userJob = document.querySelector(userJobSelector)
    this._userAvatar = document.querySelector(userAvatarSelector)
  }
  getUserInfo() {
    return {
      profile: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.textContent,
    }
  }
  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name
    this._userJob.textContent = about
    this._userAvatar.src = avatar
  }
}
export default UserInfo
