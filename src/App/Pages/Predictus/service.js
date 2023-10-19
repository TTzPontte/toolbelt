import {password, username} from "./config";
import axios from "axios";

const authConfig = {
    authUrl: "https://juris.predictus.inf.br:8443/auth",
    apiUrl: "https://juris.predictus.inf.br:8443/predictus-api/lawsuits/search/stream",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match",
        "Access-Control-Allow-Methods": "*",
    },
};

async function getToken(username, password) {
    const requestData = {
        username,
        password,
    };

    try {
        const response = await axios.post(authConfig.authUrl, requestData, {
            headers: authConfig.headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error;
    }
}

const getByCpf = async (TOKEN, body) => {
    const options = {
        method: "POST",
        url: authConfig.apiUrl,
        headers: {
            ...authConfig.headers,
            "AllowedOrigins": "*",
            "Authorization": `Bearer ${TOKEN}`,
        },
        data: body,
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error("Error fetching data by CPF:", error);
        throw error;
    }
};

// Example usage:
(async () => {



    const {accessToken} = await getToken(username, password);
    console.log({accessToken})
    const body = {
        cpfCnpj: "70079872140", // Example CPF
    };

    const result = await getByCpf(accessToken, body);
    console.log("Data by CPF:", result);
})();
