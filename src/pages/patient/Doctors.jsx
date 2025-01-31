import React, {useState, useEffect, useRef} from "react";
import DoctorCard from "@/components/Cards/DoctorCard";
import {DoctorServices} from "@/services/DoctorServices";
import {HospitalServices} from "@/services/HospitalServices";
import {useQuery} from "react-query";
import HealthLoader from "@/components/spinners/HealthLoader";
import Sidebar from "@/components/SideBar/SideBar";
import CheckboxGroup from "@/components/checkBox/checkBox";
import {useLocation} from "react-router-dom";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const debounceTimeout = useRef(null);
  const location = useLocation();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]);

  const hospitalId = location.state?.hospitalId;
  const fetchDoctors = async (params) => {
    console.log(params);
    const response = !hospitalId
      ? await DoctorServices.getDoctors(params)
      : await HospitalServices.getDoctorsByHospital(hospitalId);
    return response;
  };

  const {
    data: doctors,
    error,
    isLoading,
  } = useQuery(
    ["doctors", debouncedSearch, selectedDepartments, selectedSpecifications],
    () => {
      const departmentParam = selectedDepartments.join(",");
      const specialtyParam = selectedSpecifications.join(",");
      const searchParam = debouncedSearch ? debouncedSearch : undefined;

      const params = {
        department: departmentParam,
        specialty: specialtyParam,
        search: searchParam,
      };
      return fetchDoctors(params);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const {data: departments, isLoading: isLoadingDepartments} = useQuery(
    ["departments"],
    () => DoctorServices.getDepartments(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {data: specifications, isLoading: isLoadingSpecification} = useQuery(
    ["specifications"],
    () => DoctorServices.getSpecifications(),
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

  const handleCheckboxChange = (type, item) => {
    if (type === "department") {
      setSelectedDepartments((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((dep) => dep !== item)
          : [...prevSelected, item]
      );
    } else if (type === "specification") {
      setSelectedSpecifications((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((spec) => spec !== item)
          : [...prevSelected, item]
      );
    }
  };

  const handleClearCheckBox = (clearState) => {
    if (clearState === "department") {
      setSelectedDepartments([]);
    } else if (clearState === "specification") {
      setSelectedSpecifications([]);
    }
  };

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <Sidebar title={"Filters"}>
        <CheckboxGroup
          title={"Departments"}
          items={departments || []}
          selectedItems={selectedDepartments}
          handleCheckboxChange={(item) =>
            handleCheckboxChange("department", item)
          }
          clearState={() => handleClearCheckBox("department")}
        />
        <CheckboxGroup
          title={"Specifications"}
          items={specifications || []}
          selectedItems={selectedSpecifications}
          handleCheckboxChange={(item) =>
            handleCheckboxChange("specification", item)
          }
          clearState={() => handleClearCheckBox("specification")}
        />
      </Sidebar>

      {/* Main content */}
      <div className="lg:ml-72 w-full">
        {/* Search Input */}
        <div className="mb-4 flex justify-center sticky top-[72px] px-1 py-3 z-30 bg-white">
          <input
            type="text"
            placeholder="Search doctors by name, department, or specialty..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm "
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading && <HealthLoader />}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors?.length > 0
            ? doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            : !isLoading && (
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
