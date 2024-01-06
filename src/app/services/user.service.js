import httpServices from "./http.service";


const userEndpoint = 'user/';

const userService = {

  get: async (id) => {
    const data = await httpServices.get(userEndpoint + id);
    return data;
  }
}

export default userService;