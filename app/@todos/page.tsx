"use client";

import { useMemo, useState } from "react";
import Todo from "../components/client/todo";
import { useTodoContext } from "../components/client/todoContext";
import { TodoProps } from "../components/client/todoHook";


const OpenTodo = (props: {selected: TodoProps | null}) => {
    const todo = useMemo(() => {
        if (!props.selected) return null;
        return props.selected;
    }, [props.selected]);

    const { addTodo, updateTodo, removeTodo } = useTodoContext();

    if (!todo) return null;

    return (
      <Todo key={todo.id} todoInfo={todo} actions={{addTodo, updateTodo, removeTodo}} />
    )
  }
  
const TodoList = () => {
    const { todos, removeTodo, addTodo, updateTodo, Length } = useTodoContext();
    const [ selected, setSelected ] = useState<TodoProps | null>(null);

    useMemo(() => {
        if (!selected) return;
        const todo = todos.find((todo) => todo.id === selected.id);
        if (!todo) {
            setSelected(() => null);
            return true;
        }
        return false;
    }, [todos, selected]);

    const setSelectedTodo = (todo?: TodoProps) => {
      if (!todo || selected && selected.id === todo.id) {
        setSelected(() => null);
        return
      } 
      setSelected(() => todo);
    }

    return (
      <section className={`grid grid-cols-2 grid-rows-1 grid-flow-col w-full gap-4`}>
      <OpenTodo selected={selected} />
      <div className={`overflow-x-auto col-span-1 col-start-2 overflow-y-auto`}>
        <table className={`table bg-base-100 table-zebra`}>
          <thead>
            <tr>
                <th>{Length}</th>
                <th className={`max-w-24`}>Title</th>
                <th className={`max-w-80`}>Content</th>
                <th className={`max-w-12`}>Completed?</th>
            </tr>
          </thead>
          <tbody>
            {
            todos.map((todo) => {
                return <Todo key={`${todo.id}-list`} todoInfo={todo} actions={{removeTodo, addTodo, updateTodo}} listEntry select={setSelectedTodo} active={(selected && todo.id === selected.id) ?? false} />
            })
            }
            </tbody>
        </table>
      </div>
      </section>
    )
  }

export default function Todos() {
    return (
        <section className={`todos`}>
            <TodoList />
        </section>
    )
}