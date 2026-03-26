import QuestionCard from "./QuestionCard";

export default function Results({ simuladoQuestions, simuladoAnswers, onBack }) {
  const total = simuladoQuestions.length;
  let correct = 0;
  let byType = { PS: { total: 0, correct: 0 }, DS: { total: 0, correct: 0 }, CR: { total: 0, correct: 0 } };
  simuladoQuestions.forEach((q, i) => {
    byType[q.type].total++;
    if (simuladoAnswers[i] === q.answer) { correct++; byType[q.type].correct++; }
  });
  const pct = Math.round((correct / total) * 100);
  return (
    <div className="home-container fade-in">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div className="score-number" style={{
          background: pct >= 70 ? "linear-gradient(135deg, #69f0ae, #00c2ff)" : pct >= 40 ? "linear-gradient(135deg, #ffab40, #ffd740)" : "linear-gradient(135deg, #ff5252, #ff8a80)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {pct}%
        </div>
        <div style={{ color: "#b0c8e0", fontSize: 16 }}>{correct} de {total} corretas</div>
      </div>
      <div className="grid-3-results">
        {[
          { label: "Problem Solving", d: byType.PS, c: "#00c2ff" },
          { label: "Data Sufficiency", d: byType.DS, c: "#b388ff" },
          { label: "Critical Reasoning", d: byType.CR, c: "#69f0ae" },
        ].map(t => (
          <div key={t.label} style={{
            background: "#0d1f35", borderRadius: 12, padding: 16,
            textAlign: "center", border: "1px solid #1a3a5c",
          }}>
            <div style={{ color: t.c, fontSize: 24, fontWeight: 800 }}>
              {t.d.correct}/{t.d.total}
            </div>
            <div style={{ color: "#5a7a9a", fontSize: 11, marginTop: 4 }}>{t.label}</div>
          </div>
        ))}
      </div>
      {/* Show all questions with answers */}
      <h3 style={{ color: "#e8f0f8", fontSize: 16, marginBottom: 16 }}>Gabarito detalhado</h3>
      {simuladoQuestions.map((q, i) => (
        <QuestionCard
          key={i} question={q} index={i} total={total}
          selected={simuladoAnswers[i]} onSelect={() => {}}
          showResult={true} type={q.type}
        />
      ))}
      <button onClick={onBack} className="btn-primary" style={{
        width: "100%", padding: 16, background: "#00c2ff", border: "none",
        borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#0a1628",
        marginTop: 16,
      }}>
        Voltar ao início
      </button>
    </div>
  );
}
