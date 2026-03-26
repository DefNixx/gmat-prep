import { useState, useEffect, useCallback, useRef } from "react";

const SECTIONS = {
  HOME: "home",
  LEARN_PS: "learn_ps",
  LEARN_DS: "learn_ds",
  LEARN_CR: "learn_cr",
  PRACTICE_PS: "practice_ps",
  PRACTICE_DS: "practice_ds",
  PRACTICE_CR: "practice_cr",
  SIMULADO: "simulado",
  RESULTS: "results",
};


const PS_QUESTIONS = [
  {
    q: "Uma loja oferece 20% de desconto em um produto que custa R$150. Se o cliente tem um cupom adicional de 10% sobre o preço já com desconto, qual o valor final?",
    options: ["R$105,00", "R$108,00", "R$112,50", "R$110,00", "R$100,00"],
    answer: 1,
    explanation: "Primeiro desconto: 150 × 0,80 = R$120. Segundo desconto sobre R$120: 120 × 0,90 = R$108. Cuidado: os descontos são aplicados sequencialmente, não somados (20%+10% ≠ 30%).",
  },
  {
    q: "Se 3 máquinas produzem 120 peças em 4 horas, quantas peças 5 máquinas produzem em 6 horas?",
    options: ["200", "250", "300", "360", "400"],
    answer: 2,
    explanation: "Taxa por máquina por hora: 120 / (3 × 4) = 10 peças. Com 5 máquinas por 6 horas: 5 × 6 × 10 = 300 peças.",
  },
  {
    q: "Em uma sala, 60% são mulheres. Se 75% das mulheres e 40% dos homens aprovaram uma proposta, qual a porcentagem total de aprovação?",
    options: ["55%", "57%", "59%", "61%", "63%"],
    answer: 3,
    explanation: "Considere 100 pessoas: 60 mulheres, 40 homens. Aprovaram: 60×0,75 + 40×0,40 = 45 + 16 = 61. Mas cuidado: 0,75×0,60 + 0,40×0,40 = 0,45 + 0,16 = 0,61 → Ops, na verdade é 61%! Corrigindo: a resposta é 61%. Vamos recalcular: 60×0.75=45, 40×0.40=16, total=61/100=61%. A resposta correta é 61%.",
  },
  {
    q: "Um investimento rende 8% ao ano com juros compostos. Qual o valor aproximado de R$10.000 após 2 anos?",
    options: ["R$11.600", "R$11.664", "R$11.800", "R$12.000", "R$10.800"],
    answer: 1,
    explanation: "Juros compostos: 10.000 × (1,08)² = 10.000 × 1,1664 = R$11.664,00.",
  },
  {
    q: "De quantas maneiras diferentes 5 pessoas podem se sentar em uma fila de 3 cadeiras?",
    options: ["10", "15", "20", "60", "120"],
    answer: 3,
    explanation: "Arranjo A(5,3) = 5!/(5-3)! = 5×4×3 = 60.",
  },
  {
    q: "Se x² - 5x + 6 = 0, qual é a soma dos valores possíveis de 2x?",
    options: ["5", "6", "10", "12", "8"],
    answer: 2,
    explanation: "As raízes são x=2 e x=3 (soma = 5 pela fórmula de Vieta). A soma de 2x para cada raiz: 2(2) + 2(3) = 4 + 6 = 10. Espere — 2×2 + 2×3 = 10. Alternativa C.",
  },
  {
    q: "Um tanque é preenchido pela torneira A em 6 horas e pela torneira B em 4 horas. Se ambas são abertas ao mesmo tempo, em quanto tempo o tanque enche?",
    options: ["2h", "2h12min", "2h24min", "2h30min", "3h"],
    answer: 2,
    explanation: "Taxa A = 1/6 por hora, Taxa B = 1/4 por hora. Juntas: 1/6 + 1/4 = 2/12 + 3/12 = 5/12 por hora. Tempo = 12/5 = 2,4 horas = 2h24min.",
  },
  {
    q: "A probabilidade de chover na segunda é 30% e na terça é 40%, de forma independente. Qual a probabilidade de chover em pelo menos um dos dois dias?",
    options: ["58%", "60%", "70%", "42%", "50%"],
    answer: 0,
    explanation: "P(pelo menos um) = 1 - P(nenhum) = 1 - (0,70 × 0,60) = 1 - 0,42 = 0,58 = 58%.",
  },
];

