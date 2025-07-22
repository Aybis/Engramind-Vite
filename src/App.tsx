import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages";
import "./index.css";
import ShowcasePage from "./pages/showcase";
import ShowcaseQuickCreatePage from "./pages/showcase/pages/quick-create";
import DashboardPage from "./pages/dashboard";
import ShowcaseHowItWorks from "./pages/showcase/pages/how-it-works";
import ShowcaseFaq from "./pages/showcase/pages/faq";
import RoleplayDetail from "./pages/showcase/pages/roleplay";
import RubricsPage from "./pages/showcase/pages/rubrics";
import GlossaryPage from "./pages/showcase/pages/glossary";
import FileManagementPage from "./pages/showcase/pages/file-management";
import PersonaPage from "./pages/showcase/pages/persona";
import ShowcaseAdvanceCreatePage from "./pages/showcase/pages/advance-create";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { FirstAIPage } from "./pages/auth/register/ai";
import { SecondAIPage } from "./pages/auth/register/ai/second";
import { ThirdAIPage } from "./pages/auth/register/ai/third";
import { FourthAIPage } from "./pages/auth/register/ai/fourth";
import { FifthAIPage } from "./pages/auth/register/ai/fifth";
import { SixthAIPage } from "./pages/auth/register/ai/sixth";
import { SeventhAIPage } from "./pages/auth/register/ai/seventh";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Auth Page */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/register/ai" element={<FirstAIPage />} />
        <Route path="/auth/register/ai/second" element={<SecondAIPage />} />
        <Route path="/auth/register/ai/third" element={<ThirdAIPage />} />
        <Route path="/auth/register/ai/fourth" element={<FourthAIPage />} />
        <Route path="/auth/register/ai/fifth" element={<FifthAIPage />} />
        <Route path="/auth/register/ai/sixth" element={<SixthAIPage />} />
        <Route path="/auth/register/ai/seventh" element={<SeventhAIPage />} />
        {/* Showcase Page */}
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route
          path="/showcase/roleplay/quick-create"
          element={<ShowcaseQuickCreatePage />}
        />
        <Route
          path="/showcase/roleplay/advance-create"
          element={<ShowcaseAdvanceCreatePage />}
        />
        <Route path="/showcase/how-it-works" element={<ShowcaseHowItWorks />} />
        <Route path="/showcase/faq" element={<ShowcaseFaq />} />
        <Route path="/showcase/roleplay/:id" element={<RoleplayDetail />} />
        <Route path="/showcase/rubrics" element={<RubricsPage />} />
        <Route path="/showcase/glossary" element={<GlossaryPage />} />
        <Route path="/showcase/persona" element={<PersonaPage />} />
        <Route
          path="/showcase/file-management"
          element={<FileManagementPage />}
        />
        {/* Dashboard Page */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
