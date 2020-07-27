export const DISLIKE_SENTIMENT = -1;
export const NEUTRAL_SENTIMENT = 0;
export const LIKE_SENTIMENT = 1;

export function getIsDisliked(sentiment) {
  return sentiment === DISLIKE_SENTIMENT;
}

export function getIsLiked(sentiment) {
  return sentiment === LIKE_SENTIMENT;
}

export function getIsNeutral(sentiment) {
  return sentiment === NEUTRAL_SENTIMENT;
}