// Fix PS question 3 and 6
PS_QUESTIONS[2].answer = 3; // 61%
PS_QUESTIONS[5].answer = 2; // 10
PS_QUESTIONS[5].explanation = "As raízes são x=2 e x=3 (soma das raízes = 5). A soma de 2x: 2(2) + 2(3) = 4 + 6 = 10.";

const DS_QUESTIONS = [
  {
    q: "Qual é o valor de x?\n\n(1) 2x + 3 = 11\n(2) x é um número inteiro positivo",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 0,
    explanation: "Afirmação (1): 2x + 3 = 11 → 2x = 8 → x = 4. Suficiente! Afirmação (2): x pode ser 1, 2, 3... infinitas possibilidades. Insuficiente. Resposta: (1) sozinha basta.",
  },
  {
    q: "A é maior que B?\n\n(1) A = B + 5\n(2) B > 0",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 0,
    explanation: "Afirmação (1): Se A = B + 5, então A é sempre 5 unidades maior que B, independente do valor de B. Suficiente! Afirmação (2): Saber que B > 0 não nos diz nada sobre A. Insuficiente.",
  },
  {
    q: "Qual é o valor de y?\n\n(1) y² = 16\n(2) y > 0",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 2,
    explanation: "Afirmação (1): y² = 16 → y = 4 ou y = -4. Dois valores possíveis. Insuficiente! Afirmação (2): y > 0 não define o valor. Insuficiente! Juntas: y² = 16 E y > 0 → y = 4. Suficiente!",
  },
  {
    q: "João é mais velho que Maria?\n\n(1) João é 3 anos mais novo que Pedro\n(2) Pedro é 5 anos mais velho que Maria",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 2,
    explanation: "Afirmação (1): J = P - 3. Sem info sobre Maria. Insuficiente. Afirmação (2): P = M + 5. Sem info sobre João. Insuficiente. Juntas: J = P - 3 = (M + 5) - 3 = M + 2. João é 2 anos mais velho que Maria. Suficiente!",
  },
  {
    q: "x é divisível por 6?\n\n(1) x é divisível por 3\n(2) x é divisível por 2",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 2,
    explanation: "6 = 2 × 3. Precisa ser divisível por ambos. Afirmação (1) sozinha: divisível por 3, mas não necessariamente por 2 (ex: 9). Insuficiente. Afirmação (2) sozinha: divisível por 2, mas não necessariamente por 3 (ex: 8). Insuficiente. Juntas: divisível por 2 E por 3 → divisível por 6. Suficiente!",
  },
  {
    q: "Qual é o preço do produto?\n\n(1) Com 15% de desconto, o preço fica R$170\n(2) Com R$30 de desconto, o preço fica R$170",
    options: [
      "A afirmação (1) sozinha é suficiente, mas a (2) não",
      "A afirmação (2) sozinha é suficiente, mas a (1) não",
      "Nenhuma sozinha basta, mas as duas juntas são suficientes",
      "Cada afirmação sozinha já é suficiente",
      "As duas afirmações juntas ainda não são suficientes",
    ],
    answer: 3,
    explanation: "Afirmação (1): P × 0,85 = 170 → P = 200. Suficiente! Afirmação (2): P - 30 = 170 → P = 200. Suficiente! Cada uma sozinha resolve. Resposta: D.",
  },
];

