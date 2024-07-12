import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';
import { createSelector } from '@reduxjs/toolkit';


const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    // Task 1: Create an `addPhoto()` case reducer that adds a photo to state.photos. 
    // Task 1 Hint: You can use state.photos.unshift()
    // `unshift()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    addPhoto: (state, action) => {
      //state.photos.unshift({ id: state.photos.length + 1, caption:"what's here" , imageUrl: action.payload });
      const { imageUrl, caption } = action.payload;
      state.photos.push({
        id: state.photos.length + 1,
        imageUrl,
        caption,
      });
    },

    // Task 6: Create an `removePhoto()` case reducer that removes a photo from state.photos
    // Task 6 Hint: You can use state.photos.splice()
    // `splice()` documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    removePhoto: (state, action) => {
      //console.log("action.payload: ",action.payload);
      //state.photos.splice(state.photos.id,1);
      state.photos.splice(action.payload-1,1);
    }
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
//export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  //const searchTerm = selectSearchTerm(state);
//};
export const selectFilteredPhotos = createSelector(
  [state => state.photos.photos, selectSearchTerm],
  (photos, searchTerm) => {
    //console.log("photos: ",photos);
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return photos.filter(photo =>
      photo.caption.toLowerCase().includes(lowercasedSearchTerm)
    );
  }
);
