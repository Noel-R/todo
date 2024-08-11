"use client";

import { createContext, useContext } from "react";
import useTodos, { TodoProps } from "./todoHook";

type TodoContextProps = {
    todos: TodoProps[];
    Length: number;
    addTodo: (title: string, content: string) => void;
    updateTodo: (id: string, title: string, content: string, completed: boolean) => void;
    removeTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);

export default function TodoProvider({ children } : { children: React.ReactNode }) {
    const { todos, Length, addTodo, updateTodo, removeTodo } = useTodos();

    return (
        <TodoContext.Provider value={{ todos, Length, addTodo, updateTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodoContext() {
    return useContext(TodoContext);
}