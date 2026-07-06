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
  | "count-chars"
  | "json-pretty"
  | "json-minify"
  | "json-to-yaml"
  | "yaml-to-json"
  | "csv-to-tsv"
  | "tsv-to-csv"
  | "to-camel-case"
  | "to-snake-case"
  | "to-kebab-case";

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
  "json-pretty": { requiresOption: false },
  "json-minify": { requiresOption: false },
  "json-to-yaml": { requiresOption: false },
  "yaml-to-json": { requiresOption: false },
  "csv-to-tsv": { requiresOption: false },
  "tsv-to-csv": { requiresOption: false },
  "to-camel-case": { requiresOption: false },
  "to-snake-case": { requiresOption: false },
  "to-kebab-case": { requiresOption: false },
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
    case "json-pretty":
      return jsonPretty(input);
    case "json-minify":
      return jsonMinify(input);
    case "json-to-yaml":
      return jsonToYaml(input);
    case "yaml-to-json":
      return yamlToJson(input);
    case "csv-to-tsv":
      return csvToTsv(input);
    case "tsv-to-csv":
      return tsvToCsv(input);
    case "to-camel-case":
      return toCamelCase(input);
    case "to-snake-case":
      return toSnakeCase(input);
    case "to-kebab-case":
      return toKebabCase(input);
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

// =============================================================================
// Format conversion tools
// =============================================================================

/** Format JSON with indentation (pretty print) */
export function jsonPretty(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return `エラー: 無効なJSONです - ${(e as Error).message}`;
  }
}

/** Minify JSON (remove whitespace) */
export function jsonMinify(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (e) {
    return `エラー: 無効なJSONです - ${(e as Error).message}`;
  }
}

/** Convert JSON to YAML format */
export function jsonToYaml(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return toYamlString(parsed, 0);
  } catch (e) {
    return `エラー: 無効なJSONです - ${(e as Error).message}`;
  }
}

function toYamlString(value: unknown, indent: number): string {
  const prefix = "  ".repeat(indent);

  if (value === null) {
    return "null";
  }
  if (typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    // Quote strings that could be misinterpreted
    if (
      value === "" ||
      value === "true" ||
      value === "false" ||
      value === "null" ||
      /^\d/.test(value) ||
      /[:#{}[\],&*?|>!'"%@`]/.test(value) ||
      value.includes("\n")
    ) {
      return JSON.stringify(value);
    }
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const lines = value.map((item) => {
      const itemStr = toYamlString(item, indent + 1);
      if (typeof item === "object" && item !== null) {
        return `${prefix}- ${itemStr.trimStart()}`;
      }
      return `${prefix}- ${itemStr}`;
    });
    return "\n" + lines.join("\n");
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, val]) => {
      const valStr = toYamlString(val, indent + 1);
      if (typeof val === "object" && val !== null && !(Array.isArray(val) && val.length === 0) && !(Object.keys(val as object).length === 0)) {
        return `${prefix}${key}:${valStr}`;
      }
      return `${prefix}${key}: ${valStr}`;
    });
    return (indent === 0 ? "" : "\n") + lines.join("\n");
  }
  return String(value);
}

/** Convert YAML to JSON format */
export function yamlToJson(input: string): string {
  try {
    const parsed = parseSimpleYaml(input);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return `エラー: YAMLの解析に失敗しました - ${(e as Error).message}`;
  }
}

/**
 * Simple YAML parser supporting:
 * - key: value pairs
 * - nested objects (indentation-based)
 * - arrays (- item)
 * - strings (quoted and unquoted)
 * - numbers, booleans, null
 */
function parseSimpleYaml(input: string): unknown {
  const lines = input.split("\n");
  const result = parseYamlLines(lines, 0);
  return result.value;
}

interface ParseResult {
  value: unknown;
  consumed: number;
}

function parseYamlLines(lines: string[], startIndent: number): ParseResult {
  // Determine if this is an array or object by looking at the first non-empty line
  let firstContentLine = "";
  for (const line of lines) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    firstContentLine = line;
    break;
  }

  if (firstContentLine.trim().startsWith("- ") || firstContentLine.trim() === "-") {
    return parseYamlArray(lines, startIndent);
  }
  return parseYamlObject(lines, startIndent);
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseYamlObject(lines: string[], startIndent: number): ParseResult {
  const obj: Record<string, unknown> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines and comments
    if (line.trim() === "" || line.trim().startsWith("#")) {
      i++;
      continue;
    }

    const indent = getIndent(line);
    if (indent < startIndent) break;

    const match = line.trim().match(/^([^:]+?):\s*(.*)/);
    if (!match) {
      i++;
      continue;
    }

    const key = match[1].trim();
    const inlineValue = match[2].trim();

    if (inlineValue === "" || inlineValue === "|" || inlineValue === ">") {
      // Nested value: collect subsequent indented lines
      const childLines: string[] = [];
      const childIndent = indent + 2;
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        if (nextLine.trim() === "" || nextLine.trim().startsWith("#")) {
          childLines.push(nextLine);
          j++;
          continue;
        }
        if (getIndent(nextLine) >= childIndent) {
          childLines.push(nextLine);
          j++;
        } else {
          break;
        }
      }

      if (childLines.length > 0 && childLines.some((l) => l.trim() !== "")) {
        const result = parseYamlLines(childLines, childIndent);
        obj[key] = result.value;
      } else {
        obj[key] = null;
      }
      i = j;
    } else {
      obj[key] = parseYamlScalar(inlineValue);
      i++;
    }
  }

  return { value: obj, consumed: i };
}

