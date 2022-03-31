import { createContext } from 'react'

const OrientationContext = createContext({
    orientation: '',
    setOrientation: (value) => { }
})

export default OrientationContext