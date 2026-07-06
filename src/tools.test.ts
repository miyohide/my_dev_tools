import { describe, it, expect } from "vitest";
import {
  transform,
  addQuote,
  toUpperCase,
  toLowerCase,
  trimText,
  trimLines,
  numberLines,
  removeEmptyLines,
  addPrefix,
  addSuffix,
  reverseLines,
  sortLines,
  uniqueLines,
  countChars,
} from "./tools";

describe("addQuote", () => {
  it("各行の先頭に > を追加する", () => {
    expect(addQuote("hoge")).toBe("> hoge");
  });

  it("複数行にそれぞれ > を追加する", () => {
    expect(addQuote("line1\nline2\nline3")).toBe("> line1\n> line2\n> line3");
  });

  it("空文字列でも > を追加する", () => {
    expect(addQuote("")).toBe("> ");
  });

  it("空行を含むテキストでも各行に > を追加する", () => {
    expect(addQuote("hello\n\nworld")).toBe("> hello\n> \n> world");
  });
});

describe("toUpperCase", () => {
  it("小文字を大文字に変換する", () => {
    expect(toUpperCase("hello")).toBe("HELLO");
  });

  it("日本語は変換されない", () => {
    expect(toUpperCase("こんにちは")).toBe("こんにちは");
  });

  it("混在テキストの英字のみ変換する", () => {
    expect(toUpperCase("Hello World 123")).toBe("HELLO WORLD 123");
  });
});

describe("toLowerCase", () => {
  it("大文字を小文字に変換する", () => {
    expect(toLowerCase("HELLO")).toBe("hello");
  });

  it("混在テキストの英字のみ変換する", () => {
    expect(toLowerCase("Hello World 123")).toBe("hello world 123");
  });
});

describe("trimText", () => {
  it("前後の空白を除去する", () => {
    expect(trimText("  hello  ")).toBe("hello");
  });

  it("タブと改行も除去する", () => {
    expect(trimText("\t\n hello \n\t")).toBe("hello");
  });

  it("中間の空白は保持する", () => {
    expect(trimText("  hello world  ")).toBe("hello world");
  });
});

describe("trimLines", () => {
  it("各行の前後の空白を除去する", () => {
    expect(trimLines("  hello  \n  world  ")).toBe("hello\nworld");
  });

  it("中間の空白は保持する", () => {
    expect(trimLines("  hello world  ")).toBe("hello world");
  });
});

describe("numberLines", () => {
  it("行番号を追加する", () => {
    expect(numberLines("a\nb\nc")).toBe("1: a\n2: b\n3: c");
  });

  it("10行以上の場合に桁数を揃える", () => {
    const input = Array.from({ length: 12 }, (_, i) => `line${i + 1}`).join("\n");
    const result = numberLines(input);
    const lines = result.split("\n");
    expect(lines[0]).toBe(" 1: line1");
    expect(lines[9]).toBe("10: line10");
    expect(lines[11]).toBe("12: line12");
  });

  it("1行のテキストに行番号を付ける", () => {
    expect(numberLines("single")).toBe("1: single");
  });
});

describe("removeEmptyLines", () => {
  it("空行を削除する", () => {
    expect(removeEmptyLines("a\n\nb\n\nc")).toBe("a\nb\nc");
  });

  it("空白だけの行も削除する", () => {
    expect(removeEmptyLines("a\n   \nb")).toBe("a\nb");
  });

  it("空行がない場合はそのまま返す", () => {
    expect(removeEmptyLines("a\nb")).toBe("a\nb");
  });
});

describe("addPrefix", () => {
  it("各行にプレフィックスを追加する", () => {
    expect(addPrefix("hello\nworld", "- ")).toBe("- hello\n- world");
  });

  it("空のプレフィックスの場合は変更しない", () => {
    expect(addPrefix("hello", "")).toBe("hello");
  });
});

describe("addSuffix", () => {
  it("各行にサフィックスを追加する", () => {
    expect(addSuffix("hello\nworld", ";")).toBe("hello;\nworld;");
  });

  it("空のサフィックスの場合は変更しない", () => {
    expect(addSuffix("hello", "")).toBe("hello");
  });
});

describe("reverseLines", () => {
  it("行の順序を逆にする", () => {
    expect(reverseLines("a\nb\nc")).toBe("c\nb\na");
  });

  it("1行の場合はそのまま返す", () => {
    expect(reverseLines("single")).toBe("single");
  });
});

describe("sortLines", () => {
  it("行をアルファベット順にソートする", () => {
    expect(sortLines("banana\napple\ncherry")).toBe("apple\nbanana\ncherry");
  });

  it("日本語を含む行をソートする", () => {
    const input = "さくら\nあいう\nかきく";
    const result = sortLines(input);
    expect(result).toBe("あいう\nかきく\nさくら");
  });

  it("既にソート済みの場合は変更しない", () => {
    expect(sortLines("a\nb\nc")).toBe("a\nb\nc");
  });
});

