"use client";

import React, { useEffect, useRef, useState } from "react";
import { TodoActions, TodoProps } from "./todoHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faCross, faEdit, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { useTodoContext } from "./todoContext";

const Todo = (props: {todoInfo: TodoProps, actions: TodoActions, listEntry?: boolean, select?: (todo?: TodoProps) => void, active?: boolean}) => {
    const { todoInfo, actions, listEntry, select, active } = props;
    const { id, title, content, completed } = todoInfo;
    const { removeTodo, updateTodo } = actions;

    const { todos } = useTodoContext();
    
    const [ isEditing, setIsEditing ] = useState(false);

    const [ Form, setForm ] = useState({
        title,
        content,
        completed
    });

    const TodoRef = useRef<HTMLDivElement>(null);

    const toggleCompleted = () => {
        setForm((prev) => ({...prev, completed: !prev.completed}));
        updateTodo(id, Form.title, Form.content, !Form.completed);
    }

    const handleDelete = () => {
        removeTodo(todoInfo.id);
        select && select();
    }

    const handleUpdate = () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        updateTodo(id, Form.title, Form.content, Form.completed ?? false);
        setIsEditing(false);
    }

    useEffect(() => {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return;
        setForm(() => {return {title: todo.title, content: todo.content, completed: todo.completed}});
    }, [todos, id]);

    if (listEntry && !select) {
    }

    return !listEntry ? (
        <div ref={TodoRef} className={`relative card card-compact max-h-64 bg-base-content text-base-100 min-w-96`}>
            { !isEditing && <a className={` btn btn-circle ${Form.completed ? 'btn-success' : 'btn-error'} btn-sm absolute top-4 right-4`} onMouseDown={toggleCompleted}>
                { Form.completed ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircleXmark} /> }
            </a> }
            <div className={`card-body overflow-x-hidden max-w-80 overflow-y-auto`}>              
                { isEditing ? (
                    <>
                        <input type={`text`} className={`input input-bordered text-base-content`} value={Form.title} onChange={(e) => setForm((prev) => ({...prev, title: e.target.value}))} />
                        <textarea className={`textarea textarea-bordered text-base-content`} value={Form.content} onChange={(e) => setForm((prev) => ({...prev, content: e.target.value}))} />
                    </>
                ) : (
                    <>
                        <h5 className={`card-title truncate`}>{title}</h5>
                        <p className={`truncate text-wrap`}>{content}</p>
                    </>
                ) }
                <div className={`card-actions flex justify-end absolute bottom-4 right-4`}>
                    <a className={`btn ${ isEditing ? `btn-success` : `btn-ghost`}`} onClick={handleUpdate}>
                        <FontAwesomeIcon icon={isEditing ? faCircleCheck : faEdit} />
                    </a>
                    <a className={`btn btn-error`} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </a>
                </div>
            </div>
        </div>
    ) : listEntry && select != undefined ? (
        <tr className={`hover ${active && 'bg-base-200'}`}>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" checked={active} onChange={() => select(todoInfo)} />
                </label>
            </th>
            <td className={`font-bold`}>{title}</td>
            <td className={`truncate`}>{content}</td>
            <td onClick={toggleCompleted} className={`flex flex-row flex-nowrap justify-end`}><FontAwesomeIcon icon={completed ? faCircleCheck : faCircleXmark} className={`${completed ? 'text-success' : 'text-error'}`} size={'xl'} /></td>
        </tr>
    ) :
    null;
};

export default Todo;