import {Locate} from "lucide-react";

const Locations = () => {
  return (
    <>
      <div className="flex justify-center mt-5 p-1">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-3 bg-theme-gradient rounded-l-md ">
            <Locate className="h-5 w-5 text-white cursor-pointer" />
          </div>
          <input
            type="text"
            className="w-full p-3 pl-12 border border-gray-300 rounded-md shadow-sm focus:outline-none "
            placeholder="Street Address, City Center"
          />
        </div>
      </div>
    </>
  );
};

export default Locations;
