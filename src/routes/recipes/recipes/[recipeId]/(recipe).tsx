import { useParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { For } from "solid-js";
import { recipeQuery } from "~/modules/recipes/queries";

export default function Page() {
  const params = useParams<{ recipeId: string }>();
  const recipe = createQuery(() => recipeQuery(Number(params.recipeId)));
  // const qc = useQueryClient();

  // const [newDescription, setNewDescription] = createSignal(
  //   recipe.data?.description || ""
  // );

  return (
    <div>
      <h1 css={{ fontSize: 26, lineHeight: "32px", weight: 700 }}>
        {recipe.data?.name}
      </h1>
      <p css={{ width: "100%", maxWidth: "64ch" }}>
        {recipe.data?.description}
      </p>
      <div
        css={{
          divideY: `1px solid rgba(0,0,0,0.05)`,
          // fontSize: 13,
          // lineHeight: "16px",
        }}
      >
        <For each={recipe.data?.sections}>
          {(section) => (
            <div css={{ py: 20 }}>
              <p css={{ fontWeight: 500 }}>{section.name}</p>
              <div css={{ display: "flex" }}>
                <div>
                  <For each={section.ingredientGroups}>
                    {(group) => (
                      <div>
                        {group.name}
                        <ul>
                          <For each={group.ingredients}>
                            {(ingredient) => <li>{ingredient.ingredient}</li>}
                          </For>
                        </ul>
                      </div>
                    )}
                  </For>
                </div>
                <div>
                  <ol css={{ listStyleType: "decimal", pl: 40 }}>
                    <For each={section.steps}>
                      {(step) => <li>{step.step}</li>}
                    </For>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
