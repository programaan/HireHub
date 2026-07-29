import api from "../api/axios";

export const registerUser = async (userData) => {

    const response = await api.post("/register/", userData);
    return response.data;

};

export const loginUser = async (userData) => {

    const response = await api.post("/login/", userData);
    return response.data;

};

export const getMe = async () => {

    const response = await api.get("/me/");
    return response.data;

};

export const forgotPassword = async (email) => {

    const response = await api.post("/forgot-password/", {email});
    return response.data;

};

export const resetPassword = async ({uid, token, password, confirm_password}) => {

    const response = await api.post(`/reset-password/${uid}/${token}/`, {password, confirm_password});
    return response.data;
    
};