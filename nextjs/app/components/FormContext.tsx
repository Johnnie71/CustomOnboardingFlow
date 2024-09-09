'use client'
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import apiClient from "../lib/apiClient";

interface IProps {
  children: ReactNode;
}

interface FormData {
  email?: string;
  about?: string;
  birthday?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  step: number;
}

export interface User extends FormData {
  id?: number,
}

export interface Form {
  id: number,
  page: number,
  name: string
}

interface IFormContext {
  user: User | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSetUser: (user: User) => void;
  handleUpdateUser: (user: User) => void;
  onHandleNext: () => void;
  onHandleBack: () => void;
  step: number;
  loadingPrevUser: boolean
}

const FormContext = createContext<IFormContext | undefined>(undefined)

export const FormProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<number>(1);
  const [loadingPrevUser, setLoadingPrevUser] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    about: '',
    birthday: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    step: 0 // Kept in the db to know user progress
  });

  const onHandleNext = () => {
    setStep((prevValue) => prevValue + 1)
  }

  const onHandleBack = async () => {
    setStep((prevValue) => prevValue - 1)

    // Updating the step to persist in the db since user is going back one step
    const updatedFormData = { ...formData, step: step - 1 }; 
    try {
      const response = await apiClient.put<User>(`/users/${user?.id}`, {
        ...updatedFormData
      });
      setFormData(response.data); // Update the formData with the response from the API
    } catch (error) {
      console.error(`Failed to update user step in the database: ${error}`);
    }
  }

  const handleSetUser = (user: User) => {
    setUser(user)
    // When user successfully signs in they will automatically go to next step (2)
    setFormData((prevData) => ({ ...prevData, step: 2 }))
    if (user.id) localStorage.setItem('onboardingID', user?.id.toString())
  }

  const handleUpdateUser = (updatedData: User) => {
    setUser((prevData) => ({ ...prevData, ...updatedData }))
  }

  // checking if user was in the process of filling out the forms in prior session
  useEffect(() => {
    const savedUserID = localStorage.getItem('onboardingID')
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get<User>(`/users/${savedUserID}`)
        setUser(response.data)
        setFormData(response.data)
        setStep(response.data.step)
        setLoadingPrevUser(false)
      } catch (e) {
        setLoadingPrevUser(false)
        console.error(`Failed to get user data from Database ${e}`)
      }
    }

    if (savedUserID) {
      setLoadingPrevUser(true)
      fetchUserData()
    }
    
  },[])

  
  return (
    <FormContext.Provider value={{ onHandleBack, onHandleNext, handleSetUser, handleUpdateUser, step, user, formData, setFormData, loadingPrevUser }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormState = () => { // Hook form to access state globally, ensuring that the context is never undefined
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return context;
}