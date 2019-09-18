const axios = require("axios").default
//I chose to use axios as I have found it to be a great solution to quick, simple api calls in the past

export const findRepos = q => {
    //I forgot to include this return here, and that caused most of the blockage I had during the interview
    return axios
        .get("https://api.github.com/search/repositories", {
            params: {
                q: `${q}+language:javascript`,
                sort: "star",
                order: "desc",
            },
        })
        .then(response => {
            return response.data.items
        })
        .catch(error => {
            console.log(error)
        })
}
