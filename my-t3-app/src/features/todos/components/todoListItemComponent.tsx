import React, {useState} from 'react'
import { Popover } from '@headlessui/react';
import  ElipsisIcon from "@heroicons/react/20/solid/EllipsisHorizontalIcon"
import { usePopper } from 'react-popper';
import Link from 'next/link';
import { api } from "~/utils/api";

interface TodoListItemProps {
    todoDetails: {
        id: string;
        userId: string;
        title: string;
        dueDate: Date | null;
        complete: boolean;
    }
}

function TodoListItemComponent({ todoDetails }: TodoListItemProps) {
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {placement: "left-start"});

    const utils = api.useContext();

    const {mutate: deleteTodo} = api.todos.delete.useMutation({
        onSuccess: () => {
            void utils.todos.getAll.invalidate();
        }
    })

    const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const confirmed = confirm("Are you sure you want to delete this todo?");
        if (confirmed) {
            deleteTodo({id: todoDetails.id});
        }
    }

    return (
        <div className='border border-white bg-stone-600 p-2 mb-2 rounded h-24'>
            <div className='flex justify-between'>
                <div>
                    <div>
                        {todoDetails.title}
                    </div>
                    <div>
                        {todoDetails.dueDate ? todoDetails.dueDate.toLocaleDateString() : ""}
                    </div>
                    <div>
                        {todoDetails.complete ? "true" : "false"}
                    </div>
                </div>
                <div className='self-center'>
                    <Popover>
                        <Popover.Button ref={setReferenceElement}>
                            <ElipsisIcon className='h-8' />
                        </Popover.Button>
                        <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper} className="bg-stone-800 border border-white p-2">
                            <Link className='block' href={`/todos/update/${todoDetails.id}`}>Edit</Link>
                            <button className='block' onClick={handleDeleteClick}>Delete</button>
                        </Popover.Panel>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default TodoListItemComponent