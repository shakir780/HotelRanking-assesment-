/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addHotel, editHotel } from "../redux/hotel/hotelslice";

const CreateListing = ({
  setOpenCreateListingModal,
  editData,
  setEditData,
}) => {
  const [countries, setCountries] = useState([]);

  console.log(editData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        const data = await response.json();
        // i added this so i could just extract the country from the api
        const uniqueCountries = [...new Set(data.map((city) => city.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    image: "",
    hotelName: "",
    country: "",
    starRating: "",
    address: "",
  });
  const [file, setFile] = useState();
  const handleChange = (e) => {
    if (name === "image") {
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if editData is available
    if (editData.length !== 0) {
      dispatch(editHotel({ id: editData.id, updatedHotel: formData }));
    } else {
      // If editData is not available, dispatch an action to add a new hotel
      dispatch(addHotel(formData));
    }

    // Reset the form data and close the modal
    setFormData({
      image: "",
      hotelName: "",
      country: "",
      starRating: "",
      address: "",
    });
    setOpenCreateListingModal(false);
  };

  useEffect(() => {
    // Check if editData is available
    if (editData) {
      // If editData is available, update the formData state with its values
      setFormData({
        image: editData.image,
        hotelName: editData.hotelName,
        country: editData.country,
        starRating: editData.starRating,
        address: editData.address,
      });
    }
  }, [editData]);
  console.log(editData);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center p-8  bg-opacity-50 z-50">
      <div className="bg-white w-[600px] rounded-2xl p-8 overflow-hidden h-[590px] 2xl:h-fit">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center pb-6">
            <h2 className="text-lg font-bold">
              {editData.length === 0 ? "Create Listing" : "Edit a Listing"}
            </h2>
            <button
              onClick={() => {
                setOpenCreateListingModal(false);
                setEditData("");
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="image" className="text-sm font-semibold">
              Add Image (URL)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL here"
              className="border border-gray-300 p-2 rounded focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="hotelName" className="text-sm font-semibold">
              Hotel Name
            </label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              required
              value={formData.hotelName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
              placeholder="Enter hotel name"
            />
            <img src={file} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="country" className="text-sm font-semibold">
              Country
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
            >
              <option value="">Select country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="starRating" className="text-sm font-semibold">
              Star Rating
            </label>
            <select
              id="starRating"
              name="starRating"
              required
              value={formData.starRating}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
            >
              <option value="">Select star rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="text-sm font-semibold">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none"
              placeholder="Enter address"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
