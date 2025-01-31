import instance from "@/utils/axios";

export const HospitalServices = {
  getHospitals: async (params) => {
    const response = await instance.get("/patient/list-hospitals/", {params});
    return response.data;
  },
  getDoctorsByHospital: async (id, params) => {
    const response = await instance.get(
      `/hospital/list-hospital-doctors/${id}`,
      {params}
    );
    return response.data;
  },
};
