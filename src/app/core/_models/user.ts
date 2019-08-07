export class User {
  constructor(public enabled ?: boolean, public username?: string,
              public role?: string, public  token?: string,
              public refreshToken?: string,public  exp?: string, public idusers?: number) { }
}

