import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [body, setBody] = useState({name: '', email: '', password: ''})
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  function handleChange(e) {
    setBody({ ...body, [e.target.name]: e.target.value });
    
}

function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(body)
    if(!body.name || !body.email || !body.password || !passwordConfirmation) return alert("Todos os campos são necessários!")
    if(body.password !== passwordConfirmation) return alert("As senhas informadas não são correspondentes!")
    const promise = axios.post("https://my-wallet-mp2f.onrender.com/sign-up", body)

    promise.then((res) => {
    setIsLoading(false);
    console.log(res)
    navigate("/");
    });
    promise.catch(() => {
    setIsLoading(false);
    alert('Erro, tente novamente');
    });
}
  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name="name" onChange={handleChange} value={body.name} disabled={isLoading} required />
        <input placeholder="E-mail" type="email" name="email" onChange={handleChange} value={body.email} disabled={isLoading} required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" name="password" onChange={handleChange} value={body.password} disabled={isLoading} required/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" name="passwordConfirmation" onChange={e => {setPasswordConfirmation(e.target.value)}} disabled={isLoading} required/>
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
