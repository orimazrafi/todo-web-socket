import React from "react";

export const Form = ({ onSubmit, isName }) => {
  const [task, setTask] = React.useState("");
  const handleChange = e => {
    const { value } = e.target;
    setTask(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(task);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name..."
        name="name"
        onChange={handleChange}
        value={task}
      />
      <button type="submit" disabled={!isName}>
        Submit
      </button>
    </form>
  );
};
