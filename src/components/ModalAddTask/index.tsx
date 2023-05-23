import { Dispatch, SetStateAction } from "react";
import { CreateTaskData, schema } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../services/api";
import { Task } from "../../pages/Dashboard";
import { Modal } from "../Modal";

interface ModalAddTaskProps {
  toggleModal: () => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const ModalAddTask = ({ toggleModal, setTasks }: ModalAddTaskProps) => {
  const { register, handleSubmit } = useForm<CreateTaskData>({
    resolver: zodResolver(schema),
  });

  const createTaskTodo = async (data: CreateTaskData) => {
    const response = await api.post<Task>("/tasks", {
      ...data,
      status: "toDo",
    });

    setTasks((previousTasks) => [response.data, ...previousTasks]);
    toggleModal();
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(createTaskTodo)}>
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" {...register("title")} />

        <label htmlFor="description">Email</label>
        <input type="text" id="description" {...register("description")} />

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
};
