import api from "../api/axios";

export const applyJob = async (jobId) => {

    const response = await api.post("/applications/", {job: jobId});
    return response.data;

};

export const getMyApplications = async () => {

    const response = await api.get("/applications/");
    return response.data.results;

};

export const getJobApplications = async (jobId) => {

    const response = await api.get(`/applications/job/${jobId}/`);
    return response.data.results;

};

export const updateApplicationStatus = async (id, status) => {
    const response = await api.patch(`/applications/${id}/status/`, {status});
    return response.data;
};