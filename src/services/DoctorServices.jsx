import instance from "@/utils/axios";

export const DoctorServices = {
  getDoctors: async (params) => {
    const response = await instance.get("/patient/list-doctors/", {params});
    return response.data;
  },
  getDepartments: async () => {
    const response = await instance.get("/custom_admin/departments/");
    return response.data;
  },
  getSpecifications: async () => {
    const response = await instance.get("/custom_admin/specialties/");
    return response.data;
  },
};
