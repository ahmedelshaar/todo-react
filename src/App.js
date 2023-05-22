import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
function App() {
  return (
    <div className="App">
      <section className="vh-100 bg-light">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <RouterProvider router={Routes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
