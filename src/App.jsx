import { useState, useRef } from "react";
import { SECTIONS } from "./constants";
import { SIMULADO_QUESTIONS, shuffle } from "./data/questions";
import { learnSections } from "./data/learnContent";
import Home from "./components/Home";
import LearnSection from "./components/LearnSection";
import Practice from "./components/Practice";
import Simulado from "./components/Simulado";
import Results from "./components/Results";

export default function GMATPrep() {
  const [section, setSection] = useState(SECTIONS.HOME);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [simuladoQuestions, setSimuladoQuestions] = useState([]);
  const [simuladoAnswers, setSimuladoAnswers] = useState({});
  const [simuladoFinished, setSimuladoFinished] = useState(false);
  const containerRef = useRef(null);

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
          onFinish={() => setSimuladoFinished(true)}
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