describe("uniqueLines", () => {
  it("重複行を削除する", () => {
    expect(uniqueLines("a\nb\na\nc\nb")).toBe("a\nb\nc");
  });

  it("重複がない場合はそのまま返す", () => {
    expect(uniqueLines("a\nb\nc")).toBe("a\nb\nc");
  });

  it("最初の出現順を保持する", () => {
    expect(uniqueLines("z\na\nz\na")).toBe("z\na");
  });
});

describe("countChars", () => {
  it("文字数、単語数、行数をカウントする", () => {
    const result = countChars("hello world");
    expect(result).toContain("文字数: 11");
    expect(result).toContain("文字数（空白除く）: 10");
    expect(result).toContain("単語数: 2");
    expect(result).toContain("行数: 1");
  });

  it("複数行のテキストをカウントする", () => {
    const result = countChars("hello\nworld");
    expect(result).toContain("文字数: 11");
    expect(result).toContain("行数: 2");
  });

  it("空文字列のカウント", () => {
    const result = countChars("");
    expect(result).toContain("文字数: 0");
    expect(result).toContain("文字数（空白除く）: 0");
    expect(result).toContain("単語数: 0");
    expect(result).toContain("行数: 0");
  });
});

describe("transform", () => {
  it("toolIdに応じた変換を適用する", () => {
    expect(transform("quote", "test")).toBe("> test");
    expect(transform("uppercase", "hello")).toBe("HELLO");
    expect(transform("lowercase", "HELLO")).toBe("hello");
  });

  it("オプション付きのツールにオプションを渡せる", () => {
    expect(transform("add-prefix", "hello", ">> ")).toBe(">> hello");
    expect(transform("add-suffix", "hello", "!")).toBe("hello!");
  });
});

// =============================================================================
// Format conversion tools tests
// =============================================================================

