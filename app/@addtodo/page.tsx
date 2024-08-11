"use client";

import { useContext, useState } from "react";
import { TodoContext, useTodoContext } from "../components/client/todoContext";
import { TodoProps } from "../components/client/todoHook";

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [ Form, setForm ] = useState<Partial<TodoProps>>({
    title: "",
    content: ""
  });

  const handleAdd = () => {
    if (!Form.title || !Form.content) return;
    addTodo(Form.title, Form.content);
    setForm({ title: "", content: "" });
  }

  return (
    <>
      <input type={`text`} className={`input input-bordered`} placeholder={`Title`} value={Form.title} onChange={(e) => setForm((prev) => ({...prev, title: e.target.value}))} />
      <textarea className={`textarea textarea-bordered`} placeholder={`Content`} value={Form.content} onChange={(e) => setForm((prev) => ({...prev, content: e.target.value}))} />
      <a className={`btn btn-primary`} onClick={handleAdd}>Add</a>
    </>
  )


}


export default function Page() {
  return (
    <section className={`todo-create`}>
      <div className={`card card-compact`}>
        <div className={`card-body`}>
          <h5 className={`card-title`}>Create a new todo</h5>
          <TodoForm />
        </div>
      </div>
    </section>
  );
}