import { useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === ""
        ? todo
        : todo.filter((it) => 
            it.content.toLowerCase().includes(search.toLocaleLowerCase()))
        ;
    };
    const analyzeTodo = useMemo(() => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]); 
    const { totalCount, doneCount, notDoneCount} = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>TodoList 🏷️</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>미완료 할 일: {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} className="searchbar" placeholder="검색어를 입력하세요" />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;

function withLifecycleLogging(WrappdeComponent){
    return (props) => {
        useEffect (() => {
            console.log("Mount!");
            return () => console.log("Unmount");
        }, []);
        useEffect (() => {
            console.log("Update!");
        });
        return <WrappdeComponent {...props} />;
    };
}