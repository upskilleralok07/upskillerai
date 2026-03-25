export interface Submodule {
  id: string;
  title: string;
  duration?: string;
  completed?: boolean;
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  submodules: Submodule[];
  icon: string;
  color: string;
}

export const genAIModules: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: Setup & Introduction',
    description: 'Get started with the essential tools and development environment',
    icon: '🛠️',
    color: 'from-blue-500 to-cyan-500',
    submodules: [
      { id: '1.1', title: 'Installation of tools (VS Code, Python)', duration: '15 min', videoUrl: 'https://www.youtube.com/watch?v=MYSKezQj23s' },
      { id: '1.2', title: 'VS Code setup (extensions, themes)', duration: '20 min', videoUrl: 'https://www.youtube.com/watch?v=nOrN-sprkMk' },
      { id: '1.3', title: 'Downloading starter code files', duration: '10 min' },
      { id: '1.4', title: 'Introduction to the AI Series', duration: '2 min', videoUrl: 'https://www.youtube.com/watch?v=98UciFUHijk&start=0' },
      { id: '1.5', title: 'Virtual Environment Setup using UV', duration: '4 min', videoUrl: 'https://www.youtube.com/watch?v=98UciFUHijk&start=119' },
      { id: '1.6', title: 'Understanding and Installing UV', duration: '4 min', videoUrl: 'https://www.youtube.com/watch?v=98UciFUHijk&start=324' },
      { id: '1.7', title: 'Installing Project Dependencies (Requirements File)', duration: '3 min', videoUrl: 'https://www.youtube.com/watch?v=98UciFUHijk&start=542' },
      { id: '1.8', title: 'Project Structure Guidelines', duration: '3 min', videoUrl: 'https://www.youtube.com/watch?v=98UciFUHijk&start=685' },
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Python Foundations',
    description: 'Master Python programming fundamentals for AI development',
    icon: '🐍',
    color: 'from-green-500 to-emerald-500',
    submodules: [
      { id: '2.1', title: 'Introduction to coding with Python', duration: '30 min', videoUrl: 'https://www.youtube.com/watch?v=wjvvVSZVXiQ' },
      { id: '2.2', title: 'Data types in Python', duration: '45 min', videoUrl: 'https://www.youtube.com/watch?v=tf3NPy6ySSI' },
      { id: '2.3', title: 'Conditionals in Python', duration: '30 min' },
      { id: '2.4', title: 'Loops in Python', duration: '35 min', videoUrl: 'https://www.youtube.com/watch?v=iUVaz25o3og' },
      { id: '2.5', title: 'Functions in Python', duration: '40 min', videoUrl: 'https://www.youtube.com/watch?v=so97jTalLo8' },
      { id: '2.6', title: 'Comprehensions in Python', duration: '25 min', videoUrl: 'https://www.youtube.com/watch?v=QiTfuiNrMxQ' },
      { id: '2.7', title: 'Generators and decorators', duration: '45 min' },
      { id: '2.8', title: 'Object-oriented programming', duration: '60 min' },
      { id: '2.9', title: 'File and exception handling', duration: '35 min' },
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Dev Tools & Backend Basics',
    description: 'Essential developer tools and backend fundamentals',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-500',
    submodules: [
      { id: '3.1', title: 'Git & GitHub essentials (branching, merging, collaboration)', duration: '60 min' },
      { id: '3.2', title: 'Docker (images, containers, volumes, deployment)', duration: '75 min' },
      { id: '3.3', title: 'Pydantic for structured data and validation', duration: '45 min' },
      { id: '3.4', title: 'FastAPI basics for AI backends', duration: '60 min' },
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: AI & LLM Fundamentals',
    description: 'Understand the core concepts behind Large Language Models',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
    submodules: [
      { id: '4.1', title: 'Introduction & Course Roadmap', duration: '6 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=0' },
      { id: '4.2', title: 'How AI Models are Built', duration: '5 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=349' },
      { id: '4.3', title: 'Application Layer & Real-world Use Cases', duration: '1 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=621' },
      { id: '4.4', title: 'Plan of Action for the Course', duration: '2 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=677' },
      { id: '4.5', title: 'What are LLMs (Large Language Models)', duration: '3 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=769' },
      { id: '4.6', title: 'How LLMs Work (Prediction)', duration: '2 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=913' },
      { id: '4.7', title: 'Popular LLMs (GPT, Gemini, Llama, etc.)', duration: '2 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=1002' },
      { id: '4.8', title: 'Why You Cannot Train Your Own LLM', duration: '1 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=1063' },
      { id: '4.9', title: 'Types of Models (Chat, Embedding, Multimodal)', duration: '3 min', videoUrl: 'https://www.youtube.com/watch?v=bIHNnSpn1Uc&start=1263' },
      { id: '4.10', title: 'What are LLMs and how GPT works', duration: '45 min' },
      { id: '4.11', title: 'Tokenization and embeddings', duration: '40 min' },
      { id: '4.12', title: 'Attention and transformers', duration: '50 min' },
      { id: '4.13', title: 'Multi-head attention and positional encodings', duration: '45 min' },
      { id: '4.14', title: '"Attention is All You Need" intuition', duration: '35 min' },
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Prompt Engineering',
    description: 'Master the art of crafting effective prompts',
    icon: '✨',
    color: 'from-yellow-500 to-orange-500',
    submodules: [
      { id: '5.1', title: 'Zero-shot and one-shot prompting', duration: '30 min' },
      { id: '5.2', title: 'Few-shot and chain-of-thought prompting', duration: '40 min' },
      { id: '5.3', title: 'Persona-based prompting', duration: '25 min' },
      { id: '5.4', title: 'Alpaca, ChatML, and LLaMA-2 formats', duration: '35 min' },
      { id: '5.5', title: 'Structured outputs with Pydantic + prompts', duration: '45 min' },
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: Working with LLMs (APIs & Local)',
    description: 'Integrate and deploy LLMs in your applications',
    icon: '🔌',
    color: 'from-indigo-500 to-purple-500',
    submodules: [
      { id: '6.1', title: 'OpenAI API setup and integration', duration: '45 min' },
      { id: '6.2', title: 'Gemini API setup and integration', duration: '40 min' },
      { id: '6.3', title: 'Running local models with Ollama + Docker', duration: '60 min' },
      { id: '6.4', title: 'Using Hugging Face and instruct-tuned models', duration: '50 min' },
      { id: '6.5', title: 'Exposing LLMs via FastAPI endpoints', duration: '45 min' },
    ]
  },
  {
    id: 'module-7',
    title: 'Module 7: Agents & RAG Systems',
    description: 'Build intelligent AI agents and retrieval systems',
    icon: '🤖',
    color: 'from-red-500 to-pink-500',
    submodules: [
      { id: '7.1', title: 'Building your first AI agent from scratch', duration: '60 min' },
      { id: '7.2', title: 'CLI-based coding agents with Claude', duration: '45 min' },
      { id: '7.3', title: 'RAG pipeline basics: indexing, retrieval, answering', duration: '55 min' },
      { id: '7.4', title: 'LangChain document loaders and text splitters', duration: '40 min' },
      { id: '7.5', title: 'Retrievers and vector stores in LangChain', duration: '50 min' },
      { id: '7.6', title: 'Advanced RAG with Redis/Valkey queues (async)', duration: '60 min' },
      { id: '7.7', title: 'Scaling RAG with workers + FastAPI', duration: '55 min' },
    ]
  },
  {
    id: 'module-8',
    title: 'Module 8: LangGraph & Memory Systems',
    description: 'Advanced memory and state management for AI',
    icon: '🧩',
    color: 'from-teal-500 to-cyan-500',
    submodules: [
      { id: '8.1', title: 'LangGraph concepts: state, nodes, edges', duration: '50 min' },
      { id: '8.2', title: 'Checkpointing with MongoDB', duration: '40 min' },
      { id: '8.3', title: 'Memory types: short-term, long-term, episodic, semantic', duration: '45 min' },
      { id: '8.4', title: 'Memory layers with Mem0 and vector DB', duration: '50 min' },
      { id: '8.5', title: 'Graph memory using Neo4j and Cypher', duration: '60 min' },
    ]
  },
  {
    id: 'module-9',
    title: 'Module 9: Conversational & Multi-Modal AI',
    description: 'Build voice and multi-modal AI applications',
    icon: '🎙️',
    color: 'from-rose-500 to-red-500',
    submodules: [
      { id: '9.1', title: 'Voice-based conversational agents', duration: '55 min' },
      { id: '9.2', title: 'Speech-to-text (STT) integration', duration: '40 min' },
      { id: '9.3', title: 'Text-to-speech (TTS) integration', duration: '40 min' },
      { id: '9.4', title: 'AI voice coding assistant (Cursor IDE-style)', duration: '60 min' },
      { id: '9.5', title: 'Multi-modal LLMs (images + text)', duration: '50 min' },
    ]
  },
  {
    id: 'module-10',
    title: 'Module 10: Model Context Protocol (MCP)',
    description: 'Master the MCP for advanced AI integration',
    icon: '📡',
    color: 'from-violet-500 to-purple-500',
    submodules: [
      { id: '10.1', title: 'What MCP is and why it matters', duration: '30 min' },
      { id: '10.2', title: 'MCP transports: STDIO and SSE', duration: '35 min' },
      { id: '10.3', title: 'Building an MCP server with Python', duration: '50 min' },
    ]
  },
  {
    id: 'module-11',
    title: 'Module 11: Project Portfolio (Hands-on)',
    description: 'Build production-ready AI projects',
    icon: '🚀',
    color: 'from-amber-500 to-orange-500',
    submodules: [
      { id: '11.1', title: 'Tokenizer from scratch', duration: '60 min' },
      { id: '11.2', title: 'Local Ollama + FastAPI AI app', duration: '75 min' },
      { id: '11.3', title: 'Python CLI-based coding assistant', duration: '90 min' },
      { id: '11.4', title: 'Document RAG pipeline (LangChain + vector DB)', duration: '120 min' },
      { id: '11.5', title: 'Queue-based scalable RAG (Redis + FastAPI)', duration: '90 min' },
      { id: '11.6', title: 'AI conversational voice agent (STT + GPT + TTS)', duration: '120 min' },
      { id: '11.7', title: 'Graph memory agent with Neo4j', duration: '90 min' },
    ]
  },
  {
    id: 'module-12',
    title: 'Module 12: Advanced Concurrency in Python',
    description: 'Master multithreading and multiprocessing',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-500',
    submodules: [
      { id: '12.1', title: 'Multithreading concepts and Python GIL overview', duration: '40 min' },
      { id: '12.2', title: 'Creating and managing threads in Python', duration: '35 min' },
      { id: '12.3', title: 'Multiprocessing for CPU-bound workloads', duration: '45 min' },
      { id: '12.4', title: 'Synchronization primitives (locks, queues)', duration: '40 min' },
      { id: '12.5', title: 'When to use threads vs processes in AI apps', duration: '30 min' },
    ]
  },
  {
    id: 'module-13',
    title: 'Module 13: Async IO & High-Performance Python',
    description: 'Build high-performance async applications',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-500',
    submodules: [
      { id: '13.1', title: 'Asyncio event loop and coroutines', duration: '45 min' },
      { id: '13.2', title: 'async/await syntax in real projects', duration: '35 min' },
      { id: '13.3', title: 'Tasks, gathering, and concurrency patterns', duration: '40 min' },
      { id: '13.4', title: 'Mixing async with I/O bound LLM calls', duration: '50 min' },
      { id: '13.5', title: 'Error handling and cancellation in async code', duration: '35 min' },
      { id: '13.6', title: 'Structuring async services for AI backends', duration: '45 min' },
    ]
  },
  {
    id: 'module-14',
    title: 'Module 14: Production-Grade Pydantic for AI',
    description: 'Type-safe data validation for AI systems',
    icon: '📋',
    color: 'from-green-500 to-teal-500',
    submodules: [
      { id: '14.1', title: 'Pydantic models and field types', duration: '35 min' },
      { id: '14.2', title: 'Validation, parsing, and custom validators', duration: '40 min' },
      { id: '14.3', title: 'Settings and environment-driven configuration', duration: '30 min' },
      { id: '14.4', title: 'Nested models for complex AI payloads', duration: '35 min' },
      { id: '14.5', title: 'Using Pydantic with FastAPI and LLM responses', duration: '45 min' },
      { id: '14.6', title: 'Best practices for type-safe AI systems', duration: '30 min' },
    ]
  },
  {
    id: 'module-15',
    title: 'Module 15: Core Foundations of Generative AI',
    description: 'Deep dive into generative AI fundamentals',
    icon: '🎯',
    color: 'from-pink-500 to-rose-500',
    submodules: [
      { id: '15.1', title: 'What are LLMs and where they are used', duration: '30 min' },
      { id: '15.2', title: 'How GPT-style models work conceptually', duration: '45 min' },
      { id: '15.3', title: 'Tokenization and subword vocabularies', duration: '35 min' },
      { id: '15.4', title: 'Embeddings and vector representations', duration: '40 min' },
      { id: '15.5', title: 'Attention mechanism and transformer blocks', duration: '50 min' },
      { id: '15.6', title: 'Multi-head attention and positional encodings', duration: '45 min' },
      { id: '15.7', title: '"Attention is All You Need" intuition and impact', duration: '35 min' },
      { id: '15.8', title: 'Parameters, context length, and scaling laws', duration: '40 min' },
      { id: '15.9', title: 'Limitations and failure modes of LLMs', duration: '30 min' },
    ]
  },
  {
    id: 'module-16',
    title: 'Module 16: API Setup & Integration',
    description: 'Set up and organize API clients',
    icon: '🔑',
    color: 'from-blue-500 to-indigo-500',
    submodules: [
      { id: '16.1', title: 'OpenAI account, keys, and basic API calls', duration: '35 min' },
      { id: '16.2', title: 'Gemini account, keys, and basic API calls', duration: '35 min' },
      { id: '16.3', title: 'Organizing API clients in Python projects', duration: '30 min' },
      { id: '16.4', title: 'Environment variables and secret management', duration: '25 min' },
    ]
  },
  {
    id: 'module-17',
    title: 'Module 17: Advanced Prompt Engineering Techniques',
    description: 'Master advanced prompting strategies',
    icon: '🎨',
    color: 'from-orange-500 to-red-500',
    submodules: [
      { id: '17.1', title: 'Zero-shot prompting patterns', duration: '25 min' },
      { id: '17.2', title: 'One-shot prompting with reference examples', duration: '30 min' },
      { id: '17.3', title: 'Few-shot prompting for better control', duration: '35 min' },
      { id: '17.4', title: 'Chain-of-thought reasoning prompts', duration: '40 min' },
      { id: '17.5', title: 'Persona-based and role-based prompts', duration: '30 min' },
      { id: '17.6', title: 'System vs user vs tool messages', duration: '25 min' },
      { id: '17.7', title: 'Safety, guardrails, and refusals via prompts', duration: '35 min' },
      { id: '17.8', title: 'Evaluating and iterating on prompts', duration: '30 min' },
    ]
  },
  {
    id: 'module-18',
    title: 'Module 18: Prompt Serialization & Instruction Formats',
    description: 'Standard prompt formats and templates',
    icon: '📄',
    color: 'from-slate-500 to-gray-500',
    submodules: [
      { id: '18.1', title: 'Alpaca instruction format', duration: '25 min' },
      { id: '18.2', title: 'ChatML format and message roles', duration: '30 min' },
      { id: '18.3', title: 'LLaMA-2 style prompt templates', duration: '25 min' },
      { id: '18.4', title: 'Designing prompt templates for consistent outputs', duration: '35 min' },
    ]
  },
  {
    id: 'module-19',
    title: 'Module 19: Local LLM Deployment & API Integration',
    description: 'Deploy and manage local LLM instances',
    icon: '🖥️',
    color: 'from-emerald-500 to-green-500',
    submodules: [
      { id: '19.1', title: 'Installing and configuring Ollama', duration: '30 min' },
      { id: '19.2', title: 'Pulling and running local models with Docker', duration: '45 min' },
      { id: '19.3', title: 'Creating a local inference API around Ollama', duration: '50 min' },
      { id: '19.4', title: 'Latency, hardware, and model selection trade-offs', duration: '35 min' },
      { id: '19.5', title: 'Using local vs hosted models in one codebase', duration: '40 min' },
      { id: '19.6', title: 'Logging and monitoring local LLM usage', duration: '30 min' },
    ]
  },
  {
    id: 'module-20',
    title: 'Module 20: Running LLMs via Hugging Face Hub',
    description: 'Leverage Hugging Face for LLM deployment',
    icon: '🤗',
    color: 'from-yellow-500 to-orange-500',
    submodules: [
      { id: '20.1', title: 'Hugging Face Hub basics and tokens', duration: '25 min' },
      { id: '20.2', title: 'Loading text-generation models in Python', duration: '35 min' },
      { id: '20.3', title: 'Using INSTRUCT-tuned models safely', duration: '30 min' },
      { id: '20.4', title: 'Pipelines vs raw model usage', duration: '35 min' },
      { id: '20.5', title: 'Caching and optimizing HF model calls', duration: '30 min' },
    ]
  },
  {
    id: 'module-21',
    title: 'Module 21: Building AI Agents and Agentic Workflows',
    description: 'Create autonomous AI agents',
    icon: '🤖',
    color: 'from-purple-500 to-violet-500',
    submodules: [
      { id: '21.1', title: 'What is an AI agent vs plain LLM', duration: '30 min' },
      { id: '21.2', title: 'Tools, actions, and planning loops', duration: '45 min' },
      { id: '21.3', title: 'Building a simple agent from scratch', duration: '60 min' },
      { id: '21.4', title: 'CLI-based coding assistant with Claude', duration: '75 min' },
      { id: '21.5', title: 'Designing robust agent workflows and retries', duration: '45 min' },
    ]
  },
  {
    id: 'module-22',
    title: 'Module 22: Chat with PDF using RAG',
    description: 'Build a complete PDF chat application',
    icon: '📚',
    color: 'from-red-500 to-orange-500',
    submodules: [
      { id: '22.1', title: 'Loading and chunking PDF documents', duration: '35 min' },
      { id: '22.2', title: 'Creating embeddings and a vector store', duration: '45 min' },
      { id: '22.3', title: 'Retrieval strategies (top-k, scores)', duration: '35 min' },
      { id: '22.4', title: 'Building a basic RAG chain with LangChain', duration: '50 min' },
      { id: '22.5', title: 'Prompting the LLM with retrieved context', duration: '30 min' },
      { id: '22.6', title: 'Handling large documents and edge cases', duration: '40 min' },
      { id: '22.7', title: 'Adding a FastAPI endpoint for chat', duration: '45 min' },
      { id: '22.8', title: 'Frontend or CLI interface for PDF chat', duration: '50 min' },
      { id: '22.9', title: 'Evaluation and debugging of RAG answers', duration: '35 min' },
      { id: '22.10', title: 'Caching and cost optimization', duration: '30 min' },
      { id: '22.11', title: 'Packaging project for reuse', duration: '25 min' },
    ]
  },
  {
    id: 'module-23',
    title: 'Module 23: Scalable RAG with Async Queues & Workers',
    description: 'Production-ready scalable RAG architecture',
    icon: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    submodules: [
      { id: '23.1', title: 'RAG architecture for production', duration: '40 min' },
      { id: '23.2', title: 'Redis/Valkey basics and queue concepts', duration: '35 min' },
      { id: '23.3', title: 'Producer-consumer pattern for RAG jobs', duration: '45 min' },
      { id: '23.4', title: 'Async workers processing retrieval + generation', duration: '50 min' },
      { id: '23.5', title: 'Scaling horizontally with multiple workers', duration: '40 min' },
      { id: '23.6', title: 'Error handling and retries in queues', duration: '35 min' },
      { id: '23.7', title: 'FastAPI integration for job submission and status', duration: '45 min' },
      { id: '23.8', title: 'Monitoring, metrics, and logging', duration: '35 min' },
      { id: '23.9', title: 'When to move to more advanced infra', duration: '25 min' },
    ]
  },
];

export const getGenAIStats = () => {
  const totalModules = genAIModules.length;
  const totalSubmodules = genAIModules.reduce((acc, m) => acc + m.submodules.length, 0);
  const totalDuration = genAIModules.reduce((acc, m) => {
    return acc + m.submodules.reduce((subAcc, s) => {
      const mins = parseInt(s.duration?.replace(' min', '') || '0');
      return subAcc + mins;
    }, 0);
  }, 0);
  
  return {
    totalModules,
    totalSubmodules,
    totalHours: Math.round(totalDuration / 60),
  };
};
