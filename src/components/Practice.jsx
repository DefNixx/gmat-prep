import { SECTIONS } from "../constants";
import { PS_QUESTIONS, DS_QUESTIONS, CR_QUESTIONS } from "../data/questions";
import QuestionCard from "./QuestionCard";

function getQuestionsForSection(sec) {
  if (sec === SECTIONS.PRACTICE_PS) return PS_QUESTIONS;
  if (sec === SECTIONS.PRACTICE_DS) return DS_QUESTIONS;
  if (sec === SECTIONS.PRACTICE_CR) return CR_QUESTIONS;
  return [];
}

export default function Practice({
  section, currentQ, answers, showResult,
  onSelectAnswer, onShowResult, onNext, onPrev, onBack, scrollToTop,
}) {
  const qs = getQuestionsForSection(section);
  const type = section === SECTIONS.PRACTICE_PS ? "PS" : section === SECTIONS.PRACTICE_DS ? "DS" : "CR";
  const q = qs[currentQ];
  return (
    <div className="section-container fade-in">
      <button onClick={onBack} className="btn-back" style={{
        background: "none", border: "none", color: "#5a7a9a", cursor: "pointer",
        fontSize: 13, marginBottom: 16, padding: 0,
      }}>← Voltar</button>
      <QuestionCard
        question={q} index={currentQ} total={qs.length}
        selected={answers[currentQ]} onSelect={onSelectAnswer}
        showResult={showResult} type={type}
      />
      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {currentQ > 0 && (
          <button onClick={() => { onPrev(); scrollToTop(); }} className="btn-nav" style={{
            padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
            borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
          }}>← Anterior</button>
        )}
        <div style={{ flex: 1 }} />
        {!showResult && answers[currentQ] !== undefined && (
          <button onClick={onShowResult} className="btn-primary" style={{
            padding: "12px 24px", background: "#00365c", border: "1px solid #00c2ff",
            borderRadius: 8, color: "#00c2ff", cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>Ver Resposta</button>
        )}
        {showResult && currentQ < qs.length - 1 && (
          <button onClick={() => { onNext(); scrollToTop(); }} className="btn-primary" style={{
            padding: "12px 24px", background: "#00c2ff", border: "none",
            borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
          }}>Próxima →</button>
        )}
        {showResult && currentQ === qs.length - 1 && (
          <button onClick={onBack} className="btn-primary" style={{
            padding: "12px 24px", background: "#69f0ae", border: "none",
            borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
          }}>Concluir ✓</button>
        )}
      </div>
    </div>
  );
}
