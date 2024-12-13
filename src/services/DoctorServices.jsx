import instance from "@/utils/axios";

export const DoctorServices = {
    getDoctors: async () =>{
        const response = await instance.get("/patient/list-doctors/");
        return response.data;
    }
}