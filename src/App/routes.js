// Auth
import LoginPage from "./pages/public/LoginPage";
import Register from "./pages/public/Register/Register";

// Others
import PublicPage from "./pages/public/PublicPage";
import RequestTracker from "./pages/private/Pipefy/RequestTracker/RequestTracker";
import Invite from "./pages/private/Users/Invite";
import NotFoundPage from "./pages/public/NotFoundPage";
import HelpContent from "./pages/private/Blog/HelpContent/HelpContent";
import {HelpFI} from "./pages/private/Blog/FI";
import {HelpHE} from "./pages/private/Blog/HE";
import {HelpDesign} from "./pages/private/Blog/Design";

import Help from "./pages/private/Help/Help";
import Dashboard from "./pages/private/Dashboard/Dashboard";
import OrganizationProfilePage from "./pages/private/OrganizationProfile/OrganizationProfilePage";


// Leads
import CreateLead from "./pages/private/Leads/Create";
import Leads from "./pages/private/Leads";

// Orgs
import Orgs from "./pages/internal/Orgs/Orgs";
import OrgInvite from "./pages/private/Orgs/OrgInvite";
import OrganizationProfile from "./pages/internal/Orgs/OrganizationProfile";
import OrganizationNew from "./pages/internal/Orgs/OrganizationNew";
import OrganizationMemberNew from "./pages/private/Orgs/MemberNew";
import { OrganizationInvitePage } from "./pages/private/OrganizationInvite"


// Members
import Members from "./pages/private/Members";
import ShowMember from "./pages/private/Members/Show";
import MemberNew from "./pages/private/Members/MemberNew";
import MembersList from "./pages/private/Members/List/MembersList"
import CreateMember from "./pages/private/Members/Create/Create"
import MemberProfilePage from "./pages/private/MemberProfile/MemberProfilePage";


// Simulations
import Simulations from "./pages/private/Simulations/Simulations";
import SimulationShow from "./pages/private/Simulations/Show";
import ConvertSimulationToLead from "./pages/private/ConvertSimulationToLead/ConvertSimulationToLead";
import { SimulationCreatePage } from "./pages/private/Simulations/Create";
import Indication from "./pages/public/Indication";

const ROUTES = [
  { path: "/", element: <PublicPage /> },
  { path: "/indicaai", element: <Indication /> },
  { path: "/indicaai/concluido", element: <Indication /> },
  { title: "Login", path: "/login", element: <LoginPage /> },
  { title: "Cadastro", path: "/register", element: <Register /> },
  {
    title: "Convidar Usuário",
    path: "/private/users/invite",
    element: <Invite />,
    isPrivate: true
  },
  {
    title: "Convidar Organização OLD",
    path: "/private/organizations/invite2",
    element: <OrgInvite />,
    isPrivate: true
  },
  {
    title: "Convidar Organização",
    path: "/private/organizations/invite",
    element: <OrganizationInvitePage />,
    isPrivate: true,
    authGroup: "Pontte_Users"
  },
  {
    title: "Materiais de Apoio",
    path: "/private/blog/material-apoio",
    element: <HelpContent />,
    isPrivate: true,
    items: [
      {
        title: "Home Equity",
        route: "/private/blog/material-apoio-he",
        path: "/private/blog/material-apoio-he",
        element: null
      },
      {
        title: "Financiamento",
        route: "/private/blog/material-apoio-fi",
        path: "/private/blog/material-apoio-fi",
        element: null
      },
      {
        title: "Design",
        route: "/private/blog/material-apoio-design",
        path: "/private/blog/material-apoio-design",
        element: <HelpDesign />
      }
   ]
  },
  {
    title: "Materiais de Apoio Design",
    path: "/private/blog/material-apoio-design",
    element: <HelpDesign />,
    isPrivate: true
  },
  {
    title: "Financiamento",
    path: "/private/blog/material-apoio-fi",
    element: <HelpFI />,
    isPrivate: true
  },
  {
    title: "Materiais de Apoio HE",
    path: "/private/blog/material-apoio-he",
    element: <HelpHE />,
    isPrivate: true
  },
  {
    title: "Lista de Leads",
    path: "/private/leads",
    element: <Leads />,
    isPrivate: true
  },
  {
    title: "Cadastro de operações",
    path: "/private/leads/new/:type",
    element: <CreateLead />,
    isPrivate: true
  },
  {
    title: "Acompanhamento",
    path: "/private/pipefy/request-tracker",
    element: <RequestTracker />,
    isPrivate: true,
    items: [
      {
        title: "Status das Operações",
        path: "https://app.pipefy.com/request-tracker/"
      },
      {
        title: "Leads",
        path: "/private/leads",
        visibility: ({ userLeads }) => userLeads && userLeads.length > 0
      }
    ]
  },
  {
    title: "Status das Operações",
    path: "/private/pipefy/request-tracker",
    element: <RequestTracker />,
    isPrivate: true
  },
  {
    title: "Página inicial",
    path: "/private/dashboard",
    element: <Dashboard />,
    isPrivate: true,
    authGroup: "Pontte_Users"
  },
  {
    title: "Página de ajuda",
    path: "/private/help",
    element: <Help />,
    isPrivate: true
  },
  {
    title: "Organizações",
    path: "/internal/organizations",
    element: <Orgs />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Criar organização",
    path: "/internal/organizations/new",
    element: <OrganizationNew />,
    isPrivate: true,
    authGroup: "Pontte_Users"
  },
  {
    title: "Perfil da Organização",
    path: "/internal/organizations/:id",
    element: <OrganizationProfile />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Criar um novo membro",
    path: "/internal/organizations/:id/members/new",
    element: <CreateMember />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Histórico de simulações",
    path: "/private/simulations",
    element: <Simulations />,
    isPrivate: true,
  },
  {
    title: "Dados da Simulação",
    path: "/private/simulations/:id",
    element: <SimulationShow />,
    isPrivate: true,
  },
  {
    title: "Simuladores",
    path: "/private/simulations/new/:type",
    element: <SimulationCreatePage />,
    isPrivate: true,
  },
  {
    title: "Usuários",
    path: "/private/members",
    element: <MembersList />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Dados do Membro",
    path: "/private/members/:id",
    element: <ShowMember />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Criar um novo membro",
    path: "/private/members/new",
    element: <MemberNew />,
    isPrivate: true,
    authGroup: "Admin"
  },
  {
    title: "Converter Simulação em Lead",
    path: "/private/simulations/:id/Leads/new",
    element: <ConvertSimulationToLead />,
    isPrivate: true
    // authGroup: "Admin"
  },
  {path: "/private/profile", element: <MemberProfilePage />, isPrivate: true},
  {path: "/private/settings", element: <OrganizationProfilePage />, isPrivate: true, authGroup: "Admin"},
  { path: "/not-found", element: <NotFoundPage />, isPrivate: false }
];

export default ROUTES;
