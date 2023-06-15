import React from 'react'
import type { UseFormRegister, FormState, Path } from 'react-hook-form';

type TypeWithComplete = {
    complete: boolean
}

type TitleFormControlProps<T extends TypeWithComplete> = {
    register: UseFormRegister<T>
    formState: FormState<T>
}

function TitleFormControl<FormControlType extends TypeWithComplete>(props: TitleFormControlProps<FormControlType>) {
    return (
        <>
            <div className="flex flex-col">
                <label
                    htmlFor="complete">
                    Complete
                    <input
                        className='border border-gray-300 p-2 rounded-md ml-2'
                        type="checkbox"
                        id="complete"
                        {...props.register("complete" as Path<FormControlType>)}
                    />
                </label>

            </div>
            {
                RenderError(props.formState)
            }
        </>
    )
}

function RenderError<FormControlType extends TypeWithComplete>(formState: FormState<FormControlType>) {
    if (formState.errors) {
        if (formState.errors.complete) {
            if (formState.errors.complete.message) {
                return <p className="text-red-300">{formState.errors.complete.message.toString()}</p>
            }
        }
    }
}

export default TitleFormControl
