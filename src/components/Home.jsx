import { SECTIONS } from "../constants";
import { PS_QUESTIONS, DS_QUESTIONS, CR_QUESTIONS } from "../data/questions";

export default function Home({ learnSections, onNavigate, onStartPractice, onStartSimulado }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 14, letterSpacing: 4, color: "#5a7a9a", textTransform: "uppercase", marginBottom: 8 }}>
          Preparatório
        </div>
        <h1 style={{
          fontSize: 36, fontWeight: 800, margin: 0,
          background: "linear-gradient(135deg, #00c2ff, #b388ff, #69f0ae)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          QuizSharp
        </h1>
        <p style={{ color: "#5a7a9a", fontSize: 14, marginTop: 8 }}>
          Estágio QA • Teste de Lógica e Argumentação
        </p>
      </div>

      {/* Learn section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#e8f0f8", fontSize: 16, fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>
          📚 APRENDER
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {learnSections.map(ls => (
            <button key={ls.key} onClick={() => onNavigate(ls.key)} style={{
              background: "#0d1f35", border: "1px solid #1a3a5c", borderRadius: 12,
              padding: "16px 20px", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.2s",
            }}>
              <span style={{ fontSize: 28 }}>{ls.icon}</span>
              <div>
                <div style={{ color: ls.color, fontSize: 15, fontWeight: 700 }}>{ls.title}</div>
                <div style={{ color: "#5a7a9a", fontSize: 12, marginTop: 2 }}>Explicação detalhada + estratégias</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Practice section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#e8f0f8", fontSize: 16, fontWeight: 600, marginBottom: 16, letterSpacing: 1 }}>
          🎯 PRATICAR POR TIPO
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { s: SECTIONS.PRACTICE_PS, label: "Problem Solving", n: PS_QUESTIONS.length, c: "#00c2ff" },
            { s: SECTIONS.PRACTICE_DS, label: "Data Sufficiency", n: DS_QUESTIONS.length, c: "#b388ff" },
            { s: SECTIONS.PRACTICE_CR, label: "Critical Reasoning", n: CR_QUESTIONS.length, c: "#69f0ae" },
          ].map(p => (
            <button key={p.s} onClick={() => onStartPractice(p.s)} style={{
              background: "#0d1f35", border: "1px solid #1a3a5c", borderRadius: 12,
              padding: "20px 12px", cursor: "pointer", textAlign: "center",
            }}>
              <div style={{ color: p.c, fontSize: 24, fontWeight: 800 }}>{p.n}</div>
              <div style={{ color: "#b0c8e0", fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>{p.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Simulado */}
      <button onClick={onStartSimulado} style={{
        width: "100%", padding: "20px",
        background: "linear-gradient(135deg, #00365c, #1a0a4e, #0a3a2a)",
        border: "1px solid #2a5a8c",
        borderRadius: 14, cursor: "pointer", textAlign: "center",
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#e8f0f8", letterSpacing: 1 }}>
          🏆 SIMULADO COMPLETO
        </div>
        <div style={{ color: "#5a7a9a", fontSize: 12, marginTop: 6 }}>
          15 questões • 2 horas • Cronometrado • Sem gabarito durante
        </div>
      </button>
    </div>
  );
}
