'use client'
import React, {useEffect, useState } from 'react'
import { useFormState, Form, User } from "./FormContext"
import apiClient from '../lib/apiClient'
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import { AddressForm, BirthdayForm, AboutMeForm } from './forms'
import Welcome from './Welcome'
import Loader from './Loader'
import Stepper from './forms/Stepper'

export interface ISteps {
  stepNumber: number
  component: React.ReactElement
}

const FormStep = () => {
  const { user, step, handleUpdateUser, onHandleNext, setFormData, formData, loadingPrevUser } = useFormState()
  const [stepsForms, setStepsForms] = useState<ISteps[] | []>([])
  const [requiredFields, setRequiredFields] = useState<string[] | []>([]) 
  const [errors, setErrors] = useState<string[] | []>([])

  const handleSubmit = async () => {
    setErrors([])

    const newErrors: string[] = []
    for (const field of requiredFields) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const assignFormsToTheirStep = (forms: Form[]) => {

    setStepsForms([])

    for (const value of Object.values(forms)) {
      const { name, page } = value

      const FormComponent = 
                    name == AddressForm.displayName ? AddressForm :
                    name == AboutMeForm.displayName ? AboutMeForm :
                    name == BirthdayForm.displayName ? BirthdayForm : null

      if (!FormComponent) {
        console.error(`No form component found for ${name}`)
        continue
      }

      if (page == 2) {
        const component: ISteps = {stepNumber: 2, component: <FormComponent
          key={name}
          requiredFields={requiredFields} 
          setRequiredFields={setRequiredFields} 
        />}
        setStepsForms((prevForms) => [
          ...prevForms, 
          component
        ])
      } else {
        const component: ISteps = {stepNumber: 3, component: <FormComponent
          key={name}
          requiredFields={requiredFields} 
          setRequiredFields={setRequiredFields} 
        />}
        setStepsForms((prevForms) => [
          ...prevForms, 
          component
        ])
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

  if (loadingPrevUser || (!stepsForms.length)) {
    return <Loader />
  }

  const Steps = (step: number) => {

    const step2Forms: React.ReactElement[] = stepsForms
      .filter((form) => form.stepNumber === 2)
      .map((form) => form.component);

    const step3Forms: React.ReactElement[] = stepsForms
      .filter((form) => form.stepNumber === 3)
      .map((form) => form.component); 

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

  return (
    <div className='w-full h-[100%] flex flex-col justify-center items-center'>
      <Stepper stepsForms={stepsForms} />
      {Steps(step)}
    </div>
  )
  
  
}

export default FormStep