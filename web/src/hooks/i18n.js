import React, {useContext} from 'react'

const CurrentLocaleContext = React.createContext({
  locale: process.env.locale
})

export function useCurrentLocale () {
  return useContext(CurrentLocaleContext)
}

export const CurrentLocaleProvider = CurrentLocaleContext.Provider
