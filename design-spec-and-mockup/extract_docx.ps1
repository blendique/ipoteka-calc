Add-Type -AssemblyName System.IO.Compression.FileSystem
$docxPath = $args[0]
$outPath = $args[1]
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$text = $xml -replace '<[^>]+>', ' ' -replace '\s+', ' '
$text.Trim() | Set-Content -Path $outPath -Encoding UTF8
