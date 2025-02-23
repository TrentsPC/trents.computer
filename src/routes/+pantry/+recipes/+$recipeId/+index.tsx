import { createQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import { recipeQuery } from "~/modules/pantry/queries";
import { getResizedImageUrl } from "~/utils/images";

export const Route = createFileRoute("/pantry/recipes/$recipeId/")({
  component: Page,
});

function Page() {
  const params = Route.useParams();
  const recipe = createQuery(() => recipeQuery(Number(params().recipeId)));

  return (
    <div
      css={{
        fontFamily: "Signifier, sans-serif",
        fontSize: 18,
        lineHeight: 1.75,
        backgroundColor: "#fffbe6",
        color: "#356859",
      }}
    >
      <div css={{ "@lg": { display: "flex", gap: 16 } }}>
        <div css={{ flex: "1 0 0px" }}>
          <Show when={recipe.data?.image}>
            <img
              css={{ flex: "1 0 0px", minWidth: 0 }}
              src={getResizedImageUrl(
                recipe.data?.image?.storage_path || "",
                600
              )}
            />
          </Show>
          <div css={{ padding: 16, flex: "1 0 0px" }}>
            <div>
              <div
                css={{
                  mb: 10,
                }}
              >
                <h1
                  css={{
                    fontSize: 26,
                    lineHeight: "32px",
                    fontWeight: 600,
                  }}
                >
                  {recipe.data?.name}
                </h1>
                <Show when={recipe.data?.book}>
                  <p css={{ fontSize: 16 }}>
                    From{" "}
                    <a
                      href={`/pantry/books/${recipe.data?.book?.id}`}
                      css={{ fontWeight: 600 }}
                    >
                      {recipe.data?.book?.title}
                    </a>
                  </p>
                </Show>
              </div>
              <p css={{ width: "100%", maxWidth: "64ch", textWrap: "pretty" }}>
                {recipe.data?.description}
              </p>
            </div>
          </div>
        </div>
        <div css={{ padding: 16, flex: "1 0 0px" }}>
          <div css={{ spaceY: 60 }}>
            <For each={recipe.data?.sections}>
              {(section) => (
                <div>
                  <p css={{ fontWeight: 500 }}>{section.name}</p>
                  <div css={{ spaceY: 20 }}>
                    <Show when={section.ingredientGroups.length > 0}>
                      <div css={{ spaceY: 20 }}>
                        <For each={section.ingredientGroups}>
                          {(group) => (
                            <div
                              css={{
                                borderLeft: `1px solid black`,
                                pl: 7,
                                ml: -8,
                              }}
                            >
                              <span css={{ fontWeight: 600 }}>
                                {group.name}
                              </span>
                              <ul
                                css={{
                                  pl: "1em",
                                  textIndent: "-1em",
                                  textWrap: "pretty",
                                }}
                              >
                                <For each={group.ingredients}>
                                  {(ingredient) => (
                                    <li>{ingredient.ingredient}</li>
                                  )}
                                </For>
                              </ul>
                            </div>
                          )}
                        </For>
                      </div>
                    </Show>

                    <ol css={{ spaceY: 20 }}>
                      <For each={section.steps}>
                        {(step) => <li>{step.step}</li>}
                      </For>
                    </ol>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}
