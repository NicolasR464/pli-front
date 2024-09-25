import type { AxiosInstance } from 'axios'

/**
 * Adds an Authorization header with a Bearer token to an Axios instance. To make sure the user is authenticated.
 * @param {AxiosInstance} instance - The Axios instance to modify.
 * @param {string} token - The JWT token to be added as a Bearer token.
 * @returns {void}
 * @example
 * const axiosInstance = axios.create();
 * const jwtToken = 'your-jwt-token';
 * addAuthHeader(axiosInstance, jwtToken);
 */
export const addAuthHeader = (instance: AxiosInstance, token: string): void => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}
