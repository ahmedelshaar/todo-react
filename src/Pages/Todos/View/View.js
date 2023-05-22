import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../Axios";

import { Button, Spinner } from "react-bootstrap";

const View = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [todo, setTodo] = useState({});

  useEffect(() => {
    getTodo();
  }, {});
  const getTodo = async () => {
    try {
      const response = await axiosInstance.get(`/todos/${id}`);
      setTodo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const back = async () => {
    navigate("/");
  };

  return todo.id ? (
    <div>
      {/* <h1>{todo.id}</h1> */}
      <Button onClick={back}>Back</Button>
      <textarea
        style={{ resize: "none" }}
        readOnly
        className="w-100 border border-0 text-center"
        rows="5">
        {todo.note}
      </textarea>
      <p>Created At : {todo.created_at}</p>
      {todo.updated_at ? <p>Last Edit at : {todo.updated_at}</p> : null}
    </div>
  ) : (
    <div className="text-center">
      <Spinner />
    </div>
  );
};

export default View;
