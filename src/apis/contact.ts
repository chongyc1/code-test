import axios from "axios";

export const getContactList = (page: number, name: string, signal: any) => axios.get("https://rickandmortyapi.com/api/character",
  {
    signal,
    params: {
      page: page,
      name: name,
    }
  },
).then((response) => {
  return response
}).catch((error) => {
  return error
});
export const getContactDetail = (contactID: string) => axios.get(`https://rickandmortyapi.com/api/character/${contactID}`
).then((response) => {
  return response
}).catch((error) => {
  return error
});