import React from "react";
import "./ReactParser.css";

// Palabras clave JS para resaltar
const keywords = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default",
  "delete", "do", "else", "export", "extends", "finally", "for", "function", "if",
  "import", "in", "instanceof", "let", "new", "return", "super", "switch", "this",
  "throw", "try", "typeof", "var", "void", "while", "with", "yield", "async", "await",
  "true", "false", "null", "undefined"
]);

function tokenize(code) {
  // Un parser simple para JS, detecta comentarios, strings, números, keywords
  const tokens = [];
  const regex = /\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[{}()[\].,;:+\-*/%=&|<>!?^~]/gm;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      // Texto entre tokens (espacios, saltos línea...)
      tokens.push({ type: "plain", value: code.slice(lastIndex, match.index) });
    }

    const token = match[0];
    let type = "plain";

    if (/^\/\//.test(token) || /^\/\*/.test(token)) type = "comment";
    else if (/^["']/.test(token)) type = "string";
    else if (/^\d/.test(token)) type = "number";
    else if (keywords.has(token)) {
      if (token === "true" || token === "false") type = "boolean";
      else if (token === "null") type = "null";
      else type = "keyword";
    }
    else if (/^[{}()[\].,;:+\-*/%=&|<>!?^~]$/.test(token)) type = "operator";
    else type = "variable";

    tokens.push({ type, value: token });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: "plain", value: code.slice(lastIndex) });
  }

  return tokens;
}

export function CodeBlock({ code }) {
  const tokens = tokenize(code);

  return (
    <div className="code-container" tabIndex={0} aria-label="Code block">
      <div className="code-controls">
        <span className="red" />
        <span className="yellow" />
        <span className="green" />
      </div>
      <pre>
        {tokens.map((token, i) => (
          <span key={i} className={`token ${token.type}`}>
            {token.value}
          </span>
        ))}
      </pre>
    </div>
  );
}
