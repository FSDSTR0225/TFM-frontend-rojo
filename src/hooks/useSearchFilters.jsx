import { useState, useMemo } from "react";

export function useSearchFilters(results, type) {
  const [dateFilterSelected, setDateFilterSelected] = useState(null);
  const [offerTypeFilterSelected, setOfferTypeFilterSelected] = useState(null);

  const dateFilters = [
    { label: "Today", value: "today" },
    { label: "Last week", value: "week" },
    { label: "Last month", value: "month" },
    { label: "Last year", value: "year" },
  ];

  const offerTypeFilters = [
    "Full-time",
    "Permanent",
    "Part-time",
    "Temp",
    "Freelance",
    "Intern",
  ];

  const toggleDateFilter = (val) => {
    setDateFilterSelected((prev) => (prev === val ? null : val));
  };

  const toggleOfferTypeFilter = (val) => {
    setOfferTypeFilterSelected((prev) => (prev === val ? null : val));
  };

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      if ((type === "offers" || type === "projects") && dateFilterSelected) {
        if (!item.createdAt) return false;
        const publishDate = new Date(item.createdAt);

        switch (dateFilterSelected) {
          case "today": {
            const now = new Date();
            if (
              publishDate.getDate() !== now.getDate() ||
              publishDate.getMonth() !== now.getMonth() ||
              publishDate.getFullYear() !== now.getFullYear()
            )
              return false;
            break;
          }
          case "week": {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            if (publishDate < weekAgo) return false;
            break;
          }
          case "month": {
            const monthAgo = new Date();
            monthAgo.setDate(monthAgo.getDate() - 30);
            if (publishDate < monthAgo) return false;
            break;
          }
          case "year": {
            const yearAgo = new Date();
            yearAgo.setDate(yearAgo.getDate() - 365);
            if (publishDate < yearAgo) return false;
            break;
          }
          default:
            break;
        }
      }

      if (type === "offers" && offerTypeFilterSelected) {
        const contractType = item.contractType;
        if (typeof contractType === "string") {
          if (
            contractType.toLowerCase() !== offerTypeFilterSelected.toLowerCase()
          )
            return false;
        } else if (Array.isArray(contractType)) {
          const match = contractType.some(
            (ct) => ct.toLowerCase() === offerTypeFilterSelected.toLowerCase()
          );
          if (!match) return false;
        } else {
          return false;
        }
      }

      return true;
    });
  }, [results, type, dateFilterSelected, offerTypeFilterSelected]);

  return {
    dateFilters,
    offerTypeFilters,
    dateFilterSelected,
    offerTypeFilterSelected,
    toggleDateFilter,
    toggleOfferTypeFilter,
    filteredResults,
  };
}
