import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Blogs = lazy(() => import("pages/blogs"));
const Vacancies = lazy(() => import("pages/vacancies"));
const Galleries = lazy(() => import("pages/galleries"));
const Teachers = lazy(() => import("pages/teachers"));
const Programs = lazy(() => import("pages/programs"));
const TelegramCourses = lazy(() => import("pages/telegram-courses"));
const TelegramVacancies = lazy(() => import("pages/telegram-vacancies"));
const Admin = lazy(() => import("pages/admin"));
const Login = lazy(() => import("pages/login"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/blogs",
    access: ["admin"],
    title: "Blog",
    element: <Blogs />,
  },
  {
    path: "/vacancies",
    access: ["admin"],
    title: "vacancies",
    element: <Vacancies />,
  },
  {
    path: "/galleries",
    access: ["admin"],
    title: "Galleries",
    element: <Galleries />,
  },
  {
    path: "/teachers",
    access: ["admin"],
    title: "Teachers",
    element: <Teachers />,
  },
  {
    path: "/programs",
    access: ["admin"],
    title: "programs",
    element: <Programs />,
  },
  {
    path: "/telegram-courses",
    access: ["admin"],
    title: "telegram-courses",
    element: <TelegramCourses />,
  },
  {
    path: "/telegram-vacancies",
    access: ["admin"],
    title: "telegram-vacancies",
    element: <TelegramVacancies />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "profile",
    element: <Admin />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
