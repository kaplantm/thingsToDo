import { createSlice } from '@reduxjs/toolkit';
import { findIndexOfObjWithId } from '../../lib/utils';
import { NEUTRAL_SENTIMENT } from '../../constants/likes';

const ideasSlice = createSlice({
  name: 'ideas',
  initialState: {
    customIdeas: [], // array full ideas for custom ideas. stored on device for offline viewing
    sentimentalIdeas: {},
  },
  reducers: {
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
      const { idea, sentiment } = action.payload;
      state.sentimentalIdeas[idea.id] = { ...idea, sentiment };

      console.log(
        ' state.ideaSentimentMa?',
        state.sentimentalIdeas,
        // state.sentimentalIdeas,
      );
      return state;
    },
  },
});

export const { addIdea, deleteIdea, setIdeaSentiment } = ideasSlice.actions;

export default ideasSlice.reducer;
