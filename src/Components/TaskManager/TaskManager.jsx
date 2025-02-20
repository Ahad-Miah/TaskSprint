import React, { useEffect, useState } from 'react';
import Modal from '../MOdal/Modal';
import ToDo from '../ToDo/ToDo';
import InProgres from '../InProgress/InProgres';
import Done from '../Done/Done';

const TaskManager = () => {
    const [inputOpen, setInputOpen] = useState(false);
    const [task, setTask] = useState([]);

    const handleOpen = () => {
        setInputOpen(true);
    }

    const handleClose = () => {
        setInputOpen(false);
    }
    const handleAdd = (e, category) => {
        e.preventDefault(); 
        const title = e.target.title.value;
        const description = e.target.description.value;
    
        if (!title.trim()) return;
        const newTask = { title, description, category };
        setTask(prevTasks => [...prevTasks, newTask]);
    
        e.target.reset();
    
        setInputOpen(false);
    };
    
    // useEffect(() => {
    //     console.log(task);
    // }, [task]);
    console.log(task);
    return (
        <div className='min-h-screen bg-gray-100 py-14 p-5 grid grid-cols-1 md:grid-cols-3 justify-center gap-5 px-10'>
            <ToDo handleAdd={handleAdd} handleClose={handleClose}handleOpen={handleOpen} inputOpen={inputOpen} task={task}></ToDo>
            <InProgres handleAdd={handleAdd} handleClose={handleClose}handleOpen={handleOpen} inputOpen={inputOpen} task={task} ></InProgres>
            <Done handleAdd={handleAdd} handleClose={handleClose}handleOpen={handleOpen} inputOpen={inputOpen} task={task} ></Done>
        </div>
    );
};

export default TaskManager;