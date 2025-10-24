<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Traits\DetectsLocale;

class LoginRequest extends FormRequest
{
    use DetectsLocale;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $this->setLocaleFromRequest();

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => __('login.email_required'),
            'email.email' => __('login.email_invalid'),
            'email.exists' => __('login.email_not_exists'),
            'password.required' => __('login.password_required'),
        ];
    }

    /**
     * Determine if the user wants JSON response.
     * Returns false for Inertia requests to allow proper error handling,
     * true for API requests (mobile apps, external platforms, etc.)
     */
    public function expectsJson(): bool
    {
        if ($this->hasHeader('X-Inertia')) {
            return false;
        }

        if ($this->is('api/*') || $this->hasHeader('Accept') && str_contains($this->header('Accept'), 'application/json')) {
            return true;
        }

        return true;
    }

    /**
     * Get the proper failed validation response for the request.
     * Only applies to API requests, Inertia requests use Laravel's default behavior.
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        if ($this->hasHeader('X-Inertia')) {
            parent::failedValidation($validator);
            return;
        }

        throw new \Illuminate\Http\Exceptions\HttpResponseException(
            response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors()
            ], 422)
        );
    }

    /**
     * Get the body parameters for API documentation.
     *
     * @return array
     */
    public function bodyParameters()
    {
        return [
            'email' => [
                'description' => 'The user\'s email address.',
                'example' => 'john@example.com',
            ],
            'password' => [
                'description' => 'The user\'s password.',
                'example' => 'password123',
            ],
        ];
    }
}
