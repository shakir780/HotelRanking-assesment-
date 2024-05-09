import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import CreateListing from "./CreateListing";
import { useDispatch, useSelector } from "react-redux";
import { deleteHotel } from "../redux/hotel/hotelslice";
import { motion } from "framer-motion";
import { IoLocationOutline } from "react-icons/io5";

const FeaturedListing = () => {
  const [openCreateListingModal, setOpenCreateListingModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const hotel = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  const [selectedStarRating, setSelectedStarRating] = useState("");

  // Function to handle changes in the select dropdown
  const handleSelectChange = (e) => {
    setSelectedStarRating(e.target.value);
  };

  const filteredHotels = selectedStarRating
    ? hotel.hotels.filter((h) => h.starRating === selectedStarRating)
    : hotel.hotels;

  return (
    <>
      <div className="max-w-5xl mx-auto py-20 px-4  ">
        <div className="py-8  flex  gap-3 md:justify-end">
          <span
            onClick={() => {
              setOpenCreateListingModal(true);
              setEditData([]);
            }}
            className="bg-slate-950 px-4 py-4 text-white w-fit opacity-80 cursor-pointer hover:bg-slate-900"
          >
            Create your listing
          </span>
          <select
            id="sort"
            name="sort"
            required
            value={selectedStarRating}
            onChange={handleSelectChange}
            className="border border-gray-300 w-[100px] px-1  rounded focus:outline-none"
          >
            <option value="">Filter</option>
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
          </select>
        </div>

        <div className=" md:items-center  gap-3 ">
          <div className="flex flex-col gap-3">
            {filteredHotels?.length === 0 ? (
              <p>No Results found</p>
            ) : (
              filteredHotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -100, opacity: 0 }} // Initial position and opacity
                  animate={{ x: 0, opacity: 1 }} // Animation when appearing
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex md:flex-row justify-between flex-col md:items-center shadow-lg bg-white   gap-3 "
                >
                  <div className="flex md:flex-row flex-col gap-3 md:items-center">
                    <img
                      className="w-full md:w-[200px] h-[200px] object-cover"
                      src={hotel.image}
                      alt=""
                    />
                    <div className="flex flex-col gap-3 py-4 px-6">
                      <span className="font-bold text-2xl">
                        {hotel.hotelName}
                      </span>

                      <div className="flex flex-col ">
                        <span>{hotel.country}</span>
                        <div className="flex gap-2 items-center">
                          <span>
                            <IoLocationOutline />
                          </span>
                          <span>{hotel.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: hotel.starRating }).map(
                          (_, i) => (
                            <span key={i} className="text-yellow-300">
                              <FaStar />
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-2xl gap-2 px-6 py-2">
                    <div
                      onClick={() => {
                        setOpenCreateListingModal(true);
                        setEditData(hotel);
                      }}
                      className="bg-green-500 flex items-center gap-2 py-2 px-6 rounded-lg cursor-pointer"
                    >
                      <span className="text-white">
                        <MdEdit />
                      </span>
                      <span className="text-[16px]">Edit</span>
                    </div>
                    <div
                      onClick={() => dispatch(deleteHotel(hotel))}
                      className="bg-red-700 flex items-center gap-2 py-2 px-6 rounded-lg cursor-pointer"
                    >
                      <span className="text-white">
                        <MdDeleteOutline />
                      </span>
                      <span className="text-[16px]">Delete</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
      {openCreateListingModal && (
        <CreateListing
          setOpenCreateListingModal={setOpenCreateListingModal}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </>
  );
};

export default FeaturedListing;
