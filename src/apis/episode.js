import axios from "axios";

export const getEpisodeList = (episodes) => axios.get(`https://rickandmortyapi.com/api/episode/${episodes}`,
  {
    params: {
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error
});