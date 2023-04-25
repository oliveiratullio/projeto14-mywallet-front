import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function HomePage() {
  const {auth, setAuth} = useContext(AuthContext)
  const [transactionList, setTransactionList] = useState([])
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if(!auth.token) {
      return navigate("/")
    }
    const promise = axios.get('https://my-wallet-mp2f.onrender.com//transactions', {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    promise.then((res) => {
      const arr = res.data
      setTransactionList(arr.reverse())
      let sum = 0;
      transactionList.forEach(transaction => {
      if (transaction.type === 'income') {
        sum += transaction.value;
      } else {
        sum -= transaction.value;
      }
    });
    setBalance(sum.toFixed(2));
      
    })
    promise.catch((err) => {
      console.log(err.response.data)
    })
  }, [])
  function logout() {
    axios.delete('https://my-wallet-mp2f.onrender.com/logout', {token: auth.token})
    .then((res) => {
      localStorage.removeItem('auth')
      alert("Você foi deslogado")
      navigate('/')
    })
    .catch((err) => console.log(err.response.data))
    
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {auth.name}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
        {transactionList.map((t, index) => {
              return (
                <ListItemContainer>
                  <div>
                    <span>{t.date}</span>
                    <strong>{t.description}</strong>
                  </div>
                  <Value color={t.type === "entrada" ? "positivo" : "negativo"}>{t.value.toFixed(2).replace('.',',')}</Value>
                </ListItemContainer>
                    )
            })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? "positivo" : "negativo"}>{balance ? balance :0}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida">
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`