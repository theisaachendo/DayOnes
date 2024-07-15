$envFilePath = ".env"

if (Test-Path $envFilePath) {
    $envContent = Get-Content $envFilePath | ForEach-Object { $_.Trim() }

    foreach ($line in $envContent) {
        if ($line -match "^\s*$") { continue }  # Ignore empty lines
        if ($line -match "^\s*#") { continue }  # Ignore comment lines

        if ($line -match "^\s*([^=]+)=(.*)$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
} else {
    Write-Host ".env file not found!"
}
