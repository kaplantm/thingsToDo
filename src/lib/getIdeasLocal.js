import categories from '../constants/categories';

function getIdeasLocal(category = 'all') {
  const ideas = categories[category || 'all']?.file;
  if (!category || category === 'all') {
    return { todos: ideas };
  }
  return { category: { todos: ideas } };
}

export default getIdeasLocal;
