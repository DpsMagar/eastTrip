import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generalInfo: {
    name: 'HomeStay Butwal',
    rating: 4,
    imageUrl: 'https://example.com/images/sapphire.jpg',
  },
  features: {
    featureIds: [1, 2, 3],       // Hotel features
    roomFeatureIds: [4, 5],      // Room features
    extraInfo: 'Free Wi-Fi, Complimentary Breakfast',
  },
  locationDetails: {
    location: 'Butwal',
    attraction: 'Near Mall Road',
    price: 3500,
  },
};

const propertySlice = createSlice({
  name: 'homeStay',
  initialState,
  reducers: {
    setHomeStayDetails: (state, action) => {
      state.generalInfo = action.payload.generalInfo;
      state.features = action.payload.features;
      state.locationDetails = action.payload.locationDetails;
    },
    updateRating: (state, action) => {
      state.generalInfo.rating = action.payload;
    },
    addFeature: (state, action) => {
      state.features.featureIds.push(action.payload);
    },
    removeFeature: (state, action) => {
      state.features.featureIds = state.features.featureIds.filter(id => id !== action.payload);
    },
    addRoomFeature: (state, action) => {
      state.features.roomFeatureIds.push(action.payload);
    },
    removeRoomFeature: (state, action) => {
      state.features.roomFeatureIds = state.features.roomFeatureIds.filter(id => id !== action.payload);
    },
    setSelectedHotelFeatures: (state, action) => {
      state.features.featureIds = action.payload;
    },
    setSelectedRoomFeatures: (state, action) => {
      state.features.roomFeatureIds = action.payload;
    },
    setExtraInfo: (state, action) => {
      state.features.extraInfo = action.payload;
    },
     setName: (state, action) => {
      state.generalInfo.name = action.payload;
    },
    setRating: (state, action) => {
      state.generalInfo.rating = action.payload;
    },
    setImageUrl: (state, action) => {
      state.generalInfo.imageUrl = action.payload;
    },
    setLocation: (state, action) => {
    state.locationDetails.location = action.payload;
    },
    setAttraction: (state, action) => {
      state.locationDetails.attraction = action.payload;
    },
    setPrice: (state, action) => {
      state.locationDetails.price = action.payload;
    },
  }
});


export const {
  setHomeStayDetails,
  updateRating,
  addFeature,
  removeFeature,
  addRoomFeature,
  removeRoomFeature,
  setSelectedHotelFeatures,
  setSelectedRoomFeatures,
  setExtraInfo,
  setImageUrl,
  setName,
  setRating,
  setAttraction, 
  setLocation,
  setPrice,
} = propertySlice.actions;

export default propertySlice.reducer;