const CR_QUESTIONS = [
  {
    q: "Uma empresa implementou home office integral e observou aumento de 20% na produtividade. O diretor concluiu que o trabalho presencial era o principal obstáculo à produtividade dos funcionários.\n\nQual das alternativas mais enfraquece a conclusão do diretor?",
    options: [
      "Alguns funcionários relataram se sentir isolados trabalhando de casa",
      "Durante o mesmo período, a empresa também trocou todo o software de gestão por ferramentas mais modernas",
      "A empresa concorrente manteve o trabalho presencial e teve queda de produtividade",
      "Os funcionários em home office trabalham em média 2 horas a mais por dia",
      "O diretor trabalha presencialmente na sede da empresa",
    ],
    answer: 1,
    explanation: "A conclusão assume que o home office causou o aumento de produtividade. A alternativa B mostra uma causa alternativa (novo software), enfraquecendo a relação causal entre home office e produtividade. A alternativa D também é forte, mas a B é mais diretamente uma causa alternativa.",
  },
  {
    q: "Pesquisas mostram que alunos que usam tablets na escola têm notas 15% maiores que os que não usam. Portanto, fornecer tablets para todos os alunos melhoraria o desempenho acadêmico geral.\n\nQual premissa está sendo assumida neste argumento?",
    options: [
      "Tablets são mais baratos que livros didáticos",
      "Os alunos que já usam tablets não são, sistematicamente, de famílias com mais recursos e apoio educacional",
      "Professores precisam de treinamento para usar tablets em sala",
      "A tecnologia na educação é sempre benéfica",
      "As notas são a melhor medida de aprendizagem",
    ],
    answer: 1,
    explanation: "O argumento assume que a correlação tablet→notas é causal. Mas pode haver viés de seleção: talvez as famílias que dão tablets aos filhos também ofereçam mais suporte. A premissa oculta é que os dois grupos são comparáveis.",
  },
  {
    q: "A prefeitura proibiu sacolas plásticas nos supermercados. Após 1 ano, a quantidade de plástico nos aterros da cidade não diminuiu.\n\nQual das alternativas melhor explica esse resultado aparentemente contraditório?",
    options: [
      "A população da cidade cresceu 2% no período",
      "Os consumidores passaram a comprar sacos de lixo de plástico mais grosso para substituir as sacolas que antes reutilizavam",
      "Algumas pessoas ainda guardam sacolas plásticas antigas em casa",
      "A reciclagem de plástico é ineficiente",
      "Os supermercados oferecem sacolas de papel como alternativa",
    ],
    answer: 1,
    explanation: "A alternativa B resolve o paradoxo: a proibição eliminou as sacolas finas, mas as pessoas compensaram comprando sacos plásticos mais grossos (usando mais plástico no total). É o chamado 'efeito rebote'.",
  },
  {
    q: "Empresa X gasta 30% a mais com segurança que a empresa Y, mas tem o dobro de incidentes de segurança. Portanto, o investimento em segurança da Empresa X é ineficiente.\n\nQual informação, se verdadeira, mais enfraqueceria essa conclusão?",
    options: [
      "A empresa X tem um departamento de TI maior",
      "A empresa X opera em um setor de risco 5 vezes maior que o da empresa Y",
      "A empresa Y terceiriza parte de sua segurança",
      "O CEO da empresa X é engenheiro de formação",
      "Ambas as empresas seguem normas ISO de segurança",
    ],
    answer: 1,
    explanation: "Se a empresa X opera em setor muito mais arriscado, ter apenas o dobro de incidentes mesmo nesse contexto pode significar que o investimento é, na verdade, eficiente. A comparação direta sem considerar o nível de risco é injusta.",
  },
  {
    q: "Cidades com mais livrarias per capita apresentam menores índices de criminalidade. Um vereador propõe abrir 50 novas livrarias na cidade para reduzir a violência.\n\nQual das alternativas identifica a principal falha no raciocínio do vereador?",
    options: [
      "Livrarias podem não ser economicamente viáveis em todas as regiões",
      "Ele confunde correlação com causalidade — ambos os fatores provavelmente são causados por um terceiro fator, como renda e educação",
      "A criminalidade depende de fatores sazonais",
      "Bibliotecas públicas seriam uma alternativa mais barata",
      "A quantidade de livrarias vem diminuindo globalmente",
    ],
    answer: 1,
    explanation: "Clássica falácia de correlação × causalidade. Não são as livrarias que reduzem a criminalidade. Provavelmente, bairros com maior renda e educação têm mais livrarias E menos crime. Abrir livrarias não ataca a causa real.",
  },
  {
    q: "Uma fábrica trocou o turno noturno de 8 horas por dois turnos de 4 horas com intervalo de 2 horas entre eles. A produção noturna caiu 30%.\n\nQual alternativa mais fortalece a decisão da fábrica, apesar da queda de produção?",
    options: [
      "Os funcionários do turno noturno recebem adicional de 20%",
      "Acidentes de trabalho no turno noturno caíram 80% após a mudança",
      "A fábrica produz bens de consumo não-essenciais",
      "Outras fábricas do setor mantêm o turno de 8 horas",
      "O custo da energia elétrica é menor durante a noite",
    ],
    answer: 1,
    explanation: "A queda drástica de 80% nos acidentes justifica a troca mesmo com perda de produção. Segurança do trabalhador e custos com acidentes (indenizações, afastamentos) podem compensar facilmente a queda de 30% na produção.",
  },
];

