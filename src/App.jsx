import Login from './Components/Login/Login'

function App() {
  

  return (
   <div className='min-h-screen'>
    <div>
      <h1 className='font-bold text-center p-4 text-4xl bg-gradient-to-r from-purple-900 to-pink-300 text-transparent bg-clip-text '>TaskSprint</h1>
    <p className='text-center bg-gradient-to-r  from-purple-500 to-pink-500 text-transparent bg-clip-text'>Boost Productivity with smart task handling</p>
    </div>
    <div>
      <Login></Login>
    </div>
   </div>
  )
}

export default App
