Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "          WATERHALL FLUTTER AUTO-INSTALLER" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Create target directory
$targetDir = "C:\src"
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

$flutterDir = "C:\src\flutter"
if (Test-Path $flutterDir) {
    Write-Host "Flutter is already installed at C:\src\flutter. Checking environment..." -ForegroundColor Yellow
} else {
    # 2. Download stable zip
    $zipUrl = "https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.22.2-stable.zip"
    $zipFile = "$targetDir\flutter.zip"
    
    Write-Host "Downloading Flutter SDK stable (approx. 1.5 GB)..." -ForegroundColor Cyan
    Write-Host "This might take several minutes depending on your internet connection. Please wait..." -ForegroundColor Green
    
    try {
        Invoke-WebRequest -Uri $zipUrl -OutFile $zipFile -ErrorAction Stop
        Write-Host "Download complete. Extracting files to C:\src..." -ForegroundColor Cyan
        Expand-Archive -Path $zipFile -DestinationPath $targetDir -Force
        Remove-Item -Path $zipFile -Force
        Write-Host "Extraction complete!" -ForegroundColor Green
    } catch {
        Write-Error "Failed to download or extract Flutter SDK: $_"
        Exit
    }
}

# 3. Add to user path env if not present
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$flutterBin = "C:\src\flutter\bin"

if ($userPath -split ';' -contains $flutterBin) {
    Write-Host "Flutter bin is already in your PATH." -ForegroundColor Green
} else {
    Write-Host "Adding Flutter bin to User PATH..." -ForegroundColor Cyan
    $newPath = $userPath + ";" + $flutterBin
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "PATH updated! Note: You will need to open a NEW PowerShell window to use the 'flutter' command." -ForegroundColor Green
}

Write-Host ""
Write-Host "Verification: Running flutter doctor..." -ForegroundColor Cyan
& "C:\src\flutter\bin\flutter.bat" doctor

Write-Host ""
Write-Host "WATERHALL Flutter setup is complete!" -ForegroundColor Green
