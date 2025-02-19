import { useParams } from "@solidjs/router";
import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { createSignal, For, Show } from "solid-js";
import { recipeQuery } from "~/modules/pantry/queries";
import {
  createRecipeIngredient,
  createRecipeIngredientGroup,
  createRecipeSection,
  createRecipeStep,
  updateRecipe,
  updateRecipeStep,
} from "~/modules/pantry/server/api";
import { getResizedImageUrl, uploadRecipeImage } from "~/utils/images";

export default function Page() {
  const params = useParams<{ recipeId: string }>();
  const recipe = createQuery(() => recipeQuery(Number(params.recipeId)));

  return (
    <div css={{ p: 20 }}>
      <Show when={recipe.data?.image}>
        <img
          src={getResizedImageUrl(recipe.data?.image?.storage_path || "", 400)}
        />
      </Show>
      <UploadImage recipeId={Number(params.recipeId)} />
      <h1 css={{ fontSize: 26, lineHeight: "32px", weight: 700 }}>
        {recipe.data?.name}
      </h1>
      <p css={{ width: "100%", maxWidth: "64ch" }}>
        {recipe.data?.description}
      </p>
      <EditDescription
        recipeId={recipe.data?.id!}
        description={recipe.data?.description || ""}
      />
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
                <div css={{ spaceY: 20 }}>
                  <For each={section.ingredientGroups}>
                    {(group) => (
                      <div>
                        {group.name}
                        <ul
                          css={{
                            borderLeft: `1px solid black`,
                            pl: 9,
                            ml: -10,
                          }}
                        >
                          <For each={group.ingredients}>
                            {(ingredient) => <li>{ingredient.ingredient}</li>}
                          </For>
                          <NewIngredient
                            groupId={group.id}
                            sequence={group.ingredients.length}
                          />
                        </ul>
                      </div>
                    )}
                  </For>
                  <NewIngredientGroup
                    sectionId={section.id}
                    sequence={section.ingredientGroups.length}
                  />
                </div>
                <div>
                  <ol css={{ listStyleType: "decimal", pl: 40 }}>
                    <For each={section.steps}>
                      {(step) => (
                        <li>
                          {step.step}
                          {/* <EditStep stepId={step.id} description={step.step} /> */}
                        </li>
                      )}
                    </For>
                    <li>
                      <NewStep
                        sectionId={section.id}
                        sequence={section.steps.length}
                      />
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </For>
        <NewSection
          recipeId={recipe.data?.id!}
          sequence={recipe.data?.sections.length || 0}
        />
      </div>
    </div>
  );
}

function UploadImage(props: { recipeId: number }) {
  const [file, setFile] = createSignal<File | undefined>(undefined);
  const qc = useQueryClient();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const image = file();
        if (image) {
          const imageId = await uploadRecipeImage(image);
          await updateRecipe(props.recipeId, { image_id: imageId });
          qc.invalidateQueries(recipeQuery(props.recipeId));
        }
      }}
    >
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

function EditDescription(props: { recipeId: number; description: string }) {
  const [value, setValue] = createSignal(props.description);
  return (
    <form
      css={{
        border: `1px solid black`,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        updateRecipe(props.recipeId, { description: value() });
      }}
    >
      <textarea
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        css={{ resize: "both" }}
      />
      <button type="submit">Edit</button>
    </form>
  );
}

function NewSection(props: { recipeId: number; sequence: number }) {
  const [value, setValue] = createSignal("");
  const qc = useQueryClient();
  return (
    <form
      css={{
        border: `1px solid black`,
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeSection({
          recipeId: props.recipeId,
          name: value(),
          sequence: props.sequence,
        });
        qc.invalidateQueries(recipeQuery(props.recipeId));
      }}
    >
      <input
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Section"
        css={{ resize: "both" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function NewIngredientGroup(props: { sectionId: number; sequence: number }) {
  const [value, setValue] = createSignal("");
  const qc = useQueryClient();
  return (
    <form
      css={
        {
          // border: `1px solid black`,
        }
      }
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeIngredientGroup({
          sectionId: props.sectionId,
          name: value(),
          sequence: props.sequence,
        });
        qc.invalidateQueries();
      }}
    >
      <input
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Ingredient Group"
        css={{ resize: "both" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function NewIngredient(props: { groupId: number; sequence: number }) {
  const [value, setValue] = createSignal("");
  const qc = useQueryClient();
  return (
    <form
      css={
        {
          // border: `1px solid black`,
        }
      }
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeIngredient({
          groupId: props.groupId,
          ingredient: value(),
          sequence: props.sequence,
        });
        qc.invalidateQueries();
      }}
    >
      <input
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Ingredient"
        css={{ resize: "both" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function NewStep(props: { sectionId: number; sequence: number }) {
  const [value, setValue] = createSignal("");
  const qc = useQueryClient();
  return (
    <form
      css={{
        border: `1px solid black`,
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        await createRecipeStep({
          sectionId: props.sectionId,
          step: value(),
          sequence: props.sequence,
        });
        qc.invalidateQueries();
      }}
    >
      <textarea
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New Step"
        css={{ resize: "both" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function EditStep(props: { stepId: number; description: string }) {
  const [value, setValue] = createSignal(props.description);
  const qc = useQueryClient();
  return (
    <form
      css={{
        border: `1px solid black`,
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        await updateRecipeStep(props.stepId, {
          step: value(),
        });
        qc.invalidateQueries();
      }}
    >
      <textarea
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Update Step"
        css={{ resize: "both" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}
