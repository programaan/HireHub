import api from "../api/axios";

export const getMyApplications = async () => {

    const response = await api.get("/applications/");
    return response.data;

};

export const getCandidateProfile = async () => {

    const response = await api.get("/profile/candidate/");
    return response.data;

};

export const updateCandidateProfile = async (profileData) => {

    const response = await api.patch("/profile/candidate/", profileData,
        {
            headers: {"Content-Type": "multipart/form-data"},
        }
    );
    return response.data;

};