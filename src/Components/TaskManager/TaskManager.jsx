import React, { useEffect, useState } from 'react';
import Modal from '../MOdal/Modal';
import ToDo from '../ToDo/ToDo';
import InProgres from '../InProgress/InProgres';
import Done from '../Done/Done';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    
    // useEffect(() => {
    //     console.log(task);
    // }, [task]);
    return (
        <div className='min-h-screen bg-gray-100 py-14 p-5 grid grid-cols-1 md:grid-cols-3 justify-center gap-5 px-10'>
            <ToDo user={user} handleAdd={handleAdd}  task={task}></ToDo>
            <InProgres handleAdd={handleAdd} task={task} ></InProgres>
            <Done handleAdd={handleAdd}  task={task} ></Done>
        </div>
    );
};

export default TaskManager;