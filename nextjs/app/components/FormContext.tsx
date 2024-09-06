'use client'
import { createContext, ReactNode, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

export interface User {
  id?: number,
  email?: string,
  about?: string,
  birthday?: Date
  street_address?: string
  city?: string
  state?: string
  zip_code?: string
}

interface IFormContext {
  user: User | null;
  handleSetUser: (user: User) => void;
  handleUpdateUser: (user: User) => void;
  onHandleNext: () => void;
  onHandleBack: () => void;
  step: number
}

const FormContext = createContext<IFormContext | undefined>(undefined)

export const FormProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<number>(1);

  const onHandleNext = () => {
    setStep((prevValue) => prevValue + 1)
  }

  const onHandleBack = () => {
    setStep((prevValue) => prevValue - 1)
  }

  const handleSetUser = (user: User) => {
    setUser(user)
  }

  const handleUpdateUser = (updatedData: User) => {
    setUser((prevData) => ({...prevData, ...updatedData}))
  }
  
  return (
    <FormContext.Provider value={{ onHandleBack, onHandleNext, handleSetUser, handleUpdateUser, step, user }}>
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