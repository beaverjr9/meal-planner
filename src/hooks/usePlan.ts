import { useEffect, useState, useCallback } from "react";
import type { PlanState } from "../types";

const DEFAULT: PlanState = {
  recipeId: "pasta",
  servings: 2,
  substitutionId: null,
};
const STORAGE_KEY = "meal-planner-plan";

function loadInitial(): PlanState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PlanState) : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function usePlan() {
  const [plan, setPlan] = useState<PlanState>(loadInitial);
  const [history, setHistory] = useState<PlanState[]>([]);

  // Persistence (reliability quality attribute)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  const update = useCallback(
    (patch: Partial<PlanState>) => {
      setHistory((h) => [...h, plan]);
      setPlan((p) => ({ ...p, ...patch }));
    },
    [plan],
  );

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setPlan(prev);
      return h.slice(0, -1);
    });
  }, []);

  const reset = useCallback(() => {
    setHistory((h) => [...h, plan]);
    setPlan(DEFAULT);
  }, [plan]);

  return { plan, update, undo, reset, canUndo: history.length > 0 };
}
