import { createBrowserRouter } from "react-router-dom";
import TodosList from "./Pages/Todos/List/List";
import TodosCreate from "./Pages/Todos/Create/Create";
import TodosEdit from "./Pages/Todos/Update/Update";
import TodosView from "./Pages/Todos/View/View";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <TodosList />,
  },
  {
    path: "/create",
    element: <TodosCreate />,
  },
  {
    path: "/edit/:id",
    element: <TodosEdit />,
  },
  {
    path: "/view/:id",
    element: <TodosView />,
  },
]);

export default Routes;
