import { SECTIONS } from "../constants";

export const learnSections = [
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
      { h: "O que é?", p: "O formato mais diferente de prova. Você recebe uma pergunta e duas afirmações. NÃO precisa resolver o problema — só precisa dizer se as informações são suficientes pra resolvê-lo." },
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
