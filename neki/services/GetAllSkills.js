import axios from "axios";

export const GetAllSkills = async (tokem) => {
    
    try {
        console.log("ENTREI NO TRY")
        
        const response = await axios.get(`http://localhost:8080/api/skill`, {
        headers: {
                Authorization: `Bearer ${tokem}`
            }
        });
        console.log("SAI DA AWAIT")

        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e.response);
        return e.response;
    }
};
