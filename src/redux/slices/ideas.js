import { createSlice } from '@reduxjs/toolkit';
import defaultIdeas from '../../constants/defaultIdeas';
import { findIndexOfObjWithId } from '../../utils';

const ideasSlice = createSlice({
  name: 'ideas',
  initialState: defaultIdeas,
  reducers: {
    addIdea(state, action) {
      const { text } = action.payload;
      state.push({
        id: new Date().getTime(),
        isCustom: true,
        disliked: false,
        liked: true,
        text,
        icon: '⭐️',
        categories: [],
      });
      return state;
    },
    deleteIdea(state, action) {
      const { id } = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index.isCustom) {
        state.splice(index);
      }
      return state;
    },
    toggleLikeIdea(state, action) {
      const { id } = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = false;
        state[index].liked = !state[index].liked;
      }
      return state;
    },
    toggleDislikeIdea(state, action) {
      const { id } = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = !state[index].disliked;
        state[index].liked = false;
      }
      return state;
    },
  },
});

export const {
  addIdea,
  deleteIdea,
  toggleLikeIdea,
  toggleDislikeIdea,
} = ideasSlice.actions;

export default ideasSlice.reducer;
