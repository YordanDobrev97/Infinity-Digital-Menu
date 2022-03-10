import { createContext } from 'react'

const AuthContext = createContext({
  isAuth: false,
  loggedIn: (value) => { }
})

export default AuthContext