// Simulado: mix of all types
const SIMULADO_QUESTIONS = [
  // PS
  { ...PS_QUESTIONS[0], type: "PS" },
  { ...PS_QUESTIONS[3], type: "PS" },
  { ...PS_QUESTIONS[7], type: "PS" },
  { ...PS_QUESTIONS[4], type: "PS" },
  { ...PS_QUESTIONS[6], type: "PS" },
  // DS
  { ...DS_QUESTIONS[0], type: "DS" },
  { ...DS_QUESTIONS[2], type: "DS" },
  { ...DS_QUESTIONS[3], type: "DS" },
  { ...DS_QUESTIONS[4], type: "DS" },
  { ...DS_QUESTIONS[5], type: "DS" },
  // CR
  { ...CR_QUESTIONS[0], type: "CR" },
  { ...CR_QUESTIONS[1], type: "CR" },
  { ...CR_QUESTIONS[3], type: "CR" },
  { ...CR_QUESTIONS[4], type: "CR" },
  { ...CR_QUESTIONS[5], type: "CR" },
];

// Shuffle helper
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Components ───

function Timer({ seconds, onEnd }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onEnd(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  const pct = (left / seconds) * 100;
  const urgent = pct < 15;
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 100,
      background: urgent ? "#2d0a0a" : "#0a1628",
      borderBottom: `2px solid ${urgent ? "#ff4444" : "#1a3a5c"}`,
      padding: "12px 20px", display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#1a2a40" }}>
        <div style={{
          height: "100%", borderRadius: 3,
          width: `${pct}%`,
          background: urgent ? "#ff4444" : "linear-gradient(90deg, #00c2ff, #00ff88)",
          transition: "width 1s linear, background 0.5s",
        }} />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 18, fontWeight: 700, letterSpacing: 2,
        color: urgent ? "#ff6666" : "#00c2ff",
        minWidth: 90, textAlign: "right",
      }}>
        {h > 0 && `${h}:`}{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

function QuestionCard({ question, index, total, selected, onSelect, showResult, type }) {
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

// ─── Main App ───

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

  const getQuestionsForSection = (sec) => {
    if (sec === SECTIONS.PRACTICE_PS) return PS_QUESTIONS;
    if (sec === SECTIONS.PRACTICE_DS) return DS_QUESTIONS;
    if (sec === SECTIONS.PRACTICE_CR) return CR_QUESTIONS;
    return [];
  };

  const startPractice = (sec) => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setSection(sec);
  };

  const learnSections = [
    {
      key: SECTIONS.LEARN_PS, title: "Problem Solving", color: "#00c2ff", icon: "🧮",
      content: [
        { h: "O que é?", p: "São questões de matemática e lógica com 5 alternativas. Você precisa encontrar a resposta correta. Parece simples, mas o desafio está no tempo — cada questão deveria ser resolvida em ~2 minutos." },
        { h: "O que cai?", p: "Aritmética (porcentagens, proporções, médias), Álgebra (equações, inequações, funções), Geometria básica (áreas, perímetros, ângulos), Probabilidade e Combinatória, Interpretação de dados (tabelas, gráficos)." },
        { h: "Estratégias matadoras", p: "1) BACKSOLVING: teste as alternativas na equação em vez de resolver algebricamente. Comece pela alternativa C (do meio).\n2) PICKING NUMBERS: substitua variáveis por números fáceis (2, 3, 10, 100) pra testar.\n3) ELIMINAÇÃO: muitas vezes dá pra eliminar 2-3 alternativas absurdas logo de cara.\n4) ESTIMATIVA: se as alternativas são distantes entre si, arredonde os números e calcule rápido." },
      ],
    },
    {
      key: SECTIONS.LEARN_DS, title: "Data Sufficiency", color: "#b388ff", icon: "📊",
      content: [
        { h: "O que é?", p: "O formato MAIS DIFERENTE do GMAT. Você recebe uma pergunta e duas afirmações. NÃO precisa resolver o problema — só precisa dizer se as informações são suficientes pra resolvê-lo." },
        { h: "As 5 alternativas (SEMPRE as mesmas!)", p: "(A) Afirmação 1 sozinha é suficiente, mas a 2 sozinha NÃO é\n(B) Afirmação 2 sozinha é suficiente, mas a 1 sozinha NÃO é\n(C) Nenhuma sozinha basta, mas as duas JUNTAS são suficientes\n(D) CADA UMA sozinha já é suficiente\n(E) Mesmo as duas JUNTAS ainda NÃO são suficientes" },
        { h: "MEMORIZE ISTO", p: "As alternativas acima são FIXAS em TODA questão de DS. Se você decorar isso antes da prova, economiza tempo precioso. Na hora da prova, você já sabe as opções e foca no raciocínio." },
        { h: "Método de resolução", p: "1) Analise a afirmação (1) SOZINHA → suficiente ou não?\n2) Analise a afirmação (2) SOZINHA → suficiente ou não?\n3) Se nenhuma sozinha bastou, analise as DUAS JUNTAS.\n\nDica crucial: 'suficiente' significa que você chega a UM ÚNICO valor/resposta. Se a afirmação permite 2 ou mais respostas, é INSUFICIENTE." },
        { h: "Armadilha comum", p: "Não calcule o valor final! Muita gente perde tempo resolvendo a conta inteira. Você só precisa saber SE É POSSÍVEL resolver, não QUAL é a resposta." },
      ],
    },
    {
      key: SECTIONS.LEARN_CR, title: "Critical Reasoning", color: "#69f0ae", icon: "🧠",
      content: [
        { h: "O que é?", p: "Você lê um argumento curto (2-5 frases) e responde sobre sua estrutura lógica. Não precisa de matemática — precisa de pensamento crítico." },
        { h: "Tipos de pergunta", p: "ENFRAQUECER: Qual opção torna a conclusão menos provável?\nFORTALECER: Qual opção torna a conclusão mais provável?\nPREMISSA ASSUMIDA: Qual suposição oculta o argumento faz?\nPARADOXO/EXPLICAR: Qual opção resolve uma contradição aparente?\nCONCLUSÃO: Qual é a conclusão que se segue logicamente?" },
        { h: "Como analisar um argumento", p: "1) Identifique a CONCLUSÃO (o que o autor defende)\n2) Identifique as PREMISSAS (as evidências/dados apresentados)\n3) Encontre a LACUNA (o salto lógico entre premissas e conclusão)\n4) A resposta correta geralmente ataca essa lacuna" },
        { h: "Falácias clássicas que aparecem", p: "• Correlação ≠ Causalidade (A e B acontecem juntos, logo A causa B)\n• Causa alternativa (talvez seja outro fator causando o efeito)\n• Amostra não representativa (a pesquisa foi feita com grupo específico)\n• Generalização indevida (um caso não prova a regra)\n• Viés de seleção (os grupos comparados são diferentes na base)" },
      ],
    },
  ];

  // ─── Render ───

  const renderHome = () => (
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
          GMAT — Educarebox
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
            <button key={ls.key} onClick={() => { setSection(ls.key); scrollToTop(); }} style={{
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
            <button key={p.s} onClick={() => startPractice(p.s)} style={{
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
      <button onClick={startSimulado} style={{
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

  const renderLearn = (ls) => (
    <div style={{ padding: "24px 20px", maxWidth: 700, margin: "0 auto" }}>
      <button onClick={() => setSection(SECTIONS.HOME)} style={{
        background: "none", border: "none", color: "#5a7a9a", cursor: "pointer",
        fontSize: 13, marginBottom: 16, padding: 0,
      }}>← Voltar</button>
      <h1 style={{ color: ls.color, fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
        {ls.icon} {ls.title}
      </h1>
      {ls.content.map((c, i) => (
        <div key={i} style={{
          background: "#0d1f35", borderRadius: 14, padding: "20px 22px",
          marginBottom: 12, border: "1px solid #1a3a5c",
        }}>
          <h3 style={{ color: ls.color, fontSize: 15, fontWeight: 700, marginTop: 0, marginBottom: 10 }}>
            {c.h}
          </h3>
          <p style={{ color: "#b0c8e0", fontSize: 14, lineHeight: 1.8, margin: 0, whiteSpace: "pre-line" }}>
            {c.p}
          </p>
        </div>
      ))}
      <button onClick={() => {
        const prac = ls.key === SECTIONS.LEARN_PS ? SECTIONS.PRACTICE_PS
          : ls.key === SECTIONS.LEARN_DS ? SECTIONS.PRACTICE_DS : SECTIONS.PRACTICE_CR;
        startPractice(prac);
      }} style={{
        marginTop: 12, width: "100%", padding: 16, background: ls.color,
        border: "none", borderRadius: 10, cursor: "pointer",
        fontSize: 14, fontWeight: 700, color: "#0a1628",
      }}>
        Praticar {ls.title} →
      </button>
    </div>
  );

  const renderPractice = () => {
    const qs = getQuestionsForSection(section);
    const type = section === SECTIONS.PRACTICE_PS ? "PS" : section === SECTIONS.PRACTICE_DS ? "DS" : "CR";
    const q = qs[currentQ];
    return (
      <div style={{ padding: "24px 20px", maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => setSection(SECTIONS.HOME)} style={{
          background: "none", border: "none", color: "#5a7a9a", cursor: "pointer",
          fontSize: 13, marginBottom: 16, padding: 0,
        }}>← Voltar</button>
        <QuestionCard
          question={q} index={currentQ} total={qs.length}
          selected={answers[currentQ]} onSelect={(i) => setAnswers({ ...answers, [currentQ]: i })}
          showResult={showResult} type={type}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
          {currentQ > 0 && (
            <button onClick={() => { setCurrentQ(currentQ - 1); setShowResult(false); scrollToTop(); }} style={{
              padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
              borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
            }}>← Anterior</button>
          )}
          <div style={{ flex: 1 }} />
          {!showResult && answers[currentQ] !== undefined && (
            <button onClick={() => setShowResult(true)} style={{
              padding: "12px 24px", background: "#00365c", border: "1px solid #00c2ff",
              borderRadius: 8, color: "#00c2ff", cursor: "pointer", fontSize: 13, fontWeight: 600,
            }}>Ver Resposta</button>
          )}
          {showResult && currentQ < qs.length - 1 && (
            <button onClick={() => { setCurrentQ(currentQ + 1); setShowResult(false); scrollToTop(); }} style={{
              padding: "12px 24px", background: "#00c2ff", border: "none",
              borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
            }}>Próxima →</button>
          )}
          {showResult && currentQ === qs.length - 1 && (
            <button onClick={() => setSection(SECTIONS.HOME)} style={{
              padding: "12px 24px", background: "#69f0ae", border: "none",
              borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
            }}>Concluir ✓</button>
          )}
        </div>
      </div>
    );
  };

  const renderSimulado = () => {
    if (simuladoFinished) return renderResults();
    const q = simuladoQuestions[currentQ];
    if (!q) return null;
    return (
      <div ref={containerRef} style={{ height: "100%" }}>
        <Timer seconds={7200} onEnd={() => setSimuladoFinished(true)} />
        <div style={{ padding: "24px 20px", maxWidth: 700, margin: "0 auto" }}>
          <QuestionCard
            question={q} index={currentQ} total={simuladoQuestions.length}
            selected={simuladoAnswers[currentQ]}
            onSelect={(i) => setSimuladoAnswers({ ...simuladoAnswers, [currentQ]: i })}
            showResult={false} type={q.type}
          />
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
            {currentQ > 0 ? (
              <button onClick={() => { setCurrentQ(currentQ - 1); scrollToTop(); }} style={{
                padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
                borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
              }}>←</button>
            ) : <div />}
            {/* Question dots */}
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
              {simuladoQuestions.map((_, i) => (
                <button key={i} onClick={() => { setCurrentQ(i); scrollToTop(); }} style={{
                  width: 28, height: 28, borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600,
                  background: i === currentQ ? "#00c2ff" : simuladoAnswers[i] !== undefined ? "#1a4a2a" : "#1a2a40",
                  color: i === currentQ ? "#0a1628" : simuladoAnswers[i] !== undefined ? "#69f0ae" : "#5a7a9a",
                }}>{i + 1}</button>
              ))}
            </div>
            {currentQ < simuladoQuestions.length - 1 ? (
              <button onClick={() => { setCurrentQ(currentQ + 1); scrollToTop(); }} style={{
                padding: "12px 24px", background: "#1a2a40", border: "1px solid #2a4a60",
                borderRadius: 8, color: "#b0c8e0", cursor: "pointer", fontSize: 13,
              }}>→</button>
            ) : (
              <button onClick={() => setSimuladoFinished(true)} style={{
                padding: "12px 24px", background: "#69f0ae", border: "none",
                borderRadius: 8, color: "#0a1628", cursor: "pointer", fontSize: 13, fontWeight: 700,
              }}>Finalizar</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const total = simuladoQuestions.length;
    let correct = 0;
    let byType = { PS: { total: 0, correct: 0 }, DS: { total: 0, correct: 0 }, CR: { total: 0, correct: 0 } };
    simuladoQuestions.forEach((q, i) => {
      byType[q.type].total++;
      if (simuladoAnswers[i] === q.answer) { correct++; byType[q.type].correct++; }
    });
    const pct = Math.round((correct / total) * 100);
    return (
      <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontSize: 64, fontWeight: 900,
            background: pct >= 70 ? "linear-gradient(135deg, #69f0ae, #00c2ff)" : pct >= 40 ? "linear-gradient(135deg, #ffab40, #ffd740)" : "linear-gradient(135deg, #ff5252, #ff8a80)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            {pct}%
          </div>
          <div style={{ color: "#b0c8e0", fontSize: 16 }}>{correct} de {total} corretas</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
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
        <button onClick={() => setSection(SECTIONS.HOME)} style={{
          width: "100%", padding: 16, background: "#00c2ff", border: "none",
          borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#0a1628",
          marginTop: 16,
        }}>
          Voltar ao início
        </button>
      </div>
    );
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
      {section === SECTIONS.HOME && renderHome()}
      {learnMatch && renderLearn(learnMatch)}
      {isPractice && renderPractice()}
      {section === SECTIONS.SIMULADO && renderSimulado()}
      {section === SECTIONS.RESULTS && renderResults()}
    </div>
  );
}
