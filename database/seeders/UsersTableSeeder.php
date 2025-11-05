<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@laravelbaseapp.com',
            'password' => bcrypt('P4ssw0rd#'),
            'email_verified_at' => now(),
        ]);

        $adminUser->assignRole('admin');
    }
}
