import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { executePythonCode, getAiExplanation } from '../services/geminiService';
import { ExecutionResult } from '../types';

interface CodeEditorProps {
  initialCode: string;
  onRunSuccess?: () => void;
  lessonId: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, onRunSuccess, lessonId }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [isExplainLoading, setIsExplainLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  // Reset code when lesson changes
  useEffect(() => {
    setCode(initialCode);
    setOutput("");
    setExplanation(null);
  }, [initialCode, lessonId]);

  const handleRun = async () => {
    setIsRunning(true);
    setExplanation(null);
    setOutput(""); // Clear previous output
    
    // Artificial minimum delay for "feel"
    const startTime = Date.now();
    
    const result: ExecutionResult = await executePythonCode(code);
    
    const elapsed = Date.now() - startTime;
    if (elapsed < 600) {
      await new Promise(resolve => setTimeout(resolve, 600 - elapsed));
    }

    setOutput(result.output);
    setIsRunning(false);

    if (!result.error && onRunSuccess) {
      onRunSuccess();
    }
  };

  const handleExplain = async () => {
    setIsExplainLoading(true);
    const exp = await getAiExplanation("Explain what this code does and any output it generates", code);
    setExplanation(exp);
    setIsExplainLoading(false);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setExplanation(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-gray-800">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs text-gray-400 font-mono">main.py</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative min-h-[300px]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-[#1e1e1e] text-gray-200 font-mono text-sm resize-none focus:outline-none custom-scrollbar leading-6"
          spellCheck={false}
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 bg-[#252526] border-t border-gray-800 flex items-center justify-between">
         <button
          onClick={handleExplain}
          disabled={isExplainLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
        >
          {isExplainLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageSquare className="w-3 h-3" />}
          AI Explain
        </button>

        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all
            ${isRunning 
              ? 'bg-primary-700 text-white cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/20'}
          `}
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Output Console */}
      <div className="bg-[#1e1e1e] border-t border-gray-800">
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-[#252526]">
          Terminal Output
        </div>
        <div className="p-4 font-mono text-sm min-h-[120px] max-h-[200px] overflow-y-auto custom-scrollbar">
          {output ? (
            <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
          ) : (
            <div className="text-gray-600 italic">Hit run to see output...</div>
          )}
           
           {explanation && (
             <div className="mt-4 pt-4 border-t border-gray-800 animate-fadeIn">
               <div className="flex items-center gap-2 mb-2 text-primary-400 text-xs font-bold uppercase">
                 <MessageSquare className="w-3 h-3" />
                 AI Tutor
               </div>
               <p className="text-gray-300 text-sm leading-relaxed">{explanation}</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
