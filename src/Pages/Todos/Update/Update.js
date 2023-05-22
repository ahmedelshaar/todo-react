import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "./../../../Axios";
import { Spinner, Button } from "react-bootstrap";

const Update = () => {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const { data } = await axiosInstance.get(`/todos/${id}`);
      setNote(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNote({ ...note, note: e.target.value });
    setError("");
    // console.log(note);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const task = note.note.trim();
    if (task.length < 5) {
      setError("Task should be at least 5 characters.");
      setLoading(false);
      return;
    }
    if (task.length > 100) {
      setError("Task should be at most 100 characters.");
      setLoading(false);
      return;
    }

    const { data } = await axiosInstance.get("/todos");
    const todos = data.map((el) => (el.id != note.id ? el.note : null));
    console.log(todos, task);
    if (todos.includes(task)) {
      setError("This task already exists.");
      setLoading(false);
      return;
    }
    e.target.disabled = true;
    try {
      await axiosInstance.put(`/todos/${id}`, {
        note: task,
        created_at: note.created_at,
        updated_at: new Date().toISOString(),
      });
      setError("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className="text-center">
      <Spinner />
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Update Your Task:
          </label>
          <textarea
            className="form-control"
            id="note"
            rows="3"
            value={note.note}
            onChange={handleInputChange}></textarea>
          {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="mb-3">
          <Button type="submit" className="btn btn-primary">
            Update
          </Button>
          <Link to="/" className="btn btn-secondary ms-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Update;
