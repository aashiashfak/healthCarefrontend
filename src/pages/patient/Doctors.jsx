import React from "react";
import DoctorCard from "@/components/Cards/DoctorCard";
import {DoctorServices} from "@/services/DoctorServices";
import {useQuery} from "react-query";
import DoctorLoader from "@/components/spinners/DoctorLoader";
const Doctors = () => {
  //   const doctors = [
  //     {
  //       id: 2,
  //       department: "Cardiology",
  //       specialties: ["Cardiologist", "Interventional Cardiology"],
  //       user: {
  //         id: 6,
  //         email: "dr.emily.clark@example.com",
  //         role: "Doctor",
  //         is_verified: true,
  //         username: "Dr. Emily Clark",
  //         phone_number: "+1234567891",
  //       },
  //       off_days: ["sunday", "monday"],
  //       start_time: "06:00:00",
  //       end_time: "12:00:00",
  //       years_of_experience: 18,
  //       qualifications:
  //         '"MBBS, MD in Cardiology, Fellowship in Interventional Cardiology"',
  //       created_at: "2024-12-12T16:32:31.371842Z",
  //       updated_at: "2024-12-12T16:32:31.371842Z",
  //     },
  //     {
  //       id: 1,
  //       department: "Cardiology",
  //       specialties: ["Cardiologist", "Electrophysiology"],
  //       user: {
  //         id: 3,
  //         email: "doctor.john@example.com",
  //         role: "Doctor",
  //         is_verified: false,
  //         username: "guest",
  //         phone_number: "+1234567890",
  //       },
  //       off_days: ["sunday", "monday"],
  //       start_time: "12:00:00",
  //       end_time: "18:00:00",
  //       years_of_experience: 12,
  //       qualifications: "MBBS, MD in Cardiology",
  //       created_at: "2024-12-12T04:16:40.059991Z",
  //       updated_at: "2024-12-12T16:33:08.236041Z",
  //     },
  //     {
  //       id: 3,
  //       department: "Orthopedics",
  //       specialties: ["Spine Surgery", "Sports Injury Management"],
  //       user: {
  //         id: 7,
  //         email: "dr.james.miller@example.com",
  //         role: "Doctor",
  //         is_verified: true,
  //         username: "Dr. James Miller",
  //         phone_number: "1987654321",
  //       },
  //       off_days: ["saturday"],
  //       start_time: "14:00:00",
  //       end_time: "18:00:00",
  //       years_of_experience: 12,
  //       qualifications:
  //         "MBBS, MS in Orthopedic Surgery, Fellowship in Spine Surgery",
  //       created_at: "2024-12-12T16:40:51.646666Z",
  //       updated_at: "2024-12-12T16:40:51.646666Z",
  //     },
  //   ];

  const {
    data: doctors,
    error,
    isLoading,
  } = useQuery(["doctors"], () => DoctorServices.getDoctors(), {
    refetchOnWindowFocus: false,
  });

  console.log('doctors===========', doctors)

  if (isLoading) {
    return <DoctorLoader/>;
  }

  if (error) {
    return <div>Error: {error?.response?.data}</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
