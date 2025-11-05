<?php

namespace App\Http\Controllers\WEB;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $currentPage = $request->input('currentPage', 1);

        $roles = Role::with('permissions')->paginate($pageSize, ['*'], 'page', $currentPage);

        return Inertia::render('Roles/List', [
            'roles' => RoleResource::collection($roles->items())->resolve(),
            'pagination' => [
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'per_page' => $roles->total() < $roles->perPage() ? $roles->total() : $roles->perPage(),
                'total' => $roles->total(),
                'from' => $roles->firstItem(),
                'to' => $roles->lastItem(),
            ]
        ]);
    }

    public function create()
    {
        $permissions = Permission::all();

        return Inertia::render('Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    public function store(RoleRequest $request)
    {
        $data = $request->validated();

        $data['guard_name'] = $data['guard_name'] ?? 'web';

        $role = Role::create($data);

        if (!empty($data['permissions'])) {
            $role->givePermissionTo($data['permissions']);
        }

        return redirect()->route('roles.index')->with('success', __('Role created successfully.'));
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all();
        $role->load('permissions');

        return Inertia::render('Roles/Edit', [
            'role' => (new RoleResource($role))->resolve(),
            'permissions' => $permissions
        ]);
    }

    public function update(RoleRequest $request, Role $role)
    {
        $data = $request->validated();

        $role->update($data);

        if (isset($data['permissions'])) {
            $role->syncPermissions($data['permissions']);
        }

        return redirect()->route('roles.index')->with('success', __('Role updated successfully.'));
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('roles.index')->with('success', __('Role deleted successfully.'));
    }
}
