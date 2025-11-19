# Laravel Base App

A simple and clean Laravel backend API implementation with authentication functionality using Laravel Sanctum.

## Features

- **Authentication System**: Complete user authentication with registration, login, and logout
- **Laravel Sanctum Integration**: Token-based authentication for API access
- **RESTful API Structure**: Well-organized API endpoints with proper HTTP methods
- **Request Validation**: Custom form request classes for data validation
- **Resource Transformers**: API resources for consistent JSON responses
- **Secure Password Handling**: Password hashing and validation with complexity requirements
- **Cookie-based Token Storage**: Secure token storage with HTTP-only cookies
- **Interactive API Documentation**: Auto-generated documentation using Scribe with Scalar theme

## Requirements

- PHP ^8.1
- Laravel ^10.10
- Composer
- MySQL/PostgreSQL/SQLite

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd laravel-base-app
   ```

2. **Install dependencies**

   ```bash
   composer install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database configuration**

   Update your `.env` file with your database credentials:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_base_app
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Run migrations**

   ```bash
   php artisan migrate
   ```

6. **Generate API documentation**

   ```bash
   php artisan scribe:generate
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   ```

## API Documentation

This project uses **Scribe** with **Scalar** theme to automatically generate beautiful, interactive API documentation.

### Base URL

```
http://localhost:8000/api
```

### API Documentation URLs

The API documentation is available in multiple formats:

- **Interactive Documentation (Scalar)**: `http://localhost:8000/docs`
- **OpenAPI Specification**: `http://localhost:8000/docs.openapi`
- **Postman Collection**: `http://localhost:8000/docs.postman`

### About Scalar

Scalar provides a modern, interactive API documentation experience with:

- **Beautiful UI**: Clean, responsive design that works on all devices
- **Interactive Testing**: Try API endpoints directly from the documentation
- **Code Examples**: Auto-generated code samples in multiple programming languages
- **OpenAPI Standard**: Full compatibility with OpenAPI 3.0 specification

### Generating Documentation

To regenerate the API documentation after making changes to your endpoints, run:

```bash
php artisan scribe:generate
```

### Authentication Endpoints

#### Register User

```http
POST /register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-09-18T10:00:00.000000Z",
    "updated_at": "2025-09-18T10:00:00.000000Z"
  },
  "token": "1|abc123def456..."
}
```

#### Login User

```http
POST /login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-09-18T10:00:00.000000Z",
    "updated_at": "2025-09-18T10:00:00.000000Z"
  },
  "token": "1|abc123def456..."
}
```

#### Logout User

```http
POST /logout
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response:**

```json
{
  "message": "Logged out successfully!"
}
```

### Protected Endpoints

#### Get Current User

```http
GET /user
```

**Headers:**

```
Authorization: Bearer {token}
```

**Response:**

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-09-18T10:00:00.000000Z",
    "updated_at": "2025-09-18T10:00:00.000000Z"
  }
}
```

## Password Requirements

The registration endpoint enforces the following password requirements:

- Minimum 8 characters
- Must contain mixed case letters (uppercase and lowercase)
- Must contain at least one number
- Must contain at least one symbol
- Must not be a commonly compromised password
- Password confirmation is required

## Error Responses

### Validation Errors (422)

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

### Authentication Errors (401)

```json
{
  "message": "Email or password is incorrect!"
}
```

### Unauthorized Access (401)

```json
{
  "message": "Unauthenticated."
}
```

## Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── API/
│   │       ├── AuthController.php    # Authentication logic
│   │       └── UserController.php    # User management
│   ├── Requests/
│   │   ├── LoginRequest.php          # Login validation rules
│   │   └── RegisterRequest.php       # Registration validation rules
│   └── Resources/
│       └── UserResource.php          # User data transformation
├── Models/
│   └── User.php                      # User model with Sanctum traits
routes/
└── api.php                           # API route definitions
```

## Composer Patches System

This project uses a custom patch system to modify files in Composer dependencies without affecting version control.

### How It Works

1. **Patch Application Script** (`patches/apply-patches.php`):
   - Executes automatically after `composer install` and `composer update`
   - Reads `.patch` files and applies them to specified directories
   - Handles cases when a patch is already applied

2. **Patch Files**:
   - Located in the `patches/` folder
   - Format: `name-description.patch`
   - Generated with `diff` or `git diff`

### Folder Structure

```
proyecto/
├── patches/
│   ├── apply-patches.php              # Script that applies patches
│   ├── laravel-auth-return-type.patch # Patch for Laravel Framework
│   └── ... (other patches)
└── composer.json
```

### Current Patches

#### `patches/laravel-auth-return-type.patch`

**Description**: Modifies the documented return type of the `auth()` helper in Laravel Framework.

**Change**:

```diff
- @return ($guard is null ? \Illuminate\Contracts\Auth\Factory : \Illuminate\Contracts\Auth\Guard)
+ @return \Illuminate\Contracts\Auth\StatefulGuard
```

**Modified File**: `vendor/laravel/framework/src/Illuminate/Foundation/helpers.php` (line 172)

### Adding New Patches

1. **Create the patch file**:

   ```bash
   diff -u original-file.php modified-file.php > new-patch.patch
   ```

2. **Save in patches folder**: `./patches/new-patch.patch`

3. **Update `patches/apply-patches.php`**:

   ```php
   $patches = [
       'vendor/path/to/package' => [
           'new-patch.patch' => 'Description of the patch'
       ]
   ];
   ```

4. **The patch will apply automatically** on the next `composer install`

### Applying Patches Manually

If you need to apply patches manually:

```bash
php patches/apply-patches.php
```

### Important Notes

- Patches are applied AFTER Composer installs dependencies
- If a patch is already applied, the script detects it and continues without error
- Patches are reapplied automatically each time you run `composer install` or `composer update`
- The script is idempotent: it's safe to run multiple times
