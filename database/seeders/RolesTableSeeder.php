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
        Role::create(['name' => 'owner']);

        foreach (Permissions::ownerPermissions() as $permission) {
            Permission::findByName($permission)->assignRole('owner');
        }

        // Admin Role
        Role::create(['name' => 'admin']);

        foreach (Permissions::adminPermissions() as $permission) {
            Permission::findByName($permission)->assignRole('admin');
        }
    }
}
