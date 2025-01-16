import HospitalCard from "@/components/Cards/HospitalCard";
import DoctorLoader from "@/components/spinners/DoctorLoader";
import {HospitalServices} from "@/services/HospitalServices";
import {Locate} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";

const Locations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);
  const [loading, setIsLoading] = useState(false);

  const handleLocationClick = () => {
    setDebouncedSearch("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const {latitude, longitude} = position.coords;
          console.log("Current Location:", {latitude, longitude});

          // Fetch the city name from OpenCage API
          const apiKey = import.meta.env.VITE_OPENCAGE_API;
          console.log(apiKey);
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          try {
            setIsLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.results && data.results.length > 0) {
              const city = data.results[0].components.city || "Unknown City";
              console.log("Nearest City:", city, data);
              setSearchQuery(city);
              setDebouncedSearch(city);
            } else {
              console.error("No results found");
            }
          } catch (error) {
            console.error("Error fetching city name:", error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

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
              <Locate
                className="h-5 w-5 text-white cursor-pointer"
                onClick={handleLocationClick}
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none "
              placeholder=" Search for hospitals by name or location"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {isLoading || loading ? (
          <DoctorLoader />
        ) : (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1 md:p-5 lg:p-10">
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
        )}

        {console.log(hospitals)}
      </div>
    </>
  );
};

export default Locations;
