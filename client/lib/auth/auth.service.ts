import { UserRepository } from "../repositories/user.repository";

export type AuthResult = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "seller" | "buyer";
  accessToken: string;
};

export class AuthService {
  static login(
    email: string,
    password: string
  ): AuthResult | null {
    const user = UserRepository.findByEmail(email);

    if (!user) return null;
    if (user.password !== password) return null;

    // mock JWT
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      accessToken: "mock-jwt-token",
    };
  }
}
