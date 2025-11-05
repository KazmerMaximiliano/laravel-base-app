<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Owner Role
        Role::create(['name' => 'owner']);

        $ownerPermissions = ['get users', 'create users', 'edit users', 'delete users', 'get roles', 'create roles', 'edit roles', 'delete roles'];

        foreach ($ownerPermissions as $permission) {
            Permission::findByName($permission)->assignRole('owner');
        }

        // Admin Role
        Role::create(['name' => 'admin']);

        $adminPermissions = ['get users', 'create users', 'edit users', 'delete users'];

        foreach ($adminPermissions as $permission) {
            Permission::findByName($permission)->assignRole('admin');
        }
    }
}
