import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * The global JWT variable used in request interceptors.
 */
let authToken = ''

/**
 * Sets the authentication token for API requests.
 * This function updates the global JWT variable used in request interceptors.
 * @param {string} token - The authentication token to be set.
 */
export const setAuthToken = (token: string): void => {
    authToken = token
}

/**
 * Adds an authentication token interceptor to the given Axios instance.
 * This interceptor sets the Authorization header with the JWT token if the instance is configured to use authentication.
 * @param {AxiosInstance} instance - The Axios instance to which the interceptor should be added.
 * @param {boolean} useAuth - Whether the instance should use authentication.
 */
const addAuthTokenInterceptor = (
    instance: AxiosInstance,
    useAuth = true,
): void => {
    instance.interceptors.request.use(
        (config) => {
            if (useAuth && authToken) {
                config.headers.Authorization = `Bearer ${authToken}`
            }
            return config
        },
        (error) =>
            Promise.reject(
                error instanceof Error ? error : new Error(String(error)),
            ),
    )
}

/**
 * Creates an Axios instance with the specified base URL and authentication settings.
 * @param {string} baseURL - The base URL for the Axios instance.
 * @param {boolean} useAuth - Whether the instance should use authentication.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const createInstance = (
    baseURL: string,
    useAuth = true,
): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 10_000,
    })
    addAuthTokenInterceptor(instance, useAuth)
    return instance
}
