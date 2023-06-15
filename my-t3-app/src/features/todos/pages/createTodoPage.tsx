import { type NextPage } from "next";
import DefaultLayout from "~/features/common/components/defaultLayout";
import { api } from "~/utils/api";
import { type SubmitErrorHandler, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type FormEventHandler } from "react";
import { useRouter } from "next/router";
import { type CreateTodoRequest, createTodoRequestValidator } from "../routeHandlerModels/createTodoRequest";
import TitleFormControl from "../components/formControls/titleFormControl";
import DueDateFormControl from "../components/formControls/dueDateFormControl";
import CompleteFormControl from "../components/formControls/completeFormControl";

const CreateTodoPage: NextPage = () => {

    const { mutate, isLoading, isSuccess } = api.todos.create.useMutation();
    const router = useRouter();

    const { formState, handleSubmit, register, setValue } = useForm<CreateTodoRequest>({
        resolver: zodResolver(createTodoRequestValidator),
        values: {
            title: "",
            complete: false,
            dueDate: null
        }
    })

    const validHandler: SubmitHandler<CreateTodoRequest> = (data) => {
        console.log("valid form detected", {data})        

        mutate(data);
    }

    const errorsHandler: SubmitErrorHandler<CreateTodoRequest> = (errors) => {
        console.log("errors detected", {errors})        
    }

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        void handleSubmit(validHandler, errorsHandler)(e);
    }

    const cancelHandler: FormEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        void router.back();
    }

    React.useEffect(() => {        
        if (isSuccess) {
            void router.push("/todos");
        }
    }, [isLoading, isSuccess, router])

    return (
        <DefaultLayout pageTitle="Create a Todo" pageDescription="Page used to create a Todo">
            <form onSubmit={submitHandler} className="mx-6 border border-white p-2">

                <TitleFormControl<CreateTodoRequest> register={register} formState={formState} />
                <DueDateFormControl<CreateTodoRequest> setValue={setValue} formState={formState} initialValue="" />                
                <CompleteFormControl<CreateTodoRequest> register={register} formState={formState} />
                
                <div className="flex flex-row justify-between">                    
                    <button className="px-2 bg-green-700" type="submit">Submit</button>
                    <button className="px-2 bg-red-700" onClick={cancelHandler}>Cancel</button>
                </div>
                
            </form>
        </DefaultLayout>
    )
}

export default CreateTodoPage
