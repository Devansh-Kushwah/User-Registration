import createAxios from '../Utils/createAxios'

const axiosInstance = createAxios()

export const signup = async (data) => {
  try {
    const response = await axiosInstance.post({ url: '/auth/signup', data })
    return response.data
  } catch (error) {
    throw error
  }
}

export const login = async (data) => {
  try {
    const response = await axiosInstance.post({ url: '/auth/login', data })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserDetailsByToken = (axios = axiosInstance) => async () => {
  try {
    const response = await axios.get({ url: '/users/fetchUserDetails' })
    return response
  } catch (error) {
    throw error
  }
}

export const updateUserDetails = (axios = axiosInstance) => async (data) => {
  return await axios.post({ url: '/users/updateProfile', data })
}

export const deleteUser = (axios = axiosInstance) => async () => {
  return await axios.delete({ url: '/users/deleteUser' })
}
