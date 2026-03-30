#!/usr/bin/env python3
"""
Brainstorm Crew — Time de agentes para branding, brandbook e UI/UX.

Uso:
  python brainstorm.py                              # Brainstorm geral do projeto
  python brainstorm.py --topic "paleta de cores"    # Tema específico
  python brainstorm.py --brandbook modelo.md        # Passa modelo de brandbook como contexto
  python brainstorm.py --rounds 3                   # Número de rodadas de refinamento
"""

import argparse
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from crewai import Agent, Crew, Task, Process, LLM

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
load_dotenv(Path(__file__).parent / ".env")

DEFAULT_MODEL = os.getenv("CREWAI_MODEL", "anthropic/claude-sonnet-4-6")
CREATIVE_MODEL = os.getenv("CREWAI_CREATIVE_MODEL", DEFAULT_MODEL)


def build_llm(model: str = DEFAULT_MODEL, temperature: float = 0.7) -> LLM:
    return LLM(model=model, temperature=temperature)


# ---------------------------------------------------------------------------
# Agents
# ---------------------------------------------------------------------------

def create_agents(brandbook_context: str = ""):
    context_block = ""
    if brandbook_context:
        context_block = f"""

CONTEXTO DO BRANDBOOK EXISTENTE:
---
{brandbook_context}
---
Use este modelo como referência para estruturar suas ideias."""

    brand_strategist = Agent(
        role="Brand Strategist",
        goal="Definir posicionamento, personalidade e estratégia de marca",
        backstory=f"""Você é um estrategista de marca sênior com 15+ anos de experiência
em startups SaaS e empresas de tecnologia. Especialista em:
- Posicionamento e diferenciação de marca
- Arquétipos e personalidade de marca
- Tom de voz e narrativa
- Proposta de valor única (UVP)
Você pensa de forma estratégica e sempre conecta branding com resultados de negócio.{context_block}""",
        llm=build_llm(CREATIVE_MODEL, temperature=0.8),
        allow_delegation=True,
        verbose=True,
    )

    visual_designer = Agent(
        role="Visual Identity Designer",
        goal="Criar diretrizes visuais coerentes e memoráveis",
        backstory=f"""Você é um designer de identidade visual premiado, especialista em:
- Sistemas de design e design tokens
- Paletas de cores (teoria das cores aplicada a branding)
- Tipografia e hierarquia visual
- Iconografia e ilustração
- Grid systems e layout
Você sempre justifica escolhas visuais com fundamentos de design e psicologia.{context_block}""",
        llm=build_llm(temperature=0.7),
        allow_delegation=True,
        verbose=True,
    )

    ux_researcher = Agent(
        role="UX Researcher & Strategist",
        goal="Garantir que todas as decisões de marca se traduzam em experiências excepcionais",
        backstory=f"""Você é um especialista em UX com foco na interseção entre branding e experiência:
- User personas e jornadas do usuário
- Princípios de usabilidade e acessibilidade
- Microinterações e motion design como extensão da marca
- Design emocional e memorabilidade
- Consistência cross-platform
Você sempre defende o ponto de vista do usuário final.{context_block}""",
        llm=build_llm(temperature=0.6),
        allow_delegation=True,
        verbose=True,
    )

    critic = Agent(
        role="Creative Director & Devil's Advocate",
        goal="Desafiar ideias para fortalecer a proposta final",
        backstory=f"""Você é um diretor criativo exigente que atua como devil's advocate:
- Questiona premissas e clichês
- Identifica inconsistências entre estratégia e execução
- Avalia originalidade e diferenciação no mercado
- Pede evidências e justificativas
- Sugere melhorias concretas, nunca apenas critica
Seu papel é elevar a qualidade questionando de forma construtiva.{context_block}""",
        llm=build_llm(temperature=0.5),
        allow_delegation=True,
        verbose=True,
    )

    synthesizer = Agent(
        role="Brandbook Synthesizer",
        goal="Consolidar todas as ideias em uma proposta estruturada e acionável",
        backstory=f"""Você é especialista em documentação de marca e brandbooks:
- Sintetiza debates complexos em diretrizes claras
- Estrutura entregáveis seguindo melhores práticas de brandbooks
- Conecta estratégia → visual → experiência em um documento coeso
- Cria guidelines práticos que qualquer membro do time pode seguir
Seu output é sempre estruturado, organizado e pronto para implementação.{context_block}""",
        llm=build_llm(temperature=0.4),
        allow_delegation=True,
        verbose=True,
    )

    return brand_strategist, visual_designer, ux_researcher, critic, synthesizer


# ---------------------------------------------------------------------------
# Tasks
# ---------------------------------------------------------------------------

