import APIService from "@/services/axiosinterceptor";

class UserService {
    async addHighScore(scored: number) {
        return await APIService.post("/user/addHighScore", {
            highScore: scored
        }, {
            withCredentials: true,
        });
    }
}

export default new UserService();