class User {
  constructor(
    id,
    username,
    email,
    password,
    role,
    walletBalance,
    walletAddress,
    active
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.walletBalance = walletBalance;
    this.walletAddress = walletAddress;
    this.active = active;
  }
}

module.exports = User;
