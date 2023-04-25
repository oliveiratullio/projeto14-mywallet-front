import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import AuthContext from "./contexts/AuthContext"

export default function App() {
  const lsAuth = JSON.parse(localStorage.getItem("auth"))
  const [auth, setAuth] = useState(lsAuth)
  return (
    <AuthContext.Provider auth={auth} value={{auth, setAuth}}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
    </PagesContainer>
    </AuthContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
