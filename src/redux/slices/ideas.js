import {createSlice} from '@reduxjs/toolkit';
import defaultIdeas from '../../constants/defaultIdeas';
import {findIndexOfObjWithId} from '../../utils';

const ideasSlice = createSlice({
  name: 'ideas',
  initialState: defaultIdeas,
  reducers: {
    addIdea(state, action) {
      const {id, text} = action.payload;
      state.push({id, isCustom: true, text, icon: null, categories: []});
    },
    deleteIdea(state, action) {
      const {id} = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index.isCustom) {
        state.splice(index);
      }
    },
    likeIdea(state, action) {
      const {id} = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = false;
        state[index].liked = true;
      }
    },
    unlikeIdea(state, action) {
      const {id} = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = false;
        state[index].liked = false;
      }
    },
    dislikeIdea(state, action) {
      const {id} = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = true;
        state[index].liked = false;
      }
    },
    undislikeIdea(state, action) {
      const {id} = action.payload;
      const index = findIndexOfObjWithId(state, id);
      if (index !== -1) {
        state[index].disliked = false;
        state[index].liked = false;
      }
    },
  },
});

export default ideasSlice;
