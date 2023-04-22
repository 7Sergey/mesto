class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector)
    this._userJob = document.querySelector(userJobSelector)
  }
  getUserInfo() {
    return {
      profile: this._userName.textContent,
      job: this._userJob.textContent,
    }
  }
  setUserInfo({ profile, job }) {
    this._userName.textContent = profile
    this._userJob.textContent = job
  }
}
export default UserInfo
