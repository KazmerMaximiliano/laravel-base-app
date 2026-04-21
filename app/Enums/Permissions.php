<?php

namespace App\Enums;

enum Permissions: string
{
    // User Permissions
    case GET_USERS = 'get_users';
    case CREATE_USERS = 'create_users';
    case EDIT_USERS = 'edit_users';
    case DELETE_USERS = 'delete_users';

    // Roles Permissions
    case GET_ROLES = 'get_roles';
    case CREATE_ROLES = 'create_roles';
    case EDIT_ROLES = 'edit_roles';
    case DELETE_ROLES = 'delete_roles';

    /**
     * Get all permissions
     */
    public static function all(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

    /**
     * Get owner permissions
     */
    public static function ownerPermissions(): array
    {
        return [
            // Users
            self::GET_USERS->value,
            self::CREATE_USERS->value,
            self::EDIT_USERS->value,
            self::DELETE_USERS->value,

            // Roles
            self::GET_ROLES->value,
            self::CREATE_ROLES->value,
            self::EDIT_ROLES->value,
            self::DELETE_ROLES->value,
        ];
    }

    /**
     * Get admin permissions
     */
    public static function adminPermissions(): array
    {
        return [
            // Users
            self::GET_USERS->value,
            self::CREATE_USERS->value,
            self::EDIT_USERS->value,
            self::DELETE_USERS->value,
        ];
    }
}
