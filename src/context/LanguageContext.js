import { createContext } from 'react'

const LanguageContext = createContext({
  lang: "bg",
  setLang: (value) => { }
})

export default LanguageContext