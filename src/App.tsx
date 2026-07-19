import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  BookOpen, 
  Settings, 
  Download, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Tag, 
  Cpu, 
  TrendingUp, 
  BarChart, 
  Save, 
  FileDown, 
  X, 
  FileCode, 
  Check, 
  RotateCcw, 
  Info, 
  Layers,
  FileEdit,
  Globe,
  Upload,
  FileSpreadsheet,
  Target,
  ArrowRight,
  Bell,
  Headphones,
  LogIn,
  Grid,
  MessageSquare,
  User,
  Heart
} from "lucide-react";
import { defaultPortfolioData } from "./data/portfolio";
import { PortfolioData, Article, Project, Skill, Experience, Education, CategoryType } from "./types";

// A robust, clean, high-performance in-app Markdown parser for elegant presentation
function MarkdownView({ content }: { content: string }) {
  const lines = content.split("\n");
  let inList = false;
  const renderedElements: React.ReactNode[] = [];

  const parseInlineMarkdown = (text: string) => {
    // Escape simple characters, handle bold **text**
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-bold text-slate-950 dark:text-white">{part}</strong>;
      }
      // Handle inline code `code`
      const codeParts = part.split(/`(.*?)`/g);
      return codeParts.map((subPart, subIndex) => {
        if (subIndex % 2 === 1) {
          return (
            <code key={subIndex} className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono font-medium">
              {subPart}
            </code>
          );
        }
        return subPart;
      });
    });
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("# ")) {
      if (inList) { inList = false; }
      renderedElements.push(
        <h1 key={i} className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight border-b border-slate-100 pb-2">
          {parseInlineMarkdown(trimmed.substring(2))}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      if (inList) { inList = false; }
      renderedElements.push(
        <h2 key={i} className="text-2xl font-bold text-slate-800 mt-6 mb-3 tracking-tight">
          {parseInlineMarkdown(trimmed.substring(3))}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      if (inList) { inList = false; }
      renderedElements.push(
        <h3 key={i} className="text-xl font-bold text-slate-800 mt-5 mb-2">
          {parseInlineMarkdown(trimmed.substring(4))}
        </h3>
      );
    }
    // Blockquotes
    else if (trimmed.startsWith("> ")) {
      if (inList) { inList = false; }
      renderedElements.push(
        <blockquote key={i} className="border-l-4 border-indigo-500 bg-slate-50 pl-4 py-3 pr-2 my-4 rounded-r italic text-slate-700">
          {parseInlineMarkdown(trimmed.substring(2))}
        </blockquote>
      );
    }
    // Bullet Lists
    else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      if (!inList) {
        inList = true;
      }
      renderedElements.push(
        <li key={i} className="ml-6 list-disc text-slate-600 mb-2 leading-relaxed">
          {parseInlineMarkdown(trimmed.substring(2))}
        </li>
      );
    }
    // Table rows support
    else if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (inList) { inList = false; }
      const cells = trimmed.split("|").map(c => c.trim()).filter(c => c !== "");
      // Skip alignment lines like :--- or ---
      if (cells.some(c => c.includes("---"))) {
        return;
      }
      renderedElements.push(
        <div key={i} className="grid grid-cols-3 gap-4 border-b border-slate-100 py-2.5 px-3 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          {cells.map((cell, idx) => (
            <span key={idx} className={`text-sm ${idx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
              {parseInlineMarkdown(cell)}
            </span>
          ))}
        </div>
      );
    }
    // Code blocks
    else if (trimmed.startsWith("```")) {
      if (inList) { inList = false; }
      // Simply ignore the block tag but handle spacing, or format container in next lines
    }
    // Empty line
    else if (trimmed === "") {
      if (inList) { inList = false; }
      renderedElements.push(<div key={i} className="h-3" />);
    }
    // Standard paragraphs
    else {
      if (inList) {
        // Continue lists if spacing exists, but standard text ends lists
        inList = false;
      }
      renderedElements.push(
        <p key={i} className="text-slate-600 mb-4 leading-relaxed text-[16px]">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  return <div className="prose max-w-none text-slate-800">{renderedElements}</div>;
}

const getFilearnTagStyle = (tag: string, index: number) => {
  const styles = [
    { bg: "bg-[#FFF0ED]", text: "text-[#F05022]", border: "border-[#FFF0ED]" }, // Orange
    { bg: "bg-[#F4EBFF]", text: "text-[#7F56D9]", border: "border-[#F4EBFF]" }, // Purple
    { bg: "bg-[#E6F9F6]", text: "text-[#0D9488]", border: "border-[#E6F9F6]" }, // Teal
    { bg: "bg-[#E6F4EA]", text: "text-[#137333]", border: "border-[#E6F4EA]" }, // Green
    { bg: "bg-[#FEF6E0]", text: "text-[#B45309]", border: "border-[#FEF6E0]" }, // Amber
  ];
  return styles[index % styles.length];
};

export default function App() {
  // Load data from localStorage or initial defaults
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem("prasad_portfolio_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved portfolio data, resetting to default", e);
      }
    }
    return defaultPortfolioData;
  });

  // Save updates to localStorage on change
  useEffect(() => {
    localStorage.setItem("prasad_portfolio_data", JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Tab State
  const [activeTab, setActiveTab] = useState<"portfolio" | "projects" | "blog" | "cms">("projects");

  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loginEmail, setLoginEmail] = useState(() => localStorage.getItem("prasad_portfolio_loginEmail") || "");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("prasad_portfolio_isLoggedIn") === "true");
  const [loginError, setLoginError] = useState("");

  const isOwner = isLoggedIn && loginEmail.trim().toLowerCase() === "prasad.psawant.sawant88@gmail.com";

  useEffect(() => {
    localStorage.setItem("prasad_portfolio_loginEmail", loginEmail);
    localStorage.setItem("prasad_portfolio_isLoggedIn", isLoggedIn ? "true" : "false");
  }, [loginEmail, isLoggedIn]);

  useEffect(() => {
    if (activeTab === "cms" && !isOwner) {
      setActiveTab("projects");
    }
  }, [activeTab, isOwner]);

  // Selected details
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter States
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [projectCategory, setProjectCategory] = useState<CategoryType | "All">("All");
  const [blogCategory, setBlogCategory] = useState<CategoryType | "All">("All");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // CMS States
  const [cmsTab, setCmsTab] = useState<"profile" | "skills" | "projects" | "articles" | "export">("profile");
  
  // CMS Form States - Skill Edit
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({ name: "", category: "Business Analytics", level: "Intermediate", description: "" });
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  // CMS Form States - Project Edit
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: "",
    description: "",
    longDescription: "",
    category: "AI",
    tags: [],
    keyDeliverables: [],
    liveUrl: "",
    githubUrl: "",
    thumbnailUrl: ""
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [deliverableInput, setDeliverableInput] = useState("");

  // CMS Form States - Article Edit (Manual)
  const [articleForm, setArticleForm] = useState<Partial<Article>>({
    title: "",
    summary: "",
    content: "",
    category: "AI",
    sources: []
  });
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [sourceNameInput, setSourceNameInput] = useState("");
  const [sourceUrlInput, setSourceUrlInput] = useState("");

  // AI Generation States
  const [aiTopic, setAiTopic] = useState("");
  const [aiCategory, setAiCategory] = useState<CategoryType>("AI");
  const [aiTone, setAiTone] = useState("professional, insightful, with concrete examples");
  const [aiKeywords, setAiKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [aiError, setAiError] = useState("");

  // AI Enhance States
  const [enhanceInstructions, setEnhanceInstructions] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);

  // JSON Upload State
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Categories helper
  const categories: CategoryType[] = ["AI", "Excel", "Business Analytics", "MBA", "Emerging Tech", "General"];

  // Handle Profile Update
  const handleProfileUpdate = (field: keyof PortfolioData, value: string) => {
    setPortfolioData(prev => ({ ...prev, [field]: value }));
  };

  // Reset to static seed default
  const handleResetToDefaults = () => {
    if (confirm("Are you sure you want to reset all modifications back to the default original portfolio template? Your local changes will be overwritten.")) {
      setPortfolioData(defaultPortfolioData);
      localStorage.setItem("prasad_portfolio_data", JSON.stringify(defaultPortfolioData));
      alert("Reset completed successfully.");
    }
  };

  // Skills CRUD
  const saveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) return;

    if (editingSkillId) {
      setPortfolioData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === editingSkillId ? { ...s, ...skillForm } as Skill : s)
      }));
      setEditingSkillId(null);
    } else {
      const newSkill: Skill = {
        id: "skill_" + Date.now(),
        name: skillForm.name,
        category: skillForm.category as CategoryType,
        level: skillForm.level as any,
        description: skillForm.description
      };
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
    }
    setSkillForm({ name: "", category: "Business Analytics", level: "Intermediate", description: "" });
  };

  const deleteSkill = (id: string) => {
    if (confirm("Delete this skill?")) {
      setPortfolioData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.id !== id)
      }));
    }
  };

  // Projects CRUD
  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    if (editingProjectId) {
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === editingProjectId ? { ...p, ...projectForm } as Project : p)
      }));
      setEditingProjectId(null);
    } else {
      const newProject: Project = {
        id: "proj_" + Date.now(),
        title: projectForm.title,
        description: projectForm.description,
        longDescription: projectForm.longDescription || projectForm.description,
        category: projectForm.category as CategoryType,
        tags: projectForm.tags || [],
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        keyDeliverables: projectForm.keyDeliverables || [],
        thumbnailUrl: projectForm.thumbnailUrl || ""
      };
      setPortfolioData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject]
      }));
    }
    setProjectForm({
      title: "",
      description: "",
      longDescription: "",
      category: "AI",
      tags: [],
      keyDeliverables: [],
      liveUrl: "",
      githubUrl: "",
      thumbnailUrl: ""
    });
    setTagInput("");
    setDeliverableInput("");
  };

  const deleteProject = (id: string) => {
    if (confirm("Delete this project?")) {
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    }
  };

  // Add Tag to project form
  const addTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = projectForm.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      setProjectForm(prev => ({ ...prev, tags: [...currentTags, tagInput.trim()] }));
    }
    setTagInput("");
  };

  const removeTag = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      tags: (prev.tags || []).filter((_, idx) => idx !== index)
    }));
  };

  // Add Deliverable to project form
  const addDeliverable = () => {
    if (!deliverableInput.trim()) return;
    const currentDelivs = projectForm.keyDeliverables || [];
    setProjectForm(prev => ({ ...prev, keyDeliverables: [...currentDelivs, deliverableInput.trim()] }));
    setDeliverableInput("");
  };

  const removeDeliverable = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      keyDeliverables: (prev.keyDeliverables || []).filter((_, idx) => idx !== index)
    }));
  };

  // Articles CRUD
  const saveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.content) return;

    const slug = (articleForm.title || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const wordsCount = (articleForm.content || "").trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

    if (editingArticleId) {
      setPortfolioData(prev => ({
        ...prev,
        articles: prev.articles.map(a => a.id === editingArticleId ? { 
          ...a, 
          ...articleForm, 
          slug, 
          readTime 
        } as Article : a)
      }));
      setEditingArticleId(null);
    } else {
      const newArticle: Article = {
        id: "art_" + Date.now(),
        title: articleForm.title,
        slug,
        summary: articleForm.summary || (articleForm.content.substring(0, 150) + "..."),
        content: articleForm.content,
        category: articleForm.category as CategoryType,
        date: new Date().toISOString().split("T")[0],
        readTime,
        sources: articleForm.sources || []
      };
      setPortfolioData(prev => ({
        ...prev,
        articles: [newArticle, ...prev.articles]
      }));
    }

    setArticleForm({
      title: "",
      summary: "",
      content: "",
      category: "AI",
      sources: []
    });
    setSourceNameInput("");
    setSourceUrlInput("");
  };

  const deleteArticle = (id: string) => {
    if (confirm("Delete this article?")) {
      setPortfolioData(prev => ({
        ...prev,
        articles: prev.articles.filter(a => a.id !== id)
      }));
    }
  };

  // Add Source to article form
  const addSource = () => {
    if (!sourceNameInput.trim()) return;
    const currentSources = articleForm.sources || [];
    setArticleForm(prev => ({
      ...prev,
      sources: [...currentSources, { name: sourceNameInput.trim(), url: sourceUrlInput.trim() || "#" }]
    }));
    setSourceNameInput("");
    setSourceUrlInput("");
  };

  const removeSource = (index: number) => {
    setArticleForm(prev => ({
      ...prev,
      sources: (prev.sources || []).filter((_, idx) => idx !== index)
    }));
  };

  // Handle AI draft generation
  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsGenerating(true);
    setAiError("");
    setGeneratedDraft("");

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic: aiTopic,
          category: aiCategory,
          tone: aiTone,
          keywords: aiKeywords ? aiKeywords.split(",").map(k => k.trim()) : []
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate draft. Ensure server is active and API key is set.");
      }

      setGeneratedDraft(data.content);
      // Pre-fill the standard article form with the generated draft
      setArticleForm({
        title: aiTopic,
        summary: `An insightful analytical piece discussing key trends, strategies, and methodologies around ${aiTopic}.`,
        content: data.content,
        category: aiCategory,
        sources: [
          { name: "Gemini AI Synthesis", url: "https://ai.google.dev" }
        ]
      });
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "An unexpected error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle AI draft enhancement
  const handleAiEnhance = async () => {
    const contentToEnhance = articleForm.content;
    if (!contentToEnhance) {
      alert("Please provide content to enhance or generate a draft first.");
      return;
    }

    setIsEnhancing(true);
    setAiError("");

    try {
      const response = await fetch("/api/gemini/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          currentContent: contentToEnhance,
          instructions: enhanceInstructions
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance content.");
      }

      setArticleForm(prev => ({
        ...prev,
        content: data.content
      }));
      setEnhanceInstructions("");
      alert("Draft enhanced successfully!");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "An unexpected error occurred during enhancement.");
    } finally {
      setIsEnhancing(false);
    }
  };

  // Download entire portfolio configuration as portfolio-data.json
  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy dynamic JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2));
    alert("Portfolio configuration copied to clipboard! You can paste it directly into your local configuration file.");
  };

  // Upload custom JSON config
  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadSuccess(false);

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        
        // Quick structural check
        if (typeof parsed.name === 'string' && Array.isArray(parsed.skills) && Array.isArray(parsed.projects) && Array.isArray(parsed.articles)) {
          setPortfolioData(parsed);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 5000);
        } else {
          setUploadError("Invalid format. The JSON file must match the standard portfolio structure (containing keys: name, skills, projects, articles).");
        }
      } catch (err) {
        setUploadError("Failed to parse JSON file. Ensure it is a valid JSON configuration.");
      }
    };
    fileReader.readAsText(file);
  };

  // Filters calculation
  const filteredProjects = portfolioData.projects.filter(p => {
    if (projectCategory === "All") return true;
    return p.category === projectCategory;
  });

  const filteredArticles = portfolioData.articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                          a.content.toLowerCase().includes(blogSearchQuery.toLowerCase());
    const matchesCategory = blogCategory === "All" || a.category === blogCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-editorial-bg text-[#131313] font-sans flex flex-col selection:bg-filearn-orange/20 selection:text-editorial-dark">
      
      {/* Filearn Premium Top Navigation Bar */}
      <nav className="bg-[#FAF9F5]/90 backdrop-blur-md border-b-2 border-[#131313] sticky top-0 z-40 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo with custom smiley face */}
          <div 
            onClick={() => { setActiveTab("projects"); setSelectedProject(null); setSelectedArticle(null); }}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="relative w-9 h-9 flex items-center justify-center bg-[#131313] rounded-full border border-[#131313] transition-transform duration-300 group-hover:scale-105 shadow-[2.5px_2.5px_0px_0px_#F05022]">
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Orange/Red Eye */}
                <circle cx="16" cy="8" r="2.2" fill="#F05022" />
                {/* White Smile Curve */}
                <path d="M 6,13 Q 12,19 18,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#131313] font-sans leading-none">Read Lite</span>
              <span className="text-[8.5px] text-neutral-500 font-bold tracking-widest font-mono uppercase mt-1">BY PRASAD SAWANT</span>
            </div>
          </div>

          {/* Navigation Links in the Middle */}
          <div className="hidden lg:flex items-center gap-8 font-sans font-bold text-[13px] tracking-wide text-[#131313]">
            <button 
              onClick={() => { setActiveTab("projects"); setSelectedProject(null); setSelectedArticle(null); }}
              className={`hover:text-filearn-orange transition-colors relative py-1 cursor-pointer uppercase ${activeTab === "projects" ? "text-filearn-orange" : ""}`}
            >
              Projects
              {activeTab === "projects" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-filearn-orange rounded-full animate-fade-in"></span>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab("blog"); setSelectedProject(null); setSelectedArticle(null); }}
              className={`hover:text-filearn-purple transition-colors relative py-1 cursor-pointer uppercase ${activeTab === "blog" ? "text-filearn-purple" : ""}`}
            >
              Articles
              {activeTab === "blog" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-filearn-purple rounded-full animate-fade-in"></span>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab("portfolio"); setSelectedProject(null); setSelectedArticle(null); }}
              className={`hover:text-[#14B8A6] transition-colors relative py-1 cursor-pointer uppercase ${activeTab === "portfolio" ? "text-[#14B8A6]" : ""}`}
            >
              FAQ's & Bio
              {activeTab === "portfolio" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#14B8A6] rounded-full animate-fade-in"></span>
              )}
            </button>
            {isOwner && (
              <button 
                onClick={() => { 
                  setActiveTab("cms"); 
                  setSelectedProject(null); 
                  setSelectedArticle(null); 
                }}
                className={`hover:text-[#FACC15] transition-colors relative py-1 cursor-pointer uppercase ${activeTab === "cms" ? "text-[#FACC15]" : ""}`}
              >
                Content Studio
                {activeTab === "cms" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FACC15] rounded-full animate-fade-in"></span>
                )}
              </button>
            )}
          </div>

          {/* Right hand controls (Login/Logout & Content Studio Shortcut) */}
          <div className="flex items-center gap-3 md:gap-5">
            {isLoggedIn && isOwner ? (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">Logged in</span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="text-xs uppercase tracking-wider font-extrabold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-xs uppercase tracking-wider font-extrabold text-[#131313] hover:text-filearn-orange transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LogIn size={13} />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {isOwner && (
              <button 
                onClick={() => { 
                  setActiveTab("cms"); 
                  setSelectedProject(null); 
                  setSelectedArticle(null); 
                }}
                className="bg-[#131313] hover:bg-filearn-orange hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 border-[#131313] shadow-[3px_3px_0px_0px_rgba(19,19,19,1)] cursor-pointer flex items-center gap-1.5"
              >
                <Settings size={12} />
                <span>Content Studio</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile quick navigation overlay bar */}
        <div className="lg:hidden flex justify-center items-center gap-5 border-t border-[#131313]/10 mt-3 pt-3 font-sans font-bold text-[11px] uppercase tracking-wider text-[#131313]/70">
          <button 
            onClick={() => { setActiveTab("projects"); setSelectedProject(null); setSelectedArticle(null); }}
            className={`hover:text-filearn-orange ${activeTab === "projects" ? "text-filearn-orange underline" : ""}`}
          >
            Projects
          </button>
          <button 
            onClick={() => { setActiveTab("blog"); setSelectedProject(null); setSelectedArticle(null); }}
            className={`hover:text-filearn-purple ${activeTab === "blog" ? "text-filearn-purple underline" : ""}`}
          >
            Articles
          </button>
          <button 
            onClick={() => { setActiveTab("portfolio"); setSelectedProject(null); setSelectedArticle(null); }}
            className={`hover:text-[#14B8A6] ${activeTab === "portfolio" ? "text-[#14B8A6] underline" : ""}`}
          >
            Bio
          </button>
          {isOwner && (
            <button 
              onClick={() => { 
                setActiveTab("cms"); 
                setSelectedProject(null); 
                setSelectedArticle(null); 
              }}
              className={`hover:text-[#FACC15] ${activeTab === "cms" ? "text-[#FACC15] underline" : ""}`}
            >
              Studio
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">

        {/* Global Multi-Index Search Engine */}
        <div id="global-search-container" className="mb-10 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={15} className="text-editorial-dark/40 group-focus-within:text-editorial-dark transition-colors" />
            </div>
            <input 
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search across index (e.g. LLMs, LBO, Excel, prompt modeling, strategic brief)..."
              className="w-full bg-white border border-editorial-dark/15 hover:border-editorial-dark/35 focus:border-editorial-dark focus:ring-1 focus:ring-editorial-dark/10 pl-10 pr-10 py-3 rounded-sm text-xs font-mono tracking-wide placeholder-editorial-dark/40 shadow-xs transition-all focus:outline-hidden"
            />
            {globalSearchQuery && (
              <button 
                onClick={() => setGlobalSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-editorial-dark/45 hover:text-editorial-dark transition-colors"
                title="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Unified Dynamic Real-Time Index Results */}
          {globalSearchQuery.trim() !== "" && (
            <div className="mt-4 bg-white border border-editorial-dark/20 p-6 shadow-md rounded-sm animate-fade-in relative z-30">
              <div className="flex items-center justify-between border-b border-editorial-dark/15 pb-2.5 mb-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-editorial-dark flex items-center gap-1.5">
                  <BookOpen size={12} className="text-editorial-dark/60" /> Dynamic Search Results
                </h3>
                <span className="text-[10px] font-mono font-bold text-editorial-dark/50 uppercase">
                  {(
                    portfolioData.articles.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.content.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())).length +
                    portfolioData.projects.filter(p => p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.longDescription.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))).length +
                    portfolioData.skills.filter(s => s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.category.toLowerCase().includes(globalSearchQuery.toLowerCase())).length
                  )} matches found
                </span>
              </div>

              {/* Matching Projects */}
              {portfolioData.projects.filter(p => 
                p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                p.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                p.longDescription.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))
              ).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm inline-block mb-2.5">
                    Projects ({portfolioData.projects.filter(p => p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.longDescription.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))).length})
                  </h4>
                  <div className="space-y-2">
                    {portfolioData.projects.filter(p => 
                      p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                      p.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                      p.longDescription.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                      p.tags.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))
                    ).map(p => (
                      <div 
                        key={p.id}
                        onClick={() => { setSelectedProject(p); setActiveTab("projects"); setGlobalSearchQuery(""); }}
                        className="p-3 bg-editorial-muted hover:bg-editorial-accent rounded-sm border border-editorial-dark/5 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div>
                          <h5 className="text-xs font-serif italic font-bold text-editorial-dark group-hover:underline leading-tight">{p.title}</h5>
                          <p className="text-[11px] text-editorial-dark/70 truncate max-w-md mt-0.5">{p.description}</p>
                        </div>
                        <ArrowUpRight size={13} className="text-editorial-dark/40 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Strategic Articles */}
              {portfolioData.articles.filter(a => 
                a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                a.content.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                a.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())
              ).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm inline-block mb-2.5">
                    Strategic Articles ({portfolioData.articles.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.content.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())).length})
                  </h4>
                  <div className="space-y-2">
                    {portfolioData.articles.filter(a => 
                      a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                      a.content.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                      a.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())
                    ).map(a => (
                      <div 
                        key={a.id}
                        onClick={() => { setSelectedArticle(a); setActiveTab("blog"); setGlobalSearchQuery(""); }}
                        className="p-3 bg-editorial-muted hover:bg-editorial-accent rounded-sm border border-editorial-dark/5 flex items-center justify-between cursor-pointer group transition-colors"
                      >
                        <div>
                          <h5 className="text-xs font-serif italic font-bold text-editorial-dark group-hover:underline leading-tight">{a.title}</h5>
                          <p className="text-[11px] text-editorial-dark/70 truncate max-w-md mt-0.5">{a.summary}</p>
                        </div>
                        <ArrowUpRight size={13} className="text-editorial-dark/40 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Skills */}
              {portfolioData.skills.filter(s => 
                s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                s.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                s.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
              ).length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm inline-block mb-2.5">
                    Expertise Matrix ({portfolioData.skills.filter(s => s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.category.toLowerCase().includes(globalSearchQuery.toLowerCase())).length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {portfolioData.skills.filter(s => 
                      s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                      s.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                      s.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
                    ).map(s => (
                      <div 
                        key={s.id}
                        onClick={() => { setActiveTab("portfolio"); setGlobalSearchQuery(""); }}
                        className="p-3 bg-editorial-muted hover:bg-editorial-accent rounded-sm border border-editorial-dark/5 flex flex-col cursor-pointer transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-serif italic font-bold text-editorial-dark">{s.name}</span>
                          <span className="text-[9px] font-mono text-editorial-dark/55">{s.level}</span>
                        </div>
                        <span className="text-[9px] text-editorial-dark/50 uppercase font-mono mt-0.5">{s.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Fallback */}
              {portfolioData.projects.filter(p => p.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.longDescription.toLowerCase().includes(globalSearchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))).length === 0 &&
               portfolioData.articles.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.content.toLowerCase().includes(globalSearchQuery.toLowerCase()) || a.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())).length === 0 &&
               portfolioData.skills.filter(s => s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) || s.category.toLowerCase().includes(globalSearchQuery.toLowerCase())).length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-xs text-editorial-dark/50 italic font-serif">No indexed content matches your query.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================== TAB: PORTFOLIO & RESUME ==================== */}
        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bio, Profile Details, and Skills Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Bio Card */}
              <div id="bio-card" className="bg-white p-8 rounded-sm border border-editorial-dark/10 shadow-xs">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-editorial-dark mb-4 pb-2 border-b border-editorial-dark/10 flex items-center gap-2">
                  <Layers size={14} className="text-editorial-dark/70" /> Executive Summary
                </h3>
                <p className="text-editorial-dark/80 text-sm leading-relaxed mb-6 font-serif italic whitespace-pre-line">
                  "{portfolioData.bio || "No professional biography has been written yet. Edit it inside the Content Manager."}"
                </p>
                <div className="pt-4 border-t border-editorial-dark/10 space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-editorial-dark/50">PRIMARY FOCUS</span>
                    <span className="text-editorial-dark font-bold">ANALYTICS & AI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-editorial-dark/50">CREDENTIALS</span>
                    <span className="text-editorial-dark font-bold">MBA (STRATEGY)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-editorial-dark/50">AVAILABILITY</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ACTIVE FOR CONSULT
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div id="skills-card" className="bg-[#F1EEE6] p-8 rounded-sm border border-editorial-dark/10 shadow-xs">
                <div className="flex items-center justify-between border-b border-editorial-dark/10 pb-2 mb-4">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-editorial-dark flex items-center gap-2">
                    <Code size={14} className="text-editorial-dark/70" /> Expertise Matrix
                  </h3>
                  {isOwner && (
                    <button 
                      onClick={() => { setActiveTab("cms"); setCmsTab("skills"); }}
                      className="text-[10px] text-editorial-dark/60 hover:text-editorial-dark font-bold uppercase tracking-widest flex items-center gap-0.5"
                    >
                      Edit <ArrowUpRight size={10} />
                    </button>
                  )}
                </div>

                {portfolioData.skills.length === 0 ? (
                  <p className="text-editorial-dark/50 text-xs py-4 text-center italic">No skills listed yet.</p>
                ) : (
                  <div className="space-y-4">
                    {portfolioData.skills.map(skill => (
                      <div key={skill.id} className="group pb-3 last:pb-0 border-b last:border-0 border-editorial-dark/10">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-bold text-editorial-dark text-sm font-serif italic">{skill.name}</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-editorial-dark/20 bg-white/50 text-editorial-dark">
                            {skill.level}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-editorial-dark/60 uppercase tracking-wider">
                          {skill.category}
                        </span>
                        {skill.description && (
                          <p className="text-xs text-editorial-dark/70 mt-1 leading-relaxed italic">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Experience & Education Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Professional Experience Panel */}
              <div id="experience-panel" className="bg-white p-8 rounded-sm border border-editorial-dark/10 shadow-xs">
                <h3 className="text-xl font-serif italic font-bold text-editorial-dark border-b border-editorial-dark/10 pb-3 mb-6 flex items-center gap-2">
                  <Briefcase size={18} className="text-editorial-dark/80" /> Career Milestones & Operations
                </h3>

                <div className="relative border-l border-editorial-dark/10 pl-6 ml-2 space-y-8">
                  {portfolioData.experiences.map((exp) => (
                    <div key={exp.id} className="relative group">
                      {/* Timeline dot accent */}
                      <span className="absolute -left-[31px] top-1.5 bg-editorial-dark border-4 border-white w-4 h-4 rounded-full group-hover:bg-editorial-dark transition-colors"></span>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h4 className="font-serif italic font-bold text-editorial-dark text-lg group-hover:underline decoration-editorial-dark/30 transition-all">
                            {exp.role}
                          </h4>
                          <span className="text-xs uppercase tracking-wider font-bold text-editorial-dark/60">{exp.company}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-editorial-dark/70 bg-editorial-muted border border-editorial-dark/10 px-2.5 py-1 rounded-sm self-start sm:self-center">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-1.5 mb-3 text-editorial-dark/80 text-sm list-disc pl-4 leading-relaxed font-serif italic">
                        {exp.description.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Associated Skills tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((s, idx) => (
                          <span key={idx} className="text-[10px] font-mono font-medium text-editorial-dark/70 bg-editorial-muted border border-editorial-dark/10 px-2 py-0.5 rounded-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Education Panel */}
              <div id="education-panel" className="bg-white p-8 rounded-sm border border-editorial-dark/10 shadow-xs">
                <h3 className="text-xl font-serif italic font-bold text-editorial-dark border-b border-editorial-dark/10 pb-3 mb-6 flex items-center gap-2">
                  <GraduationCap size={18} className="text-editorial-dark/80" /> Academic & Corporate Credentials
                </h3>

                <div className="space-y-6">
                  {portfolioData.educations.map((edu) => (
                    <div key={edu.id} className="border-l border-editorial-dark/20 pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div>
                          <h4 className="font-serif italic font-bold text-editorial-dark text-base">{edu.degree}</h4>
                          <span className="text-xs font-bold uppercase tracking-wider text-editorial-dark/60">{edu.school}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-editorial-dark/70 bg-editorial-muted border border-editorial-dark/10 px-2.5 py-1 rounded-sm self-start sm:self-center">
                          {edu.period}
                        </span>
                      </div>

                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="mt-2 space-y-1 text-editorial-dark/75 text-xs list-inside list-disc font-serif italic">
                          {edu.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}


        {/* ==================== TAB: PROJECTS ==================== */}
        {activeTab === "projects" && (
          <div>
            {/* CodeCubs Style Premium Hero Section with Recent Posts */}
            <div className="bg-[#000000] text-white p-6 md:p-12 rounded-[32px] border-2 border-[#131313] mb-12 shadow-[8px_8px_0px_0px_rgba(19,19,19,1)] relative overflow-hidden font-sans animate-fade-in">
              
              {/* === NAV ROW === */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => setActiveTab("portfolio")} 
                    className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.getElementById("browse-projects-anchor");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }} 
                    className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-neutral-100 transition-all cursor-pointer"
                  >
                    Projects Library
                  </button>
                  <button 
                    onClick={() => setActiveTab("blog")} 
                    className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Articles Feed
                  </button>
                </div>

                {/* Right actions & Social avatars */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img className="w-5 h-5 rounded-full border border-[#131313] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&h=50&q=80" alt="Reader" referrerPolicy="no-referrer" />
                      <img className="w-5 h-5 rounded-full border border-[#131313] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80" alt="Reader" referrerPolicy="no-referrer" />
                      <img className="w-5 h-5 rounded-full border border-[#131313] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80" alt="Reader" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
                      + 2.5k readers
                    </span>
                  </div>

                  {isOwner && (
                    <button 
                      onClick={() => {
                        setActiveTab("cms");
                      }}
                      className="w-9 h-9 rounded-full bg-[#E2F790] text-black flex items-center justify-center border-2 border-black hover:bg-lime-400 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
                      title="Content Studio"
                    >
                      <Settings size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* === HEADING & CONTROL ROW === */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-9">
                  <h1 className="text-4xl md:text-[62px] font-black leading-[1.05] tracking-tight text-white mb-2">
                    Where Raw Data{" "}
                    <span className="relative inline-block align-middle">
                      <svg className="w-12 h-8 inline-block mx-1.5 align-middle" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24C18.1569 24 21.7346 21.4641 23.2383 17.8546C23.5186 17.1818 24.4814 17.1818 24.7617 17.8546C26.2654 21.4641 29.8431 24 34 24C39.5228 24 44 19.5228 44 14C44 8.47715 39.5228 4 34 4C29.8431 4 26.2654 6.53594 24.7617 10.1454C24.4814 10.8182 23.5186 10.8182 23.2383 10.1454C21.7346 6.53594 18.1569 4 14 4Z" fill="#FFC0D9" stroke="#131313" strokeWidth="2.5" />
                      </svg>
                    </span>{" "}
                    Aligns,
                  </h1>
                  <h1 className="text-4xl md:text-[62px] font-black leading-[1.05] tracking-tight text-white">
                    Big{" "}
                    <span className="relative inline-block align-middle">
                      <svg className="w-12 h-8 inline-block mx-1.5 align-middle" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 22C6 17 8 10 14 7C20 4 28 6 30 11C32 16 28 21 22 23C18 24.5 14 24 12 23C9 21.5 8.5 19 9.5 17C10.5 15 13 14 16 15C19 16 21 18 21 20" stroke="#131313" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 22C6 17 8 10 14 7C20 4 28 6 30 11C32 16 28 21 22 23C18 24.5 14 24 12 23" fill="#FCE22A" stroke="#131313" strokeWidth="2.5" />
                      </svg>
                    </span>{" "}
                    Decisions Unfold
                  </h1>
                </div>

                <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:text-right">
                  <div className="flex items-center gap-2 mb-3 bg-white/5 p-1 rounded-2xl border border-white/10">
                    {isOwner && (
                      <button className="w-8 h-8 rounded-full bg-[#FFC0D9] text-black flex items-center justify-center border border-black hover:scale-105 transition-transform cursor-pointer" onClick={() => {
                        setActiveTab("cms");
                      }} title="Content Studio">
                        <Settings size={14} />
                      </button>
                    )}
                    <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center border border-black hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveTab("projects")}>
                      <Grid size={14} />
                    </button>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#E2F790] mb-0.5">
                    Read, Think, Succeed:
                  </p>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                    Read Lite Style!
                  </p>
                </div>
              </div>

              {/* Subheading row */}
              <div className="mb-8 flex items-center gap-2 text-stone-400 text-xs tracking-widest uppercase font-extrabold">
                <span>From Complex Data</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-700"></span>
                <span>to Strategic Actions</span>
              </div>

              {/* === THE 3-CARD GRID === */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* CARD 1: Pink Expert Mentors Card */}
                <div className="lg:col-span-3 bg-[#FFC0D9] text-black p-6 rounded-[24px] border-2 border-black shadow-[4px_4px_0px_0px_#131313] flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="bg-white border border-black rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-black">
                      <img className="w-4 h-4 rounded-full object-cover border border-black" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&h=50&q=80" alt="Facilitator" referrerPolicy="no-referrer" />
                      <span>Curated Analysis Insights</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      <Bell size={13} />
                    </div>
                  </div>

                  {/* Curly swirl SVG element */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <svg className="w-full h-20" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 40 C 40 10, 80 70, 110 40 C 140 10, 170 70, 190 40" stroke="#FF5C35" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                      <path d="M15 45 C 45 15, 85 75, 115 45" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-lg font-black leading-snug tracking-tight text-black mb-1.5">
                      Exceptional Analytics Fuel Strategic Business Decisions!
                    </h3>
                    <p className="text-[11px] font-bold text-black/70 uppercase tracking-wide leading-relaxed">
                      Deep-dives designed to explain complex models simply
                    </p>
                  </div>
                </div>

                {/* CARD 2: Middle White card (Live Recent Posts) */}
                <div className="lg:col-span-6 bg-white text-black rounded-[24px] border-2 border-black shadow-[4px_4px_0px_0px_#131313] overflow-hidden flex flex-col justify-between">
                  
                  {/* Card Header details */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-extrabold uppercase tracking-wider text-neutral-600">
                        &lt;&lt; Recent Post &gt;&gt;
                      </span>
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600">
                        <Headphones size={13} />
                      </div>
                    </div>

                    {/* Latest dynamic post title or placeholder */}
                    {portfolioData.articles && portfolioData.articles.length > 0 ? (
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-neutral-900 mb-2 hover:text-filearn-orange cursor-pointer transition-colors"
                            onClick={() => setSelectedArticle(portfolioData.articles[0])}>
                          {portfolioData.articles[0].title}
                        </h2>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-full bg-[#E2F790] border border-black text-[9px] font-black uppercase tracking-wider">
                            Popular
                          </span>
                          <button 
                            onClick={() => setSelectedArticle(portfolioData.articles[0])}
                            className="w-8 h-8 rounded-full border border-black bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                          >
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-neutral-900 mb-2">
                          Unleashing Kid's Potential Through Playful Code
                        </h2>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-full bg-[#E2F790] border border-black text-[9px] font-black uppercase tracking-wider">
                            Popular
                          </span>
                          <button className="w-8 h-8 rounded-full border border-black bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center">
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo representing professional analytics vibe */}
                  <div className="relative mx-6 h-48 md:h-52 bg-neutral-200 rounded-2xl overflow-hidden border border-black">
                    <img 
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" 
                      alt="Strategic planning and data analytics dashboard"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Tiny action circles on the photo as in the screenshot */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-white/90 border border-black/25 flex items-center justify-center text-black shadow-sm">
                        <TrendingUp size={10} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/90 border border-black/25 flex items-center justify-center text-black shadow-sm">
                        <FileText size={10} />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/90 border border-black/25 flex items-center justify-center text-black shadow-sm">
                        <Sparkles size={10} />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic feed of other recent blog posts */}
                  <div className="p-6">
                    {portfolioData.articles && portfolioData.articles.length > 1 ? (
                      <div className="pt-2 border-t border-neutral-100">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-filearn-orange animate-pulse"></span>
                          Dynamic Articles Feed:
                        </p>
                        <div className="space-y-2">
                          {portfolioData.articles.slice(1, 4).map((art) => (
                            <div 
                              key={art.id} 
                              onClick={() => setSelectedArticle(art)}
                              className="flex items-center justify-between gap-3 text-xs font-bold text-neutral-800 hover:text-filearn-orange cursor-pointer group"
                            >
                              <span className="truncate group-hover:underline">✦ {art.title}</span>
                              <span className="text-[9px] font-mono font-medium shrink-0 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded-sm">
                                {art.readTime}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-neutral-100">
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                          Active articles and publications loaded dynamically.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CARD 3: Lime Green Smart Academy Card */}
                <div className="lg:col-span-3 bg-[#E2F790] text-black p-6 rounded-[24px] border-2 border-black shadow-[4px_4px_0px_0px_#131313] flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-black uppercase tracking-wider text-black">
                      Strategic Index
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-black">
                      <Heart size={13} />
                    </div>
                  </div>

                  {/* Slanted 3D tags */}
                  <div className="my-6 flex flex-wrap gap-2.5 justify-center">
                    <span className="inline-block px-3 py-1.5 bg-white text-black border border-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-3 hover:rotate-0 transition-transform cursor-default">
                      Strategy
                    </span>
                    <span className="inline-block px-3 py-1.5 bg-white text-black border border-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform cursor-default">
                      Excel
                    </span>
                    <span className="inline-block px-3 py-1.5 bg-white text-black border border-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform cursor-default">
                      Analysis
                    </span>
                    <span className="inline-block px-3 py-1.5 bg-white text-black border border-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-3 hover:rotate-0 transition-transform cursor-default">
                      Enterprise
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-black/10">
                    <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] hover:scale-105 transition-all">
                      +
                    </button>
                    <button 
                      onClick={() => {
                        const element = document.getElementById("browse-projects-anchor");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex-1 bg-[#FFEDB3] text-black border border-black px-4 py-2 rounded-full font-black uppercase tracking-widest text-[10px] shadow-[2px_2px_0px_0px_rgba(19,19,19,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center cursor-pointer"
                    >
                      Explore Projects
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Scroll Anchor */}
            <div id="browse-projects-anchor" className="mb-8 pt-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#131313] tracking-tight uppercase">
                Browse Featured Projects
              </h2>
              <p className="text-xs text-[#131313]/60 uppercase tracking-widest font-extrabold mt-1">
                Prasad's active quantitative portfolio and dynamic simulation models
              </p>
            </div>

            {/* Search & Category Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-5 rounded-sm border border-editorial-dark/10 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-editorial-dark/40 mr-1">Category:</span>
                <button
                  onClick={() => setProjectCategory("All")}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all min-w-max ${
                    projectCategory === "All" 
                      ? "bg-editorial-dark text-editorial-bg" 
                      : "bg-editorial-muted hover:bg-editorial-accent text-editorial-dark/70 border border-editorial-dark/5"
                  }`}
                >
                  All Projects ({portfolioData.projects.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategory(cat)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-all min-w-max ${
                      projectCategory === cat 
                        ? "bg-editorial-dark text-editorial-bg" 
                        : "bg-editorial-muted hover:bg-editorial-accent text-editorial-dark/70 border border-editorial-dark/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {isOwner && (
                <button 
                  onClick={() => { setActiveTab("cms"); setCmsTab("projects"); }}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-editorial-muted hover:bg-editorial-accent text-editorial-dark px-4 py-2 rounded-sm border border-editorial-dark/20 transition-all w-full sm:w-auto justify-center"
                >
                  <Plus size={12} /> Add Project
                </button>
              )}
            </div>

            {/* Open Source & Public Files Philosophy Card */}
            <div className="mb-8 p-6 bg-editorial-muted border border-editorial-dark/15 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs animate-fade-in">
              <div className="flex-1">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-editorial-dark mb-1.5 flex items-center gap-2">
                  <Github size={13} className="text-editorial-dark/80" /> Open Source & Public Code Repositories
                </h3>
                <p className="text-xs text-editorial-dark/85 leading-relaxed font-serif italic max-w-3xl">
                  Prasad's portfolio is built entirely for learning and research. Every project listed here is accompanied by public files on GitHub (code repositories, notebooks, financial models) and is <strong>fully open to view</strong>. Use the <strong>Articles</strong> tab to read deep-dives on the underlying strategies, challenges, and solutions.
                </p>
              </div>
              <button 
                onClick={() => { setActiveTab("blog"); setSelectedArticle(null); }}
                className="bg-editorial-dark hover:bg-editorial-dark/95 text-editorial-bg text-[10px] font-bold uppercase tracking-wider py-2.5 px-4.5 rounded-sm transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer"
              >
                Read Strategic Articles <ArrowUpRight size={12} />
              </button>
            </div>             {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-[#131313] p-12 text-center shadow-[4px_4px_0px_0px_#131313]">
                <p className="text-[#131313]/60 mb-3 italic font-serif">No projects found in this category.</p>
                <button 
                  onClick={() => setProjectCategory("All")}
                  className="text-xs text-filearn-orange font-bold underline uppercase tracking-wider"
                >
                  Show All Projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => {
                  const isAI = project.category === "AI";
                  const isExcel = project.category === "Excel";
                  const isBA = project.category === "Business Analytics";
                  const isMBA = project.category === "MBA";
                  
                  let headerBg = "bg-[#7F56D9]"; // AI (Purple)
                  let headerTextColor = "text-[#7F56D9]";
                  let iconElement = <Cpu className="w-6.5 h-6.5 text-[#7F56D9]" strokeWidth={2.5} />;
                  let metaDuration = "12 min read";
                  let metaSections = "Machine Learning";
                  let metaLevel = "Strategic Guide";

                  if (isExcel) {
                    headerBg = "bg-[#14B8A6]"; // Teal
                    headerTextColor = "text-[#14B8A6]";
                    iconElement = <FileSpreadsheet className="w-6.5 h-6.5 text-[#14B8A6]" strokeWidth={2.5} />;
                    metaDuration = "8 min read";
                    metaSections = "Spreadsheet Model";
                    metaLevel = "Expert Level";
                  } else if (isBA) {
                    headerBg = "bg-[#FACC15]"; // Yellow
                    headerTextColor = "text-[#131313]";
                    iconElement = <TrendingUp className="w-6.5 h-6.5 text-[#131313]" strokeWidth={2.5} />;
                    metaDuration = "10 min read";
                    metaSections = "Data Science";
                    metaLevel = "Executive Analysis";
                  } else if (isMBA) {
                    headerBg = "bg-[#F05022]"; // Orange
                    headerTextColor = "text-[#F05022]";
                    iconElement = <Target className="w-6.5 h-6.5 text-[#F05022]" strokeWidth={2.5} />;
                    metaDuration = "15 min read";
                    metaSections = "Business Case";
                    metaLevel = "MBA Tier";
                  } else if (project.category === "Emerging Tech") {
                    headerBg = "bg-[#5E5ADB]"; // Blue
                    headerTextColor = "text-[#5E5ADB]";
                    iconElement = <Cpu className="w-6.5 h-6.5 text-[#5E5ADB]" strokeWidth={2.5} />;
                    metaDuration = "9 min read";
                    metaSections = "Emerging Tech";
                    metaLevel = "Advanced Research";
                  } else {
                    headerBg = "bg-[#131313]"; // Dark Grey
                    headerTextColor = "text-[#131313]";
                    iconElement = <BookOpen className="w-6.5 h-6.5 text-[#131313]" strokeWidth={2.5} />;
                    metaDuration = "6 min read";
                    metaSections = "Strategic Brief";
                    metaLevel = "General Read";
                  }
                  
                  return (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="bg-white rounded-3xl border-2 border-[#131313] hover:shadow-[8px_8px_0px_0px_rgba(19,19,19,1)] shadow-[4px_4px_0px_0px_rgba(19,19,19,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden cursor-pointer h-full relative"
                    >
                      {/* Project Solid Accent Header Block */}
                      <div className={`h-44 w-full ${headerBg} relative flex items-center justify-center border-b-2 border-[#131313] transition-colors overflow-hidden`}>
                        {/* Decorative pattern lines matching Webflow style */}
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#131313_1px,transparent_1px),linear-gradient(to_bottom,#131313_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                        
                        {/* Floating Icon inside White Circle with Drop Shadow */}
                        <div className="w-16 h-16 rounded-full bg-white border-2 border-[#131313] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(19,19,19,1)] z-10 transition-transform group-hover:scale-105">
                           {iconElement}
                        </div>

                        {/* Free Tag Banner */}
                        <span className="absolute top-4 right-4 bg-white border-2 border-[#131313] text-[9px] font-extrabold uppercase tracking-widest text-[#131313] px-2.5 py-0.5 rounded-full shadow-[2px_2px_0px_0px_rgba(19,19,19,1)] z-10">
                          Deep Dive
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        
                        {/* Project metadata details */}
                        <div className="flex items-center gap-1.5 text-[11px] font-sans font-bold text-[#131313]/55 mb-2.5">
                          <span>{metaDuration}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#131313]/20"></span>
                          <span>{metaSections}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#131313]/20"></span>
                          <span>{metaLevel}</span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg font-extrabold text-[#131313] tracking-tight mb-2.5 group-hover:text-filearn-orange transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-[13px] text-[#131313]/75 leading-relaxed mb-6 flex-1 font-medium font-sans">
                          {project.description}
                        </p>

                        {/* Key deliverables outcome inside folder */}
                        {project.keyDeliverables && project.keyDeliverables.length > 0 && (
                          <div className="border-t border-[#131313]/10 pt-4 mb-5 flex flex-col gap-1.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#131313]/40 flex items-center gap-1">
                              <CheckCircle size={10} className="text-[#131313]/50" /> Study Outcomes
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-[#131313] font-bold">
                              <svg className="w-4.5 h-4.5 text-[#14B8A6]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="truncate">{project.keyDeliverables[0]}</span>
                            </div>
                          </div>
                        )}

                        {/* Tag list */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.map((tag, tagIdx) => {
                            const tagStyle = getFilearnTagStyle(tag, tagIdx);
                            return (
                              <span 
                                key={tagIdx} 
                                className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                              >
                                #{tag}
                              </span>
                            );
                          })}
                        </div>

                        {/* Action buttons footer */}
                        <div className="flex items-center justify-between gap-2 pt-4 border-t border-[#131313]/10 mt-auto">
                          
                          {/* Inner Quick-Actions (GitHub, External) */}
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                title="Open GitHub Codebase" 
                                className="p-2 rounded-xl border border-[#131313]/10 hover:border-[#131313] hover:bg-neutral-50 transition-all text-[#131313]/70 hover:text-[#131313]"
                              >
                                <Github size={13} />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                title="Launch Interactive Model" 
                                className="p-2 rounded-xl border border-[#131313]/10 hover:border-filearn-teal hover:bg-teal-50 transition-all text-[#131313]/70 hover:text-filearn-teal"
                              >
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>

                          {/* Primary CTA button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="px-4 py-2 bg-white text-[#131313] hover:bg-neutral-50 border-2 border-[#131313] text-[10px] font-extrabold uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(19,19,19,1)] hover:shadow-none active:translate-y-0.5 transition-all cursor-pointer"
                          >
                            View Case Study
                          </button>

                        </div>

                      </div>

                      {/* Project Bottom Action Banner */}
                      <div className="bg-[#131313] group-hover:bg-filearn-orange text-white px-6 py-4.5 border-t-2 border-[#131313] flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                        <span>Explore Project Case Study</span>
                        <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal: Project Case Study View */}
            {selectedProject && (
              <div className="fixed inset-0 bg-[#131313]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-editorial-bg rounded-2xl border-2 border-[#131313] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[8px_8px_0px_0px_#131313] relative">
                  
                  {/* Banner strip */}
                  <div className={`h-3 w-full ${
                    selectedProject.category === "AI" ? "bg-filearn-purple" :
                    selectedProject.category === "Excel" ? "bg-emerald-600" :
                    selectedProject.category === "Business Analytics" ? "bg-filearn-teal" :
                    selectedProject.category === "MBA" ? "bg-filearn-orange" : "bg-stone-500"
                  }`}></div>

                  {selectedProject.thumbnailUrl && (
                    <div className="h-64 w-full overflow-hidden relative border-b-2 border-[#131313] bg-editorial-muted">
                      <img 
                        src={selectedProject.thumbnailUrl} 
                        alt={selectedProject.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white hover:bg-[#FFF0ED] text-[#131313] border-2 border-[#131313] transition-all cursor-pointer shadow-[2px_2px_0px_0px_#131313] active:translate-y-0.5 z-10"
                    title="Close Details"
                  >
                    <X size={14} />
                  </button>

                  <div className="p-8">
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-[#131313]/10 mb-4 inline-block ${
                      selectedProject.category === "AI" ? "bg-[#F4EBFF] text-[#7F56D9]" :
                      selectedProject.category === "Excel" ? "bg-[#E6F4EA] text-[#137333]" :
                      selectedProject.category === "Business Analytics" ? "bg-[#E6F9F6] text-[#0D9488]" :
                      "bg-[#FFF0ED] text-[#F05022]"
                    }`}>
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl font-serif italic font-bold text-[#131313] mb-4 leading-tight">{selectedProject.title}</h2>
                    
                    {/* Meta Links */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1.5 text-xs bg-[#E6F9F6] hover:bg-[#14B8A6]/20 text-[#0D9488] border-2 border-[#131313] px-4 py-2 rounded-full font-bold shadow-[2px_2px_0px_0px_#131313] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                          <Github size={14} /> View GitHub Files
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1.5 text-xs bg-[#FFF0ED] hover:bg-filearn-orange/20 text-filearn-orange border-2 border-[#131313] px-4 py-2 rounded-full font-bold shadow-[2px_2px_0px_0px_#131313] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                          <ExternalLink size={14} /> Launch Application
                        </a>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#131313]/50 mb-2">Detailed Strategic Analysis</h4>
                        <div className="text-[#131313]/90 text-sm leading-relaxed whitespace-pre-line font-serif italic bg-white p-5 rounded-xl border-2 border-[#131313] shadow-[2px_2px_0px_0px_rgba(19,19,19,0.1)]">
                          {selectedProject.longDescription || selectedProject.description}
                        </div>
                      </div>

                      {/* Deliverables checklist */}
                      {selectedProject.keyDeliverables && selectedProject.keyDeliverables.length > 0 && (
                        <div className="bg-[#FFF6E0] p-6 rounded-2xl border-2 border-[#131313] shadow-[3px_3px_0px_0px_#131313]">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#131313] mb-4 flex items-center gap-1.5">
                            <CheckCircle size={14} className="text-filearn-orange" /> Publicly Available Deliverables
                          </h4>
                          <ul className="space-y-2.5">
                            {selectedProject.keyDeliverables.map((deliv, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-[#131313]/90 text-xs leading-relaxed font-serif italic">
                                <span className="text-[#F05022] mt-0.5 font-bold">✓</span>
                                <span>{deliv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-4 border-t border-[#131313]/10 flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag, tagIdx) => {
                          const tagStyle = getFilearnTagStyle(tag, tagIdx);
                          return (
                            <span 
                              key={tagIdx} 
                              className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                            >
                              #{tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}



        {/* ==================== TAB: INSIGHTS BLOG ==================== */}
        {activeTab === "blog" && (
          <div>
            {/* Blog search and categories filter row */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white p-5 rounded-sm border border-editorial-dark/10 shadow-xs">
              
              {/* Category buttons list */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full md:w-auto pb-1 md:pb-0">
                <button
                  onClick={() => setBlogCategory("All")}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all min-w-max ${
                    blogCategory === "All" 
                      ? "bg-editorial-dark text-editorial-bg" 
                      : "bg-editorial-muted border border-editorial-dark/10 text-editorial-dark/75 hover:bg-editorial-accent"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setBlogCategory(cat)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all min-w-max ${
                      blogCategory === cat 
                        ? "bg-editorial-dark text-editorial-bg" 
                        : "bg-editorial-muted border border-editorial-dark/10 text-editorial-dark/75 hover:bg-editorial-accent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full md:flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-editorial-dark/55" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                  className="w-full bg-editorial-bg border border-editorial-dark/15 pl-10 pr-4 py-2 rounded-sm text-xs font-mono focus:outline-hidden focus:border-editorial-dark transition-all shadow-xs"
                />
              </div>

              {/* Quick AI generation banner action */}
              {isOwner && (
                <button 
                  onClick={() => { setActiveTab("cms"); setCmsTab("articles"); }}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-editorial-dark hover:bg-editorial-dark/95 text-editorial-bg px-4 py-2.5 rounded-sm transition-all w-full md:w-auto justify-center shadow-xs"
                >
                  <Sparkles size={12} className="animate-pulse" /> AI Writer
                </button>
              )}
            </div>

            {/* Split layout: Selected Article Reader vs Articles List */}
            {selectedArticle ? (
              <div className="bg-white rounded-2xl border-2 border-[#131313] p-6 md:p-12 shadow-[4px_4px_0px_0px_#131313] max-w-4xl mx-auto animate-fade-in">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="mb-8 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#131313]/60 hover:text-[#131313] bg-white hover:bg-editorial-accent px-4 py-2 rounded-full border-2 border-[#131313] shadow-[2px_2px_0px_0px_#131313] hover:shadow-none active:translate-y-0.5 transition-all cursor-pointer"
                >
                  ← Back to Articles List
                </button>

                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest border border-[#131313]/25 text-filearn-purple bg-[#F4EBFF] px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <span className="text-[10px] text-[#131313]/55 font-mono font-bold flex items-center gap-1 bg-editorial-bg px-2.5 py-1 rounded-full border border-[#131313]/10">
                    <Calendar size={11} className="text-[#131313]/40" /> {selectedArticle.date}
                  </span>
                  <span className="text-[10px] text-[#131313]/55 font-mono font-bold flex items-center gap-1 bg-editorial-bg px-2.5 py-1 rounded-full border border-[#131313]/10">
                    <Clock size={11} className="text-[#131313]/40" /> {selectedArticle.readTime}
                  </span>
                </div>

                <div className="border-b-2 border-[#131313]/15 pb-6 mb-8">
                  <h1 className="text-3xl md:text-5xl font-serif italic font-black text-[#131313] tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>

                {/* Markdown rendering of body */}
                <div className="mb-10 font-serif text-base leading-relaxed text-[#131313]/90 italic bg-[#FAF9F5] p-6 rounded-2xl border border-[#131313]/15">
                  <MarkdownView content={selectedArticle.content} />
                </div>

                {/* Sources section */}
                {selectedArticle.sources && selectedArticle.sources.length > 0 && (
                  <div className="border-2 border-[#131313] pt-6 mt-8 bg-[#FEF6E0] p-6 rounded-2xl shadow-[3px_3px_0px_0px_#131313]">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B45309] mb-3">Verified Academic Sources & Financial Context</h4>
                    <div className="flex flex-col gap-2">
                      {selectedArticle.sources.map((src, idx) => (
                        <a 
                          key={idx} 
                          href={src.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between text-xs text-[#131313] font-serif italic font-bold hover:text-filearn-orange bg-white p-3.5 rounded-xl border-2 border-[#131313] transition-colors shadow-[2px_2px_0px_0px_#131313] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                        >
                          <span className="truncate">{src.name}</span>
                          <span className="flex items-center gap-0.5 shrink-0 text-[9px] font-mono uppercase tracking-wider text-[#131313]/60 font-bold">
                            Visit Source <ExternalLink size={10} />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Articles List */}
                {filteredArticles.length === 0 ? (
                  <div className="bg-white rounded-sm border border-editorial-dark/10 p-12 text-center">
                    <p className="text-editorial-dark/60 font-serif italic">No articles match your query or category selection.</p>
                    <button 
                      onClick={() => { setBlogSearchQuery(""); setBlogCategory("All"); }}
                      className="mt-3 text-xs text-editorial-dark font-bold underline uppercase tracking-wider"
                    >
                      Clear search filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredArticles.map((article, articleIdx) => {
                      const tagStyle = getFilearnTagStyle(article.category, articleIdx);
                      return (
                        <div 
                          key={article.id} 
                          className="bg-white rounded-2xl border-2 border-[#131313] hover:shadow-[6px_6px_0px_0px_#131313] shadow-[3px_3px_0px_0px_#131313] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-8 flex flex-col group cursor-pointer"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}>
                              {article.category}
                            </span>
                            <span className="text-[10px] text-[#131313]/55 font-mono font-bold flex items-center gap-1">
                              <Calendar size={11} className="text-[#131313]/40" /> {article.date}
                            </span>
                          </div>

                          <h3 className="text-xl font-serif italic font-bold text-[#131313] group-hover:text-filearn-purple transition-colors mb-3 leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-xs text-[#131313]/70 leading-relaxed font-serif italic mb-6 line-clamp-3">
                            {article.summary}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#131313]/10 text-[10px] font-bold uppercase tracking-wider text-[#131313]/60">
                            <span className="flex items-center gap-1 font-mono"><Clock size={11} className="text-[#131313]/40" /> {article.readTime}</span>
                            <span className="text-[#131313] group-hover:text-filearn-purple font-extrabold group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5">
                              Read Strategic Article <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        {/* ==================== TAB: CONTENT MANAGER & WRITER ==================== */}
        {activeTab === "cms" && (
          <div className="bg-white rounded-sm border border-editorial-dark/15 shadow-xs overflow-hidden">
            
            {/* Header info bar */}
            <div className="bg-editorial-dark text-editorial-bg p-6 md:p-8 border-b border-editorial-dark/10">
              <h2 className="text-xl font-serif italic font-bold flex items-center gap-2">
                <Settings className="text-editorial-accent animate-spin-slow" /> Interactive Portfolio & Blog Content Management
              </h2>
              <p className="text-xs text-editorial-bg/75 mt-2 font-serif italic max-w-3xl leading-relaxed">
                Customize your bio, profile links, skills, and projects here. You can also generate strategic blog articles with Gemini AI. Keep your site's content fresh and export the config whenever you are ready!
              </p>
            </div>

            {/* CMS Inner Navigation */}
            <div className="bg-editorial-muted border-b border-editorial-dark/10 flex flex-wrap gap-1 px-4 py-2">
              <button
                onClick={() => setCmsTab("profile")}
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all ${
                  cmsTab === "profile" 
                    ? "bg-editorial-dark text-editorial-bg shadow-sm" 
                    : "text-editorial-dark/60 hover:text-editorial-dark hover:bg-editorial-accent"
                }`}
              >
                Profile & Bio
              </button>
              <button
                onClick={() => setCmsTab("skills")}
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all ${
                  cmsTab === "skills" 
                    ? "bg-editorial-dark text-editorial-bg shadow-sm" 
                    : "text-editorial-dark/60 hover:text-editorial-dark hover:bg-editorial-accent"
                }`}
              >
                Manage Skills ({portfolioData.skills.length})
              </button>
              <button
                onClick={() => setCmsTab("projects")}
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all ${
                  cmsTab === "projects" 
                    ? "bg-editorial-dark text-editorial-bg shadow-sm" 
                    : "text-editorial-dark/60 hover:text-editorial-dark hover:bg-editorial-accent"
                }`}
              >
                Manage Projects ({portfolioData.projects.length})
              </button>
              <button
                onClick={() => setCmsTab("articles")}
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all ${
                  cmsTab === "articles" 
                    ? "bg-editorial-dark text-editorial-bg shadow-sm" 
                    : "text-editorial-dark/60 hover:text-editorial-dark hover:bg-editorial-accent"
                }`}
              >
                Manage Articles & AI Drafts ({portfolioData.articles.length})
              </button>
              <button
                onClick={() => setCmsTab("export")}
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-sm transition-all border ${
                  cmsTab === "export" 
                    ? "bg-editorial-accent text-editorial-dark border-editorial-dark/20 font-extrabold" 
                    : "text-editorial-dark border-transparent hover:bg-editorial-accent"
                }`}
              >
                Export / Save Configuration
              </button>
            </div>

            <div className="p-6 md:p-8">

              {/* CMS SUB-TAB: PROFILE */}
              {cmsTab === "profile" && (
                <div className="space-y-6 max-w-3xl">
                  <h3 className="text-base font-bold text-slate-900 mb-1">Basic Profile Information</h3>
                  <p className="text-xs text-slate-400">These details dictate the header text, profile title, bio description, and social media reach across the site.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={portfolioData.name}
                        onChange={(e) => handleProfileUpdate("name", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Professional Title</label>
                      <input 
                        type="text" 
                        value={portfolioData.title}
                        onChange={(e) => handleProfileUpdate("title", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Contact Email Address</label>
                      <input 
                        type="email" 
                        value={portfolioData.email}
                        onChange={(e) => handleProfileUpdate("email", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">LinkedIn Profile Link (Optional)</label>
                      <input 
                        type="url" 
                        value={portfolioData.linkedinUrl || ""}
                        onChange={(e) => handleProfileUpdate("linkedinUrl", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">GitHub Profile Link (Optional)</label>
                      <input 
                        type="url" 
                        value={portfolioData.githubUrl || ""}
                        onChange={(e) => handleProfileUpdate("githubUrl", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Twitter Profile Link (Optional)</label>
                      <input 
                        type="url" 
                        value={portfolioData.twitterUrl || ""}
                        onChange={(e) => handleProfileUpdate("twitterUrl", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Executive Summary / Biography</label>
                    <textarea 
                      rows={4}
                      value={portfolioData.bio}
                      onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-sm focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      placeholder="Write an impactful brief summarizing your analytical strengths and business background..."
                    ></textarea>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
                    <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-900 leading-relaxed">
                      <strong>Auto-Save Alert:</strong> These changes are saved in your current local browser instance instantly. Remember to click the <strong>"Export / Save Configuration"</strong> tab to export and store these edits forever as a local JSON file in your source repository!
                    </p>
                  </div>
                </div>
              )}

              {/* CMS SUB-TAB: SKILLS */}
              {cmsTab === "skills" && (
                <div className="space-y-8">
                  {/* Skill Add/Edit form */}
                  <form onSubmit={saveSkill} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-2xl">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">
                      {editingSkillId ? "Edit Skill Details" : "Add New Skill / Area of Expertise"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={skillForm.name}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Dynamic LBO Modeling, Prompt Engineering"
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Core Category</label>
                        <select
                          value={skillForm.category}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Proficiency Level</label>
                        <select
                          value={skillForm.level}
                          onChange={(e) => setSkillForm(prev => ({ ...prev, level: e.target.value as any }))}
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="Expert">Expert</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginner">Beginner</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Short Description (What do you deliver?)</label>
                      <input
                        type="text"
                        value={skillForm.description}
                        onChange={(e) => setSkillForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Explain the strategic value or technical tools used (e.g., dynamic spill ranges, XLOOKUP)..."
                        className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="submit" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                      >
                        {editingSkillId ? "Update Skill" : "Add Skill"}
                      </button>
                      {editingSkillId && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setEditingSkillId(null);
                            setSkillForm({ name: "", category: "Business Analytics", level: "Intermediate", description: "" });
                          }}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Skills lists */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Current Skills list</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.skills.map((skill) => (
                        <div key={skill.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{skill.name}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.25 rounded">
                                {skill.level}
                              </span>
                            </div>
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{skill.category}</span>
                            <p className="text-xs text-slate-500 mt-1">{skill.description}</p>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => {
                                setEditingSkillId(skill.id);
                                setSkillForm(skill);
                              }}
                              className="p-1 text-slate-400 hover:text-indigo-600 transition-colors rounded hover:bg-slate-100"
                              title="Edit Skill"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => deleteSkill(skill.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-slate-100"
                              title="Delete Skill"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CMS SUB-TAB: PROJECTS */}
              {cmsTab === "projects" && (
                <div className="space-y-8">
                  {/* Add/Edit form */}
                  <form onSubmit={saveProject} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">
                      {editingProjectId ? "Edit Project Case Study" : "Add New Project Case Study"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Real Estate LBO Valuation Dashboard"
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Skill Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                     <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">One-Line Brief Summary</label>
                      <input
                        type="text"
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="A short dynamic sentence capturing the overall deliverable outcome..."
                        className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Project Thumbnail Image URL (Optional)</label>
                      <input
                        type="url"
                        value={projectForm.thumbnailUrl || ""}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                        placeholder="e.g. https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                        className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm font-mono text-xs"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Provide a direct hotlink to a JPG, PNG, or SVG graphic to visually represent this project.</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Detailed Case Study (Supports line breaks)</label>
                      <textarea
                        rows={4}
                        value={projectForm.longDescription}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, longDescription: e.target.value }))}
                        placeholder="Outline the detailed business context, your methodologies, technical toolchains, and strategic impacts..."
                        className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">GitHub Repository Link (Optional)</label>
                        <input
                          type="url"
                          value={projectForm.githubUrl || ""}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                          placeholder="https://github.com/your-username/repo-name"
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Live Application / Presentation Link (Optional)</label>
                        <input
                          type="url"
                          value={projectForm.liveUrl || ""}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                          placeholder="https://your-app-link.com"
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    {/* Tag addition */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Tech Stack Tags</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="e.g., Python, Monte Carlo, PowerQuery"
                          className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                        <button 
                          type="button" 
                          onClick={addTag}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 rounded-lg text-xs"
                        >
                          Add Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(projectForm.tags || []).map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-xs text-slate-600 px-2 py-0.5 rounded-lg">
                            #{tag}
                            <button type="button" onClick={() => removeTag(idx)} className="text-rose-500 hover:text-rose-700 font-extrabold text-[10px] ml-1">×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables addition */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Key Deliverables & Quantitative Outcomes</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={deliverableInput}
                          onChange={(e) => setDeliverableInput(e.target.value)}
                          placeholder="e.g. Achieved 18% churn reduction; Automated 40 hrs of weekly workbook tasks"
                          className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                        <button 
                          type="button" 
                          onClick={addDeliverable}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 rounded-lg text-xs"
                        >
                          Add Bullet
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(projectForm.keyDeliverables || []).map((deliv, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600">
                            <span>• {deliv}</span>
                            <button type="button" onClick={() => removeDeliverable(idx)} className="text-rose-500 hover:text-rose-700 font-extrabold">Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="submit" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
                      >
                        {editingProjectId ? "Update Project" : "Add Project"}
                      </button>
                      {editingProjectId && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setEditingProjectId(null);
                            setProjectForm({ title: "", description: "", longDescription: "", category: "AI", tags: [], keyDeliverables: [], liveUrl: "", githubUrl: "" });
                          }}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* List of projects to manage */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Current Case Studies</h3>
                    <div className="space-y-3">
                      {portfolioData.projects.map((proj) => (
                        <div key={proj.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.25 rounded uppercase">
                                {proj.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{proj.description}</p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button 
                              onClick={() => {
                                setEditingProjectId(proj.id);
                                setProjectForm(proj);
                              }}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded hover:bg-white"
                              title="Edit Project"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => deleteProject(proj.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-white"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CMS SUB-TAB: ARTICLES & AI WRITER */}
              {cmsTab === "articles" && (
                <div className="space-y-10">
                  
                  {/* GEMINI AI ARTICLE WRITER ACCORDION */}
                  <div className="bg-gradient-to-br from-indigo-50 via-purple-50/40 to-white rounded-3xl border border-indigo-100 p-6 shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="text-indigo-600 animate-pulse" />
                      <h3 className="text-base font-extrabold text-indigo-950">Gemini AI Professional Article Generator</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      Instantly generate a highly structured, informative, HBR-quality article about analytics, strategy, spreadsheet modeling, or technology. Gemini will auto-compose headers, subheadings, actionable lists, and markdown tables.
                    </p>

                    <form onSubmit={handleAiGenerate} className="space-y-4 max-w-4xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Target Topic or Thesis</label>
                          <input
                            type="text"
                            required
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            placeholder="e.g. How LLMs are automating financial analysis in investment banking"
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Subject Category</label>
                          <select
                            value={aiCategory}
                            onChange={(e) => setAiCategory(e.target.value as CategoryType)}
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-sm"
                          >
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Tone & Focus Structure</label>
                          <input
                            type="text"
                            value={aiTone}
                            onChange={(e) => setAiTone(e.target.value)}
                            placeholder="e.g. professional, insightful, with concrete Excel formula examples"
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Specific Keywords (Comma separated, Optional)</label>
                          <input
                            type="text"
                            value={aiKeywords}
                            onChange={(e) => setAiKeywords(e.target.value)}
                            placeholder="e.g. payback period, NPV, XLOOKUP, prompt orchestration"
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      {aiError && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs p-3 rounded-xl">
                          {aiError}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                      >
                        {isGenerating ? (
                          <>
                            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Generating Professional Draft (may take 10-15 seconds)...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} />
                            <span>Compose Strategy Article with Gemini</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* ARTICLE COMPOSER / MANAGE DRAFTS FORM */}
                  <form onSubmit={saveArticle} className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">
                      {editingArticleId ? "Edit Article Details" : "Draft Editor (Manual Write or AI Refine)"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          value={articleForm.title}
                          onChange={(e) => setArticleForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Modern Excel formula paradigms..."
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                        <select
                          value={articleForm.category}
                          onChange={(e) => setArticleForm(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                          className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Short Excerpt / Summary</label>
                      <input
                        type="text"
                        value={articleForm.summary}
                        onChange={(e) => setArticleForm(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="A brief 1-2 sentence hook displaying on feed index..."
                        className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-600">Markdown Content Body</label>
                        <span className="text-[10px] text-slate-400 font-mono">Markdown supported (# header, **bold**, etc.)</span>
                      </div>
                      <textarea
                        rows={10}
                        required
                        value={articleForm.content}
                        onChange={(e) => setArticleForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="# Write your markdown here..."
                        className="w-full bg-white border border-slate-200 p-2.5 rounded-lg text-sm font-mono"
                      ></textarea>
                    </div>

                    {/* DRAFT AI REFINER ACCORDION */}
                    {articleForm.content && (
                      <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/60 mb-6">
                        <h4 className="text-xs font-extrabold text-indigo-950 flex items-center gap-1 mb-2">
                          <Sparkles size={12} className="text-indigo-600" /> Need to improve this draft? Ask Gemini AI Editor
                        </h4>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={enhanceInstructions}
                            onChange={(e) => setEnhanceInstructions(e.target.value)}
                            placeholder="e.g., Elaborate more on NPV formula; Translate to active voice; Insert a summary table"
                            className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
                          />
                          <button 
                            type="button"
                            onClick={handleAiEnhance}
                            disabled={isEnhancing}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold px-4 rounded-lg text-xs transition-colors shrink-0"
                          >
                            {isEnhancing ? "Refining..." : "Refine Content"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Sources reference list inside Form */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Authoritative References & Web Sources</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={sourceNameInput}
                          onChange={(e) => setSourceNameInput(e.target.value)}
                          placeholder="Source Name (e.g., McKinsey Strategy Insights)"
                          className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-xs"
                        />
                        <input
                          type="url"
                          value={sourceUrlInput}
                          onChange={(e) => setSourceUrlInput(e.target.value)}
                          placeholder="Source Link (e.g., https://mckinsey.com/...)"
                          className="flex-1 bg-white border border-slate-200 p-2 rounded-lg text-xs"
                        />
                        <button 
                          type="button" 
                          onClick={addSource}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3 rounded-lg text-xs"
                        >
                          Add Source
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {(articleForm.sources || []).map((src, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600">
                            <span className="truncate"><strong>{src.name}</strong> • <span className="text-slate-400">{src.url}</span></span>
                            <button type="button" onClick={() => removeSource(idx)} className="text-rose-500 hover:text-rose-700 font-extrabold ml-2">Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="submit" 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        {editingArticleId ? "Publish Edited Article" : "Publish Article to Feed"}
                      </button>
                      {editingArticleId && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setEditingArticleId(null);
                            setArticleForm({ title: "", summary: "", content: "", category: "AI", sources: [] });
                          }}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl text-xs transition-colors"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  {/* List of articles to delete or edit */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Published Articles</h3>
                    <div className="space-y-3">
                      {portfolioData.articles.map((art) => (
                        <div key={art.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{art.title}</span>
                              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.25 rounded uppercase">
                                {art.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5 font-medium">
                              <span>Published: {art.date}</span>
                              <span>•</span>
                              <span>{art.readTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button 
                              onClick={() => {
                                setEditingArticleId(art.id);
                                setArticleForm(art);
                                // Scroll to editor smoothly
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded hover:bg-white"
                              title="Edit Article"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => deleteArticle(art.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-white"
                              title="Delete Article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CMS SUB-TAB: EXPORT / IMPORT CONFIG */}
              {cmsTab === "export" && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2">Publish & Host Online For Free</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      You mentioned wanting this site hosted for free on a platform like <strong>GitHub Pages</strong> or <strong>Vercel</strong> while making it incredibly easy to update changes. Here is your automated content pipeline!
                    </p>
                  </div>

                  {/* Flow Map Visualizer */}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-md">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Your Dynamic CMS Pipeline</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      
                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">Step 1</span>
                          <h5 className="font-bold text-sm mb-1.5">Edit Visually in App</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">Use this Admin tab to update your resume details, add skills, projects, and use Gemini to auto-generate strategy posts.</p>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">Step 2</span>
                          <h5 className="font-bold text-sm mb-1.5">Export & Download JSON</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">Click the Download button below. It downloads a file named <code className="text-indigo-300 font-mono text-[10px]">portfolio-data.json</code> containing all your edited content structured perfectly.</p>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-block">Step 3</span>
                          <h5 className="font-bold text-sm mb-1.5">Commit to GitHub</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">Upload/Replace the <code className="text-indigo-300 font-mono text-[10px]">portfolio-data.json</code> file inside your repository. Your Vercel/GitHub Pages site updates instantly!</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Portfolio Configuration Actions</h4>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={handleDownloadJson}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer"
                      >
                        <FileDown size={18} />
                        <span>Download <code className="font-mono text-indigo-100">portfolio-data.json</code></span>
                      </button>
                      
                      <button 
                        onClick={handleCopyJson}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-slate-200 font-bold py-3.5 px-4 rounded-xl text-sm transition-all cursor-pointer"
                      >
                        <FileCode size={18} className="text-indigo-400" />
                        <span>Copy JSON to Clipboard</span>
                      </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h4 className="text-sm font-bold text-slate-900 mb-2">Import / Upload Saved Configuration</h4>
                      <p className="text-xs text-slate-500 mb-4">Already have a saved `portfolio-data.json` file? Upload it to restore your profile setup instantly.</p>
                      
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                          <Upload size={14} className="text-slate-400" />
                          <span>Choose JSON File</span>
                          <input 
                            type="file" 
                            accept=".json"
                            onChange={handleJsonUpload}
                            className="hidden" 
                          />
                        </label>
                        
                        {uploadSuccess && (
                          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle size={14} /> Configuration imported successfully!
                          </span>
                        )}
                        {uploadError && (
                          <span className="text-xs font-semibold text-rose-600">
                            {uploadError}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Guide text */}
                  <div className="prose max-w-none text-slate-600 text-xs leading-relaxed space-y-4">
                    <h4 className="text-sm font-bold text-slate-950">How to Setup on GitHub Pages & Vercel:</h4>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 text-xs mb-1">Method A: Vercel (Recommended - Easiest & Free)</h5>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Commit this project codebase into a new <strong>GitHub repository</strong>.</li>
                        <li>Log in to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Vercel.com</a> and import your GitHub repository.</li>
                        <li>Vercel automatically detects the build parameters and deploys it live. Every commit to main triggers a re-build automatically.</li>
                      </ol>
                    </div>

                    <div>
                      <h5 className="font-semibold text-slate-900 text-xs mb-1">Method B: GitHub Pages (Free static hosting)</h5>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Initialize git in your repository and publish to GitHub.</li>
                        <li>Install the <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">gh-pages</code> package or configure a GitHub Action to compile your Vite client and publish the contents of the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">dist/</code> directory directly to the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">gh-pages</code> branch.</li>
                      </ol>
                    </div>
                  </div>

                  {/* Lightweight, Free-to-Host CMS Solutions Suggestions */}
                  <div className="mt-10 pt-8 border-t border-slate-200 space-y-6">
                    <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-1.5 uppercase tracking-wider">
                      <Settings size={14} className="text-indigo-600 animate-spin-slow" /> Suggested Lightweight Static CMS Platforms
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      If you want a more robust setup than our in-app visual JSON download system, these <strong>100% free-to-host Git-Based CMS platforms</strong> are industry standard. They write and read content directly in your GitHub repository, requiring <strong>zero external databases</strong>, while offering rich, beautiful visual admin interfaces.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* CMS Option 1: Keystatic */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded mb-2 inline-block">Best for React & Vite</span>
                          <h5 className="font-bold text-xs text-slate-900 mb-1">Keystatic</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                            Created by Thinkmill, Keystatic is an open-source, Git-based CMS that allows visual dashboard content editing inside your React/Vite codebase. It writes files back to GitHub cleanly as native JSON or Markdown, requiring zero server maintenance.
                          </p>
                        </div>
                        <a href="https://keystatic.com" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-0.5 hover:underline mt-2">
                          Visit Keystatic <ArrowUpRight size={10} />
                        </a>
                      </div>

                      {/* CMS Option 2: Tina CMS */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-2 inline-block">Visual Previews</span>
                          <h5 className="font-bold text-xs text-slate-900 mb-1">Tina CMS</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                            Tina CMS supports visual, in-context editing and real-time previews for React applications. It integrates directly with your GitHub repository, stores structured content as Markdown or JSON, and offers a beautiful, secure user login.
                          </p>
                        </div>
                        <a href="https://tina.io" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-0.5 hover:underline mt-2">
                          Visit Tina CMS <ArrowUpRight size={10} />
                        </a>
                      </div>

                      {/* CMS Option 3: Decap CMS */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded mb-2 inline-block">Simple Schema</span>
                          <h5 className="font-bold text-xs text-slate-900 mb-1">Decap CMS</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                            The successor to Netlify CMS, Decap CMS is a single-page React client that runs from a static folder. It hooks into your GitHub repo via OAuth, making it exceptionally easy to declare markdown schemas for articles, projects, and skills.
                          </p>
                        </div>
                        <a href="https://decapcms.org" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-0.5 hover:underline mt-2">
                          Visit Decap CMS <ArrowUpRight size={10} />
                        </a>
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-editorial-dark text-editorial-bg/70 border-t border-editorial-dark/20 text-[10px] font-mono tracking-wider uppercase">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="normal-case font-serif italic text-xs">© {new Date().getFullYear()} {portfolioData.name || "Prasad Sawant"}. All rights reserved.</p>
          <div className="flex gap-4">
            {isOwner && (
              <>
                <button 
                  onClick={() => { setActiveTab("cms"); setCmsTab("export"); }} 
                  className="hover:text-editorial-accent hover:underline transition-all cursor-pointer"
                >
                  Export JSON
                </button>
                <span>•</span>
              </>
            )}
            <button 
              onClick={() => { setActiveTab("portfolio"); }} 
              className="hover:text-editorial-accent hover:underline transition-all cursor-pointer"
            >
              View Resume
            </button>
            <span>•</span>
            <button 
              onClick={() => { setActiveTab("blog"); }} 
              className="hover:text-editorial-accent hover:underline transition-all cursor-pointer"
            >
              Read Articles
            </button>
          </div>
        </div>
      </footer>

      {/* ==================== LOGIN MODAL ==================== */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-[#131313]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="login-modal">
          <div className="bg-white border-2 border-[#131313] w-full max-w-md rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(19,19,19,1)] relative animate-scale-up">
            
            {/* Top banner */}
            <div className="bg-filearn-purple h-3 w-full"></div>

            <div className="p-8">
              {/* Close button */}
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-5 right-5 text-[#131313] hover:text-filearn-orange p-1 rounded-full transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>

              <div className="mb-6 text-center">
                <span className="text-2xl font-serif italic font-extrabold text-filearn-purple">✦</span>
                <h3 className="text-xl font-extrabold text-[#131313] uppercase tracking-wide mt-1">Owner Authentication</h3>
                <p className="text-xs text-[#131313]/60 mt-1">
                  Authenticate to access Prasad Sawant's Content Studio
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                  {loginError}
                </div>
              )}

              {isLoggedIn && isOwner ? (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 text-center my-6">
                  <p className="text-sm font-extrabold text-emerald-800 uppercase tracking-wide mb-1">
                    ✓ Authenticated Successfully!
                  </p>
                  <p className="text-xs text-emerald-600 mb-4">
                    Logged in as: {loginEmail}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setLoginEmail("");
                        setLoginPassword("");
                        setLoginError("");
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-[#131313] transition-all cursor-pointer"
                    >
                      Logout
                    </button>
                    <button 
                      onClick={() => {
                        setIsLoginOpen(false);
                        setActiveTab("cms");
                      }}
                      className="bg-[#131313] text-white hover:bg-[#131313]/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-[#131313] transition-all cursor-pointer"
                    >
                      Go to Studio
                    </button>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const trimmedEmail = loginEmail.trim().toLowerCase();
                    if (trimmedEmail === "prasad.psawant.sawant88@gmail.com" && loginPassword === "prasad88") {
                      setIsLoggedIn(true);
                      setLoginError("");
                      setIsLoginOpen(false);
                      setActiveTab("cms");
                    } else {
                      setLoginError("Unauthorized. Only the portfolio owner can edit content.");
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#131313]/60 mb-1">
                      Registered Owner Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="you@domain.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-white border-2 border-[#131313] px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-filearn-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#131313]/60 mb-1">
                      Content Studio Passcode
                    </label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-white border-2 border-[#131313] px-3 py-2.5 rounded-2xl text-xs focus:outline-none focus:border-filearn-purple"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#131313] hover:bg-filearn-purple text-white font-extrabold text-xs uppercase tracking-widest py-3 rounded-2xl border-2 border-[#131313] shadow-[3px_3px_0px_0px_rgba(19,19,19,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Authenticate Owner
                  </button>
                  <p className="text-[10px] text-center text-[#131313]/40 mt-2 font-mono">
                    Hint: Use your registered Gmail and owner passcode.
                  </p>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple fallback helper component for local layout integrity
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={`w-5 h-5 ${props.className || ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
