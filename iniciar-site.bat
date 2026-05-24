@echo off
chcp 65001 >nul
title Reuel - Site local
cd /d "%~dp0"

REM Garante npm no PATH (instalacao padrao do Node no Windows)
where npm >nul 2>&1
if errorlevel 1 (
  if exist "%ProgramFiles%\nodejs\npm.cmd" (
    set "PATH=%ProgramFiles%\nodejs;%PATH%"
  ) else if exist "%LocalAppData%\Programs\nodejs\npm.cmd" (
    set "PATH=%LocalAppData%\Programs\nodejs;%PATH%"
  ) else (
    echo [ERRO] Node.js / npm nao encontrado.
    echo Instale em: https://nodejs.org
    pause
    exit /b 1
  )
)

if not exist "node_modules\" (
  echo Instalando dependencias pela primeira vez...
  call npm install
  if errorlevel 1 (
    echo [ERRO] Falha no npm install.
    pause
    exit /b 1
  )
  echo.
)

if not exist ".env" (
  if exist ".env.example" (
    echo Criando .env a partir de .env.example...
    copy /Y ".env.example" ".env" >nul
    echo O Vite so le variaveis do arquivo .env — nao do .env.example.
    echo.
  ) else (
    echo [AVISO] Arquivo .env nao encontrado. IDs do Discord podem nao carregar.
    echo.
  )
)

echo ========================================
echo   Reuel - servidor de desenvolvimento
echo   URL: http://localhost:5173
echo   Pare com Ctrl+C ou feche esta janela
echo ========================================
echo.

REM Abre o navegador apos o Vite subir (2 segundos)
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173"

call npm run dev

if errorlevel 1 (
  echo.
  echo [ERRO] O servidor nao iniciou.
  pause
)
