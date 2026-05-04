export * from "./types";
export * from "./matcher";
export * from "./textRegistry";
export { default as SpreadComposer } from "./SpreadComposer";
export { getTheme, listThemes, registerTheme } from "./themes/registry";
export type { ThemeModule, SpreadComposerProps } from "./themes/registry";

// Register built-in themes
import "./themes/wanderbound/index";
import "./themes/highland/index";
import "./themes/city/index";
