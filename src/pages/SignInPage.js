import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";

export default function SignInPage() {
  const [dataForm, setDataForm] = useState({email: '', password: ''})
  const [isLoading, setIsLoading] = useState(false)
  const {auth, setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  function handleChange(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }
  


function handleSubmit(e){
    e.preventDefault();
    console.log(dataForm)
    setIsLoading(true);
    const promise = axios.post("https://my-wallet-mp2f.onrender.com/sign-in", dataForm)
    promise.then((res) => {
    console.log(res.data)
    const { name, token} = res.data
    localStorage.setItem("auth" , JSON.stringify({name, token}))
    setAuth({ name, token})
    setIsLoading(false);
    console.log(auth)
    navigate("/home")
    })
    
    promise.catch((err) => {
    setIsLoading(false);
      console.log(err)
    alert('Erro, tente novamente');
    });
}
  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" name="email" onChange={handleChange} value={dataForm.email} disabled={isLoading} required/>
        <input placeholder="Senha" type="password" name="password" onChange={handleChange} value={dataForm.password} disabled={isLoading} required/>
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
