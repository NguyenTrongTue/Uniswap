import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Swap from "~/pages/swap/Swap";
import Login from "~/pages/login/Login";
import Pool from "~/pages/pool/Pool";
import Portfolio from "~/pages/portfolio/Portfolio";
import Register from "~/pages/register/Register";
import Token from "~/pages/token/Token";
import Default from "~/layouts/Default/Default";
import Home from "~/pages/home/Home";
import Profile from "~/pages/profile/Profile";

import Protected from "~/layouts/components/protected/Protected";
import SidebarLayout from "~/layouts/SidebarLayout/SidebarLayout";

const routes = [
  {
    path: "/",
    component: Home,
    layout: Default,
  },
  {
    path: "/swap",
    component: Swap,
    layout: Default,
  },
  {
    path: "/token",
    component: Token,
    layout: Default,
  },
  {
    path: "/portfolio",
    component: Portfolio,
    layout: Default,
  },
  {
    path: "/profile",
    component: Profile,
    layout: SidebarLayout,
  },
  {
    path: "/pool",
    component: Pool,
    layout: Default,
  },
];
const RoutesApp = ({ currentUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {routes.map((route, index) => {
        const Page = route.component;
        const Layout = route?.layout;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Protected currentUser={currentUser}>
                <Layout>
                  <Page inputs={route.inputs ? route.inputs : []} />
                </Layout>
              </Protected>
            }
          />
        );
      })}
    </Routes>
  );
};
export default RoutesApp;
