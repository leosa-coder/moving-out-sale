export type Theme = "light" | "dark";

export function resolveInitialTheme(savedTheme: string | null | undefined): Theme {
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}
