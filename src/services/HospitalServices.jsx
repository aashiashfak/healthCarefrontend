import instance from "@/utils/axios";

export const HospitalServices = {
  getHospitals: async (params) => {
    const response = await instance.get("/patient/list-hospitals/", {params});
    return response.data;
  },
};
