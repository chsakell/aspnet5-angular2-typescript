export class Registration {
    Username: string;
    Password: string;
    Email: string;

    constructor(username: string,
        password: string,
        email: string) {
        this.Username = username;
        this.Password = password;
        this.Email = email;
    }
}