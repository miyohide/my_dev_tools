# テキスト編集ツール集

開発作業でよく使うテキスト変換やフォーマット変換をブラウザ上で手軽に行える静的Webアプリケーション。  
AWS CloudFront + S3 で配信する構成を想定。

## 機能一覧

### テキスト変換

| ツール名 | 説明 |
|----------|------|
| 引用付加 | 各行の先頭に `> ` を追加する |
| 大文字変換 | すべての文字を大文字に変換する |
| 小文字変換 | すべての文字を小文字に変換する |
| 前後の空白除去 | テキスト全体の前後の空白を除去する |
| 各行の前後の空白除去 | 各行ごとに前後の空白を除去する |
| 行番号付加 | 各行に行番号を追加する |
| 空行削除 | 空行を削除する |
| プレフィックス追加 | 各行の先頭に任意の文字列を追加する |
| サフィックス追加 | 各行の末尾に任意の文字列を追加する |
| 行の逆順 | 行の順序を逆にする |
| 行のソート | 行をアルファベット順にソートする |
| 重複行の削除 | 重複する行を削除する（最初の出現を保持） |
| 文字数カウント | 文字数・単語数・行数を集計する |

### フォーマット変換

| ツール名 | 説明 |
|----------|------|
| JSON 整形 | JSON をインデント付きで整形する |
| JSON 圧縮 | JSON の空白を除去して圧縮する |
| JSON → YAML | JSON を YAML 形式に変換する |
| YAML → JSON | YAML を JSON 形式に変換する |
| CSV → TSV | CSV をタブ区切りに変換する |
| TSV → CSV | TSV をカンマ区切りに変換する |
| camelCase 変換 | テキストを camelCase に変換する |
| snake_case 変換 | テキストを snake_case に変換する |
| kebab-case 変換 | テキストを kebab-case に変換する |

### ネットワーク

| ツール名 | 説明 |
|----------|------|
| サブネット CIDR 計算 | VPC CIDR とプレフィックス長からサブネット候補を算出する |

## 技術スタック

- **フロントエンド**: TypeScript + Vite
- **テスト**: Vitest + jsdom
- **インフラ**: AWS CDK（CloudFront + S3）

## 前提条件

- Node.js 18 以上
- npm
- AWS CLI（デプロイ時）
- AWS CDK CLI（デプロイ時）

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスする。

## コマンド一覧

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | TypeScript のコンパイルとプロダクションビルドを行う |
| `npm run preview` | ビルド成果物のプレビューサーバーを起動する |
| `npm run test` | テストを実行する |
| `npm run test:watch` | テストをウォッチモードで実行する |

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに出力される。

## テスト

```bash
npm run test
```

## デプロイ

AWS CDK を使って CloudFront + S3 にデプロイする。

```bash
# フロントエンドのビルド
npm run build

# インフラの依存パッケージインストール
cd infra
npm install

# CDK のデプロイ（初回は bootstrap が必要）
npx cdk bootstrap
npx cdk deploy
```

デプロイ後、CloudFront の配信ドメイン名がコンソールに出力される。

## プロジェクト構成

```
my_dev_tools/
├── index.html          # エントリーポイント HTML
├── src/
│   ├── main.ts         # アプリケーションのエントリーポイント
│   ├── tools.ts        # ツールの定義と変換ロジック
│   ├── tools.test.ts   # ツールのテスト
│   └── styles.css      # スタイルシート
├── infra/
│   ├── bin/            # CDK アプリケーションのエントリーポイント
│   ├── lib/
│   │   └── my-dev-tools-stack.ts  # CDK スタック定義
│   ├── cdk.json        # CDK 設定
│   ├── package.json    # インフラ依存パッケージ
│   └── tsconfig.json   # インフラ用 TypeScript 設定
├── dist/               # ビルド出力先
├── package.json        # プロジェクト設定
├── tsconfig.json       # TypeScript 設定
└── vite.config.ts      # Vite 設定
```
