# OpenScreen 日本語化バイナリパッチ適用スクリプト

$targetDir = Read-Host "OpenScreenのインストール先フォルダを選択してください (例: C:\Users\YourName\AppData\Local\Programs\openscreen)"

if (-not (Test-Path "$targetDir\resources\app.asar")) {
    Write-Error "指定されたフォルダに resources\app.asar が見つかりませんでした。"
    exit
}

$tempDir = "$PSScriptRoot\temp_unpack"
$patchSource = $PSScriptRoot

# バックアップ作成
Write-Host "バックアップを作成中..."
Copy-Item "$targetDir\resources\app.asar" "$targetDir\resources\app.asar.bak" -Force

# 作業用フォルダの準備
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir

# Node.jsのパスを通す（先ほどインストールした場所）
$env:PATH = "C:\Users\AAA\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.22_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v22.22.2-win-x64;" + $env:PATH

# アンパック
Write-Host "app.asar を展開中..."
& npx.cmd asar extract "$targetDir\resources\app.asar" $tempDir

# ファイル置換
Write-Host "日本語化ファイルを適用中..."
xcopy "$patchSource\dist\*" "$tempDir\dist\" /E /I /Y
xcopy "$patchSource\dist-electron\*" "$tempDir\dist-electron\" /E /I /Y

# リパック
Write-Host "app.asar を再構築中..."
& npx.cmd asar pack $tempDir "$targetDir\resources\app.asar"

# 後片付け
Remove-Item $tempDir -Recurse -Force

Write-Host "パッチの適用が完了しました！OpenScreenを再起動してください。"
pause
