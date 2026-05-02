# OpenScreen 既設環境用 日本語化パッチ
# OpenScreen Japanese Localization Patch for Existing Installations

このパッチは、すでにインストール済みの OpenScreen を日本語化するためのものです。
This patch is for localizing an already installed version of OpenScreen.

## 適用手順 / Installation Steps

1.  **OpenScreenを終了する / Close OpenScreen**: 実行中のアプリを完全に終了してください。 / Ensure the app is completely closed.
2.  **スクリプトの実行 / Run Script**: `apply_patch.ps1` を右クリックして「PowerShell で実行」を選択します。 / Right-click `apply_patch.ps1` and select "Run with PowerShell".
3.  **パスの入力 / Enter Path**: OpenScreen のインストール先（例: `C:\Users\Name\AppData\Local\Programs\openscreen`）を入力します。 / Enter the installation path of OpenScreen.
4.  **完了 / Finish**: 完了後、アプリを再起動してください。 / Restart the app after completion.

## 注意事項 / Notes
- 実行には **Node.js** が必要です。 / **Node.js** is required to run the script.
- 万が一のため、`app.asar.bak` としてバックアップが作成されます。 / A backup will be created as `app.asar.bak` just in case.
