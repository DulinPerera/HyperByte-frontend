import axios from 'axios';

const API_URL = 'http://localhost:5050/restaurants';

export const getAllRestaurants = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error);
        throw error;
    }
};

export const addRestaurant = async (restaurant) => {
    const response = await axios.post(API_URL, restaurant);
    return response.data;
  };

export const deleteRestaurant = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  };

export const updateRestaurant = async (restaurant) => {
    const response = await axios.put(`${API_URL}/${restaurant._id}`, restaurant);
    return response.data;
  };