export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getItem = (key) => {
  localStorage.getItem(key);
}