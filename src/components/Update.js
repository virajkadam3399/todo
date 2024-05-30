import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Update = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:2222/tasks/" +id)
        .then(res => {
            console.log(res)
            setValues({...values, title: res.data[0].title, description: res.data[0].description, status: res.data[0].status, due_date: res.data[0].due_date})
        })
        .catch(err => console.log(err))
    },[])

    const [values, setValues]=useState({
        title : "",
        description : "",
        status : "pending",
        due_date : ""
    })

    const handleUpdate = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:2222/tasks/' +id, values)
        .then(res =>{
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err));
    }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="" onSubmit={handleUpdate}>
            <h1>Update task</h1>
            <div className='mb-2'>
                    <label htmlFor="">title</label>
                    <input type="text" placeholder='Enter First title' value={values.title} className='form-control' onChange={e =>setValues({...values, title: e.target.value})}/>
                </div>

              <div className='mb-2'>
                    <label htmlFor="">description</label>
                    <input type="text" placeholder='Enter Last description' value={values.description} className='form-control' onChange={e =>setValues({...values, description: e.target.value})}/>
              </div>

            <div className='mb-2'>
                    <label htmlFor="">Status</label>
                    <select name="status" id="" value={values.status} className='form-control' onChange={e=>setValues({...values,status:e.target.value})}>
                        <option value="pending">Pending</option>
                         <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
            </div>

              <div className='mb-2'>
                    <label htmlFor="">due_date</label>
                    <input type="date" value={values.due_date} className='form-control' onChange={e =>setValues({...values, due_date: e.target.value})}/>
              </div>
      
              <button className='btn btn-success'>Update</button>

            </form>
        </div>
    </div>
  )
}

export default Update