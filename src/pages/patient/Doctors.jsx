import React, {useState, useEffect, useRef} from "react";
import DoctorCard from "@/components/Cards/DoctorCard";
import {DoctorServices} from "@/services/DoctorServices";
import {useQuery} from "react-query";
import DoctorLoader from "@/components/spinners/DoctorLoader";
import Sidebar from "@/components/SideBar/SideBar";
import SideBarDropdown from "@/components/Dropdown/SidebarDropdown";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery); // For delayed search
  const debounceTimeout = useRef(null); // Ref to store the timeout ID

  const fetchDoctors = async (params) => {
    const response = await DoctorServices.getDoctors(params);
    return response;
  };

  const {
    data: doctors,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ["doctors", debouncedSearch],
    () => fetchDoctors(debouncedSearch ? {search: debouncedSearch} : {}), // Pass empty params when no search query
    {
      refetchOnWindowFocus: false,
      enabled: true, // Always enable the query
    }
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(query);
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimeout.current);
  }, []);

  if (error) {
    return <div>Error: {error?.response?.data}</div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar title={"Filters"}>
        <SideBarDropdown title={"Departments"}>
          here come departents
        </SideBarDropdown>
        <SideBarDropdown title={"Specifications"}>
           here come specifications
        </SideBarDropdown>
      </Sidebar>

      {/* Main content */}
      <div className="lg:ml-72 p-4 w-full">
        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search doctors by name, department, or specialty..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-gray-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading && <DoctorLoader />}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No doctors found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
