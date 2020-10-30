import React, { useState, createContext, useContext, useCallback } from 'react'

interface User {
  username: string
  password: string
}

interface AuthContextData {
  user: User | null
  signIn(user: User): void
  logout(): void
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('@MercadoSite:user')

    if (user) {
      return JSON.parse(user)
    }
  })

  const signIn = useCallback((user: User) => {
    localStorage.setItem('@MercadoSite:user', JSON.stringify(user))
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    console.log('logging out...')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  return context
}

export { useAuth, AuthProvider }
