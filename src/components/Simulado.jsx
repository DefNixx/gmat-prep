import Timer from "./Timer";
import QuestionCard from "./QuestionCard";

export default function Simulado({
  simuladoQuestions, currentQ, simuladoAnswers,
  onSelectAnswer, onSetCurrentQ, onFinish, scrollToTop,
}) {
  const q = simuladoQuestions[currentQ];
  if (!q) return null;
  return (
    <div style={{ height: "100%" }}>
      <Timer seconds={7200} onEnd={onFinish} />
      <div style={{ padding: "24px 20px", maxWidth: 700, margin: "0 auto" }}>
        <QuestionCard
          question={q} index={currentQ} total={simuladoQuestions.length}
          selected={simuladoAnswers[currentQ]}
          onSelect={onSelectAnswer}
          showResult={false} type={q.type}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
          {currentQ > 0 ? (
            <button onClick={() => { onSetCurrentQ(currentQ - 1); scrollToTop(); }} style={{
              padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
              borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
            }}>←</button>
          ) : <div />}
          {/* Question dots */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
            {simuladoQuestions.map((_, i) => (
              <button key={i} onClick={() => { onSetCurrentQ(i); scrollToTop(); }} style={{
                width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                background: i === currentQ ? "#00c2ff" : simuladoAnswers[i] !== undefined ? "#1a4a2a" : "#1a2a40",
                color: i === currentQ ? "#0a1628" : simuladoAnswers[i] !== undefined ? "#69f0ae" : "#5a7a9a",
              }}>{i + 1}</button>
            ))}
          </div>
          {currentQ < simuladoQuestions.length - 1 ? (
            <button onClick={() => { onSetCurrentQ(currentQ + 1); scrollToTop(); }} style={{
              padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
              borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
            }}>→</button>
          ) : (
            <button onClick={onFinish} style={{
              padding: "12px 24px", background: "#69f0ae", border: "none",
              borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
            }}>Finalizar</button>
          )}
        </div>
      </div>
    </div>
  );
}
