import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ClientInnerRoute from "./ClientInnerRoute";
import Home from "../pages/home";
import Loader from "../components/common/Loader";
import PrivateRoute from "./PrivateRoute";

const About = lazy(() => import("../pages/about"));
const Contact = lazy(() => import("../pages/contact"));
const Login = lazy(() => import("../layout/login"));
const Register = lazy(() => import("../layout/register"));
const GetAllTeams = lazy(() => import("../pages/team/getAllTeam"));
const CreateTeam = lazy(() => import("../pages/team/createTeam"));
const UpdateTeam = lazy(() => import("../pages/team/updateTeam"));
const DetailTeam = lazy(() => import("../pages/team/DetailTeam"));
const GetAllInvitations = lazy(() => import("../pages/invitations"));

const GetAllBlogs = lazy(() => import("../pages/blogs/getAllBlogs"));
const CreateBlog = lazy(() => import("../pages/blogs/createBlog"));
const BlogDetail = lazy(() => import("../pages/blogs/blogDetail"));

const UserDetail = lazy(() => import("../pages/user"));
const NotFound = lazy(() => import("../pages/notFound"));

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loader loader={true} />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ClientInnerRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <GetAllBlogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/create"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute>
                <BlogDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <PrivateRoute>
                <GetAllTeams />
              </PrivateRoute>
            }
          />
          <Route
            path="/invitations"
            element={
              <PrivateRoute>
                <GetAllInvitations />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams/create"
            element={
              <PrivateRoute>
                <CreateTeam />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams/update/:id"
            element={
              <PrivateRoute>
                <UpdateTeam />
              </PrivateRoute>
            }
          />
          <Route
            path="/teams/:id"
            element={
              <PrivateRoute>
                <DetailTeam />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
