'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { checkUniqueEmail, registerUser } from '../(functionHandler)/function';

export default function Page() {
  const [formData, setFormData] = useState({
    fullname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const { toast } = useToast()

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const re = /^\+?[0-9]{10,15}$/
    return re.test(phoneNumber)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { fullname, phoneNumber, email, password, confirmPassword } = formData

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Invalid phone number')
      toast({
        title: "Validation Error!",
        description: "Invalid phone number - Please try again.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(email)) {
      setError('Invalid email')
      toast({
        title: "Validation Error!",
        description: "Invalid email - Please try again.",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      toast({
        title: "Validation Error!",
        description: "Passwords do not match - Please try again.",
        variant: "destructive",
      })
      return
    }
    
    const isUnique = (await checkUniqueEmail(email)).status
    console.log('isUnique:', isUnique);
    
    if (isUnique) {
      setError('Email already exists')
      toast({
        title: "Validation Error!",
        description: "Email already exists - Please try again.",
        variant: "destructive",
      })
      return
    }
    
    setError('')
    const result = {
      fullname,
      phoneNumber,
      email,
      password
    }
    await registerUser(result)
    toast({
      title: "Success!",
      description: "Account registered successfully.",
      variant: "success",
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-gray-500 dark:text-gray-400">Create an account to get started.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name='fullname' 
                placeholder="John Doe" 
                required 
                value={formData.fullname} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                name='phoneNumber' 
                placeholder="+1 (555) 555-5555" 
                required 
                value={formData.phoneNumber} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              name='password' 
              required 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              name='confirmPassword' 
              required 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
