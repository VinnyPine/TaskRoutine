import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Board, Container } from "./styles";
import { Card } from "../../components/Card";
import { ModalAddTask } from "../../components/ModalAddTask";

export interface Task {
  id: string;
  status: string;
  description: string;
  title: string;
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const todoTasks = tasks.filter((task) => task.status === "toDo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const inRevisionTasks = tasks.filter((task) => task.status === "inRevision");
  const finishedTasks = tasks.filter((task) => task.status === "finished");

  useEffect(() => {
    (async () => {
      const response = await api.get<Task[]>("tasks");

      setTasks(response.data);
    })();
  }, []);

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const renderBoard = (tasksToRender: Task[]) =>
    tasksToRender.map((task) => (
      <Card key={task.id} task={task} setTasks={setTasks} />
    ));

  return (
    <Container>
      <header>
        <button type="button" onClick={toggleModal}>
          New
        </button>
      </header>

      {isOpenModal && (
        <ModalAddTask toggleModal={toggleModal} setTasks={setTasks} />
      )}

      <main>
        <Board>{renderBoard(todoTasks)}</Board>
        <Board>{renderBoard(inProgressTasks)}</Board>
        <Board>{renderBoard(inRevisionTasks)}</Board>
        <Board>{renderBoard(finishedTasks)}</Board>
      </main>
    </Container>
  );
};
