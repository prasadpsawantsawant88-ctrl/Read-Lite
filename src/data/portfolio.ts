import { PortfolioData } from "../types";

export const defaultPortfolioData: PortfolioData = {
  name: "Prasad Sawant",
  title: "Business Analytics & AI Consultant | MBA",
  bio: "I bridge the gap between complex business strategy and advanced data analytics. Specializing in AI-powered enterprise solutions, financial modeling in Excel, and analytical frameworks to drive growth and operational efficiency.",
  email: "prasad.psawant.sawant88@gmail.com",
  linkedinUrl: "https://linkedin.com/in/prasad-sawant",
  githubUrl: "https://github.com/prasad-sawant",
  twitterUrl: "https://twitter.com/prasad_sawant",
  skills: [
    {
      id: "s1",
      name: "Business Analytics",
      category: "Business Analytics",
      level: "Expert",
      description: "Data-driven decision making, predictive modeling, and statistical analysis for executive support."
    },
    {
      id: "s2",
      name: "Strategic Management (MBA)",
      category: "MBA",
      level: "Expert",
      description: "Corporate strategy, market entry assessments, business model generation, and operations management."
    },
    {
      id: "s3",
      name: "Financial Modeling & Excel",
      category: "Excel",
      level: "Expert",
      description: "Advanced dynamic financial modeling, scenario analysis, VBA automation, and PowerQuery workflows."
    },
    {
      id: "s4",
      name: "Artificial Intelligence (AI)",
      category: "AI",
      level: "Advanced",
      description: "Prompt engineering, agentic workflow automation, LLM API integration, and process automation."
    },
    {
      id: "s5",
      name: "Emerging Technologies",
      category: "Emerging Tech",
      level: "Advanced",
      description: "Blockchain impact, cloud architecture, IoT business applications, and Web3 paradigms."
    },
    {
      id: "s6",
      name: "Power BI & Tableau",
      category: "Business Analytics",
      level: "Advanced",
      description: "Interactive executive dashboards, ETL operations, and visual storytelling."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "AI-Powered Market Entry Strategy Simulator",
      description: "An agentic decision-support system that evaluates strategic market entry parameters for tech enterprises.",
      longDescription: "Developed an interactive scenario simulation tool for corporate decision-makers. The tool models customer acquisition cost (CAC), lifetime value (LTV), and market share capture using stochastic models, while incorporating a Gemini-powered strategic advisor to write structured risk-mitigation plans based on competitive intelligence.",
      category: "AI",
      tags: ["Python", "Gemini API", "Business Simulation", "Monte Carlo"],
      githubUrl: "https://github.com/prasad-sawant/market-entry-simulator",
      keyDeliverables: [
        "Interactive NPV/IRR prediction model based on multi-variable inputs.",
        "Generative automated executive briefs detailing risk indicators and regulatory hurdles.",
        "Sensitivity analysis matrix displaying 10,000 randomized market-response permutations."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p2",
      title: "Enterprise Sales & Churn Analytics Dashboard",
      description: "A comprehensive predictive model tracking and highlighting SaaS customer health scores.",
      longDescription: "Created an end-to-end analytics workflow that ingests sales pipelines and customer engagement logs to predict subscription churn. Integrated descriptive analytics dashboards in Power BI and backed the models with logistic regression to isolate root-causes for user drop-off.",
      category: "Business Analytics",
      tags: ["SQL", "Python", "Power BI", "Predictive Modeling"],
      liveUrl: "https://public.tableau.com/profile/prasad",
      keyDeliverables: [
        "Reduced proactive churn by 18% through early-warning behavioral triggers.",
        "Interactive cohorts heatmaps showing month-over-month engagement retention.",
        "Strategic recommendation deck presented directly to the VP of Customer Success."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p3",
      title: "Dynamic Valuation & Leverage Buyout (LBO) Model",
      description: "Advanced financial model built in Microsoft Excel for real estate acquisition evaluation.",
      longDescription: "A fully parameterized, double-entry financial model detailing debt-service coverage ratios (DSCR), leveraged/unleveraged internal rate of returns (IRR), and multi-tiered water-fall distributions. Built completely using robust Excel best-practices, dynamic arrays, and integrated with a custom dashboard sheet.",
      category: "Excel",
      tags: ["Advanced Excel", "Financial Modeling", "LBO", "VBA"],
      keyDeliverables: [
        "Fully dynamic debt schedules with revolver capabilities and senior stretch options.",
        "Interactive dashboard displaying critical KPI charts and sensitivity tables in one glance.",
        "Audited against financial modeling standards (FAST) with zero hardcoded formula coordinates."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    }
  ],
  articles: [
    {
      id: "a1",
      title: "Generative AI in Corporate Strategy: The Rise of the Synthetic Consultant",
      slug: "generative-ai-corporate-strategy-synthetic-consultant",
      summary: "How modern Large Language Models (LLMs) are transforming corporate decision-making frameworks, competitive analysis, and automated research workflows.",
      category: "AI",
      date: "2026-07-15",
      readTime: "6 min read",
      sources: [
        { name: "Harvard Business Review - AI in Strategy", url: "https://hbr.org/2023/11/how-ai-will-change-strategy" },
        { name: "McKinsey - Economic Potential of GenAI", url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai" }
      ],
      content: `# Generative AI in Corporate Strategy: The Rise of the Synthetic Consultant

The traditional consulting toolkit is undergoing a massive transformation. For decades, strategic frameworks like Michael Porter’s Five Forces, BCG's Growth-Share Matrix, and SWOT analysis required teams of analysts spending weeks gathering data, interviewing industry participants, and consolidating slides.

Today, advanced generative models act as **synthetic consultants**, capable of generating preliminary market studies, competitive maps, and strategic alternatives in seconds. This shift does not eliminate the strategist; instead, it elevates their role from compiler to critical evaluator.

---

## 1. Speed-to-Insight: Redefining Strategic Speed

By leveraging API-driven Large Language Models (LLMs), businesses can instantly generate detailed competitive intelligence analyses.

### Traditional Research vs. AI-Assisted Strategy
*   **Traditional Path:** Define scope ➔ manual secondary research ➔ schedule stakeholder interviews ➔ consolidate insights (Duration: 3-4 Weeks).
*   **Synthetic Path:** Input target sector and parameters ➔ LLM searches/synthesizes known facts ➔ provides structured thematic gaps and regulatory overviews (Duration: 3 Minutes).

The key value driver here is **cognitive diversity**. Instead of analyzing the top three obvious strategic directions, corporate development teams can now prompt the model to explore "black swan" scenarios or non-obvious adjacent markets.

---

## 2. Dynamic SWOT & Competitive Mapping

Consider a scenario where an enterprise wants to evaluate a potential entry into the premium electric vehicle charging space. An LLM can instantly compile:
1.  **Barriers to Entry:** Regulatory approvals, grid capacity constraints, capital expenditures.
2.  **Strategic Gaps:** Current players' lack of integrated lounge spaces or loyalty models.

### Example Framework: Strategic Risk Analysis
*   *Regulatory:* Rapidly changing municipal electrical standards.
*   *Technological:* Transition from current standard plugs to next-generation ultra-fast solid-state tech.
*   *Financial:* Long payback period offset by green energy tax subsidies.

---

## 3. The Future: Multi-Agent Consensus Forums

We are moving past single-prompt answers. The next wave of strategic planning involves **Multi-Agent Systems**. By simulating virtual executives—an AI "CFO" focused purely on financial metrics, an AI "CMO" prioritizing brand equity, and an AI "COO" optimizing supply chains—corporate leaders can stress-test decisions within simulated boardroom environments before executing.

### Key Takeaways
*   **Augmentation over Replacement:** AI accelerates research by 80%, leaving strategic judgment, relationship management, and execution to human leaders.
*   **Framework Prototyping:** Instantly model diverse strategic scenarios to identify fatal flaws early in the business cycle.
*   **Data Integrity is Paramount:** Successful strategic generation relies heavily on high-quality input data and robust proprietary context.`
    },
    {
      id: "a2",
      title: "Modern Excel: Moving from VLOOKUP to Dynamic Array Formula Paradigms",
      slug: "modern-excel-moving-to-dynamic-array-formulas",
      summary: "An in-depth guide on utilizing modern Excel engines, custom lambdas, XLOOKUP, and dynamic spills to build robust financial and strategy sheets.",
      category: "Excel",
      date: "2026-06-28",
      readTime: "8 min read",
      sources: [
        { name: "Microsoft Docs - Dynamic Array Formulas", url: "https://support.microsoft.com/en-us/office/dynamic-array-formulas-and-spilled-array-behavior-205c2eaa-0d2d-4927-b96a-7619d99c5f81" },
        { name: "Excel Jet - Guide to XLOOKUP", url: "https://exceljet.net/formulas/xlookup-basic-example" }
      ],
      content: `# Modern Excel: Moving from VLOOKUP to Dynamic Array Formula Paradigms

For over two decades, the strength of an analyst was measured by their mastery of the \`VLOOKUP\` and \`INDEX/MATCH\` functions. However, Microsoft’s release of the modern calculation engine completely reimagined how formulas interact with cells. 

If you are still copying formulas down a column of 10,000 rows, it’s time to upgrade your workflow to **Dynamic Arrays** and single-cell "spill" architectures.

---

## 1. The Power of "Spill" (The Hash \`#\` Operator)

In legacy Excel, every cell calculated independently. If you wanted to filter a dataset, you had to write a formula in the first cell, copy it down, and hope you dragged it far enough. 

With dynamic arrays, a formula written in a single cell can return a whole range of values that automatically "spill" into adjacent cells.

### Key Example: The \`FILTER\` Function
Instead of complex VLOOKUP tables or manual filters:
\`\`\`excel
=FILTER(A2:C100, B2:B100 = "Consulting", "No Records Found")
\`\`\`
This single formula extracts all records where the department is "Consulting", spilling the rows down and columns across automatically. If you reference this spilled output in another formula, you simply use the **Spill Operator** (\`#\`):
\`\`\`excel
=SUM(D2#)
\`\`\`
If the filtered range grows from 5 to 50 rows, \`SUM(D2#)\` automatically adjusts its range. No manual editing required.

---

## 2. XLOOKUP: The Ultimate Upgrade

Let's address the fundamental flaws of legacy \`VLOOKUP\`:
1.  **Leftward Lookups:** It can only look from left to right.
2.  **Column Indexes:** If you insert a column, your column index index breaks, returning garbage data.
3.  **Exact Match Default:** It defaults to approximate match, frequently causing errors if the \`FALSE\` argument is omitted.

### Enter \`XLOOKUP\`:
\`\`\`excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])
\`\`\`
Example:
\`\`\`excel
=XLOOKUP("SA-10023", A2:A500, C2:C500, "Employee Not Found")
\`\`\`
It looks up the employee ID in column A, returns the salary from column C, and provides a default error-message string if missing—all securely and with exact match as the natural default.

---

## 3. Strategic Financial Modeling Takeaways
*   **Speed & Auditability:** Single-cell dynamic array formulas are 90% easier to audit. Instead of reading 1,000 formulas, you read one formula in the source cell.
*   **Performance:** Spilled ranges use significantly less memory, preventing workbook slowdowns on massive datasets.
*   **Self-Updating Dashboards:** Create live dashboards where summaries, tables, and charts adjust instantly when new transactional lines are copy-pasted into the master tab.`
    },
    {
      id: "a3",
      title: "Business Analytics Foundations: Deciphering the MBA Strategy Toolkit",
      slug: "business-analytics-foundations-deciphering-mba-strategy",
      summary: "Demystifying the critical intersection of data science metrics and classical corporate frameworks for long-term value generation.",
      category: "Business Analytics",
      date: "2026-05-12",
      readTime: "5 min read",
      sources: [
        { name: "INSEAD Strategy Frameworks", url: "https://www.insead.edu/faculty-research/academic-areas/strategy" },
        { name: "Wharton Analytics - Corporate Applications", url: "https://analytics.wharton.upenn.edu/" }
      ],
      content: `# Business Analytics Foundations: Deciphering the MBA Strategy Toolkit

Many technology specialists believe that deeper statistical analysis and machine learning models are always the solution to corporate problems. Conversely, traditional MBA strategy leaders often rely on high-level frameworks without backing their proposals with empirical data.

The highest-performing organizations exist at the intersection: **Data-Driven Strategy**.

---

## 1. Grounding Strategic Frameworks with Empirical Data

Consider **Porter's Five Forces**. A classic framework to assess market attractiveness. Without analytics, this remains a qualitative brainstorming slide. With analytics, we translate concepts into quantitative measures:

| Porter's Force | Qualitative Concept | Business Analytics Translation |
| :--- | :--- | :--- |
| **Buyer Power** | Do customers have pricing leverage? | Customer concentration index (Herfindahl-Hirschman Index), elasticity of demand. |
| **Supplier Power** | Do suppliers control costs? | Cost concentration, substitute availability correlation, supplier margin trending. |
| **Threat of Substitutes** | Are users switching away? | Cross-price elasticity of demand, customer churn telemetry. |

---

## 2. Operationalizing Lifetime Value (LTV) and CAC

In business analytics, understanding **Customer Acquisition Cost (CAC)** and **Customer Lifetime Value (LTV)** determines whether a business model is viable.

An MBA-level analysis asks:
*   How does the LTV/CAC ratio behave across marketing channels?
*   What is the payback period, and how does it affect working capital?

The statistical formula for LTV is:
$$LTV = \\frac{Average\\ Purchase\\ Value \\times Purchase\\ Frequency}{Churn\\ Rate}$$

By optimizing our data collection on purchase frequency and isolating early churn indicators, we can perform precision marketing to customers whose predicted lifetime value offsets acquisition costs by over $3x$.

### Key Takeaways
*   **Avoid the 'Analysis Paralysis' Trap:** Data without strategic framework leads to useless reports. Focus on tracking metrics that actively drive strategic actions.
*   **Executive Storytelling:** Boardrooms rarely care about root-mean-squared error (RMSE) values. Translate statistical performance into EBITDA, market share growth, and bottom-line impact.`
    }
  ],
  experiences: [
    {
      id: "e1",
      company: "Apex Strategy Group",
      role: "Lead Business Analyst",
      period: "2024 - Present",
      description: [
        "Led client engagements analyzing SaaS pricing structures, resulting in a 14% revenue lift.",
        "Built predictive models using Python and SQL to project churn behaviors for enterprise-level platforms.",
        "Created client-facing Power BI frameworks linking operational logs with financial spreadsheets."
      ],
      skills: ["Business Analytics", "SQL", "Power BI", "Corporate Strategy"]
    },
    {
      id: "e2",
      company: "InnoTech Solutions",
      role: "Consultant - Digital & Emerging Tech",
      period: "2022 - 2024",
      description: [
        "Advised Fortune 500 manufacturing firms on integrating IoT and AI into their supply chain operations.",
        "Engineered automated dynamic projection models in Microsoft Excel to model strategic capital expenditures.",
        "Conducted market research and feasibility analysis for business proposals regarding generative AI workflows."
      ],
      skills: ["Strategic Management (MBA)", "Financial Modeling & Excel", "Emerging Technologies"]
    }
  ],
  educations: [
    {
      id: "ed1",
      school: "Alliance Business School",
      degree: "MBA - Strategy & Business Analytics",
      period: "2020 - 2022",
      achievements: [
        "Graduated top 10% of the cohort with specialization in Analytics.",
        "Awarded First Prize in the Annual Business Strategy Case Competition.",
        "President of the Management Consulting and Strategy Association."
      ]
    },
    {
      id: "ed2",
      school: "State University",
      degree: "Bachelor of Science - Computer Science & Economics",
      period: "2016 - 2020",
      achievements: [
        "Dual Major focusing on econometrics and software design.",
        "Developed custom algorithmic forecasting packages as senior thesis project."
      ]
    }
  ]
};