def create_tasks(
    agents: tuple,
    topic: str,
    num_rounds: int = 2,
) -> list[Task]:
    brand_strategist, visual_designer, ux_researcher, critic, synthesizer = agents

    # Task 1: Brainstorm Inicial
    brainstorm_task = Task(
        description=f"""TEMA DO BRAINSTORM: {topic}

Conduza um brainstorm abrangente sobre o tema acima no contexto de branding/brandbook.

Gere pelo menos 8-10 ideias diversas cobrindo:
1. Posicionamento e diferenciação
2. Personalidade e tom de voz da marca
3. Diretrizes visuais (cores, tipografia, estilo)
4. Como isso se traduz em UX/UI

Para cada ideia:
- Descreva o conceito
- Justifique a escolha
- Dê exemplos concretos de aplicação

Delegue ao Visual Identity Designer para perspectivas visuais e ao UX Researcher para insights de experiência.""",
        expected_output="""Documento com 8-10 ideias de branding bem desenvolvidas, cada uma com:
- Conceito e descrição
- Justificativa estratégica
- Exemplos de aplicação
- Perspectiva visual e de UX""",
        agent=brand_strategist,
    )

    # Task 2: Crítica e Refinamento
    critique_task = Task(
        description=f"""Revise as ideias geradas pelo time de brainstorm.

Para cada ideia:
1. Avalie originalidade (está diferenciado no mercado SaaS?)
2. Avalie coerência (estratégia, visual e UX estão alinhados?)
3. Avalie viabilidade (é implementável na prática?)
4. Identifique clichês ou fraquezas
5. Sugira melhorias concretas

Consulte o UX Researcher sobre usabilidade e o Visual Designer sobre viabilidade visual.

Selecione as TOP 3-5 ideias mais fortes e explique por quê.
Rodada de refinamento: {num_rounds} iterações de melhoria.""",
        expected_output="""Análise crítica com:
- Score de cada ideia (originalidade, coerência, viabilidade)
- Top 3-5 ideias selecionadas com justificativa
- Melhorias sugeridas para cada ideia selecionada
- Pontos de atenção e riscos""",
        agent=critic,
    )

    # Task 3: Síntese Final
    synthesis_task = Task(
        description=f"""Com base nas ideias refinadas, crie uma proposta consolidada de brandbook.

Estruture o output como um BRANDBOOK DRAFT com as seguintes seções:

1. **Essência da Marca**
   - Missão, Visão, Valores
   - Proposta de Valor (UVP)
   - Personalidade e Arquétipo

2. **Tom de Voz**
   - Princípios de comunicação
   - Do's and Don'ts
   - Exemplos por canal/contexto

3. **Identidade Visual**
   - Paleta de cores (primárias, secundárias, neutras) com códigos hex
   - Tipografia (fontes, hierarquia, uso)
   - Estilo de ícones e ilustrações
   - Espaçamento e grid

4. **Diretrizes de UI/UX**
   - Princípios de design
   - Componentes-chave e seu estilo
   - Microinterações e motion
   - Acessibilidade

5. **Aplicações**
   - Landing page
   - App/Dashboard
   - Materiais de marketing

Delegue ao Visual Designer para detalhes visuais e ao UX Researcher para guidelines de experiência.""",
        expected_output="""Brandbook draft completo e estruturado com todas as 5 seções,
pronto para ser refinado e implementado. Inclui recomendações concretas
com valores específicos (hex colors, font names, spacing values, etc.).""",
        agent=synthesizer,
    )

    return [brainstorm_task, critique_task, synthesis_task]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Brainstorm Crew para Branding & UI/UX")
    parser.add_argument(
        "--topic",
        default="Definição completa do brandbook para nossa landing page SaaS de produtividade",
        help="Tema do brainstorm",
    )
    parser.add_argument(
        "--brandbook",
        default=None,
        help="Caminho para arquivo com modelo de brandbook existente (markdown/txt)",
    )
    parser.add_argument(
        "--rounds",
        type=int,
        default=2,
        help="Número de rodadas de refinamento (default: 2)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Caminho para salvar o resultado (default: stdout + scripts/output/)",
    )
    args = parser.parse_args()

    # Ler brandbook se fornecido
    brandbook_context = ""
    if args.brandbook:
        brandbook_path = Path(args.brandbook)
        if not brandbook_path.exists():
            print(f"Erro: arquivo '{args.brandbook}' não encontrado.")
            sys.exit(1)
        brandbook_context = brandbook_path.read_text(encoding="utf-8")
        print(f"Brandbook carregado: {brandbook_path.name} ({len(brandbook_context)} chars)")

    # Criar agentes e tasks
    agents = create_agents(brandbook_context)
    tasks = create_tasks(agents, args.topic, args.rounds)

    # Montar e rodar a crew
    crew = Crew(
        agents=list(agents),
        tasks=tasks,
        process=Process.sequential,
        verbose=True,
    )

    print("\n" + "=" * 60)
    print("BRAINSTORM CREW — Branding & UI/UX")
    print(f"Tema: {args.topic}")
    print(f"Rodadas de refinamento: {args.rounds}")
    print(f"Modelo: {DEFAULT_MODEL}")
    print("=" * 60 + "\n")

    result = crew.kickoff()

    # Salvar output
    output_dir = Path(__file__).parent / "output"
    output_dir.mkdir(exist_ok=True)

    if args.output:
        output_path = Path(args.output)
    else:
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = output_dir / f"brainstorm_{timestamp}.md"

    output_path.write_text(str(result), encoding="utf-8")
    print(f"\nResultado salvo em: {output_path}")


if __name__ == "__main__":
    main()
