function Compare-JsonFiles {
    param (
        [string]$enFile,
        [string]$jaFile
    )
    $en = Get-Content $enFile | ConvertFrom-Json
    $ja = Get-Content $jaFile | ConvertFrom-Json
    
    function Compare-Objects {
        param ($enObj, $jaObj, $prefix)
        foreach ($key in $enObj.PSObject.Properties.Name) {
            $fullKey = if ($prefix) { "$prefix.$key" } else { $key }
            if ($null -eq $jaObj.$key) {
                Write-Host "Missing key in ja-JP: $fullKey"
            } elseif ($enObj.$key -is [PSCustomObject]) {
                Compare-Objects $enObj.$key $jaObj.$key $fullKey
            }
        }
    }
    
    Compare-Objects $en $ja ""
}

$localesPath = "f:/app/openscreen/src/i18n/locales"
$enPath = "$localesPath/en"
$jaPath = "$localesPath/ja-JP"

Get-ChildItem $enPath -Filter *.json | ForEach-Object {
    $file = $_.Name
    $enFilePath = $_.FullName
    $jaFilePath = "$jaPath/$file"
    if (-not (Test-Path $jaFilePath)) {
        Write-Host "Missing file in ja-JP: $file"
    } else {
        Write-Host "Checking $file..."
        Compare-JsonFiles $enFilePath $jaFilePath
    }
}
