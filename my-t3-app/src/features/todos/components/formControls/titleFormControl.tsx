import React from 'react'
import type { UseFormRegister, FormState, Path } from 'react-hook-form';

type TypeWithTitle = {
    title: string
}

type TitleFormControlProps<T extends TypeWithTitle> = {
    register: UseFormRegister<T>
    formState: FormState<T>
}

function TitleFormControl<FormControlType extends TypeWithTitle>(props: TitleFormControlProps<FormControlType>) {    
    return (
        <div className="flex flex-col">
            <label
                htmlFor="title">
                Title
            </label>
            <input
                type="text"
                id="title"
                className="text-black"
                {...props.register("title" as Path<FormControlType>)}
            />
            {
                RenderError<FormControlType>(props.formState)
            }
        </div>
    )
}

function RenderError<FormControlType extends TypeWithTitle>(formState: FormState<FormControlType>) {
    if (formState.errors) {
        if (formState.errors.title) {
            if (formState.errors.title.message) {
                return <p className="text-red-300">{formState.errors.title.message.toString()}</p>
            }
        }
    }
}

export default TitleFormControl
