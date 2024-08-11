import axios from 'axios'
import useUserStore from '../store/userStore'
import { getClientCustomHeaders } from './getCustomHeader'
import { handleError } from '../Utils/taost'

const protectedRoutes = ['/home']

const isTokenExpiredError = (errorResponse) => {
  if (
    errorResponse?.status === 401 &&
    errorResponse?.message === 'Unauthorized, JWT token wrong or expired'
  ) {
    return true
  }
  return false
}

const getErrorsInArray = (errorResponse) => {
  let errors = []

  if (
    Array.isArray(errorResponse?.data) &&
    typeof errorResponse?.data[0]?.message === 'string'
  ) {
    //fastest-validator error format
    // console.log("fastest-validation");
    errorResponse.data.forEach((error) => {
      errors.push(error.message)
    })
  } else if (
    Array.isArray(errorResponse?.data?.error) &&
    typeof errorResponse?.data?.error[0] === 'string'
  ) {
    //manual array format error
    // console.log("manual array");
    errorResponse.data.error.forEach((error) => {
      errors.push(error)
    })
  } else if (
    typeof errorResponse.data?.error?.details[0]?.message === 'string'
  ) {
    //joi error validation
    errors.push(errorResponse.data.error.details[0].message)
  } else if (typeof errorResponse?.data?.error === 'string') {
    //manual error contain only one object
    // console.log("manual one object");
    errors.push(errorResponse.data.error)
  } else if (typeof errorResponse?.data?.message === 'string') {
    //manual error contain only one object
    // console.log("custom error ars");
    errors.push(errorResponse?.data?.message)
  } else errors.push('Something Went Wrong')

  return errors
}

const displayErrors = (errorResponse) => {
  if (errorResponse?.status >= 400 && errorResponse?.status <= 500) {
    return getErrorsInArray(errorResponse)
  } else return []
}

const createAxios = () => {
  const config = {}
  let baseURL = process.env.REACT_APP_API_URL
  config.baseURL = baseURL

  const axiosInstance = axios.create({ baseURL: config.baseURL })

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const errorResponse = error.response
      if (isTokenExpiredError(errorResponse)) {
        if (window.location.pathname !== '/') {
          console.log('You are logged out!')
          if (protectedRoutes.includes(window.location.pathname)) {
            window.location.pathname = '/'
          }
        }
        useUserStore.getState().logout()
      } else {
        const errors = displayErrors(errorResponse)
        errors.map((error) => {
          console.log(error)
          handleError(error)
        })
      }
      return Promise.reject(error)
    },
  )

  const get = async ({ url, params }) => {
    const response = axiosInstance.request({
      method: 'GET',
      url,
      headers: getClientCustomHeaders(),
      params,
    })
    return response
  }

  const post = async ({ url, data, config = {} }) => {
    const response = axiosInstance.request({
      method: 'POST',
      url,
      headers: getClientCustomHeaders(),
      data,
      ...config,
    })
    return response
  }

  const put = async ({ url, data, config = {} }) => {
    const response = axiosInstance.request({
      method: 'PUT',
      url,
      headers: getClientCustomHeaders(),
      data,
      ...config,
    })
    return response
  }

  const remove = async ({ url, data, config = {} }) => {
    const response = axiosInstance.request({
      method: 'DELETE',
      url,
      headers: getClientCustomHeaders(),
      data,
      ...config,
    })
    return response
  }

  return {
    instance: axiosInstance,
    get,
    post,
    put,
    delete: remove,
  }
}

export default createAxios
