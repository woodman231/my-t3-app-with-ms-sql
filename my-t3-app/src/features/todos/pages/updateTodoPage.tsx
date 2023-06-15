import { type NextPage } from "next";
import DefaultLayout from "~/features/common/components/defaultLayout";
import { api } from "~/utils/api";
import { type SubmitErrorHandler, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type FormEventHandler } from "react";
import { useRouter } from "next/router";
import { type UpdateTodoRequest, updateTodoRequestValidator } from "../routeHandlerModels/updateTodoRequest";
import { payloadDateToDatePickerString } from "~/utils/dateTime/payloadDateToDatePickerString";
import TitleFormControl from "../components/formControls/titleFormControl";
import DueDateFormControl from "../components/formControls/dueDateFormControl";
import CompleteFormControl from "../components/formControls/completeFormControl";

const UpdateTodoPage: NextPage = () => {

    const router = useRouter();
    const { query } = router;
    const { id } = query;

    const apiContext = api.useContext();

    const { reset, handleSubmit, formState, register, setValue, getValues } = useForm<UpdateTodoRequest>({
        resolver: zodResolver(updateTodoRequestValidator)
    });

    const { isLoading, isFetching } = api.todos.getOne.useQuery({ id: id as string }, {
        refetchOnMount: true,
        onSuccess: (data) => {
            console.log("details loaded", { data });

            reset({
                ...data,
                dueDate: data.dueDate ? payloadDateToDatePickerString(data.dueDate) : null
            });            
        }
    });

    const { mutate } = api.todos.update.useMutation({
        onSuccess: () => {            
            void apiContext.todos.getOne.invalidate({id: id as string});
            void router.push("/todos")
        }
    });

    const validHandler: SubmitHandler<UpdateTodoRequest> = (data) => {
        console.log("valid form detected", { data });

        mutate(data);
    }

    const errorsHandler: SubmitErrorHandler<UpdateTodoRequest> = (errors) => {
        console.log("errors detected", { errors })
    }

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        void handleSubmit(validHandler, errorsHandler)(e);
    }

    const cancelHandler: FormEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        void router.back();
    }

    return (
        <DefaultLayout pageTitle="Update a Todo" pageDescription="Page used to update a Todo">
            {
                !router.isReady && <p>Loading Router...</p>
            }
            {
                (isFetching || isLoading) ? <p>Loading Details...</p> :
                    <form onSubmit={submitHandler} className="mx-6 border border-white p-2">
                        <input type="hidden" {...register("id")} />

                        <TitleFormControl<UpdateTodoRequest> register={register} formState={formState} />
                        <DueDateFormControl<UpdateTodoRequest> setValue={setValue} formState={formState} initialValue={getValues("dueDate") ?? ""} />
                        <CompleteFormControl<UpdateTodoRequest> register={register} formState={formState} />

                        <div className="flex flex-row justify-between">
                            <button className="px-2 bg-green-700" type="submit">Submit</button>
                            <button className="px-2 bg-red-700" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </form>
            }
        </DefaultLayout>
    )
}

export default UpdateTodoPage;
