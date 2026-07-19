import { PortfolioData } from "../types";

export const defaultPortfolioData: PortfolioData = {
  name: "Prasad Sawant",
  title: "MBA Candidate in Business Analytics | ex-Vistra People Analytics Specialist",
  bio: "MBA Candidate in Business Analytics at SBM, NMIMS Mumbai with 35 months of professional experience in data automation, workforce planning, and business analytics. Former Associate at Vistra with a proven track record of saving 900+ hours annually through Python and Power Query automation, and designing interactive global dashboards to drive strategic enterprise decisions.",
  email: "prasad.psawant.sawant88@gmail.com",
  linkedinUrl: "https://linkedin.com/in/prasad-sawant",
  githubUrl: "https://github.com/prasad-sawant",
  twitterUrl: "https://twitter.com/prasad_sawant",
  skills: [
    {
      id: "s1",
      name: "Power BI & Power Query",
      category: "Business Analytics",
      level: "Expert",
      description: "Building interactive corporate dashboards, global HR metrics reporting, and complex automated ETL workflows."
    },
    {
      id: "s2",
      name: "Python Automation",
      category: "Business Analytics",
      level: "Expert",
      description: "Developing robust automation scripts, streamlining regional sales reporting, and customer segmentation modeling."
    },
    {
      id: "s3",
      name: "Advanced Excel & VBA",
      category: "Excel",
      level: "Expert",
      description: "Complex formulas, Power Query data transformation, custom macro workflows, and VBA report automation."
    },
    {
      id: "s4",
      name: "Relational Databases & SQL",
      category: "Business Analytics",
      level: "Advanced",
      description: "Designing database schemas with 10+ tables, optimizing complex queries, subqueries, joins, and MongoDB CRUD operations."
    },
    {
      id: "s5",
      name: "Statistical Analysis",
      category: "MBA",
      level: "Expert",
      description: "Hypothesis testing including Chi-square tests, ANOVA, Linear Regression modeling, and RFM consumer segmentation."
    },
    {
      id: "s6",
      name: "Generative AI & Data Science",
      category: "AI",
      level: "Advanced",
      description: "Leveraging machine learning models, predictive churn mapping, and advanced analytics certifications (KPMG & IBM)."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Relational Event Management Database System",
      description: "Designed a relational database schema featuring 10+ tables with fully optimized SQL queries and MongoDB integrations.",
      longDescription: "Developed a comprehensive, scalable database system to support large-scale event coordination. Established robust foreign key relationships, written advanced SQL queries utilizing complex joins, nested subqueries, and aggregations to retrieve operational statistics. Additionally, configured unstructured MongoDB collections for participant logs and automated reporting.",
      category: "Business Analytics",
      tags: ["SQL", "PostgreSQL", "Database Design", "MongoDB", "NoSQL"],
      keyDeliverables: [
        "Created an optimized database schema with 10+ relational tables and complex keys.",
        "Wrote complex aggregations and nested queries to generate event scheduling and resource reports.",
        "Created custom MongoDB CRUD operations to manage semi-structured feedback logs efficiently."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p2",
      title: "Housing Price Determinants Analysis",
      description: "Statistical modeling in Excel using Multiple Linear Regression, ANOVA, and Chi-square tests to isolate key market predictors.",
      longDescription: "Sourced, cleaned, and organized real-estate housing datasets. Conducted thorough exploratory data analysis and built interactive dashboards. Executed Chi-square tests for demographic segments, ANOVA for categorical parameters, and multiple linear regression models to isolate and evaluate prime factors driving pricing variances.",
      category: "Excel",
      tags: ["Excel", "Statistical Analysis", "ANOVA", "Regression", "Data Visualization"],
      keyDeliverables: [
        "Constructed custom dynamic Excel templates and correlation matrices to analyze market trends.",
        "Performed ANOVA and Chi-square tests to validate critical statistical dependencies.",
        "Built a predictive multiple linear regression model targeting valuation variables."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "p3",
      title: "GTM Strategy for Plant-Based Sattu Drink",
      description: "Go-to-market plan, competitive landscaping, and consumer needs assessment for launching a wellness beverage.",
      longDescription: "Analyzed consumer demand patterns and market potential for a healthy, protein-rich plant-based Sattu drink in urban markets. Evaluated competitor product maps and pricing tables, establishing a sustainable value proposition. Engineered a holistic GTM launch strategy spanning manufacturing, supply chain routes, pricing tiers, and omni-channel advertising.",
      category: "Business Analytics",
      tags: ["Marketing Management", "GTM Strategy", "Market Research", "Competitor Landscaping"],
      keyDeliverables: [
        "Formulated demographic target personas and unique brand positioning framework.",
        "Completed margin projections, production costing models, and break-even tables.",
        "Designed comprehensive multichannel launching campaigns and communication maps."
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
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
      content: `# Generative AI in Corporate Strategy: The Rise of the Synthetic Consultant\n\nThe traditional consulting toolkit is undergoing a massive transformation. For decades, strategic frameworks like Michael Porter’s Five Forces, BCG's Growth-Share Matrix, and SWOT analysis required teams of analysts spending weeks gathering data, interviewing industry participants, and consolidating slides.\n\nToday, advanced generative models act as **synthetic consultants**, capable of generating preliminary market studies, competitive maps, and strategic alternatives in seconds. This shift does not eliminate the strategist; instead, it elevates their role from compiler to critical evaluator.\n\n---\n\n## 1. Speed-to-Insight: Redefining Strategic Speed\n\nBy leveraging API-driven Large Language Models (LLMs), businesses can instantly generate detailed competitive intelligence analyses.\n\n### Traditional Research vs. AI-Assisted Strategy\n*   **Traditional Path:** Define scope ➔ manual secondary research ➔ schedule stakeholder interviews ➔ consolidate insights (Duration: 3-4 Weeks).\n*   **Synthetic Path:** Input target sector and parameters ➔ LLM searches/synthesizes known facts ➔ provides structured thematic gaps and regulatory overviews (Duration: 3 Minutes).\n\nThe key value driver here is **cognitive diversity**. Instead of analyzing the top three obvious strategic directions, corporate development teams can now prompt the model to explore "black swan" scenarios or non-obvious adjacent markets.\n\n---\n\n## 2. Dynamic SWOT & Competitive Mapping\n\nConsider a scenario where an enterprise wants to evaluate a potential entry into the premium electric vehicle charging space. An LLM can instantly compile:\n1.  **Barriers to Entry:** Regulatory approvals, grid capacity constraints, capital expenditures.\n2.  **Strategic Gaps:** Current players' lack of integrated lounge spaces or loyalty models.\n\n### Example Framework: Strategic Risk Analysis\n*   *Regulatory:* Rapidly changing municipal electrical standards.\n*   *Technological:* Transition from current standard plugs to next-generation ultra-fast solid-state tech.\n*   *Financial:* Long payback period offset by green energy tax subsidies.\n\n---\n\n## 3. The Future: Multi-Agent Consensus Forums\n\nWe are moving past single-prompt answers. The next wave of strategic planning involves **Multi-Agent Systems**. By simulating virtual executives—an AI "CFO" focused purely on financial metrics, an AI "CMO" prioritizing brand equity, and an AI "COO" optimizing supply chains—corporate leaders can stress-test decisions within simulated boardroom environments before executing.\n\n### Key Takeaways\n*   **Augmentation over Replacement:** AI accelerates research by 80%, leaving strategic judgment, relationship management, and execution to human leaders.\n*   **Framework Prototyping:** Instantly model diverse strategic scenarios to identify fatal flaws early in the business cycle.\n*   **Data Integrity is Paramount:** Successful strategic generation relies heavily on high-quality input data and robust proprietary context.`
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
      content: `# Modern Excel: Moving from VLOOKUP to Dynamic Array Formula Paradigms\n\nFor over two decades, the strength of an analyst was measured by their mastery of the \`VLOOKUP\` and \`INDEX/MATCH\` functions. However, Microsoft’s release of the modern calculation engine completely reimagined how formulas interact with cells. \n\nIf you are still copying formulas down a column of 10,000 rows, it’s time to upgrade your workflow to **Dynamic Arrays** and single-cell \"spill\" architectures.\n\n---\n\n## 1. The Power of \"Spill\" (The Hash \`#\` Operator)\n\nIn legacy Excel, every cell calculated independently. If you wanted to filter a dataset, you had to write a formula in the first cell, copy it down, and hope you dragged it far enough. \n\nWith dynamic arrays, a formula written in a single cell can return a whole range of values that automatically \"spill\" into adjacent cells.\n\n### Key Example: The \`FILTER\` Function\nInstead of complex VLOOKUP tables or manual filters:\n\`\`\`excel\n=FILTER(A2:C100, B2:B100 = \"Consulting\", \"No Records Found\")\n\`\`\`\nThis single formula extracts all records where the department is \"Consulting\", spilling the rows down and columns across automatically. If you reference this spilled output in another formula, you simply use the **Spill Operator** (\`#\`):\n\`\`\`excel\n=SUM(D2#)\n\`\`\`\nIf the filtered range grows from 5 to 50 rows, \`SUM(D2#)\` automatically adjusts its range. No manual editing required.\n\n---\n\n## 2. XLOOKUP: The Ultimate Upgrade\n\nLet's address the fundamental flaws of legacy \`VLOOKUP\`:\n1.  **Leftward Lookups:** It can only look from left to right.\n2.  **Column Indexes:** If you insert a column, your column index breaks, returning garbage data.\n3.  **Exact Match Default:** It defaults to approximate match, frequently causing errors if the \`FALSE\` argument is omitted.\n\n### Enter \`XLOOKUP\`:\n\`\`\`excel\n=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])\n\`\`\`\nExample:\n\`\`\`excel\n=XLOOKUP(\"SA-10023\", A2:A500, C2:C500, \"Employee Not Found\")\n\`\`\`\nIt looks up the employee ID in column A, returns the salary from column C, and provides a default error-message string if missing—all securely and with exact match as the natural default.\n\n---\n\n## 3. Strategic Financial Modeling Takeaways\n*   **Speed & Auditability:** Single-cell dynamic array formulas are 90% easier to audit. Instead of reading 1,000 formulas, you read one formula in the source cell.\n*   **Performance:** Spilled ranges use significantly less memory, preventing workbook slowdowns on massive datasets.\n*   **Self-Updating Dashboards:** Create live dashboards where summaries, tables, and charts adjust instantly when new transactional lines are copy-pasted into the master tab.`
    }
  ],
  experiences: [
    {
      id: "e1",
      company: "Vistra",
      role: "Associate - People & Organization Analytics",
      period: "Jan 2023 – Jun 2025 (30 months)",
      description: [
        "Automated 13 monthly HR reports with Power Query & Python, saving 300+ hours annually.",
        "Built and deployed 8 HR metric dashboards in Power BI to support data-driven decisions across global teams.",
        "Designed middleware to consolidate payroll files from 47 countries, reducing manual effort by 600+ hours annually.",
        "Delivered critical workforce insights by analyzing attrition, exit trends, and headcount for strategic planning."
      ],
      skills: ["Power Query", "Python Automation", "Power BI Dashboards", "Workforce Planning", "People Analytics"]
    },
    {
      id: "e2",
      company: "Aspri Spirits",
      role: "MIS Executive",
      period: "Jun 2022 – Jan 2023 (8 months)",
      description: [
        "Streamlined sales reporting for Western India using Python automation, reducing manual errors and turnaround time.",
        "Created interactive dashboards in Power BI to track KPIs, sales trends, and location-based performance.",
        "Applied RFM (Recency, Frequency, Monetary) analysis to segment customer bases and optimize targeted marketing campaigns."
      ],
      skills: ["Python Automation", "Power BI Dashboards", "RFM Analysis", "Sales Reporting"]
    },
    {
      id: "e3",
      company: "Aspri Spirits",
      role: "MIS Intern",
      period: "Mar 2022 – Jun 2022 (4 months)",
      description: [
        "Automated distributor-to-company sales report conversions, significantly improving accuracy and efficiency.",
        "Supported generation of regional sales and operations reports for Western India performance monitoring."
      ],
      skills: ["Report Automation", "Data Processing", "Excel Templates"]
    }
  ],
  educations: [
    {
      id: "ed1",
      school: "SBM, NMIMS, Mumbai",
      degree: "MBA in Business Analytics",
      period: "2025 – 2027",
      achievements: [
        "Focusing on advanced database systems, predictive modeling, statistical inference, and strategic management.",
        "Junior Member of Mantavya (NMIMS, Mumbai): Planned and executed 7+ events with 900+ participants, designed 20+ creatives, and assisted in 6+ sponsorship drives."
      ]
    },
    {
      id: "ed2",
      school: "GVAIET, University of Mumbai, Karjat",
      degree: "B.E. Mechanical Engineering",
      period: "2015 – 2019",
      achievements: [
        "Graduated with a CGPA of 7.75/10.",
        "Deep foundation in quantitative methods, physical systems modeling, and mechanical design principles."
      ]
    },
    {
      id: "ed3",
      school: "Chandrabhan Sharma College, Mumbai",
      degree: "Higher Secondary School Certificate (State Board: 72%)",
      period: "2015",
      achievements: [
        "Graduated from Maharashtra State Board with 72% overall score."
      ]
    },
    {
      id: "ed4",
      school: "GSMS, Mumbai",
      degree: "Secondary School Certificate (State Board: 85.82%)",
      period: "2013",
      achievements: [
        "Graduated from Maharashtra State Board with 85.82% overall score."
      ]
    }
  ]
};
