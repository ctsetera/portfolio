# エンジニアリング・ポートフォリオ

Astroのdotcvをベースに、classicレイアウト専用に整理した個人用ポートフォリオです。
画面とデザインPDFではNoto Sans JPを使用します。

## 文章を編集する場所

プロジェクト直下の `cv.json` を編集します。

| 項目 | 内容 |
| --- | --- |
| `profile` | 名前、肩書き、自己紹介、任意の連絡先・画像・SNS |
| `experience` | 職務経歴（会社・役割・期間・説明・成果・使用技術） |
| `personalExperience` | 個人での技術経験（期間なし） |
| `projects` | 制作実績 |
| `skills` | 技術スキル |
| `certifications` | 資格 |

一覧項目は省略または `[]` にすると見出しごと非表示になります。
`personalExperience` は職務経歴の直下に表示されます。

```json
"personalExperience": [
  {
    "title": "電子工作・組み込み開発",
    "role": "企画・設計・実装",
    "description": "取り組んだ内容の概要",
    "highlights": ["工夫したことや得られた成果"],
    "technologies": ["Arduino", "C++"]
  }
]
```

個人での技術経験は `title` のみ必須です。既存の職務経歴の入力形式はそのまま使えます。

## 表示の設定

`dotcv.config.json` の `theme` は `classic` を指定します。
`locale` は日本語なら `ja`、英語なら `en`、ドイツ語なら `de` です。
見出しの文言は `src/lib/i18n/index.ts` の各言語の辞書で変更できます。

PDFの任意設定：

```json
{
  "theme": "classic",
  "locale": "ja",
  "pdf": {
    "theme": "classic",
    "format": "a4",
    "showAtsButton": true,
    "showDesignButton": true,
    "filename": "{name} — CV"
  }
}
```

## 主なファイル

- `src/themes/classic/index.astro`：Web画面
- `src/themes/classic/pdf.astro`：デザインPDF
- `src/components/pdf/AtsResume.astro`：採用システム向けPDF
- `src/components/ClassicFonts.astro`：Google Fontsの読み込み
- `src/lib/activitySections.ts`：職務経歴・個人活動の共通表示データ
- `src/lib/cvSchema.ts`：入力データの定義
- `public/`：プロフィール画像・アイコン

## ローカルで確認

Node.jsは `package.json` の `engines` に対応するバージョンを使用します。

```sh
npm install
npm run dev
```

開発サーバーが表示するURLを開きます。現在のベースパスは `/` です。ローカルでは `http://localhost:4321/` を開きます。
ベースパス配下の `/preview/classic` でプレビュー、`/print/design` でデザインPDF、
`/print/ats` で採用システム向けPDFを確認できます。`/print` は採用システム向けPDFの互換ルートです。

```sh
npm run build
npm run preview
```

ビルド結果は `dist/` に生成されます。公開先は `https://portfolio.ctsetera.dev` に設定済みです。
スクリーンショット生成は `npm run screenshots`、比較画像生成は `npm run generate:comparison` です。
これらには起動中の開発サーバーとPuppeteerが動作する環境が必要です。
`BASE_URL` にはベースパスを含むURL（例：`http://localhost:4321`）を指定してください。

## Cloudflare Workersへの公開

静的ファイルの配信設定は `wrangler.jsonc` にあります。公開するときに実行します。

```sh
npx wrangler login
npm run build
npx wrangler deploy
```

カスタムドメインは `portfolio.ctsetera.dev` です。ログイン先アカウントで `ctsetera.dev` を管理している必要があります。
Git連携ビルドを利用する場合、現在Git管理対象外の `cv.json` をビルド環境に用意してください。

## 検索エンジンへの掲載防止

全HTMLページに `noindex, nofollow` を指定しています。
`public/_headers` ではCloudflare Workersの静的配信全体に
`X-Robots-Tag: noindex, nofollow` を設定しています（画像なども対象）。
Astroの開発サーバーではこのHTTPヘッダー設定は適用されません。

`robots.txt` の巡回禁止は追加していません。巡回を禁止すると、検索エンジンが
ページの `noindex` を読み取れなくなるためです。
本サイトは認証なしで閲覧できる構成です。検索エンジンへの掲載防止設定は維持しています。

## ライセンス

元テーマdotcvのMITライセンスは `LICENSE` を参照してください。
