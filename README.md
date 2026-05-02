<p align="center">
  <img src="https://github.com/siddharthvaddem/openscreen/raw/main/public/openscreen.png" width="120" alt="OpenScreen Logo" />
</p>

# <p align="center">OpenScreen - 日本語完全ローカライズ版</p>

<p align="center">
  <strong>オープンソースの画面録画・編集ツール「OpenScreen」を日本向けに最適化。</strong>
</p>

<p align="center">
  <a href="#-概要">概要</a> •
  <a href="#-主な機能">機能</a> •
  <a href="#-パッチの適用方法">適用方法</a> •
  <a href="#-ライセンス">ライセンス</a>
</p>

<p align="center">
  <img src="C:\Users\AAA\.gemini\antigravity\brain\5665a53f-1895-42dd-953f-07ac3898b80c\openscreen_ja_banner_1777724449164.png" width="100%" alt="OpenScreen JA Banner" />
</p>

---

## 🌟 概要

**OpenScreen** は、[Screen Studio](https://screen.studio/) にインスパイアされた、強力かつシンプルなオープンソースの画面録画・ビデオ編集ツールです。

本プロジェクトは、オリジナルの OpenScreen を**完全に日本語化**し、日本のユーザーがより直感的に操作できるように調整したパッチ、およびフルパッケージを提供します。

> [!NOTE]
> 本プロジェクトは非公式のローカライズ版です。オリジナルの開発者に敬意を表し、すべての機能を日本語で快適に利用できるようにしています。

---

## ✨ 主な機能

### 🎥 録画機能
- **高画質録画**: 特定のウィンドウ、または画面全体を鮮明にキャプチャ。
- **マルチオーディオ**: システム音とマイク音を同時に、または個別に収録。
- **Webカメラ統合**: 自分の顔をオーバーレイとして表示（近日対応予定）。

### ✂️ 高度な編集
- **スマートズーム**: カーソルの動きに合わせた自動ズーム、または手動での深度調整。
- **タイムライン編集**: 直感的な操作で不要なシーンをカット（トリミング）。
- **モーションブラー**: パンやズームの動きをプロフェッショナルに演出。
- **注釈ツール**: テキスト、矢印、画像を追加して要点を強調。

### 📤 出力設定
- **多彩なフォーマット**: MP4 だけでなく、高品質な GIF アニメーションとしても出力可能。
- **カスタム背景**: 壁紙、グラデーション、単色、または任意の画像を選択。

---

## 🛠 パッチの適用方法

すでにソースコードをお持ちの場合、以下の手順で日本語化を適用できます。

1. **ダウンロード**: 本リポジトリからパッチファイルをダウンロードします。
2. **上書きコピー**: `src` フォルダの内容を、OpenScreen のプロジェクトルートにある `src` フォルダに上書きします。
3. **ビルド**:
   ```bash
   npm install
   npm run dev # 開発モードで起動
   ```

---

## 🚀 GitHubへの公開 (自身のプロジェクトとして)

もし、この日本語化版を自分のリポジトリとして公開したい場合は、以下の手順を実行してください。

```bash
# パッチフォルダに移動
git init
git add .
git commit -m "feat: OpenScreen 日本語完全ローカライズ版のリリース"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/openscreen-ja.git
git push -u origin main
```

---

## 📄 ライセンス

このプロジェクトはオリジナルの [MIT License](https://github.com/siddharthvaddem/openscreen/blob/main/LICENSE) を継承しています。
商用・個人利用を問わず、どなたでも自由にご利用いただけます。

---

<p align="center">
  <em>Created with ❤️ for the Japanese community.</em>
</p>
