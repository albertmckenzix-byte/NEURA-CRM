import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import OverviewPage from './pages/OverviewPage';
import LeadsPage from './pages/LeadsPage';
import CreateLeadPage from './pages/CreateLeadPage';
import AccountsPage from './pages/AccountsPage';
import ContactsPage from './pages/ContactsPage';
import DealsPage from './pages/DealsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ModulePage from './pages/ModulePage';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Main Workspace */}
          <Route path="/" element={<OverviewPage />} />
          <Route path="/home" element={<OverviewPage />} />
          <Route path="/projects" element={<ModulePage moduleKey="projects" />} />

          {/* Core CRM Modules */}
          <Route path="/leads/new" element={<CreateLeadPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/users" element={<ContactsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/pipeline" element={<DealsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />

          {/* Secondary Workflow & Utility Modules */}
          <Route path="/tasks" element={<ActivitiesPage />} />
          <Route path="/meetings" element={<ActivitiesPage />} />
          <Route path="/calls" element={<ActivitiesPage />} />
          <Route path="/campaigns" element={<ModulePage moduleKey="campaigns" />} />
          <Route path="/documents" element={<ModulePage moduleKey="documents" />} />
          <Route path="/visits" element={<ModulePage moduleKey="visits" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
