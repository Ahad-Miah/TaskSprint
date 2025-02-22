import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Modal from '../MOdal/Modal';

const Done = ({handleAdd, task,user }) => {
    const [inputOpen, setInputOpen] = useState(false);
      const [isModalOpen, setModalOpen] = useState(false);
      const [id, setId] = useState();
       
        const handleOpen = () => {
            setInputOpen(true);
        }
        const handleClose = () => {
            setInputOpen(false);
        }

        const { data: doneTasks,isLoading, refetch: refetchTodo } = useQuery({
            queryKey: ['tasks', 'done', user?.email],  
            enabled: !!user?.email, 
            queryFn: async () => {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}tasks?category=done&email=${user?.email}`
                );
                return data;
            },
        });
        const handleId = (id) => {
            setId(id);
        }
    return (
        <div>
        <div className='bg-white border border-white rounded-lg h-96 p-6 overflow-y-auto' >
       <h1 className='font-bold mb-2 text-xl'>Done</h1>
       {
            isLoading?<div className='flex justify-center items-center'><span className="loading loading-bars loading-lg"></span></div>
            :
            <div className='flex flex-col gap-4'>
     
            {
                doneTasks?.map((t) => <div>
                 <div onClick={() =>{ setModalOpen(true);handleId(t._id)}} className='w-full border border-gray-200 rounded-md py-4 px-2 '>
                        <h1>{t.title}</h1>
                    </div>
                </div>)
            }
        </div>
        }
     
       {
           inputOpen && <>
               <form onSubmit={(e) => handleAdd(e, 'done',setInputOpen(false))} className='border rounded-lg p-2 flex flex-col mt-4 gap-3'>
                   <input type="text" maxLength={50} required name='title' placeholder="Enter A Title" className="input mt-4 input-bordered w-full " />
                   <textarea  maxLength={200} className="textarea w-full textarea-bordered" name='description' placeholder="Enter Description"></textarea>
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
   </div>
   {
    isModalOpen && <Modal id={id} setModalOpen={setModalOpen} task={"Done"}></Modal>
   }
   </div>
    );
};

export default Done;