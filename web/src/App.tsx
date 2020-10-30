import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Routes from './routes'
import { AuthProvider } from './hooks/auth'

import GlobalStyle from './styles/global'

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </>
  )
}

export default App
