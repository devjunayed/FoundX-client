import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

interface FormConfigType{
  defaultValues?: Record<string, any>,
  resolver?: any
}

interface IProps extends FormConfigType{
  children: ReactNode;
  onSubmit: SubmitHandler<any>
}

const FXForm = ({children, onSubmit, defaultValues, resolver}: IProps) => {
  
  
  const formConfig: FormConfigType = {};
  
  if(resolver){
    formConfig['resolver'] = resolver
  }
  
  if(defaultValues){
    formConfig['defaultValues'] = defaultValues;
  }
  const methods = useForm(formConfig);

  const submitHanlder = methods.handleSubmit;
  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHanlder(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default FXForm