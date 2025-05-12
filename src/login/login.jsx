import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function () {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginSubmit = (events) =>{
    events.preventDefault()
    fetch("https://testaoron.limsa.uz/api/auth/login",{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            login:login,
            password:password
        })
    }).then((response)=>response.json())
       .then((item)=>{
        console.log(item);
        
        if(item.success){
            toast.success(item?.data?.message);
            localStorage.setItem("tokenInfo",item.data?.access_token)
            localStorage.setItem("refreshtokenInfo",item.data?.refresh_token)
            navigate("/home")
        }else{
            toast.error(item?.message?.error);
        }
            
    })
  }
  

  return (
    <>
      <div className="bg-gray-100 w-full h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-[400px]">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={LoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Login</label>
              <input
                onChange={(e)=>setLogin(e.target.value)}
                type="text"
                required
                minLength={3}
                placeholder="admin"
                className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={3}
                  placeholder="••••••"
                  className="w-full px-4 py-2 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-2.5 text-gray-600 "
                >
                  {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}




// export default function Login(){
//   const [login,setLogin] = useState()
//   const [password,setPassword] = useState()
//   console.log(login);
//   const navigate = useNavigate()

//   const submitFunction = (item)=>{
//      item.preventDefault()
//      fetch("https://testaoron.limsa.uz/api/auth/login",{
//         method: "POST",
//         headers:{
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             login:login,
//             password:password
//         })
//      })
//      .then((respons)=>respons.json())
//      .then((item)=>{
//       console.log(item);
//       if(item.success){
//            toast.success(item.data.message)
//            localStorage.setItem("tokenInfo",item.data.access_token)
//            localStorage.setItem("refreshtokenInfo",item.data.refresh_token)
//            navigate("/home")
           

//       }else{
//         toast.error(item.message.message)
//       }
      
//      })
//   }
  
//   return(
//     <>
//     <div>
//       <form onSubmit={submitFunction}>
//         <input onChange={(e)=>setLogin(e.target.value)} type="text" required minLength={3} placeholder="admin" />
//         <input onChange={(e)=>setPassword(e.target.value)} type="password" required minLength={3} placeholder="password" />
//         <button>submit</button>
//       </form>
//     </div>
//     </>
//   )
// }