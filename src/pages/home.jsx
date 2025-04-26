import { useNavigate } from "react-router-dom"


export default function Home(){
    const navigate = useNavigate()
    const logoutfunction =()=>{
          localStorage.clear()
          navigate("/")
    }
    return(
        <>
        <h1>home</h1>
        <button onClick={logoutfunction}>log out</button>
        </>
    )
}