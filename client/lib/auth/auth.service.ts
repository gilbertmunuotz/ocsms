type LoginResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
  };
};

const BASE_URL = "https://shirly-pseudocubic-leatha.ngrok-free.dev";

export class AuthService {
  static async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return null;

    const data: LoginResponse = await res.json();

    return {
      id: String(data.user.id),
      email: data.user.email,
      name: data.user.name,
      role: data.user.role === "ADMIN" ? "admin" : "buyer",
      accessToken: data.token,
    };
  }
}
