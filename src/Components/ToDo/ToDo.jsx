import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Modal from '../MOdal/Modal';
const ToDo = ({ task, handleAdd, user }) => {
    const [inputOpen, setInputOpen] = useState(false);
    const [id, setId] = useState();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setInputOpen(true);
    }

    const handleClose = () => {
        setInputOpen(false);
    }


    const { data: todoTasks,isLoading, refetch } = useQuery({
        queryKey: ['tasks', 'todo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}tasks?category=todo&email=${user?.email}`
            );
            return data;
        },
    });

    const handleId = (id) => {
        setId(id);
    }
    return (
        <div className='bg-white border border-white rounded-lg h-96 p-6 overflow-y-auto' >
            <h1 className='font-bold mb-2 text-xl'>To-Do</h1>
            {
                isLoading? <div className='flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>
                : 
                <div className='flex flex-col gap-4'>
                {
                    todoTasks?.map((t) => <div onClick={() => {setModalOpen(true);handleId(t._id)}}>
                        <div
                            onClick={() => { }}
                            className='w-full border border-gray-200 rounded-md py-4 px-2 '
                        >
                            <h1>{t.title}</h1>
                        </div>
                    </div>)
                }
            </div>
            }
        
            {
                inputOpen && <>
                    <form onSubmit={(e) => handleAdd(e, 'todo', setInputOpen(false))} className='border rounded-lg p-2 flex flex-col mt-4 gap-3'>
                        <input type="text" required name='title' placeholder="Enter A Title" className="input mt-4 input-bordered w-full " />
                        <textarea required className="textarea w-full textarea-bordered" name='description' placeholder="Enter Description"></textarea>
                        <div className='flex justify-between'>
                            <button className='bg-blue-700 w-1/3  mt-5 p-3 rounded-lg font font-semibold text-white'>Add Task</button>
                            <button onClick={handleClose} className='bg-blue-700 w-1/3  mt-5 p-3 rounded-lg font font-semibold text-white'>X</button>
                        </div>
                    </form>

                </>
            }
            <div>
                <button onClick={handleOpen} className={`bg-blue-700 w-full mt-5 p-3 rounded-lg font font-semibold text-white ${inputOpen ? "hidden" : ""}`}>Add a Card +</button>
            </div>
            {/* modal */}
            {
                isModalOpen &&    
            <Modal refetch={refetch} id={id} setModalOpen={setModalOpen} task={"Todo"}></Modal>
            }

        </div>
    );
};

export default ToDo;