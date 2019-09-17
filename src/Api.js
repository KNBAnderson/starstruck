const axios = require('axios').default;

export const findRepos = (q) => {
  return axios.get('https://api.github.com/search/repositories', {
    params: {
      q: `${q}+language:javascript`,
      sort: "star",
      order: "desc",
    }
  })
  .then((response) => {
    return response.data.items
  })
  .catch((error) => {
    console.log(error);
  });

}