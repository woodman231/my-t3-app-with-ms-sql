import { type NextPage } from "next";
import DefaultLayout from "~/features/common/components/defaultLayout";
import TodoListItemComponent from "../components/todoListItemComponent";
import { api } from "~/utils/api";
import Link from "next/link";

const TodosListPage: NextPage = () => {

    const { data: allTodosData, isLoading, isFetching } = api.todos.getAll.useQuery();
    const utils = api.useContext();

    const handleRefreshButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        void utils.todos.getAll.invalidate();
    }

    return (
        <DefaultLayout pageTitle="Manage Todos" pageDescription="A page to manage your todos">
            
                <div className="flex justify-between">
                    <Link href="/todos/create" className="bg-yellow-600 rounded px-2 mx-6 my-2 inline-block">Create</Link>
                    <button onClick={handleRefreshButtonClick} className="bg-green-700 rounded px-2 mx-6 my-2 inline-block">Refresh</button>
                </div>
                
                <div>{(!isLoading && !isFetching && allTodosData) ? allTodosData.map((todo, index) => <TodoListItemComponent key={index} todoDetails={todo} />) : "Loading Todos..."}</div>
            
        </DefaultLayout>
    )
}

export default TodosListPage;