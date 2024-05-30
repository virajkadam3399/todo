import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [values, setValues] = useState({
        title : '',
        description: '',
        status : 'pending',
        due_date : ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:2222/tasks', values)
        .then(res=>{
            console.log(res);
            navigate('/');
        })
        .catch(err =>console.log(err))
    }


  return (
    <>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form action="" onSubmit={handleSubmit}>
                    <h1>Add task</h1>

                    <div className='mb-2'>
                        <label htmlFor="">title</label>
                        <input type="text" placeholder='Enter your title'  className='form-control' onChange={e => setValues({...values, title : e.target.value})}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">description</label>
                        <input type="text" placeholder='Enter your description'  className='form-control' onChange={e=> setValues({...values, description:e.target.value})}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Status</label>
                        <select name="status" id="" className='form-control' onChange={e=>setValues({...values,status:e.target.value})}>
                        <option value="pending">Pending</option>
                         <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">due_date</label>
                        <input type="date" className='form-control' onChange={e=> setValues({...values,due_date:e.target.value})}/>
                    </div>

                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default Create