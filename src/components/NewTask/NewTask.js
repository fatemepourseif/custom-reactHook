import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "./../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const transformTask = (objTask) => {
      const generatedId = objTask.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    sendTaskRequest(
      {
        url: "https://custom-react-7a1b7-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: {text: taskText},
        headers: { "Content-Type": "application/json" },
      },
      transformTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
