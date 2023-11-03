import APIService from "@/services/axiosinterceptor";

class AuthService {
    async signup(username: string, email: string, password: string) {
        return await APIService.post("/auth/register", {
            username,
            email,
            password,
        });
    }

    async login(email: string, password: string) {
        return await APIService.post("/auth/login", {
            email,
            password
        });
    }

    async logout() {
        await localStorage.removeItem("user");
        return APIService.post("/auth/logout", {}, {
            withCredentials: true
        });
    }
}

export default new AuthService();