import defaultIdeas from '../constants/defaultIdeas';

function getIdeasLocal(filterRequirement) {
  const filterKeys = Object.keys(filterRequirement);
  return defaultIdeas.filter(
    (unfilteredIdea) =>
      // eslint-disable-next-line eqeqeq
      !filterKeys.some((key) => unfilteredIdea[key] != filterRequirement[key]), // returns true if any of the filters
  );
}

export default getIdeasLocal;
