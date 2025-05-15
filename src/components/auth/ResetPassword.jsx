import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/api/userApi';
function ResetPassword() {

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')   
    const navigate=useNavigate()
    const params=useParams()

    const [resetPassword,{isLoading,error,isSuccess}]=useResetPasswordMutation();

    const { isAuthenticated } = useSelector((state) => state.auth)
    
        
          useEffect(() => {
            if (isAuthenticated) {
              navigate("/")
            }
          }, [isAuthenticated, navigate])
        
          useEffect(() => {
            if (error) {
              toast.error(error?.data?.message);
            }
            if(isSuccess){
                toast.success("Password reset successfully");
                navigate("/login")
            }
          }, [error,isAuthenticated,isSuccess])
        
          const submitHandler = (e) => {
            e.preventDefault();
        
           if(password !== confirmPassword){
                toast.error("Password does not match")
           }
           const data={password,confirmPassword}
        
            resetPassword({token:params ?.token,body:data})
          }
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSign={submitHandler}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password_field" className="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirm_password"
              value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Setting...." : "Set Password"}
           
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
