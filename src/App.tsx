import { recipes, substitutions } from "./data/recipes";
import { usePlan } from "./hooks/usePlan";

export default function App() {
  const { plan, update, undo, reset, canUndo } = usePlan();
  const recipe = recipes.find((r) => r.id === plan.recipeId)!;
  const sub = substitutions.find((s) => s.id === plan.substitutionId);
  const effective = sub ? sub.apply(recipe) : recipe;
  // const scale = plan.servings / recipe.baseServings;

  return (
    <main
      style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "system-ui" }}
    >
      <h1>Meal Planner</h1>
      {/* Step indicator — Heuristic 6 */}
      <p aria-label="Steps">Step 2 of 3: Adjust your plan</p>

      {/* Recipe selector — Heuristic 4 */}
      <label>
        Recipe:{" "}
        <select
          value={plan.recipeId}
          onChange={(e) =>
            update({ recipeId: e.target.value, substitutionId: null })
          }
        >
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      {/* Serving scaler — Heuristic 8 (tinker mindfully) */}
      <div style={{ margin: "1rem 0" }}>
        <button
          onClick={() => update({ servings: Math.max(1, plan.servings - 1) })}
        >
          −
        </button>
        <span aria-live="polite"> {plan.servings} servings </span>
        <button onClick={() => update({ servings: plan.servings + 1 })}>
          +
        </button>
      </div>

      {/* Benefit/ Cost notes — Heuristics 1 & 2 */}
      <p>Estimated cook time: {Math.round(recipe.baseCookMinutes)} min</p>

      {/* Substitution — Heuristic 7 (try different approaches) */}
      <label>
        <input
          type="checkbox"
          checked={!!plan.substitutionId}
          onChange={(e) =>
            update({
              substitutionId: e.target.checked ? substitutions[0].id : null,
            })
          }
        />
        Dairy-free
      </label>
      {sub && <p role="note">⚠ {sub.costNote}</p>}

      {/* Ingredients — Heuristic 3 (details on demand) */}
      <details>
        <summary>Ingredient details</summary>
        <ul>
          {effective.ingredients.map((i) => (
            <li key={i.name}>
              {i.name}: {Math.round(i.amountPerServing * plan.servings)}{" "}
              {i.unit}
            </li>
          ))}
        </ul>
      </details>

      {/* Undo / Reset — Heuristics 5 & 8 */}
      <div style={{ marginTop: "1rem", display: "flex", gap: 8 }}>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={reset}>Reset to original</button>
      </div>
    </main>
  );
}
