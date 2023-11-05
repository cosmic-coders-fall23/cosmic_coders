import APIService from "@/services/axiosinterceptor";

class GameService {
    async leaderboard() {
        return await APIService.get("/game/leaderboard");
    }
}

export default new GameService();