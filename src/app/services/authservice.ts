import APIService from "@/app/services/axiosinterceptor";

class AuthService {
    async signup(username: string, email: string, password: string) {
        return await APIService.post("/auth/register", {
            username,
            email,
            password,
        });
    }
}

export default new AuthService();