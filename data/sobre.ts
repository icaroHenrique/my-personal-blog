import { SobreData } from "@/types/sobre";

export const sobreData: SobreData = {
  name: "Ícaro Henrique de Oliveira Werly Belfort",
  fullTitle: "Engenheiro SRE | DevOps | Cloud | Platform Engineering | Python",
  location: "Belo Horizonte, MG",
  contacts: {
    email: "icaro.henrique001@gmail.com",
    github: "https://github.com/icaroHenrique",
    linkedin: "https://linkedin.com/in/icaro-henrique",
  },
  hero: {
    title: "E aí, eu sou o Ícaro!",
    subtitle: "Um breve resumo de minha trajetoria profissional",
  },
  sectionTitles: {
    skills: "Competências Técnicas",
    experience: "Trajetória Profissional",
    education: "Formação Acadêmica",
  },
  labels: {
    projectsAndAllocations: "Projetos e Alocações",
    expand: "Expandir ▼",
    collapse: "Recolher ▲",
  },
  contactCTA: {
    title: "Vamos conversar?",
    description: "Estou sempre aberto a trocar ideias sobre SRE, Kubernetes, Cloud e Platform Engineering.",
    buttonText: "Enviar Email",
  },
  summary: [
    "Comecei minha jornada lidando com servidores Linux e prestando suporte técnico, mas logo fui captado para o mundo de Cloud e SRE. Hoje, trabalho criando e mantendo arquiteturas de alta disponibilidade na nuvem (GCP, Azure, AWS), com a missão de manter os ambientes produtivos em plena forma e facilitar a vida de quem desenvolve.",
    "No dia a dia, minha vida se resume a infraestrutura como código (Terraform, Ansible), orquestração de containers (Kubernetes, Docker), pipelines de CI/CD (GitOps com ArgoCD) e, claro, criar automações uteis com Python para reduzir trabalho manual. Além disso, tenho tido foco pesado em observabilidade (Datadog, Prometheus) e na construção de Plataformas Internas de Desenvolvimento (IDPs) com Backstage para garantir que as equipes fiquem menos sobrecarregadas e entreguem mais rápido."
  ],
  skillCategories: [
    {
      title: "Cloud e Infraestrutura",
      skills: ["Google Cloud Platform (GCP)", "Microsoft Azure", "AWS", "VMware Cloud", "On-Premise"],
    },
    {
      title: "Containers e Orquestração",
      skills: ["Kubernetes", "Docker", "Docker Swarm", "Cloud Run", "Helm"],
    },
    {
      title: "CI/CD e GitOps",
      skills: ["Azure DevOps", "GitHub Actions", "ArgoCD", "Atlantis", "Azure Pipelines"],
    },
    {
      title: "Infraestrutura como Código",
      skills: ["Terraform", "Ansible", "AWX"],
    },
    {
      title: "Observabilidade e Monitoramento",
      skills: ["Datadog", "Prometheus", "Grafana", "Alert Manager", "Zabbix", "Cloudwatch", "Micrometer", "OpenTelemetry"],
    },
    {
      title: "Linguagens e Automação",
      skills: ["Python", "Shell Script", "Bash", "Java", "Node.js"],
    },
    {
      title: "Arquitetura e Mensageria",
      skills: ["Kafka", "Kafka Streams", "Qlik Replicate (CDC)", "Microsserviços (Event-Driven)"],
    },
    {
      title: "SO e Bancos de Dados",
      skills: ["Linux (RedHat, CentOS, AlmaLinux, Ubuntu)", "Windows Server", "PostgreSQL", "SQL Server", "MySQL"],
    },
  ],
  experiences: [
    {
      id: "cwi",
      company: "CWI Software",
      role: "Engenheiro SRE / DevOps",
      period: "Março 2022 - Presente",
      description: "Consultor alocado em projetos de alta complexidade, arquitetando e gerenciando soluções Cloud e SRE para grandes clientes.",
      projects: [
        {
          id: "xertica",
          name: "Projeto Xertica",
          period: "Mar 2026 - Presente",
          description: "Otimização de arquitetura e IDP em nuvem GCP.",
          highlights: [
            "Migrei microsserviços do K8s para Cloud Run, otimizando custo e complexidade, e iniciei o desenvolvimento de uma IDP (Backstage)."
          ],
        },
        {
          id: "banco-bv",
          name: "Projeto Banco BV",
          period: "Jan 2025 - Mar 2026",
          description: "Engenharia de observabilidade e arquitetura orientada a eventos.",
          highlights: [
            "Estruturei SLIs/SLOs para produtos NRT, desenvolvi soluções com Kafka e instrumentei microsserviços Java com Datadog."
          ],
        },
        {
          id: "aegea-corsan",
          name: "Projeto AEGEA | CORSAN",
          period: "Ago 2024 - Jan 2025",
          description: "Automação em Linux e migração para Azure Cloud.",
          highlights: [
            "Criei automações Python para rotinas complexas de File System, reduzindo operações manuais significativamente."
          ],
        },
        {
          id: "banco-dll",
          name: "Projeto Banco DLL",
          period: "Dez 2023 - Ago 2024",
          description: "Modernização de CI/CD e infraestrutura PaaS na Azure.",
          highlights: [
            "Desenvolvi pipelines de CI modernas e provisionei infraestrutura PaaS com Terraform."
          ],
        },
        {
          id: "hypera-pharma",
          name: "Projeto Hypera Pharma",
          period: "Jan 2023 - Dez 2023",
          description: "Migração Cloud Native e observabilidade em Kubernetes.",
          highlights: [
            "Liderei a migração de um ambiente legado On-Premise para AKS, com GitOps via ArgoCD e stack completa de observabilidade."
          ],
        },
      ],
    },
    {
      id: "lincros",
      company: "LINCROS",
      role: "Site Reliability Engineering II",
      period: "Maio 2022 - Janeiro 2023",
      highlights: [
        "Gerenciei infra de alta disponibilidade em AWS e VMware, orquestrando ambientes com K8s e provisionando IaC com Terraform e Ansible.",
        "Migrei um banco PostgreSQL legado para alta disponibilidade com mínimo downtime."
      ],
    },
    {
      id: "quartel",
      company: "Quartel Design",
      role: "Analista Computacional",
      period: "Julho 2019 - Janeiro 2023",
      highlights: [
        "Implementei automações com Python e Bash e administrei servidores de Web Hosting garantindo estabilidade e performance."
      ],
    },
    {
      id: "sierti",
      company: "SIERTI",
      role: "Analista de Suporte Computacional (Pleno)",
      period: "Novembro 2018 - Maio 2022",
      highlights: [
        "Administrei servidores Linux e ambientes na nuvem (AWS/Azure), aplicando IaC e resolvendo incidentes N3."
      ],
    },
    {
      id: "v4b",
      company: "V4B Tecnologia",
      role: "Estagiário de Analista de Suporte",
      period: "Abril 2019 - Julho 2019",
      highlights: [
        "Monitoramento e suporte N1/N2 em ambientes de web hosting."
      ],
    },
  ],
  education: [
    {
      degree: "Bacharelado em Engenharia de Software",
      institution: "Descomplica Faculdade Digital",
      period: "2024 - 2028",
    },
    {
      degree: "Técnico em Automação Industrial",
      institution: "SENAI Contagem CFP Euvaldo Lodi",
      period: "2015 - 2016",
    },
  ],
};
