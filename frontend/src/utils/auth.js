class Auth {
  constructor() {
    this.user_token = JSON.parse(localStorage.getItem("auth")) || null;
    this.admin_token = JSON.parse(localStorage.getItem("admin")) || null;
  }
  getToken() {
    return JSON.parse(localStorage.getItem("auth")) ?
      JSON.parse(localStorage.getItem("auth")).auth_token : null;
  }
  getAdminToken() {
    return JSON.parse(localStorage.getItem("admin")) ?
      JSON.parse(localStorage.getItem("admin")).admin_token : null;
  }
  getUser() {
    return JSON.parse(localStorage.getItem("auth")) ?
      JSON.parse(localStorage.getItem("auth")).user : null;
  }

  getTokenExpiration() {
    return JSON.parse(localStorage.getItem("auth")) ?
      JSON.parse(localStorage.getItem("auth")).token_expiration : null;
  }

  // setUserToken(new_token) {
  //   this.auth = new_token;
  //   localStorage.setItem("auth", JSON.stringify(new_token));
  // }

  logout() {
    localStorage.removeItem("auth");
  }

  adminLogout() {
    localStorage.removeItem("admin");
  }
}
export default new Auth();