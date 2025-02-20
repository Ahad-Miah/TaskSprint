import React, { useEffect, useState } from 'react';

const TaskManager = () => {
    const [inputOpen,setInputOpen]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [task,setTask]=useState([]);

    const handleOpen=()=>{
       setInputOpen(true);

    }
    const handleClose=()=>{
        setInputOpen(false);
    }
    const handleAdd=()=>{
        if (!inputValue.trim()) return;
        setTask(prevTasks => [...prevTasks, inputValue]);
        setInputOpen(false);
    }
    useEffect(() => {
        console.log(task);
    }, [task]);

    return (
        <div className='min-h-screen bg-gray-100 p-5 grid grid-cols-1 md:grid-cols-3 justify-center gap-5 px-10'>
            <div className='bg-white border border-white rounded-lg h-96 p-6' >
                <h1 className='font-bold mb-2 text-xl'>To-Do</h1>
                <div className='flex flex-col gap-4'>
                    {
                        task?.map((t)=> <div>
                            <div className='w-full border border-gray-200 rounded-md py-4 px-2 '>
                                <h1>{t}</h1>
                            </div>
                        </div>)
                    }
                </div>
               {
                inputOpen &&  <input onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder="Enter A Title" className="input input-bordered w-full " />
               }
                <div> 
                <button onClick={handleOpen} className={`bg-blue-700 w-full mt-5 p-3 rounded-lg font font-semibold text-white ${inputOpen?"hidden":""}`}>Add a Card +</button>
                {
                    inputOpen && <div className='flex justify-between'>
                    <button onClick={handleAdd} className='bg-blue-700 w-1/3  mt-5 p-3 rounded-lg font font-semibold text-white'>Add Task</button>
                    <button onClick={handleClose} className='bg-blue-700 w-1/3  mt-5 p-3 rounded-lg font font-semibold text-white'>X</button>
                    </div> 
                }
                </div>
              
            </div>
            <div className='bg-white border border-white rounded-lg h-96 p-6' >
                <h1 className='font-bold text-xl'>In Progress</h1>
            </div>
            <div className='bg-white border border-white rounded-lg h-96 p-6' >
                <h1 className='font-bold text-xl'>Done</h1>
            </div>
        </div>
    );
};

export default TaskManager;