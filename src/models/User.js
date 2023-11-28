export default class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
  static findOrCreate(options, callback) {
    // console.log(options);
    callback(null, { googleId: "106432048443014957193" });
  }
}