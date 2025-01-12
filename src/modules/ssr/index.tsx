import { styled } from "@hypergood/css";
import { createQuery, queryOptions } from "@tanstack/solid-query";
import { Show } from "solid-js";
import initSqlJs, { Database } from "sql.js";
// import dbUrl from "./ssr-db.sqlite?url";
const dbUrl = "";

const dbQuery = queryOptions({
  queryKey: ["ssr-db"],
  staleTime: Infinity,
  queryFn: async () => {
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });
    const buf = await fetch(dbUrl).then((res) => res.arrayBuffer());
    const db = new SQL.Database(new Uint8Array(buf));
    return db;
  },
});

type Chapter = {
  id: number;
  title: string;
  slug: string;
  has_status: number;
  health_html: string;
  mp_html: string;
  level_html: string;
  location_html: string;
  is_ending: number;
  raw_html: string;
};

function asChapters(res: initSqlJs.QueryExecResult) {
  const columns = res.columns;

  const result: Chapter[] = res.values.map((row) => {
    const obj: any = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
  return result;
}

function getChapterBySlug(db: Database, slug: string) {
  const [res] = db.exec(`SELECT * FROM chapters WHERE slug = '${slug}'`);
  return res ? asChapters(res)[0] : undefined;
}

function fixHtml(html: string) {
  return html.replaceAll(`href="/`, `href="/ssr/`);
}

export function ChapterView(props: { slug: string }) {
  const query = createQuery(() => dbQuery);

  const chapter = () => {
    if (!query.data) return;
    return getChapterBySlug(query.data, props.slug);
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
        rel="stylesheet"
      ></link>
      <Show when={query.data}>
        <Prose>
          <Title>{chapter()?.title}</Title>
          <div innerHTML={fixHtml(chapter()?.raw_html || "")} />
        </Prose>
      </Show>
    </div>
  );
}

const Title = styled("h1", {
  fontSize: 32,
  fontWeight: "bold",
  textAlign: "center",
});

const Prose = styled("div", {
  width: "100%",
  maxW: "60ch",
  "& p, & ul": { mb: "1em" },
  mx: "auto",
  fontFamily: "EB Garamond, serif",
  fontSize: 24,
  lineHeight: 1.5,
  "& a": {
    fontWeight: 500,
    color: "blue",
  },
  "& .new": {
    color: "red",
    pointerEvents: "none",
  },
});