import {
  jsonPretty,
  jsonMinify,
  jsonToYaml,
  yamlToJson,
  csvToTsv,
  tsvToCsv,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "./tools";

describe("jsonPretty", () => {
  it("JSONを整形する", () => {
    const input = '{"name":"test","age":30}';
    const expected = '{\n  "name": "test",\n  "age": 30\n}';
    expect(jsonPretty(input)).toBe(expected);
  });

  it("ネストしたJSONを整形する", () => {
    const input = '{"a":{"b":1},"c":[1,2,3]}';
    const result = jsonPretty(input);
    expect(result).toContain('"a": {');
    expect(result).toContain('"b": 1');
    expect(result).toContain('"c": [');
  });

  it("無効なJSONの場合エラーメッセージを返す", () => {
    const result = jsonPretty("{invalid}");
    expect(result).toContain("エラー: 無効なJSONです");
  });
});

describe("jsonMinify", () => {
  it("JSONを圧縮する", () => {
    const input = '{\n  "name": "test",\n  "age": 30\n}';
    expect(jsonMinify(input)).toBe('{"name":"test","age":30}');
  });

  it("既に圧縮済みの場合はそのまま返す", () => {
    const input = '{"a":1}';
    expect(jsonMinify(input)).toBe('{"a":1}');
  });

  it("無効なJSONの場合エラーメッセージを返す", () => {
    const result = jsonMinify("not json");
    expect(result).toContain("エラー: 無効なJSONです");
  });
});

describe("jsonToYaml", () => {
  it("単純なオブジェクトをYAMLに変換する", () => {
    const input = '{"name":"test","age":30}';
    const result = jsonToYaml(input);
    expect(result).toContain("name: test");
    expect(result).toContain("age: 30");
  });

  it("配列を含むJSONをYAMLに変換する", () => {
    const input = '{"items":["apple","banana"]}';
    const result = jsonToYaml(input);
    expect(result).toContain("items:");
    expect(result).toContain("- apple");
    expect(result).toContain("- banana");
  });

  it("booleanとnullを変換する", () => {
    const input = '{"active":true,"deleted":false,"data":null}';
    const result = jsonToYaml(input);
    expect(result).toContain("active: true");
    expect(result).toContain("deleted: false");
    expect(result).toContain("data: null");
  });

  it("無効なJSONの場合エラーメッセージを返す", () => {
    const result = jsonToYaml("{bad");
    expect(result).toContain("エラー: 無効なJSONです");
  });
});

describe("yamlToJson", () => {
  it("単純なキーバリューをJSONに変換する", () => {
    const input = "name: test\nage: 30";
    const result = JSON.parse(yamlToJson(input));
    expect(result).toEqual({ name: "test", age: 30 });
  });

  it("ネストしたオブジェクトを変換する", () => {
    const input = "person:\n  name: Alice\n  age: 25";
    const result = JSON.parse(yamlToJson(input));
    expect(result).toEqual({ person: { name: "Alice", age: 25 } });
  });

  it("配列を変換する", () => {
    const input = "items:\n  - apple\n  - banana\n  - cherry";
    const result = JSON.parse(yamlToJson(input));
    expect(result).toEqual({ items: ["apple", "banana", "cherry"] });
  });

  it("booleanとnullを変換する", () => {
    const input = "active: true\ndeleted: false\ndata: null";
    const result = JSON.parse(yamlToJson(input));
    expect(result).toEqual({ active: true, deleted: false, data: null });
  });

  it("クォート付き文字列を変換する", () => {
    const input = 'message: "hello world"\nname: \'test\'';
    const result = JSON.parse(yamlToJson(input));
    expect(result).toEqual({ message: "hello world", name: "test" });
  });
});

describe("csvToTsv", () => {
  it("カンマをタブに変換する", () => {
    expect(csvToTsv("a,b,c")).toBe("a\tb\tc");
  });

  it("複数行を変換する", () => {
    const input = "name,age\nAlice,30\nBob,25";
    const expected = "name\tage\nAlice\t30\nBob\t25";
    expect(csvToTsv(input)).toBe(expected);
  });

  it("クォートされたフィールドを正しく処理する", () => {
    const input = '"hello, world",test';
    expect(csvToTsv(input)).toBe("hello, world\ttest");
  });

  it("ダブルクォートのエスケープを処理する", () => {
    const input = '"say ""hello""",value';
    expect(csvToTsv(input)).toBe('say "hello"\tvalue');
  });

  it("フィールド内のタブをスペースに置換する", () => {
    const input = "a\tb,c";
    expect(csvToTsv(input)).toBe("a b\tc");
  });
});

describe("tsvToCsv", () => {
  it("タブをカンマに変換する", () => {
    expect(tsvToCsv("a\tb\tc")).toBe("a,b,c");
  });

  it("複数行を変換する", () => {
    const input = "name\tage\nAlice\t30\nBob\t25";
    const expected = "name,age\nAlice,30\nBob,25";
    expect(tsvToCsv(input)).toBe(expected);
  });

  it("カンマを含むフィールドをクォートする", () => {
    const input = "hello, world\ttest";
    expect(tsvToCsv(input)).toBe('"hello, world",test');
  });

  it("ダブルクォートを含むフィールドをエスケープする", () => {
    const input = 'say "hi"\tvalue';
    expect(tsvToCsv(input)).toBe('"say ""hi""",value');
  });
});

describe("toCamelCase", () => {
  it("スネークケースをキャメルケースに変換する", () => {
    expect(toCamelCase("hello_world")).toBe("helloWorld");
  });

  it("ケバブケースをキャメルケースに変換する", () => {
    expect(toCamelCase("my-component-name")).toBe("myComponentName");
  });

  it("スペース区切りをキャメルケースに変換する", () => {
    expect(toCamelCase("Hello World")).toBe("helloWorld");
  });

  it("既にキャメルケースの場合は小文字始まりにする", () => {
    expect(toCamelCase("MyComponent")).toBe("myComponent");
  });

  it("複数行を各行ごとに変換する", () => {
    expect(toCamelCase("hello_world\nfoo_bar")).toBe("helloWorld\nfooBar");
  });

  it("空行はそのまま返す", () => {
    expect(toCamelCase("")).toBe("");
  });
});

describe("toSnakeCase", () => {
  it("キャメルケースをスネークケースに変換する", () => {
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
  });

  it("パスカルケースをスネークケースに変換する", () => {
    expect(toSnakeCase("MyComponent")).toBe("my_component");
  });

  it("ケバブケースをスネークケースに変換する", () => {
    expect(toSnakeCase("my-component")).toBe("my_component");
  });

  it("スペース区切りをスネークケースに変換する", () => {
    expect(toSnakeCase("Hello World")).toBe("hello_world");
  });

  it("複数行を各行ごとに変換する", () => {
    expect(toSnakeCase("helloWorld\nfooBar")).toBe("hello_world\nfoo_bar");
  });
});

describe("toKebabCase", () => {
  it("キャメルケースをケバブケースに変換する", () => {
    expect(toKebabCase("helloWorld")).toBe("hello-world");
  });

  it("パスカルケースをケバブケースに変換する", () => {
    expect(toKebabCase("MyComponent")).toBe("my-component");
  });

  it("スネークケースをケバブケースに変換する", () => {
    expect(toKebabCase("hello_world")).toBe("hello-world");
  });

  it("スペース区切りをケバブケースに変換する", () => {
    expect(toKebabCase("Hello World")).toBe("hello-world");
  });

  it("複数行を各行ごとに変換する", () => {
    expect(toKebabCase("helloWorld\nfooBar")).toBe("hello-world\nfoo-bar");
  });
});
