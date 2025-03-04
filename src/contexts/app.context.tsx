import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  profile: getProfileFromLS(),
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)

  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
