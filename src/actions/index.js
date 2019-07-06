export const addToCounter = (store, amount) => {
  const counter = store.state.counter + amount;
  store.setState({ counter });
};

export const setMapCenter = (store, center) => {
  store.setState({ center:center });
  console.log('centerCoord: ', store);
}

export const setMap = (store, map) => {
  store.setState({ map:map });
}