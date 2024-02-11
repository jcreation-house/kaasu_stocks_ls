//local storage functions
export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key)) ?? [];
};

export const saveItem = (key, newItem) => {
  console.log("new Item created");
  const exitingItems = getItem(key);
  return localStorage.setItem(key, JSON.stringify([...exitingItems, newItem]));
};

export const deleteItem = ({ key, id }) => {
  let existingData = getItem(key);
  if (id) {
    return localStorage.setItem(
      key,
      JSON.stringify(existingData.filter((item) => item.key !== id))
    );
  }
  return localStorage.removeItem(key);
};
