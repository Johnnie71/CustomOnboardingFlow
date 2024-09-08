'use client'
import React, {useEffect, useState } from 'react'
import { useFormState, Form, User } from "./FormContext"
import apiClient from '../lib/apiClient'
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { AddressForm, BirthdayForm, AboutMeForm } from './forms'
import Welcome from './Welcome'

const FormStep = () => {
  const { user, step, handleUpdateUser, onHandleNext, setFormData, formData } = useFormState()
  const [step2Forms, setStep2Forms] = useState<React.ReactElement[]>([])
  const [step3Forms, setStep3Forms] = useState<React.ReactElement[]>([])
  const [requiredFields, setRequiredFields] = useState<string[] | []>([]) 
  const [errors, setErrors] = useState<string[] | []>([])

  const handleSubmit = async () => {
    setErrors([])

    const newErrors: string[] = []
    for (const field of requiredFields) {
      const value = (formData as any)[field]
      if (!value || (typeof value == 'string' && !value.trim())){ // if value is null or whitespace create an error
        newErrors.push(`Enter something for ${field} field`)
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try{
      const updatedFormData = { ...formData, step: step + 1 }; // Updating the step to persist in the db
      const response = await apiClient.put<User>(`/users/${user?.id}`, {
        ...updatedFormData
      })
      handleUpdateUser(response.data)
      console.log(`User user updated: ${Object.entries(response.data)}`)

      onHandleNext()

    } catch (err) {
      setErrors((prevError) => [...prevError, 'Failed to update user'])
      console.error(`API error: ${err}`)
    }
  }

  const assignFormsToTheirStep = (formsData: Form[]) => {

    setStep2Forms([])
    setStep3Forms([])

    for (const [_, value] of Object.entries(formsData)) {
      const { name, page } = value
      
      if (AddressForm.name.includes(name)) {
        if (page == 2) {
          setStep2Forms((prevForms) => [
            ...prevForms, 
            <AddressForm 
              key='AddressForm'
              requiredFields={requiredFields} 
              setRequiredFields={setRequiredFields} 
            />
          ])
        } else {
          setStep3Forms((prevForms) => [
            ...prevForms, 
            <AddressForm 
              key='AddressForm'
              requiredFields={requiredFields} 
              setRequiredFields={setRequiredFields} 
            />
          ])
        }
        continue
      }

      if (BirthdayForm.name.includes(name)) {
        if (page == 2) {
          setStep2Forms((prevForms) => [
            ...prevForms, 
            <BirthdayForm 
              key='BirthdayForm'
              requiredFields={requiredFields} 
              setRequiredFields={setRequiredFields} 
            />
          ])
        } else {
          setStep3Forms((prevForms) => [
            ...prevForms, 
            <BirthdayForm
              key='BirthdayForm'
              requiredFields={requiredFields} 
              setRequiredFields={setRequiredFields} 
            />
          ])
        }
        continue
      }

      if (AboutMeForm.name.includes(name)) {
        if (page == 2) {
          setStep2Forms((prevForms) => [
            ...prevForms, 
            <AboutMeForm
            key='AboutMeForm'  
            requiredFields={requiredFields} 
            setRequiredFields={setRequiredFields}
            />
          ])
        } else {
          setStep3Forms((prevForms) => [
            ...prevForms, 
            <AboutMeForm
            key='AboutMeForm'  
            requiredFields={requiredFields} 
            setRequiredFields={setRequiredFields}
            />
          ])
        }
        continue
      }

    }
  }

  useEffect(() => {
    setFormData(user!)
    const fetchForms = async () => {
      try{
        const response = await apiClient.get<Form[]>('/forms')
        assignFormsToTheirStep(response.data)
      } catch (e) {
        console.error(`There was an error fetching forms: %${e}`)
      }
    }

    fetchForms()
    
  }, [user])

  console.log(formData)
  
  switch(step){
    case 1:
      return <Step1 />
    case 2:
      return <Step2 forms={step2Forms} handleSubmit={handleSubmit} errors={errors} />
    case 3:
      return <Step3 forms={step3Forms} handleSubmit={handleSubmit} errors={errors}/>
    default:
      return <Welcome />
  }
}

export default FormStep