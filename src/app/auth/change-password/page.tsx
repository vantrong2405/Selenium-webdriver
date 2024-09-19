'use client'
import { Header } from "@/components/component/header";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { changePassword } from "../(functionHandler)/function";

export default function ChangePasswordPage() {
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    passwordOld: "",
    passwordNew: "",
    confirmPasswordNew: "",
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, passwordOld, passwordNew, confirmPasswordNew } = formData;

    if (!email || !passwordOld || !passwordNew || !confirmPasswordNew) {
        setError("Please fill in all fields.");
        toast({
            title: "Validation Error!",
            description: "Please fill in all fields.",
            variant: "destructive",
        });
        return;
    }

    if (passwordNew !== confirmPasswordNew) {
        setError('Passwords do not match');
        toast({
            title: "Validation Error!",
            description: "Passwords do not match - Please try again.",
            variant: "destructive",
        });
        return;
    }

    setError('');
    const result = {
        email,
        passwordNew,
        confirmPasswordNew,
        passwordOld
    };

    try {
        await changePassword(result);
        toast({
            title: "Success!",
            description: "Password changed successfully.",
            variant: "success",
        });
    } catch (error) {
        setError('Failed to change password');
        toast({
            title: "Error!",
            description: "An error occurred while changing the password.",
            variant: "destructive",
        });
    }
};



  return (
    <div>
      <Header />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="passwordOld"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="passwordOld"
                  id="passwordOld"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.passwordOld}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="passwordNew"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="passwordNew"
                  id="passwordNew"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.passwordNew}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPasswordNew"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPasswordNew"
                  id="confirmPasswordNew"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.confirmPasswordNew}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-black hover:opacity-80 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
               Change Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
