import instance from "@/utils/axios";

export const DoctorServices = {
    getDoctors: async (params) =>{
        const response = await instance.get("/patient/list-doctors/", {params});
        return response.data;
    }
}