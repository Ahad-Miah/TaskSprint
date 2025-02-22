import React, { useEffect, useState } from 'react';
import ToDo from '../ToDo/ToDo';
import InProgres from '../InProgress/InProgres';
import Done from '../Done/Done';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';

const TaskManager = ({user}) => {
    const [task, setTask] = useState([]);

    const queryClient = useQueryClient(); 

    const { mutate: addTask, isLoading } = useMutation({
        mutationFn: async (newTask) => {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}tasks`, newTask);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['newTask']); 
            toast.success("Task added Successfully");
        },
    });

    const handleAdd = (e, category) => {
        e.preventDefault(); 
        const title = e.target.title.value;
        const description = e.target.description.value;
    
        if (!title.trim()) return;
        const newTask = { title, description, category,email:user?.email, timestamp: new Date().toISOString()};
        // setTask(prevTasks => [...prevTasks, newTask]);
        addTask(newTask); 
        e.target.reset();
    };
  
    const logOut=()=>{
        signOut(auth)
    }
    return (
       <div className='min-h-screen bg-gray-100 py-14 p-5 '>
        <div className='flex justify-center'>
        <button onClick={logOut} className='btn bg-blue-700 text-white'>LogOut</button>
        </div>
         <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-5 px-10 mt-8'>
            <ToDo user={user} handleAdd={handleAdd}  task={task}></ToDo>
            <InProgres user={user} handleAdd={handleAdd} task={task} ></InProgres>
            <Done user={user} handleAdd={handleAdd}  task={task} ></Done>
        </div>
       </div>
    );
};

export default TaskManager;