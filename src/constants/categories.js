const categories = {
  all: {
    label: 'all',
    image: null,
    file: require('../assets/ideas/all.json'),
  },
  indoor: {
    label: 'Indoor',
    image: require('../assets/images/indoor.jpg'),
    file: require('../assets/ideas/indoor.json'),
  },
  outdoor: {
    label: 'Outdoor',
    image: require('../assets/images/outdoor.jpg'),
    file: require('../assets/ideas/outdoor.json'),
  },
  calm: {
    label: 'Calm',
    image: require('../assets/images/calm.jpg'),
    file: require('../assets/ideas/calm.json'),
  },
  active: {
    label: 'Active',
    image: require('../assets/images/active.jpg'),
    file: require('../assets/ideas/active.json'),
  },
  games: {
    label: 'Games',
    image: require('../assets/images/games.jpg'),
    file: require('../assets/ideas/games.json'),
  },
  pets: {
    label: 'Pets',
    image: require('../assets/images/pets.jpg'),
    file: require('../assets/ideas/pets.json'),
  },
  crafts: {
    label: 'Crafts',
    image: require('../assets/images/crafts.jpg'),
    file: require('../assets/ideas/crafts.json'),
  },
  food: {
    label: 'Food',
    image: require('../assets/images/food.jpg'),
    file: require('../assets/ideas/food.json'),
  },
};

export const categoriesArrayWithoutFiles = Object.keys(categories).map(
  (categoryKey) => ({
    name: categoryKey,
    ...categories[categoryKey],
    file: null,
  }),
);

export default categories;
