const BASKET_API_URL = "http://localhost:3000/todos/"

export function getBasket() {
  return function (dispatch) {
    return axios.get(BASKET_API_URL)
      .then(({ data }) => {
        dispatch(setArticleDetails(data));
      });
  };
}