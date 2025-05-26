import React, { useEffect, useState } from "react";
import {
  PiCaretRight,
  PiCaretDown,
  PiFolder,
  PiFolderOpen,
  PiFile,
} from "react-icons/pi";

const lessRelevantExtensions = [".md", ".yml", ".yaml", ".json", ".lock", ".gitignore"];

const isLessRelevant = (filename) =>
  lessRelevantExtensions.some((ext) => filename.endsWith(ext));

const buildTree = (treeItems) => {
  const root = [];

  treeItems.forEach(({ path, type }) => {
    const parts = path.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      const existingPath = currentLevel.find((item) => item.name === part);

      if (existingPath) {
        if (!existingPath.children) existingPath.children = [];
        currentLevel = existingPath.children;
      } else {
        const newNode = {
          name: part,
          type: index === parts.length - 1 ? type : "tree",
          children: [],
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children;
      }
    });
  });

  const cleanEmptyChildren = (nodes) => {
    nodes.forEach((node) => {
      if (node.type === "blob") delete node.children;
      else cleanEmptyChildren(node.children);
    });
  };
  cleanEmptyChildren(root);

  return root;
};

const TreeNode = ({ node, level = 0, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = () => {
    if (node.type === "tree") setIsOpen((open) => !open);
  };

  const fileColorClass =
    node.type === "blob" && isLessRelevant(node.name)
      ? "text-neutral-50"
      : "text-neutral-30";

  return (
    <div className={`tree-node level-${level} ${isLast ? "last" : ""}`}>
      <div
        className={`tree-node-label ${fileColorClass}`}
        onClick={toggleOpen}
        style={{ cursor: node.type === "tree" ? "pointer" : "default" }}
        aria-expanded={isOpen}
        role={node.type === "tree" ? "button" : undefined}
        tabIndex={node.type === "tree" ? 0 : undefined}
        onKeyDown={(e) => {
          if (
            node.type === "tree" &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            toggleOpen();
          }
        }}
      >
        {node.type === "tree" && (
          <span
            className="tree-node-icon-caret"
            aria-label={isOpen ? "Collapse folder" : "Expand folder"}
            style={{ color: "var(--color-primary-70)" }}
          >
            {isOpen ? (
              <PiCaretDown size={14} />
            ) : (
              <PiCaretRight size={14} />
            )}
          </span>
        )}
        <span
          className="tree-node-icon-file"
          style={{ 
            width: 18,
            textAlign: "center",
            color: "var(--color-primary-80)",
          }}
        >
          {node.type === "tree" ? (
            isOpen ? (
              <PiFolder size={18} />
            ) : (
              <PiFolderOpen size={18} />
            )
          ) : (
            <PiFile size={18} />
          )}
        </span>
        <span>{node.name}</span>
      </div>

      {hasChildren && isOpen && (
        <div className="tree-node-children">
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              level={level + 1}
              isLast={i === node.children.length - 1}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .tree-node {
          position: relative;
          padding-left: 20px;
          font-family: monospace;
          font-size: 0.875rem;
          color: var(--color-neutral-30);
          user-select: none;
        }
        .tree-node-label {
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.4;
        }
        .text-neutral-50 {
          color: var(--color-neutral-50);
        }
        .text-neutral-40 {
          color: var(--color-neutral-40);
        }
        .tree-node-icon-caret {
          display: inline-flex;
          user-select: none;
        }
        .tree-node-children {
          margin-left: 14px;
          border-left: 1px solid var(--color-neutral-70);
          padding-left: 6px;
          margin-top: 2px;
        }
        .tree-node:last-child .tree-node-children {
          border-left: none;
          padding-left: 0;
          margin-left: 0;
        }
        .tree-node-label::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 6px;
          width: 14px;
          height: 1px;
          background: var(--color-neutral-70);
          transform: translateY(-50%);
          z-index: -1;
        }
        .tree-node.level-0 > .tree-node-label::before {
          display: none;
        }
        .tree-node.last > .tree-node-label::before {
          width: 7px;
        }
      `}</style>
    </div>
  );
};

const GitHubFileTree = ({ repoUrl }) => {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoUrl) return;

    const fetchTree = async () => {
      try {
        setLoading(true);
        setError(null);

        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) throw new Error("Invalid GitHub URL");

        const owner = match[1];
        const repo = match[2];

        const repoResp = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!repoResp.ok) throw new Error("Failed to fetch repository");
        const repoData = await repoResp.json();
        const branch = repoData.default_branch;

        const treeResp = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
        );
        if (!treeResp.ok) throw new Error("Failed to fetch tree");

        const treeData = await treeResp.json();

        const treeBuilt = buildTree(treeData.tree);
        setTree(treeBuilt);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [repoUrl]);

  if (loading) return <p>Loading file structure...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tree) return null;

  return (
    <div className="my-6 p-6 bg-neutral-80 rounded-lg border border-neutral-70 w-full">
      <h2 className="text-white text-lg font-semibold mb-4 select-none">
        File Tree
      </h2>
      <div className="max-h-48 overflow-auto">
        {tree.map((node, i) => (
          <TreeNode key={i} node={node} isLast={i === tree.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default GitHubFileTree;
