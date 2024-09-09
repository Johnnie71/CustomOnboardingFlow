'use client'
import React from 'react'
import { Stepper as MUIStepper, Step, StepLabel } from '@mui/material'
import { useFormState } from '../FormContext';
import { ISteps } from '../FormStep'


interface IProps {
  stepsForms: ISteps[]
}

const Stepper: React.FC<IProps> = ({ stepsForms }) => {
  const {step} = useFormState()

  const displayNames = () => {
    const names: Record<number, string> = {}

    stepsForms.forEach((form) => {
      const {stepNumber, component} = form
      const name = component.key!

      if (!(stepNumber in names)) {
        names[stepNumber] = name
      } else {
        names[stepNumber] += ` & ${name}`
      }
    })

    const stepsDisplayNames = Object.keys(names)
    .sort((a, b) => Number(a) - Number(b))
    .map((step) => names[Number(step)])

    const result = ['Sign Up', ...stepsDisplayNames, 'Completed']
    return result
  }

  const stepNames: string[] = displayNames()

  return (
    <div className='mb-4'>
        <MUIStepper activeStep={step < 4 ? step - 1 : step} alternativeLabel>
          {stepNames.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MUIStepper>
      </div>
  )
}

export default Stepper