export const getClientCustomHeaders = () => {
  const token = localStorage.getItem('auth-token')
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}
