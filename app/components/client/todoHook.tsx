"use client";

import React, { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

export type TodoProps = {
    id: string;
    title: string;
    content: string;
    completed?: boolean;
}

export type TodoActions = {
    addTodo: (title: string, content: string) => void;
    updateTodo: (id: string, title: string, content: string, completed: boolean) => void;
    removeTodo: (id: string) => void;
}

const useTodos = () => {
    const [ todos, setTodos ] = useState<TodoProps[]>([]);
    const Length = useMemo(() => todos.length, [todos]);

    const [ mounted, setMounted ] = useState(false);

    const addTodo = (title: string, content: string) => {
        setTodos((prev) => [
            ...prev,
            {
                id: v4(),
                title,
                content
            }
        ]);
    }

    const updateTodo = (id: string, title: string, content: string, completed: boolean) => {
        setTodos((prev) => prev.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title,
                    content,
                    completed
                }
            }
            return todo;
        }));
    }

    const LoadTodos = () => {
        const todos = localStorage.getItem("todos");
        if (!todos) return;
        setTodos(JSON.parse(todos));
    }

    useEffect(() => {
        LoadTodos();
        setMounted(() => true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos, mounted]);

    const removeTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return {
        todos,
        Length,
        addTodo,
        updateTodo,
        removeTodo
    }
}

export default useTodos;