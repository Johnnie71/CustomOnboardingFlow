'use client'
import { useFormState } from "./FormContext"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"

const FormStep = () => {
  const {step} = useFormState()
  
  switch(step){
    case 1:
      return <Step1 />
    case 2:
      return <Step2 />
    case 3:
      return <Step3 />
  }
}

export default FormStep