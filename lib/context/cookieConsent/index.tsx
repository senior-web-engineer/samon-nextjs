
import CookiePopup from '@common/components/cookiePopup';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';

const COOKIE_NAME = 'consent';

interface AppContextInterface {
    isSet?: number;
    marketing?:number;
    ga?: number;
    lf?: number;
}

const CookieConsentStateContext = createContext<AppContextInterface | null>(null)
const CookieConsentDispatchContext = createContext<any | undefined>(undefined)

function getCookie() {
    const regex = new RegExp(`(?:(?:^|.*;\\s*)${COOKIE_NAME}\\s*\\=\\s*([^;]*).*$)|^.*$`)
    if (process.browser) {
      const cookie = document?.cookie?.replace(regex, "$1")
      return cookie.length ? JSON.parse(cookie) : undefined
    }
}

let initialCookieValue = getCookie() || {
    isSet: 0,
    marketing: 1,
    ga: 1,
    lf: 1,
}

const removeGA = () => {
    document.cookie = '_ga=; path=/; domain='+ process.env.NEXT_PUBLIC_DOMAIN + '; expires=' + new Date(0).toUTCString();
    document.cookie = '_gid=; path=/; domain='+ process.env.NEXT_PUBLIC_DOMAIN + '; expires=' + new Date(0).toUTCString();
    //document.cookie = '_ga_13E16D5MQL=; path=/; domain='+ process.env.NEXT_PUBLIC_DOMAIN + '; expires=' + new Date(0).toUTCString();
}


const CookieConsentProvider = ({ children }) => {
    const [popupIsOpen, setPopupIsOpen] = useState<any>(!initialCookieValue.isSet)

    const [state, dispatch] = useReducer((state, action) => {
 
        switch (action.type) {
            case 'acceptCurrent':
              setPopupIsOpen(false)
              return {
                ...state,
                isSet: 1,
              }
            case 'acceptOnlyGoogle':
              setPopupIsOpen(false)
              return {
                isSet: 1,
                marketing: 0,
                ga: 1,
                lf: 0,
              }
            case 'acceptOnlyCookie':
              setPopupIsOpen(false)
              removeGA()
              return {
                isSet: 1,
                marketing: 0,
                ga: 0,
                lf: 1,
              }
            case 'declineAll':
              setPopupIsOpen(false)
              removeGA()
              return {
                isSet: 1,
                marketing: 0,
                ga: 0,
                lf: 0,
              }
            case 'showCookiePopup':
              setPopupIsOpen(true)
              return state
            default:
              throw new Error()
          }
    }, initialCookieValue)

    useEffect(() => {
      document.cookie = `${COOKIE_NAME}=${JSON.stringify(state)}`;
    }, [state])

    return (
        <CookieConsentStateContext.Provider value={state}>
            <CookieConsentDispatchContext.Provider value={dispatch}>{popupIsOpen && <CookiePopup dispatch={dispatch}/>}{children}</CookieConsentDispatchContext.Provider>
        </CookieConsentStateContext.Provider>
    )
}

function useCookieConsentState() {
    const context = useContext(CookieConsentStateContext)
    if (context === undefined) {
        throw new Error('useCookieConsentState must be used within CookieProvider')
    }
    return context
}
  
function useCookieConsentDispatch() {
    const context = useContext(CookieConsentDispatchContext)
    if (context === undefined) {
        throw new Error('useCookieConsentDispatch must be used within CookieProvider')
    }
    return context
}
  
  export { CookieConsentProvider, useCookieConsentState, useCookieConsentDispatch }