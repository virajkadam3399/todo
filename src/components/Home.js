import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    

    useEffect(()=>{
        axios.get('http://localhost:2222/tasks')
        .then(res=>setData(res.data))
        .catch(err=> console.log(err))
    },[])

    const handleDelete = (id)=>{
        axios.delete('http://localhost:2222/tasks/' +id)
        .then(res=>{
            window.location.reload();
        })
        .catch(err =>console.log(err))
    }
  return (
    <>
        <div className='d-flex bg-primary justify-content-center align-items-center'>
            <div className='w-100 bg-white p-3'>
                <div className='d-flex justify-content-start'>
                    <Link to='/create' className='btn btn-success'>Create</Link>
                </div>
                <table className='table'>
                    <thead> 
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due_date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((users, index)=>{
                                return <tr key={index}>
                                    <td>{users.id}</td>
                                    <td>{users.title}</td>
                                    <td>{users.description}</td>
                                    <td>{users.status}</td>
                                    <td>{users.due_date}</td>
                                    <td>
                        
                                    <Link to={`/edit/${users.id}`}  className='btn btn-primary btn-sm mx-2'>Edit</Link>

                                    <button onClick={()=> handleDelete(users.id)} className='btn btn-danger btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Home

