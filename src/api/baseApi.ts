import axios from 'axios';

export const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

async function get<TResponseData>(url: string): Promise<TResponseData> {
  try {
    const response = await axiosService.get<TResponseData>(url);
    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${url}:`, error);
    throw error;
  }
}

async function put<TResponseData, TRequestData>(
  url: string,
  data: TRequestData,
): Promise<TResponseData> {
  try {
    const response = await axiosService.put<TResponseData>(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in PUT request to ${url}:`, error);
    throw error;
  }
}

async function post<TResponseData, TRequestData>(
  url: string,
  data: TRequestData,
): Promise<TResponseData> {
  try {
    const response = await axiosService.post<TResponseData>(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error in POST request to ${url}:`, error);
    throw error;
  }
}

async function del<TResponseData>(url: string): Promise<TResponseData> {
  try {
    const response = await axiosService.delete<TResponseData>(url);
    return response.data;
  } catch (error) {
    console.error(`Error in DELETE request to ${url}:`, error);
    throw error;
  }
}

export { get, put, post, del };
