import { createSlice } from '@reduxjs/toolkit';
import defaultIdeas from '../../constants/defaultIdeas';
import { findIndexOfObjWithId } from '../../lib/utils';

const ideasSlice = createSlice({
  name: 'ideas',
  initialState: {
    publicIdeas: defaultIdeas,
    customIdeas: [],
    ideaSentimentMap: {},
  },
  reducers: {
    setPublicIdeas(state, action) {
      const { publicIdeas } = action.payload;
      state.publicIdeas = publicIdeas;
      return state;
    },
    addIdea(state, action) {
      const { text } = action.payload;
      state.customIdeas.push({
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
        state.customIdeas.splice(index);
      }
      return state;
    },
    setIdeaSentiment(state, action) {
      const { id, sentiment } = action.payload;
      state.ideaSentimentMap[id] = sentiment;
      console.log(' state.ideaSentimentMa', state.ideaSentimentMap);
      return state;
    },
  },
});

export const {
  addIdea,
  deleteIdea,
  setIdeaSentiment,
  setPublicIdeas,
} = ideasSlice.actions;

export default ideasSlice.reducer;
