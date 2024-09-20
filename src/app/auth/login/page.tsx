/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { loginUser } from '../(functionHandler)/function';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import google from '../../../assets/google.png';
import github from '../../../assets/github.png';
export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = formData

    if (!email || !password) {
      setError('Please fill in both email and password.')
      toast({
        title: "Validation Error!",
        description: "Please fill in both email and password.",
        variant: "destructive",
      })
      return
    }

    setError('')
    try {
      const res = await loginUser(email, password)
      if(res?.status) { 
        localStorage.setItem('userData', JSON.stringify(res.data))
        toast({
          title: "Login Successful!",
          description: "Welcome back!",
          variant: "success",
        })
        router.push('/')
      } else { 
        toast({
          title: "Login Failed",
          description: "Please check your email and password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Login failed - Please check your email and password.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="relative w-full h-screen">
<div className="absolute top-0 w-full h-full bg-gray-900" style={{ backgroundImage: 'url("https://demos.creative-tim.com/tailwindcss-starter-project/static/media/register_bg_2.2fee0b50.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
<div className="container mx-auto px-4 h-full">
    <div className="flex items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4 pt-8">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                        <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6>
                    </div>
                    <div className="btn-wrapper text-center">
                        <button className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{ transition: 'all 0.15s ease 0s' }}>
                            <Image alt="Github" className="w-5 mr-1" src={github} />Github
                        </button>
                        <button className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{ transition: 'all 0.15s ease 0s' }}>
                            <Image alt="Google" className="w-5 mr-1" src={google} />Google
                        </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                        <small>Or sign in with credentials</small>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Email</label>
                            <Input
              id="email"
              type="email"
              name='email'
              placeholder="example@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
                        </div>
                        <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Password</label>
                            <Input
              id="password"
              type="text"
              name='password'
              required
              value={formData.password}
              onChange={handleChange}
            />
                        </div>
                        <div>
                            <label className="inline-flex items-center cursor-pointer">
                                <Input id="customCheckLogin" type="checkbox" className="form-checkbox text-gray-800 ml-1 w-5 h-5" style={{ transition: 'all 0.15s ease 0s' }} />
                                <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                            </label>
                        </div>
                        <div className="text-center mt-6">
                            <Button type='submit' className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" style={{ transition: 'all 0.15s ease 0s' }}>Sign In</Button>
                        </div>
                       
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center ">
          <p>I dont have account? <Link href="/auth/register" className="text-black hover:underline">Register now</Link>
          </p>
        </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

</section>
  )
}
