import httpServices from "./http.service";
const productEndpoint = 'product/';


const productService = {

  fetchAll: async () => {
    const data = await httpServices.get(productEndpoint);
    return data;
  },

  add: async (payload) => {
    const data = await httpServices.put(productEndpoint + payload.id, payload);
    return data;
  },

  update: async (payload,) => {
    const data = await httpServices.patch(productEndpoint + payload.id, payload);
    return data;
  },

  delete: async (id, ) => {
    console.log(productEndpoint + id )
    const data = await httpServices.delete(productEndpoint + id );
    return data;
  }

}

export default productService;