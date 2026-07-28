import type { MDXComponents } from "mdx/types";

export function getMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return {
    table: (props) => (
      <table
        className="mb-6 w-full border-collapse overflow-hidden rounded-xl border border-slate-200"
        {...props}
      />
    ),

    thead: (props) => (
      <thead
        className="bg-slate-200"
        {...props}
      />
    ),

    tr: (props) => (
      <tr
        className="even:bg-slate-100"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border border-slate-200 px-4 py-3"
        {...props}
      />
    ),

    th: (props) => (
      <th
        className="border border-slate-100 px-4 py-3 text-left font-semibold"
        {...props}
      />
    ),

    ...components,
  };
}