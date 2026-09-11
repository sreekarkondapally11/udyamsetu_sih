import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { LandingPage } from './views/LandingPage';
import { Dashboard } from './views/Dashboard';
import { NewAnalysisForm } from './views/NewAnalysisForm';
import { FeasibilityReport } from './views/FeasibilityReport';
import { FinancialCalculator } from './views/FinancialCalculator';
import { BusinessRoadmap } from './views/BusinessRoadmap';
import { MyReports } from './views/MyReports';

import type { AnalysisInput, FeasibilityReport as FeasibilityReportType, FinancialPlan, SavedReport } from './types';
import { generateFeasibilityReport } from './services/aiService';
import { calculateFinancialPlan } from './services/financialEngine';
import { getSavedReports, deleteReport as deleteStoredReport } from './services/storageService';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [reports, setReports] = useState<SavedReport[]>([]);
  
  // Current active analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentInput, setCurrentInput] = useState<AnalysisInput | null>(null);
  const [currentFeasibility, setCurrentFeasibility] = useState<FeasibilityReportType | null>(null);
  const [currentFinancial, setCurrentFinancial] = useState<FinancialPlan | null>(null);

  useEffect(() => {
    setReports(getSavedReports());
  }, [currentTab]);

  const handleStartNewAnalysis = () => {
    setCurrentTab('new-analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (input: AnalysisInput) => {
    setIsAnalyzing(true);
    try {
      const report = await generateFeasibilityReport(input);
      const plan = calculateFinancialPlan(input.ownCapital);

      setCurrentInput(input);
      setCurrentFeasibility(report);
      setCurrentFinancial(plan);
      setCurrentTab('feasibility');
    } catch (err) {
      console.error(err);
      alert('Error generating feasibility report. Please try again.');
    } finally {
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProceedToFinancials = () => {
    setCurrentTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToRoadmap = (updatedPlan: FinancialPlan) => {
    setCurrentFinancial(updatedPlan);
    setCurrentTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewReport = (report: SavedReport) => {
    setCurrentInput(report.input);
    setCurrentFeasibility(report.feasibility);
    setCurrentFinancial(report.financial);
    setCurrentTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReport = (id: string) => {
    if (confirm('Are you sure you want to delete this saved report?')) {
      const updated = deleteStoredReport(id);
      setReports(updated);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      
      {/* Top Header Navbar */}
      <Navbar currentTab={currentTab} onNavigate={(tab) => {
        setCurrentTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Main Content Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {currentTab === 'landing' && (
          <LandingPage
            onStart={handleStartNewAnalysis}
            onExploreDemo={() => {
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            reports={reports}
            onNewAnalysis={handleStartNewAnalysis}
            onViewReport={handleViewReport}
            onDeleteReport={handleDeleteReport}
          />
        )}

        {currentTab === 'new-analysis' && (
          <NewAnalysisForm
            onSubmit={handleFormSubmit}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentTab === 'feasibility' && currentInput && currentFeasibility && (
          <FeasibilityReport
            input={currentInput}
            report={currentFeasibility}
            onProceedToFinancials={handleProceedToFinancials}
          />
        )}

        {currentTab === 'calculator' && (
          <FinancialCalculator
            initialCapital={currentInput?.ownCapital || 100000}
            onProceedToRoadmap={handleProceedToRoadmap}
          />
        )}

        {currentTab === 'roadmap' && currentInput && currentFeasibility && currentFinancial && (
          <BusinessRoadmap
            input={currentInput}
            feasibility={currentFeasibility}
            financial={currentFinancial}
            onNavigateHome={() => setCurrentTab('dashboard')}
            onViewMyReports={() => setCurrentTab('my-reports')}
          />
        )}

        {currentTab === 'my-reports' && (
          <MyReports
            reports={reports}
            onViewReport={handleViewReport}
            onDeleteReport={handleDeleteReport}
            onNewAnalysis={handleStartNewAnalysis}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
