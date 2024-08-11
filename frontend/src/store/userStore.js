import { create } from 'zustand'

const useUserStore = create((set) => ({
  isAuthenticated: false,
  userDetails: {},
  login: () => {
    set({ isAuthenticated: true })
  },
  updateUserDetails: (data) => {
    set({ userDetails: data })
  },
  logout: () => {
    set({ isAuthenticated: false, userDetails: {} })
  },
}))

export default useUserStore
