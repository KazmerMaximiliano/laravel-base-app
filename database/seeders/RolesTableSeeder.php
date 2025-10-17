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
        // Admin Role
        Role::create(['name' => 'admin']);

        $userPermissions = ['get users', 'create users', 'edit users', 'delete users'];

        foreach ($userPermissions as $permission) {
            Permission::findByName($permission)->assignRole('admin');
        }
    }
}