function parseYamlArray(lines: string[], startIndent: number): ParseResult {
  const arr: unknown[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "" || line.trim().startsWith("#")) {
      i++;
      continue;
    }

    const indent = getIndent(line);
    if (indent < startIndent) break;

    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      const itemValue = trimmed.slice(2);

      // Check if this is an inline key: value (object item)
      const kvMatch = itemValue.match(/^([^:]+?):\s*(.*)/);
      if (kvMatch) {
        // Array item is an object - collect all properties at same indent
        const childLines: string[] = [];
        // Recreate first line as a normal key: value at item indent level
        const itemIndent = indent + 2;
        childLines.push(" ".repeat(itemIndent) + itemValue);
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          if (nextLine.trim() === "" || nextLine.trim().startsWith("#")) {
            childLines.push(nextLine);
            j++;
            continue;
          }
          if (getIndent(nextLine) >= itemIndent) {
            childLines.push(nextLine);
            j++;
          } else {
            break;
          }
        }
        const result = parseYamlObject(childLines, itemIndent);
        arr.push(result.value);
        i = j;
      } else {
        arr.push(parseYamlScalar(itemValue));
        i++;
      }
    } else if (trimmed === "-") {
      // Empty array item or block item
      const childLines: string[] = [];
      const childIndent = indent + 2;
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        if (nextLine.trim() === "" || nextLine.trim().startsWith("#")) {
          childLines.push(nextLine);
          j++;
          continue;
        }
        if (getIndent(nextLine) >= childIndent) {
          childLines.push(nextLine);
          j++;
        } else {
          break;
        }
      }
      if (childLines.length > 0 && childLines.some((l) => l.trim() !== "")) {
        const result = parseYamlLines(childLines, childIndent);
        arr.push(result.value);
      } else {
        arr.push(null);
      }
      i = j;
    } else {
      i++;
    }
  }

  return { value: arr, consumed: i };
}

function parseYamlScalar(value: string): unknown {
  if (value === "null" || value === "~") return null;
  if (value === "true") return true;
  if (value === "false") return false;

  // Quoted string
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Empty array/object
  if (value === "[]") return [];
  if (value === "{}") return {};

  // Number
  const num = Number(value);
  if (!isNaN(num) && value !== "") return num;

  return value;
}

/** Convert CSV to TSV */
export function csvToTsv(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const fields = parseCsvLine(line);
      return fields.map((f) => f.replace(/\t/g, " ")).join("\t");
    })
    .join("\n");
}

/** Convert TSV to CSV */
export function tsvToCsv(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const fields = line.split("\t");
      return fields.map((f) => {
        if (f.includes(",") || f.includes('"') || f.includes("\n")) {
          return `"${f.replace(/"/g, '""')}"`;
        }
        return f;
      }).join(",");
    })
    .join("\n");
}

/** Parse a single CSV line respecting quoted fields */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

/** Convert text to camelCase (each line treated as separate identifier) */
export function toCamelCase(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const words = splitIntoWords(line);
      if (words.length === 0) return "";
      return words
        .map((word, i) => {
          const lower = word.toLowerCase();
          return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join("");
    })
    .join("\n");
}

/** Convert text to snake_case (each line treated as separate identifier) */
export function toSnakeCase(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const words = splitIntoWords(line);
      return words.map((w) => w.toLowerCase()).join("_");
    })
    .join("\n");
}

/** Convert text to kebab-case (each line treated as separate identifier) */
export function toKebabCase(input: string): string {
  return input
    .split("\n")
    .map((line) => {
      const words = splitIntoWords(line);
      return words.map((w) => w.toLowerCase()).join("-");
    })
    .join("\n");
}

/**
 * Split a string into words by detecting boundaries:
 * - camelCase boundaries (lowercase -> uppercase)
 * - separators: space, underscore, hyphen, dot
 */
function splitIntoWords(str: string): string[] {
  if (str.trim() === "") return [];

  // Insert boundary markers before uppercase letters that follow lowercase
  const expanded = str.replace(/([a-z])([A-Z])/g, "$1\0$2");
  // Split by separators and boundary markers
  return expanded.split(/[\s_\-.\0]+/).filter((w) => w.length > 0);
}
