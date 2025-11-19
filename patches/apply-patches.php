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
        $command = "cd '$targetDir' && patch -p1 < '$patchPath' 2>&1";
        $output = [];
        $returnCode = 0;

        exec($command, $output, $returnCode);

        if ($returnCode === 0) {
            echo "✓ Patch applied successfully\n";
        } else {
            if (strpos(implode("\n", $output), 'already applied') !== false) {
                echo "✓ Patch already applied\n";
            } else {
                echo "Error applying patch: " . implode("\n", $output) . "\n";
            }
        }
    }
}

echo "\nPatching complete!\n";
?>
