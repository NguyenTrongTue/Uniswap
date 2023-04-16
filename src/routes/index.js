import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "~/pages/home/Home";
import Login from "~/pages/login/Login";
import Pool from "~/pages/pool/Pool";
import Portfolio from "~/pages/portfolio/Portfolio";
import Register from "~/pages/register/Register";
import Token from "~/pages/token/Token";
import Default from "~/layouts/Default/Default";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/token",
    component: Token,
  },
  {
    path: "/portfolio",
    component: Portfolio,
  },
  {
    path: "/pool",
    component: Pool,
  },
];
const RoutesApp = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.component;
        const Layout = Default || Fragment;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page inputs={route.inputs ? route.inputs : []} />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};
export default RoutesApp;
