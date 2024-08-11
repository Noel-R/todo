import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TodoProvider from "./components/client/todoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basic Todo App",
  description: "Created by NoelR",
};

export default function RootLayout({
  children,
  addtodo,
  todos
}: {
  children: React.ReactNode
  addtodo: React.ReactNode
  todos: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>
          <a className={`btn btn-info btn-lg absolute top-12 right-1/2`}>Todo App</a>
          <section className={`todo-dashboard`}>
            {todos}
            {addtodo}
          </section>
        </TodoProvider>
      </body>
    </html>
  );
}
