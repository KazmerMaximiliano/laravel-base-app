<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\Permissions;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Owner Role
        $ownerRole = Role::firstOrCreate(['name' => 'owner']);

        foreach (Permissions::ownerPermissions() as $permission) {
            $ownerRole->syncPermissions(Permissions::ownerPermissions());
        }

        // Admin Role
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        foreach (Permissions::adminPermissions() as $permission) {
            $adminRole->syncPermissions(Permissions::adminPermissions());
        }
    }
}
