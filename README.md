# 英語学習アプリケーション

Vue.js + Element Plusで生成される英語学習アプリケーションフロントエンド

## 概要

以下のAPIと組み合わせて機能する英語学習アプリケーションです。単体では機能せず、API環境を用意する必要があります。

https://github.com/iwashi623/genred_english

### 技術スタック

- アプリケーションフレームワーク: Vue.js
- UIコンポーネント: Element Plus
- データストア: Pinia
- ルーティング: Vue Router

## 推奨開発環境

### コーディング環境

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### ブラウザ環境

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

# ディレクトリ構造

```
.
├── src/                   # アプリケーションコード
├── public/                # 静的ファイル
│   ├── assets            # 画像/CSS
│   │   ├── base.css     # アプリケーション全体共通CSS
│   │   └── main.css     # メイン画面CSS
│   ├── components        # コンポーネント
│   ├── router            # ルーター
│   ├── stores            # データストア
│   ├── views             # ビュー
│   └── App.vue           # アプリ全体コンポーネント
├── public/                # 静的ファイル
│   └── favicon.ico       # プロキシ設定
├── index.html             # ルートHTMLファイル
├── package.json           # Node.js依存関係管理
└── README.md              # このファイル
```

## 使用方法

Node.jsを開発環境にインストールし、以下のコマンドで必要なパッケージをインストールしてください:

```sh
npm install
```

### コンパイルと開発用の実行（ホットリロード）

```sh
npm run dev
```

上記のコマンドでアプリケーションが立ち上がるので、ブラウザでアプリケーションを開いて確認してください。

実行中にコンポーネントを変更すると自動的に変更が反映されます。

### 本番環境用のビルド（型チェック・コンパイル・最小化）

```sh
npm run build
```

上記コマンドで生成されたファイルを実運用サーバー上にデプロイしてください。

### [ESLint](https://eslint.org/) による構文チェック

```sh
npm run lint
```
