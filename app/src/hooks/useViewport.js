import React, { useContext, createContext, useState, useEffect } from "react"

const ViewportContext = createContext([360, 800])
const useViewport = () => useContext(ViewportContext)
export const ViewportProvider = ({ children }) => {
  const [size, setSize] = useState([360, 800])

  const updateSize = () => {
    setSize([window.innerWidth, window.innerHeight])
  }

  useEffect(() => {
    updateSize()
    const listener = () => updateSize()
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  return <ViewportContext.Provider value={size}>
    {children}
  </ViewportContext.Provider>
}

export default useViewport
