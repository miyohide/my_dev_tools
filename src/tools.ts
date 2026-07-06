/**
 * Text transformation tool definitions and implementations.
 */

export type ToolId =
  | "quote"
  | "uppercase"
  | "lowercase"
  | "trim"
  | "trim-lines"
  | "number-lines"
  | "remove-empty-lines"
  | "add-prefix"
  | "add-suffix"
  | "reverse-lines"
  | "sort-lines"
  | "unique-lines"
  | "count-chars";

export interface ToolOption {
  /** Whether this tool requires an additional option input */
  requiresOption: boolean;
  /** Label for the option input field */
  optionLabel?: string;
  /** Placeholder text for the option input */
  optionPlaceholder?: string;
}

export const toolOptions: Record<ToolId, ToolOption> = {
  quote: { requiresOption: false },
  uppercase: { requiresOption: false },
  lowercase: { requiresOption: false },
  trim: { requiresOption: false },
  "trim-lines": { requiresOption: false },
  "number-lines": { requiresOption: false },
  "remove-empty-lines": { requiresOption: false },
  "add-prefix": {
    requiresOption: true,
    optionLabel: "プレフィックス:",
    optionPlaceholder: "各行の先頭に追加する文字列",
  },
  "add-suffix": {
    requiresOption: true,
    optionLabel: "サフィックス:",
    optionPlaceholder: "各行の末尾に追加する文字列",
  },
  "reverse-lines": { requiresOption: false },
  "sort-lines": { requiresOption: false },
  "unique-lines": { requiresOption: false },
  "count-chars": { requiresOption: false },
};

/**
 * Apply the specified text transformation tool to the input text.
 */
export function transform(toolId: ToolId, input: string, option?: string): string {
  switch (toolId) {
    case "quote":
      return addQuote(input);
    case "uppercase":
      return toUpperCase(input);
    case "lowercase":
      return toLowerCase(input);
    case "trim":
      return trimText(input);
    case "trim-lines":
      return trimLines(input);
    case "number-lines":
      return numberLines(input);
    case "remove-empty-lines":
      return removeEmptyLines(input);
    case "add-prefix":
      return addPrefix(input, option ?? "");
    case "add-suffix":
      return addSuffix(input, option ?? "");
    case "reverse-lines":
      return reverseLines(input);
    case "sort-lines":
      return sortLines(input);
    case "unique-lines":
      return uniqueLines(input);
    case "count-chars":
      return countChars(input);
    default:
      return input;
  }
}

/** Add "> " prefix to each line (blockquote style) */
export function addQuote(input: string): string {
  return input
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

/** Convert all characters to uppercase */
export function toUpperCase(input: string): string {
  return input.toUpperCase();
}

/** Convert all characters to lowercase */
export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

/** Trim leading and trailing whitespace from the entire text */
export function trimText(input: string): string {
  return input.trim();
}

/** Trim leading and trailing whitespace from each line */
export function trimLines(input: string): string {
  return input
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

/** Add line numbers (1-based) to each line */
export function numberLines(input: string): string {
  const lines = input.split("\n");
  const width = String(lines.length).length;
  return lines.map((line, i) => `${String(i + 1).padStart(width, " ")}: ${line}`).join("\n");
}

/** Remove empty lines (lines with only whitespace) */
export function removeEmptyLines(input: string): string {
  return input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}

/** Add a prefix string to the beginning of each line */
export function addPrefix(input: string, prefix: string): string {
  return input
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

/** Add a suffix string to the end of each line */
export function addSuffix(input: string, suffix: string): string {
  return input
    .split("\n")
    .map((line) => `${line}${suffix}`)
    .join("\n");
}

/** Reverse the order of lines */
export function reverseLines(input: string): string {
  return input.split("\n").reverse().join("\n");
}

/** Sort lines alphabetically */
export function sortLines(input: string): string {
  return input
    .split("\n")
    .sort((a, b) => a.localeCompare(b))
    .join("\n");
}

/** Remove duplicate lines (preserve first occurrence order) */
export function uniqueLines(input: string): string {
  const seen = new Set<string>();
  return input
    .split("\n")
    .filter((line) => {
      if (seen.has(line)) {
        return false;
      }
      seen.add(line);
      return true;
    })
    .join("\n");
}

/** Count characters, words, and lines */
export function countChars(input: string): string {
  const chars = input.length;
  const charsNoSpaces = input.replace(/\s/g, "").length;
  const lines = input === "" ? 0 : input.split("\n").length;
  const words = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;

  return [
    `文字数: ${chars}`,
    `文字数（空白除く）: ${charsNoSpaces}`,
    `単語数: ${words}`,
    `行数: ${lines}`,
  ].join("\n");
}
