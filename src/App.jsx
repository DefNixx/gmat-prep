import { useState, useEffect, useRef, useCallback } from "react";
import { SECTIONS } from "./constants";
import { SIMULADO_QUESTIONS, shuffle } from "./data/questions";
import { learnSections } from "./data/learnContent";
import Home from "./components/Home";
import LearnSection from "./components/LearnSection";
import Practice from "./components/Practice";
import Simulado from "./components/Simulado";
import Results from "./components/Results";

// ─── localStorage helpers ───
const STORAGE_KEY = "quizsharp";
const VALID_SECTIONS = new Set(Object.values(SECTIONS));

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    // Validate section is a known value
    if (data.section && !VALID_SECTIONS.has(data.section)) data.section = SECTIONS.HOME;
    // Validate simuladoQuestions is an array with expected shape
    if (data.simuladoQuestions && (
      !Array.isArray(data.simuladoQuestions) ||
      data.simuladoQuestions.some(q => !q?.q || !q?.options || q?.answer === undefined)
    )) {
      data.simuladoQuestions = [];
      data.simuladoAnswers = {};
      data.simuladoFinished = false;
      data.section = SECTIONS.HOME;
    }
    // Validate history is an array
    if (data.history && !Array.isArray(data.history)) data.history = [];
    return data;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function saveState(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function QuizSharp() {
  const saved = loadState();

  const [section, setSection] = useState(saved?.section || SECTIONS.HOME);
  const [currentQ, setCurrentQ] = useState(Number(saved?.currentQ) || 0);
  const [answers, setAnswers] = useState(saved?.answers || {});
  const [showResult, setShowResult] = useState(saved?.showResult === true);
  const [simuladoQuestions, setSimuladoQuestions] = useState(saved?.simuladoQuestions || []);
  const [simuladoAnswers, setSimuladoAnswers] = useState(saved?.simuladoAnswers || {});
  const [simuladoFinished, setSimuladoFinished] = useState(saved?.simuladoFinished === true);
  const [history, setHistory] = useState(saved?.history || []);
  const containerRef = useRef(null);

  // Persist state on every change
  useEffect(() => {
    saveState({ section, currentQ, answers, showResult, simuladoQuestions, simuladoAnswers, simuladoFinished, history });
  }, [section, currentQ, answers, showResult, simuladoQuestions, simuladoAnswers, simuladoFinished, history]);

  const scrollToTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const startSimulado = () => {
    setSimuladoQuestions(shuffle(SIMULADO_QUESTIONS));
    setSimuladoAnswers({});
    setCurrentQ(0);
    setSimuladoFinished(false);
    setSection(SECTIONS.SIMULADO);
  };

  const finishSimulado = useCallback(() => {
    setSimuladoFinished(true);
    // Save result to history
    const total = simuladoQuestions.length;
    let correct = 0;
    simuladoQuestions.forEach((q, i) => {
      if (simuladoAnswers[i] === q.answer) correct++;
    });
    setHistory(prev => [...prev, {
      date: new Date().toISOString(),
      total,
      correct,
      pct: Math.round((correct / total) * 100),
    }]);
  }, [simuladoQuestions, simuladoAnswers]);

  const startPractice = (sec) => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setSection(sec);
  };

  const goHome = () => setSection(SECTIONS.HOME);

  const navigateAndScroll = (sec) => {
    setSection(sec);
    scrollToTop();
  };

  // ─── Router ───
  const learnMatch = learnSections.find(ls => ls.key === section);
  const isPractice = [SECTIONS.PRACTICE_PS, SECTIONS.PRACTICE_DS, SECTIONS.PRACTICE_CR].includes(section);

  return (
    <div ref={containerRef} style={{
      minHeight: "100vh",
      background: "#070f1c",
      fontFamily: "'Segoe UI', 'SF Pro Display', -apple-system, sans-serif",
      color: "#e8f0f8",
      overflowY: "auto",
    }}>
      {section === SECTIONS.HOME && (
        <Home
          learnSections={learnSections}
          onNavigate={navigateAndScroll}
          onStartPractice={startPractice}
          onStartSimulado={startSimulado}
          history={history}
        />
      )}
      {learnMatch && (
        <LearnSection
          learnData={learnMatch}
          onBack={goHome}
          onStartPractice={startPractice}
        />
      )}
      {isPractice && (
        <Practice
          section={section}
          currentQ={currentQ}
          answers={answers}
          showResult={showResult}
          onSelectAnswer={(i) => setAnswers({ ...answers, [currentQ]: i })}
          onShowResult={() => setShowResult(true)}
          onNext={() => { setCurrentQ(currentQ + 1); setShowResult(false); }}
          onPrev={() => { setCurrentQ(currentQ - 1); setShowResult(false); }}
          onBack={goHome}
          scrollToTop={scrollToTop}
        />
      )}
      {section === SECTIONS.SIMULADO && !simuladoFinished && (
        <Simulado
          simuladoQuestions={simuladoQuestions}
          currentQ={currentQ}
          simuladoAnswers={simuladoAnswers}
          onSelectAnswer={(i) => setSimuladoAnswers({ ...simuladoAnswers, [currentQ]: i })}
          onSetCurrentQ={setCurrentQ}
          onFinish={finishSimulado}
          scrollToTop={scrollToTop}
        />
      )}
      {section === SECTIONS.SIMULADO && simuladoFinished && (
        <Results
          simuladoQuestions={simuladoQuestions}
          simuladoAnswers={simuladoAnswers}
          onBack={goHome}
        />
      )}
    </div>
  );
}
