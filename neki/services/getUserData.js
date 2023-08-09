import axios from "axios";

export const getUserData = async (userId, tokem) => {
  try {
    console.log("Este e o bearerToken", tokem);
console.log("entrei %55555555")
    const response = await axios.get(`http://localhost:8080/api/auth/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokem}`
      }
    });
    console.log("sai %55555555")

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Erro ao obter dados do funcionário por id');
    }
  } catch (error) {
    console.error("Erro ao obter o funcionário por id", error);
    throw error;
  }
};
