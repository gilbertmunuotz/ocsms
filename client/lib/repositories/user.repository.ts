import users from "../data/users.json";

export type UserEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "seller" | "buyer";
};

export class UserRepository {
  static findByEmail(email: string): UserEntity | undefined {
    return users.find((u) => u.email === email) as UserEntity | undefined;
  }
}
