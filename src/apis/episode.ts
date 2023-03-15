import axios from "axios";

export const getEpisodeList = (episodes: string) => axios.get(`https://rickandmortyapi.com/api/episode/${episodes}`,
  {
    params: {
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error
});