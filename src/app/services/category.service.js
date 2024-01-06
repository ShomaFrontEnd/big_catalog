import httpServices from "./http.service";


const categoryEndpoint = 'category/';

const categoryService = {
  fetchAll: async () => {
    const data = await httpServices.get(categoryEndpoint);
    return data;
  },

  get: async (id) => {
    const data = await httpServices.get(categoryEndpoint + id);
    return data;
  },

  create: async (payload) => {
    const data = await httpServices.put(categoryEndpoint + payload.id,payload);
    return data;
  },

  update: async (payload) => {
    const data = await httpServices.patch(categoryEndpoint + payload.id,payload);
    return data;
  },

  
  delete: async (id) => {
    const data = await httpServices.delete(categoryEndpoint +id);
    return data;
  },





}

export default categoryService;