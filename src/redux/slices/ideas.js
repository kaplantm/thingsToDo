import { createSlice } from '@reduxjs/toolkit';
import { findIndexOfObjWithId } from '../../lib/utils';

const ideasSlice = createSlice({
  name: 'ideas',
  initialState: {
    customIdeas: [], // array full ideas for custom ideas. stored on device for offline viewing
    sentimentalIdeas: {},
  },
  reducers: {
    upsertIdea(state, action) {
      const { text, id } = action.payload;
      const newId = id || new Date().getTime();

      const index = findIndexOfObjWithId(state.customIdeas, newId);
      console.log('**** upsertIdea', { text, newId, index });
      if (index === -1) {
        state.customIdeas.push({
          id: newId,
          isCustom: true,
          disliked: false,
          liked: true,
          text,
          icon: '⭐️',
          categories: [],
        });
      } else {
        state.customIdeas[index].text = text;
      }
      return state;
    },
    deleteIdea(state, action) {
      const { id } = action.payload;
      const index = findIndexOfObjWithId(state.customIdeas, id);

      if (index !== -1) {
        state.customIdeas.splice(index, 1);
      }
      return state;
    },
    setIdeaSentiment(state, action) {
      const { idea, sentiment } = action.payload;
      state.sentimentalIdeas[idea.id] = { ...idea, sentiment };

      return state;
    },
  },
});

export const { upsertIdea, deleteIdea, setIdeaSentiment } = ideasSlice.actions;

export default ideasSlice.reducer;
