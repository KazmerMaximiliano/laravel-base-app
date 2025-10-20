<?php

namespace App\Http\Controllers\WEB;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    public function index()
    {
       return Inertia::render('Roles/Index', [
            'params' => [
                'pageTitle' => 'Roles Management',
                'pageDescription' => 'Manage user roles and permissions here.',
            ]
        ]);
    }
}
