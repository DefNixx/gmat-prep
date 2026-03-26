export const PS_QUESTIONS = [
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
    explanation: "As raízes são x=2 e x=3 (soma das raízes = 5). A soma de 2x: 2(2) + 2(3) = 4 + 6 = 10.",
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

export const DS_QUESTIONS = [
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

export const CR_QUESTIONS = [
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
export const SIMULADO_QUESTIONS = [
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

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
