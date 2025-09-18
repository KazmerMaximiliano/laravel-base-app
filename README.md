# Laravel Base App

A simple and clean Laravel backend API implementation with authentication functionality using Laravel Sanctum.

## Features

-   **Authentication System**: Complete user authentication with registration, login, and logout
-   **Laravel Sanctum Integration**: Token-based authentication for API access
-   **RESTful API Structure**: Well-organized API endpoints with proper HTTP methods
-   **Request Validation**: Custom form request classes for data validation
-   **Resource Transformers**: API resources for consistent JSON responses
-   **Secure Password Handling**: Password hashing and validation with complexity requirements
-   **Cookie-based Token Storage**: Secure token storage with HTTP-only cookies

## Requirements

-   PHP ^8.1
-   Laravel ^10.10
-   Composer
-   MySQL/PostgreSQL/SQLite

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

6. **Start the development server**
    ```bash
    php artisan serve
    ```

## API Documentation

### Base URL

```
http://localhost:8000/api
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

-   Minimum 8 characters
-   Must contain mixed case letters (uppercase and lowercase)
-   Must contain at least one number
-   Must contain at least one symbol
-   Must not be a commonly compromised password
-   Password confirmation is required

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
