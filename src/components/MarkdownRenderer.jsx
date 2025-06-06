"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react"; // Icons for copy 
import remarkGfm from "remark-gfm";

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  return (
    <div className="relative bg-[#282C34] text-white rounded-lg overflow-hidden my-4">
      {/* Header with Copy Button */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-sm font-mono">
        <span className="text-gray-300">{language || "plaintext"}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      {/* Code Block */}
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        customStyle={{ margin: 0, padding: "12px" }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="text-[45px] font-bold mt-4 mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-4xl font-semibold mt-4 mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-3xl font-medium mt-4 mb-2">{children}</h3>,
        h4: ({ children }) => <h4 className="text-3xl font-medium mt-3 mb-2">{children}</h4>,
        h5: ({ children }) => <h5 className="text-2xl font-medium mt-3 mb-2">{children}</h5>,
        h6: ({ children }) => <h6 className="text-2xl font-medium mt-3 mb-2">{children}</h6>,
        ul: ({ children }) => <ul className="list-disc mt-3 mb-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal mt-3 mb-2 pl-6">{children}</ol>,
        li: ({ children }) => <li className="ml-4 text-2xl">{children}</li>,
        p: ({ children }) => <p className="mt-2 mb-2 text-2xl">{children}</p>,
        hr: () => <hr className="mt-5 mb-5 !border-[#ebebeb]"/>,
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full table-auto border border-collapse border-gray-400 text-left text-xl">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-gray-200">{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr className="border-b border-gray-300">{children}</tr>,
        th: ({ children }) => <th className="px-4 py-2 font-bold border border-gray-300">{children}</th>,
        td: ({ children }) => <td className="px-4 py-2 border border-gray-300">{children}</td>,
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          
          if (match) {
            // Code block with language
            return <CodeBlock language={match[1]}>{children}</CodeBlock>;
          } else if (className === undefined) {
            // Inline code or a code block without language
            if (String(children).includes("\n")) {
              return <CodeBlock language="plaintext">{children}</CodeBlock>;
            } else {
              return (
                <code className="bg-neutral-700 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            }
          }
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
