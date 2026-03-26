export default function QuestionCard({ question, index, total, selected, onSelect, showResult, type }) {
  const isCorrect = selected === question.answer;
  const optionLabels = ["A", "B", "C", "D", "E"];
  return (
    <div style={{
      background: "#0d1f35", borderRadius: 16, padding: "28px 24px",
      border: "1px solid #1a3a5c", marginBottom: 16,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 16,
      }}>
        <span style={{
          background: type === "PS" ? "#00365c" : type === "DS" ? "#2d1a4e" : "#1a3a2a",
          color: type === "PS" ? "#00c2ff" : type === "DS" ? "#b388ff" : "#69f0ae",
          padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
          letterSpacing: 1, textTransform: "uppercase",
        }}>
          {type === "PS" ? "Problem Solving" : type === "DS" ? "Data Sufficiency" : "Critical Reasoning"}
        </span>
        <span style={{ color: "#5a7a9a", fontSize: 13 }}>
          Questão {index + 1} de {total}
        </span>
      </div>
      <p style={{
        color: "#e8f0f8", fontSize: 15, lineHeight: 1.7,
        whiteSpace: "pre-line", marginBottom: 20,
      }}>
        {question.q}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {question.options.map((opt, i) => {
          let bg = "#0a1628";
          let border = "#1a3a5c";
          let color = "#b0c8e0";
          if (showResult) {
            if (i === question.answer) { bg = "#0a2e1a"; border = "#00cc66"; color = "#69f0ae"; }
            else if (i === selected && !isCorrect) { bg = "#2e0a0a"; border = "#cc3333"; color = "#ff6666"; }
          } else if (i === selected) {
            bg = "#0a2a4e"; border = "#00c2ff"; color = "#e8f0f8";
          }
          return (
            <button key={i} onClick={() => !showResult && onSelect(i)} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              background: bg, border: `1.5px solid ${border}`,
              borderRadius: 10, padding: "12px 16px", cursor: showResult ? "default" : "pointer",
              transition: "all 0.2s", textAlign: "left", width: "100%",
              color, fontSize: 14, lineHeight: 1.6,
            }}>
              <span style={{
                fontWeight: 700, fontSize: 13, minWidth: 24, height: 24,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 6, background: i === selected ? (showResult ? (i === question.answer ? "#00cc66" : "#cc3333") : "#00c2ff") : "#1a2a40",
                color: i === selected ? "#fff" : "#5a7a9a",
                flexShrink: 0, marginTop: 1,
              }}>
                {optionLabels[i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {showResult && (
        <div style={{
          marginTop: 16, padding: 16, borderRadius: 10,
          background: isCorrect ? "#0a2e1a" : "#1a0a0a",
          border: `1px solid ${isCorrect ? "#1a4a2a" : "#3a1a1a"}`,
        }}>
          <div style={{
            fontSize: 13, fontWeight: 700, marginBottom: 8,
            color: isCorrect ? "#69f0ae" : "#ff6666",
          }}>
            {isCorrect ? "✓ Correto!" : "✗ Incorreto"}
          </div>
          <p style={{ color: "#b0c8e0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
