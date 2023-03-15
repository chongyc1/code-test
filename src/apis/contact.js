import axios from "axios";

export const getContactList = (page, name) => axios.get("https://rickandmortyapi.com/api/character",
  {
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
export const getContactDetail = (contactID) => axios.get(`https://rickandmortyapi.com/api/character/${contactID}`
).then((response) => {
  return response
}).catch((error) => {
  return error
});