import { useMemo } from "react";

export function useSortedResults(results, sortOrder = "desc") {
  return useMemo(() => {
    if (!results || results.length === 0) return [];

    return [...results].sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [results, sortOrder]);
}
