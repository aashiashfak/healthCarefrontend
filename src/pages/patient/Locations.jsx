import HospitalCard from "@/components/Cards/HospitalCard";
import { HospitalServices } from "@/services/HospitalServices";
import {Locate} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);

  const fetchHospitals = async (params) => {
    console.log(params);
    const response = await HospitalServices.getHospitals(params);
    return response;
  };

  const {
    data: hospitals,
    error,
    isLoading,
  } = useQuery(
    ["hospital", debouncedSearch],
    () => {
      const searchParam = debouncedSearch ? debouncedSearch : undefined;

      const params = {
        search: searchParam,
      };
      return fetchHospitals(params);
    },
    {
      refetchOnWindowFocus: false,
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
    <>
      <div>
        <div className="flex justify-center mt-5 p-1">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-3 bg-theme-gradient rounded-l-md ">
              <Locate className="h-5 w-5 text-white cursor-pointer" />
            </div>
            <input
              type="text"
              className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none "
              placeholder="Street Address, City Center"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals?.length > 0 ? (
            hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hospitals found matching your search.
            </div>
          )}
        </div>

        {console.log(hospitals)}
      </div>
    </>
  );
};

export default Locations;
