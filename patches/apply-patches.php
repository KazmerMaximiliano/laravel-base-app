<?php
/**
 * Apply composer patches manually
 */

$patches = [
    'vendor/laravel/framework' => [
        'laravel-auth-return-type.patch' => 'Fix auth helper return type documentation'
    ]
];

foreach ($patches as $packageDir => $patchFiles) {
    foreach ($patchFiles as $patchFile => $description) {
        $patchPath = __DIR__ . '/' . $patchFile;
        $targetDir = dirname(__DIR__) . '/' . $packageDir;

        if (!file_exists($patchPath)) {
            echo "Warning: Patch file not found: $patchPath\n";
            continue;
        }

        if (!is_dir($targetDir)) {
            echo "Warning: Target directory not found: $targetDir\n";
            continue;
        }

        echo "Applying patch: $description\n";

        // Use patch with non-interactive flags to prevent hanging
        $patchAbsolute = escapeshellarg($patchPath);
        $command = "cd " . escapeshellarg($targetDir) . " && patch -p1 -N --no-backup-if-mismatch < $patchAbsolute 2>&1";

        $output = [];
        $returnCode = 0;

        exec($command, $output, $returnCode);

        if ($returnCode === 0) {
            echo "✓ Patch applied successfully\n";
        } else {
            $outputText = implode("\n", $output);
            if (strpos($outputText, 'already applied') !== false) {
                echo "✓ Patch already applied\n";
            } else {
                echo "✗ Error applying patch (return code: $returnCode)\n";
                if (!empty($output)) {
                    echo "Output:\n" . $outputText . "\n";
                }
            }
        }
    }
}

echo "\nPatching complete!\n";
?>
