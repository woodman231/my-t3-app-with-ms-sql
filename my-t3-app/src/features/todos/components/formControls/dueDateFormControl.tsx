import React from 'react'
import type { UseFormSetValue, FormState, Path, PathValue } from 'react-hook-form';
import { getPayloadDateString } from "~/utils/dateTime/datePickerStringToPayloadString";

type TypeWithDueDate = {
    dueDate: string | null
}

type TitleFormControlProps<T extends TypeWithDueDate> = {
    setValue: UseFormSetValue<T>
    formState: FormState<T>,
    initialValue: string;
}

function DueDateFormControl<FormControlType extends TypeWithDueDate>(props: TitleFormControlProps<FormControlType>) {
    const [datePickerValue, setDatePickerValue] = React.useState<string>(props.initialValue);

    /** Whne the date picker value changes */
    React.useEffect(() => {
        props.setValue("dueDate" as Path<FormControlType>, (datePickerValue ? getPayloadDateString(datePickerValue) : null) as PathValue<FormControlType, Path<FormControlType>>);
    }, [datePickerValue, props])

    return (
        <div className="flex flex-col">
            <label
                htmlFor="dueDate">
                Due Date
            </label>
            <input
                type="date"
                id="dueDate"
                className="text-black"
                value={datePickerValue}
                onChange={(e) => {
                    setDatePickerValue(e.target.value);
                }}
            />
            {
                RenderError<FormControlType>(props.formState)
            }
        </div>
    )
}

function RenderError<FormControlType extends TypeWithDueDate>(formState: FormState<FormControlType>) {
    if (formState.errors) {
        if (formState.errors.dueDate) {
            if (formState.errors.dueDate.message) {
                return <p className="text-red-300">{formState.errors.dueDate.message.toString()}</p>
            }
        }
    }
}

export default DueDateFormControl
