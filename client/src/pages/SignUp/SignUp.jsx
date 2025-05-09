import React, { useState } from 'react'
import PasswordInput from '../../components/input/PasswordInput'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const handleSignup = async(e) => {
    e.preventDefault()

    if(!name) {
      setError("Please enter your name")
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid enter email address")
      return;
    }

    if(!password) {
      setError("Please enter the password")
    }

    setError('')

    // Sign Up api call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })

      // Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch(error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.")
      }
    }
  }

  return (
    <>
    <Navbar />

    {/* Signup Form */}

      <div className='flex items-center justify-center mt-20'>

        <div className='w-96 border rounded bg-white px-7 py-10'>

          <form onSubmit={handleSignup}>

            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input 
              type="text" 
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input 
              type="email" 
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {
              error && <p className='text-red-500 text-xs pb-1'>{error}</p>
            }

            <button 
              type='submit' 
              className='btn-primary'
            >
              Sign up
            </button>

            <p className='text-sm text-center mt-4'>
                Already have an account?{" "}
                <Link to="/login" className='font-medium text-primary underline'>
                    Login
                </Link>
            </p>

          </form>

        </div>
        
      </div>
    </> 
  )
}

export default SignUp