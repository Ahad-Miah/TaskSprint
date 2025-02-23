import Login from './Components/Login/Login'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from './firebase.init';
import { useEffect } from 'react';
import { useState } from 'react';
import TaskManager from './Components/TaskManager/TaskManager';
import axios from 'axios';

const provider = new GoogleAuthProvider();
function App() {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(res => {
        console.log(res.user);
      })
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth,async CurrentUser => {
      setUser(CurrentUser);
      setLoading(false);
      if(CurrentUser?.email){
        await axios.post(`${import.meta.env.VITE_API_URL}users/${CurrentUser?.email}`,
            {
                name: CurrentUser?.displayName,
                email: CurrentUser?.email,
                userId: CurrentUser?.uid,
            })
            .then(res=>{
                
            })
       }
    })

    return () => {
      unsubscribe();
    }

  }, [])
  console.log(user);

  return (
    <div className='min-h-screen'>
      <div>
        <h1 className='font-bold text-center p-4 text-4xl bg-gradient-to-r from-purple-900 to-pink-300 text-transparent bg-clip-text '>TaskSprint</h1>
        <p className='text-center bg-gradient-to-r  from-purple-500 to-pink-500 text-transparent bg-clip-text'>Boost Productivity with smart task handling</p>
      </div>
      <div>
        {
          loading? <div className='flex justify-center items-center min-h-screen'> <span className="loading loading-bars loading-lg text-center"></span></div> : <div>
          {
            user?<TaskManager user={user}></TaskManager>:<Login googleLogin={googleLogin}></Login>
          }   
        </div>
        }
      </div>
     
    </div>
  )
}

export default App
