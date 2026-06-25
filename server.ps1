# Native PowerShell HTTP Web Server using .NET HttpListener
# Serves the static prototype files from the workspace directory

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "WaterHall local server running at http://localhost:$port/"

$basePath = "d:\MIKE\CAPSTONE SHEYT PROTOTYPE"

$mimeTypes = @{
  ".html" = "text/html"
  ".css"  = "text/css"
  ".js"   = "text/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or $localPath -eq "") {
            $localPath = "/index.html"
        }

        # Clean path formatting
        $urlPath = $localPath.Replace("/", "\")
        $filePath = Join-Path $basePath $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            
            $contentType = $mimeTypes[$ext]
            if ($null -eq $contentType) {
                $contentType = "application/octet-stream"
            }

            # Set headers and output
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("File Not Found: $localPath")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Output "Error: $_"
}
finally {
    $listener.Stop()
    Write-Output "Server stopped."
}
