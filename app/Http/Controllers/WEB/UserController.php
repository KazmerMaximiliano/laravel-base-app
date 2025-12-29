<?php

namespace App\Http\Controllers\WEB;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Enums\Permissions;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:' . Permissions::GET_USERS->value, only: ['index']),
            new Middleware('permission:' . Permissions::CREATE_USERS->value, only: ['create']),
            new Middleware('permission:' . Permissions::CREATE_USERS->value, only: ['store']),
            new Middleware('permission:' . Permissions::EDIT_USERS->value, only: ['edit']),
            new Middleware('permission:' . Permissions::EDIT_USERS->value, only: ['update']),
            new Middleware('permission:' . Permissions::DELETE_USERS->value, only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $currentPage = $request->input('currentPage', 1);

        $users = User::where('id', '!=', auth()->id())
          ->where('id', '!=', 1)
          ->paginate($pageSize, ['*'], 'page', $currentPage);

        return Inertia::render('Users/List', [
            'users' => UserResource::collection($users->items())->resolve(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->total() < $users->perPage() ? $users->total() : $users->perPage(),
                'total' => $users->total(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
            ]
        ]);
    }

    public function create()
    {

        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        $user->assignRole($data['role']);

        return redirect()->route('users.index')->with('success', __('User created successfully.'));
    }

    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'roles' => $roles
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        $user->syncRoles([$data['role']]);

        return redirect()->route('users.index')->with('success', __('User updated successfully.'));
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', __('User deleted successfully.'));
    }
}
