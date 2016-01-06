export class User {
    Username: string;
    Password: string;
    RememberMe: boolean;

    constructor(username: string,
        password: string) {
        this.Username = username;
        this.Password = password;
        this.RememberMe = false;
    }
}