import create from 'zustand'

const useStore = create(set => ({
  url: '/',
  setUrl: () => set(state => ({ url: state}))
}))

export default useStore;