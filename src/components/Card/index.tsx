import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Task } from "../../pages/Dashboard";
import { Container } from "./styles";
import { api } from "../../services/api";

interface CardProps {
  task: Task;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const Card = ({ task, setTasks }: CardProps) => {
  const updateStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
    const response = await api.patch(`tasks/${task.id}`, {
      status: event.target.value,
    });

    setTasks((previousTasks) =>
      previousTasks.map((previousTask) =>
        task.id === previousTask.id ? response.data : previousTask
      )
    );
  };

  return (
    <Container>
      {task.title}

      <select title="status" onChange={updateStatus} defaultValue={task.status}>
        <option value="toDo">to Do</option>
        <option value="inProgress">in Progress</option>
        <option value="inRevision">in Revision</option>
        <option value="finished">finished</option>
      </select>
    </Container>
  );
};
