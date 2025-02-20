import React, { useEffect, useState } from 'react';
import Modal from '../MOdal/Modal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const InProgres = ({handleAdd, task,user }) => {
      const [inputOpen, setInputOpen] = useState(false);
       
        const handleOpen = () => {
            setInputOpen(true);
        }
        const handleClose = () => {
            setInputOpen(false);
        }

        const { data: inProgressTasks, refetch: refetchInProgress } = useQuery({
            queryKey: ['tasks', 'inProgress', user?.email],  
            enabled: !!user?.email, 
            queryFn: async () => {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}tasks?category=inProgress&email=${user?.email}`
                );
                return data;
            },
        });        
    return (
        <div>
             <div className='bg-white border border-white rounded-lg h-96 p-6 overflow-y-auto' >
            <h1 className='font-bold mb-2 text-xl'>In progress</h1>
            <div className='flex flex-col gap-4'>
                {
                    inProgressTasks?.map((t) => <div>
                        <div onClick={() => document.getElementById('my_modal_5').showModal()} className='w-full border border-gray-200 rounded-md py-4 px-2 '>
                            <h1>{t.title}</h1>
                        </div>
                    </div>)
                }
            </div>
            {
                inputOpen && <>
                    <form onSubmit={(e) => handleAdd(e, 'inProgress',setInputOpen(false))} className='border rounded-lg p-2 flex flex-col mt-4 gap-3'>
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
            <Modal></Modal>
        </div>
        </div>
    );
};

export default InProgres;