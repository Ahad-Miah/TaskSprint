import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const Modal = ({ setModalOpen, task,id }) => {

    const queryClient=useQueryClient();
    const { data: singleTask,refetch } = useQuery({
        queryKey: ['task', id], 
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}tasks/${id}`);
            return data;
        },
    });
    
    const { mutate: updateTask, isLoading } = useMutation({
        mutationFn: async (taskToUpdate) => {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}tasks/${id}`, taskToUpdate);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['taskToUpdate']);
            refetch();
            toast.success("Updated Successfully");
        },
    });
    
    const handleUpdate = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const taskToUpdate = { title, description, category };
    
        updateTask(taskToUpdate);
        setModalOpen(false);
    };
    
    return (
        <div>
            {
                isLoading ? <span className="loading loading-bars loading-lg"></span>:  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">{task}</h3>
                   <button className='btn-xs btn'>Delete</button>

                    <form onSubmit={handleUpdate} className='border rounded-lg p-2 flex flex-col mt-4 gap-3'>
                        <select name='category' className="select select-ghost w-full ">
                            <option disabled selected>{singleTask?.category}</option>
                            <option>todo</option>
                            <option>inProgress</option>
                            <option>done</option>
                        </select>
                        <input type="text" required name='title' placeholder="Enter A Title" 
                        defaultValue={singleTask?.title} className="input mt-4 input-bordered w-full " />
                        <textarea required defaultValue={singleTask?.description} className="textarea w-full textarea-bordered" name='description' placeholder="Enter Description"></textarea>

                        <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                    </form>
                   
                </div>
            </div>
            }
          
        </div>
    );
};

export default Modal;