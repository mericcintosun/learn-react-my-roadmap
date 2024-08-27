import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

// addJob

const addJob = async (newJob) => {
  try {
    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
  } catch (error) {
    console.error("Error adding job:", error);
  }
};

// deleteJob

const deleteJob = async (id) => {
  try {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

const updateJob = async (job) => {
  try {
    await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
  } catch (error) {
    console.error("Error adding job:", error);
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
      <Route
        path="/edit-job/:id"
        element={<EditJobPage updateJobSubmit={updateJob} />}
        loader={jobLoader}
      />
      <Route
        path="/jobs/:id"
        element={<JobPage deleteJob={deleteJob} />}
        loader={jobLoader}
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
