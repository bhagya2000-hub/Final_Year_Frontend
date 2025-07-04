
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loader from "../layout/Loader";

import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/api/userApi';

function UpdateUser() {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [role,setRole]=useState("")
    
      const navigate=useNavigate()
      const params=useParams();
      const {data}=useGetUserDetailsQuery(params?.id)
    
    //   const {user}=useSelector((state)=>state.auth)

    const [updateUser,{error,isSuccess}]=useUpdateUserMutation()
    console.log("Data",data)

     useEffect(()=>{
        if(data?.user){
            setName(data?.user?.name);
            setEmail(data?.user?.email);
            setRole(data?.user?.role)
          }
     },[data])
    
      useEffect(()=>{
        
    
        if (error) {
          toast.error(error?.data?.message || "Login failed");
        }
    
        if (isSuccess) {
          toast.success("User Updated");
          navigate("/admin/users")
        }
      },[error,isSuccess])
    
      const submitHandler = (e) => {
        e.preventDefault();
    
        const userData = {
          name,
          email,
          role,
          
        };
    
        updateUser({id:params?.id,body:userData})
      }
  return (
   <>
   <AdminLayout/>
   <MetaData title={"Update Users"} />
   <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="role_field" className="form-label">Role</label>
            <select 
            id="role_field"
            className="form-select"
             name="role" 
             value={role}
             onChange={(e)=>setRole(e.target.value)}
             >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button type="submit" className="btn update-btn w-100 py-2">
            Update
          </button>
        </form>
      </div>
    </div>

   </>
  )
}

export default UpdateUser
