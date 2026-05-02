<p align="center">
  <img src="https://github.com/siddharthvaddem/openscreen/raw/main/public/openscreen.png" width="120" alt="OpenScreen Logo" />
</p>

# <p align="center">OpenScreen - 日本語完全ローカライズ版</p>
# <p align="center">OpenScreen - Full Japanese Localization Edition</p>

<p align="center">
  <strong>オープンソースの画面録画・編集ツール「OpenScreen」を日本向けに最適化。</strong><br />
  <strong>Optimized the open-source screen recording & editing tool "OpenScreen" for Japan.</strong>
</p>

<p align="center">
  <a href="#-概要">概要 / Overview</a> •
  <a href="#-主な機能">機能 / Features</a> •
  <a href="#-パッチの適用方法">適用方法 / How to Apply</a> •
  <a href="#-配布形態">配布形態 / Distribution</a>
</p>

---

## 🌟 概要 / Overview

**OpenScreen** は、強力かつシンプルなオープンソースの画面録画・ビデオ編集ツールです。
本プロジェクトでは、オリジナルの OpenScreen を**完全に日本語化**し、ハードコードされていた箇所の翻訳や、日本のユーザー向けの最適化を行っています。

**OpenScreen** is a powerful and simple open-source screen recording and video editing tool.
This project provides a **full Japanese localization**, including translations of hard-coded strings and optimizations for Japanese users.

---

## ✨ 主な機能 / Key Features

### 🎥 録画と編集 / Record & Edit
- **スマートズーム / Smart Zoom**: カーソルに追従する滑らかなズーム（自動・手動）。 / Smooth zoom following the cursor (Auto/Manual).
- **タイムライン編集 / Timeline Editing**: 直感的なカット、トリミング、速度調整。 / Intuitive cutting, trimming, and speed adjustment.
- **モーションブラー / Motion Blur**: プロ仕様のパン・ズーム演出。 / Professional-grade pan and zoom effects.

### 🇯🇵 日本語化のポイント / Localization Highlights
- **UI完全日本語化 / Full UI Localization**: すべてのダイアログ、メニュー、設定項目を日本語化。 / All dialogs, menus, and settings localized.
- **ハードコード修正 / Hardcoded Fixes**: ソースコードレベルでのテキスト抽出と翻訳。 / Text extraction and translation at the source code level.

---

## 🛠 パッチの適用方法 / How to Apply Patches

### 1. 開発者向け（ソースコード用） / For Developers (Source Code)
`src` フォルダをプロジェクトルートに上書きコピーしてください。
Copy the `src` folder to your project root.

### 2. 一般ユーザー向け（既設環境用） / For General Users (Existing Installation)
`openscreen-binary-patch` フォルダ内の `apply_patch.ps1` を実行することで、インストール済みの OpenScreen を日本語化できます。
You can localize an already installed OpenScreen by running `apply_patch.ps1` in the `openscreen-binary-patch` folder.

---

## 🚀 配布形態 / Distribution

- **ポータブル版 / Portable Version**: 解凍してすぐに使えるZIP形式を提供。 / ZIP format available for immediate use without installation.
- **ソースパッチ / Source Patch**: 開発者向けの差分ファイル一式。 / Full set of diff files for developers.

---

## 📄 ライセンス / License

このプロジェクトはオリジナルの [MIT License](https://github.com/siddharthvaddem/openscreen/blob/main/LICENSE) を継承しています。
This project inherits the original MIT License.

---

<p align="center">
  <em>Created with ❤️ for the Japanese community.</em>
</p>
