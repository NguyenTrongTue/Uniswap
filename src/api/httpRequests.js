import axiosClient from "./axiosClient";

class Requests {
  calSwap(token0, token1, amount) {
    const url = `swap/cal?token0=${token0}&token1=${token1}&amount=${amount}`;
    return axiosClient.get(url);
  }
  swap(token0, token1, amount, username) {
    const url = `swap/?token0=${token0}&token1=${token1}&amount=${amount}&user=${username}`;
    return axiosClient.post(url);
  }
  getUserbalance(username) {
    const url = `userbalance/${username}`;
    return axiosClient.get(url);
  }
  getTokens() {
    const url = `tokens/`;
    return axiosClient.get(url);
  }
  getPools() {
    const url = `pools/`;
    return axiosClient.get(url);
  }
  login(username) {
    const url = `user/${username}`;
    return axiosClient.get(url);
  }
}

const requests = new Requests();
export default requests;
