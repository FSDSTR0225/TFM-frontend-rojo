import React, { useEffect, useState } from "react";

const languageColors = {
  JavaScript: "#F2D94E",
  TypeScript: "#3C7DC8",
  Python: "#E3725A",
  CSS: "#6C82B6",
  HTML: "#E2634A",
  Ruby: "#B85A6A",
  Java: "#E49B56",
  PHP: "#6F73C4",
  C: "#7DB276",
  "C++": "#5C7FAA",
  "C#": "#8FB97A",
  Go: "#4AA8C7",
  Swift: "#E88B6C",
  Kotlin: "#4E82C9",
  Rust: "#B3736C",
  Shell: "#8FC67E",
  SQL: "#5E7EA4",
  default: "#707070",
};

function parseRepoUrl(repoUrl) {
  try {
    const url = new URL(repoUrl);
    const [, owner, repo] = url.pathname.split("/");
    if (!owner || !repo) return null;
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    return null;
  }
}

export default function GitHubLanguagesTag({ repoUrl }) {
  const [languages, setLanguages] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoUrl) return;

    const fetchLanguages = async () => {
      setLoading(true);
      setError(null);
      setLanguages(null);

      const parsed = parseRepoUrl(repoUrl);
      if (!parsed) {
        setError("Invalid GitHub repo URL");
        setLoading(false);
        return;
      }

      const { owner, repo } = parsed;
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch languages");
        const data = await res.json();

        setLanguages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [repoUrl]);

  if (loading) return <p style={{ color: "#aaa" }}>Loading languages...</p>;
  if (error) return <p style={{ color: "#ff6b6b" }}>{error}</p>;
  if (!languages || Object.keys(languages).length === 0)
    return <p style={{ color: "#888" }}>No language data available.</p>;

  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 500,
      }}
    >
      <h2 className="text-white text-lg font-semibold select-none">
        Languages
      </h2>
      {Object.entries(languages).map(([language, bytes]) => {
        const color = languageColors[language] || languageColors.default;
        const percentage = ((bytes / totalBytes) * 100).toFixed(1);

        return (
          <div
            key={language}
            title={`${language} — ${percentage}%`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 20,
              backgroundColor: "#2a2a2a",
              color: "#eee",
              fontWeight: 600,
              fontSize: 14,
              userSelect: "none",
              cursor: "default",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <span style={{ flexGrow: 1 }}>{language}</span>
            <span
              style={{
                fontWeight: "500",
                fontSize: 13,
                color: "#ccc",
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {percentage}%
            </span>

            <div
              aria-hidden="true"
              style={{
                position: "relative",
                height: 6,
                borderRadius: 3,
                backgroundColor: "#444",
                overflow: "hidden",
                width: 60,
                marginLeft: 12,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  backgroundColor: color,
                  borderRadius: 3,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
