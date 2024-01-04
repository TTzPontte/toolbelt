import HomePage from "./Pages/HomePage/HomePage";
import Create from "./Pages/Serasa/Create/SerasaReportPage";
import Read from "./Pages/Serasa/Read/Read";
import List from "./Pages/Serasa/List";
import PdfPage from "./Pages/PdfPage";
import Cards from "./Pages/Cards/Cards";

import Predictus from "./Pages/Predictus/create";
import PredictusList from "./Pages/Predictus/List";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
    fa: "home"
  },
  { path: "orgs/home", element: <HomePage />, name: "Home", fa: "home" },
  { path: "pdf", element: <PdfPage />, name: "Home", fa: "home" },
  { path: "/cards", element: <Cards />, name: "Cards"},
  {
    path: "predictus",
    element: <PredictusList />,
    name: "predictus",
    fa: "home"
  },
  {
    path: "predictus/new",
    element: <Predictus />,
    name: "predictus",
    fa: "home"
  },

  {
    path: "/serasa",
    element: <List />
  },
  {
    path: "serasa/new",
    element: <Create />,
    fa: "hand-holding-usd",
    clsx: "my-0"
  },
  {
    path: "serasa/:id",
    element: <Read />,
    fa: "hand-holding-usd",
    clsx: "my-0"
  },
  {}
];
// const navlinks = [];
// routes.map((i) => {
//   const paths = i.path.split("/");
//   console.log({paths})
//   const navlink = {};
//   paths.map(i=>navlink[i])
//   navlinks.push(navlink)
//   console.log({navlinks})
// });
//
// const navlinks = [];
//
// routes.forEach((route) => {
//   const paths = route.path.split("/").filter((pathPart) => pathPart !== "");
//
//   let currentNavlink = navlinks;
//
//   paths.forEach((pathPart, index) => {
//     const existingNavlink = currentNavlink.find((navlink) => navlink.title === pathPart);
//
//     if (existingNavlink) {
//       currentNavlink = existingNavlink.links;
//     } else {
//       const newNavlink = {
//         title: pathPart,
//         links: [],
//       };
//
//       if (index === paths.length - 1) {
//         // This is the last part of the path, so add additional properties
//         newNavlink.links.push({
//           link: route.path,
//           name: pathPart,
//           fa: route.fa || "",
//           clsx: route.clsx || "",
//         });
//       }
//
//       currentNavlink.push(newNavlink);
//       currentNavlink = newNavlink.links;
//     }
//   });
// });
//
// console.log(navlinks);
