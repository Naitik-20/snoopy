# Snoopy Dev Servers Startup Script

# 1. Update PATH to ensure node and npm are available
$env:Path = "C:\Program Files\nodejs;" + $env:Path

Write-Host "🚀 Starting Snoopy Express Server (Port 5000)..."
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "e:\Web Development Bootcamp\30_snoopy\server" -NoNewWindow

Write-Host "🛒 Starting Snoopy Client Storefront (Port 5173)..."
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "e:\Web Development Bootcamp\30_snoopy\client" -NoNewWindow

Write-Host "🛠️ Starting Snoopy Admin Dashboard (Port 5174)..."
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "e:\Web Development Bootcamp\30_snoopy\admin" -NoNewWindow

Write-Host "✨ All servers are launching in the background!"
Write-Host "- Storefront: http://localhost:5173"
Write-Host "- Admin Dashboard: http://localhost:5174"
Write-Host "- Backend API: http://localhost:5000"
