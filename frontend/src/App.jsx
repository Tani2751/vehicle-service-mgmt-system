
import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState([])
    useEffect(() => {

      const fetchUser = async () => {
        const res = await fetch("/api/users", {credentials: "include"})
        const users = await res.json();
        setData(users);
      }
      fetchUser();
    },[])

    console.log(data);
    
  return (
    <>
      <h1>hello </h1>
      <ul>
         {data.map((user, i) => (
          <li key={i}>
            {user.name}
          </li>
         ))}
      </ul>
    </>
  )
}

export default App
