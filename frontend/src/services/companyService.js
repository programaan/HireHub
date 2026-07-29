import api from "../api/axios";

export const getRecruiterProfile = async () => {

    const response = await api.get("/profile/recruiter/");
    return response.data;

};

export const updateRecruiterProfile = async (profileData) => {

    const response = await api.patch("/profile/recruiter/", profileData,
        {
            headers: {"Content-Type": "multipart/form-data"},
        }
    );
    return response.data;

};