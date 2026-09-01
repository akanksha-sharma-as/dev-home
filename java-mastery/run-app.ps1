$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $root 'backend'
$frontendPath = Join-Path $root 'frontend'

$javaHomeCandidates = @(
    'C:\Program Files\Java\jdk-11.0.16.1',
    'C:\Program Files\Java\jdk-17',
    'C:\Program Files\Java\jdk-21',
    'C:\Program Files\Java\jdk-25'
)
$javaHome = $javaHomeCandidates | Where-Object { Test-Path (Join-Path $_ 'bin\java.exe') } | Select-Object -First 1

$mavenCandidates = @(
    'C:\Program Files\JetBrains\IntelliJ IDEA 2023.3.2\plugins\maven\lib\maven3\bin\mvn.cmd',
    'C:\Program Files\apache-maven\bin\mvn.cmd'
)
$mavenExe = $mavenCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $javaHome) {
    throw "No supported JDK installation was found. Install a Java 11+ JDK and try again."
}

if (-not $mavenExe) {
    throw "Maven was not found. Install Maven or point the script to the correct mvn.cmd path."
}

$env:JAVA_HOME = $javaHome
$env:Path = "$javaHome\bin;$([System.IO.Path]::GetDirectoryName($mavenExe));$env:Path"

Write-Host "Starting Java Mastery backend..." -ForegroundColor Cyan
$backendProc = Start-Process -FilePath $mavenExe -ArgumentList '-f', (Join-Path $backendPath 'pom.xml'), 'spring-boot:run' -WorkingDirectory $backendPath -PassThru -NoNewWindow

Write-Host "Starting Java Mastery frontend..." -ForegroundColor Cyan
$frontendProc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'install' -WorkingDirectory $frontendPath -PassThru -NoNewWindow
$frontendProc.WaitForExit()

Start-Process -FilePath 'npm.cmd' -ArgumentList 'run', 'dev', '--', '--host', '0.0.0.0' -WorkingDirectory $frontendPath -NoNewWindow

Write-Host ""
Write-Host "Backend: http://localhost:8080" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both apps." -ForegroundColor Yellow

Wait-Process -Id $backendProc.Id
