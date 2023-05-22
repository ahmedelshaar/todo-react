import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./../../../Axios";

import { Spinner, Modal, Button, Alert } from "react-bootstrap";

const List = () => {
  const [TodosList, setTodosList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Id, setId] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    const id = e.target.dataset.id;
    console.log(id);
    setId(id);
    setShow(true);
  };

  useEffect(() => {
    getTodosList();
  }, []);

  const getTodosList = async () => {
    setLoading(true);
    await axiosInstance
      .get("/todos")
      .then((res) => {
        console.log(res.data);
        setTodosList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = async (e) => {
    console.log(e);
    const id = e.target.dataset.id;
    deleteByID(id);
    return;
  };
  const deleteByID = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      getTodosList();
    } catch (error) {
      console.log(error);
    }
    setShow(false);
  };

  const deleteSelection = async (e) => {
    e.preventDefault();
    const ids = [
      ...document.querySelectorAll('#todos [type="checkbox"]:checked'),
    ].map((el) => el.dataset.id);
    if (ids.length === 0) {
      alert("Please Select Todos");
      return;
    }
    const res = window.confirm(`Are Your Sure you want delete ${ids}?`);
    if (!res) return;
    const promises = ids.map(async (id) => {
      try {
        await axiosInstance.delete(`/todos/${id}`);
      } catch (error) {
        console.log(error);
      }
    });
    await Promise.all(promises);
    getTodosList();
  };

  return !Loading ? (
    <>
      <div className="col-12">
        <Link to={`/create`} className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-success end-0  px-4 px-3 me-4 mb-3">
            New
          </button>
        </Link>
      </div>
      {TodosList.length === 0 && (
        <Alert variant="danger" className="text-center" >
          No Todos Found
        </Alert>
      )}
      {TodosList.length > 0 && (
        <table  id="todos" className="table mb-4 align-middle text-center">
        <thead className="">
          <tr>
            <th scope="col">#</th>
            <th scope="col">No.</th>
            <th scope="col" style={{ width: "60%" }} className="w-501">
              Todo item
            </th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {TodosList.map((item, i) => (
            <tr key={i}>
              <th>
                <input className="" type="checkbox" data-id={item.id} />
              </th>
              <th scope="row">{i + 1}</th>
              <td className="text-start">
                <Link
                  style={{ whiteSpace: "pre-line" }}
                  to={`/view/${item.id}`}
                  className="text-dark text-decoration-none">
                  {item.note}
                </Link>
              </td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <button type="submit" className="btn btn-secondary">
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  data-id={item.id}
                  onClick={handleShow}
                  className="btn btn-danger ms-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <button className="btn btn-warning" onClick={deleteSelection}>
                Delete Selection
              </button>
            </td>
          </tr>
        </tfoot>
        </table>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting ...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" data-id={Id} onClick={deleteTodo}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <div className="text-center">
      <Spinner />
    </div>
  );
};

export default List;
