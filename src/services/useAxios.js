import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for making HTTP requests using Axios.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {object} - An object containing data, alert, loading state, and HTTP methods.
 */
const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  /**
   * Displays an alert message.
   * @param {string} message - The message to display.
   * @param {string} type - The type of alert (e.g., 'success', 'error').
   */
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  /**
   * Makes an HTTP request using Axios.
   * @param {string} method - The HTTP method (e.g., 'get', 'post').
   * @param {string} endpoint - The API endpoint.
   * @param {object} [payload=null] - The request payload (for POST/PUT requests).
   */
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert('Book added successfully', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Makes a GET request.
   * @param {string} endpoint - The API endpoint.
   */
  const get = async (endpoint) => makeRequest('get', endpoint);

  /**
   * Makes a POST request.
   * @param {string} endpoint - The API endpoint.
   * @param {object} payload - The request payload.
   */
  const post = async (endpoint, payload) => makeRequest('post', endpoint, payload);

  /**
   * Makes a PUT request.
   * @param {string} endpoint - The API endpoint.
   * @param {object} payload - The request payload.
   */
  const update = async (endpoint, payload) => makeRequest('put', endpoint, payload);

  /**
   * Makes a DELETE request.
   * @param {string} endpoint - The API endpoint.
   */
  const remove = async (endpoint) => makeRequest('delete', endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
