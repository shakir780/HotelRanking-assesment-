import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

const initialState = {
  hotels: localStorage.getItem("hotels")
    ? JSON.parse(localStorage.getItem("hotels"))
    : [],
  image: "",
  hotelName: "",
  country: "",
  starRating: "",
  address: "",
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    addHotel: (state, action) => {
      const newHotel = {
        id: uuidv4(),
        ...action.payload,
      };

      // Create a copy of the current hotels array
      const updatedHotels = [...state.hotels];

      // Push the new hotel into the copied array
      updatedHotels.push(newHotel);

      // Update local storage with the updated array
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));

      // Return the updated state with the new hotels array
      return {
        ...state,
        hotels: updatedHotels,
      };
    },
    editHotel: (state, action) => {
      const { id, updatedHotel } = action.payload;
      const index = state.hotels.findIndex((hotel) => hotel.id === id);
      console.log(action.payload);
      if (index !== -1) {
        const updatedHotels = [...state.hotels];
        updatedHotels[index] = { ...updatedHotel };

        localStorage.setItem("hotels", JSON.stringify(updatedHotels));

        return {
          ...state,
          hotels: updatedHotels,
        };
      }
      return state;
    },
    deleteHotel: (state, action) => {
      const index = action.payload.id;
      // Create a new array without the hotel at the specified index
      const updatedHotels = state.hotels.filter((hotel) => hotel.id !== index);
      state.hotels = updatedHotels;
      console.log(action.payload);
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
    },
  },
});

export const { setField, addHotel, editHotel, deleteHotel, resetForm } =
  hotelSlice.actions;
export default hotelSlice.reducer;
