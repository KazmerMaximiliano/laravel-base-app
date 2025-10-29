<?php

namespace App\Http\Requests;

use App\Http\Traits\DetectsLocale;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => [
                'required',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised(),
                'confirmed',
            ]
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
            'name.required' => __('register.name_required'),
            'email.required' => __('register.email_required'),
            'email.email' =>  __('register.email_invalid'),
            'email.unique' =>  __('register.email_unique'),
            'password.required' => __('register.password_required'),
            'password.confirmed' => __('register.password_confirmed'),
        ];
    }

    /**
     * Determine if the user wants JSON response.
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
            'name' => [
                'description' => 'The user\'s full name.',
                'example' => 'John Doe',
            ],
            'email' => [
                'description' => 'The user\'s email address.',
                'example' => 'john@example.com',
            ],
            'password' => [
                'description' => 'The user\'s password. Must be at least 8 characters and contain uppercase, lowercase, numbers and symbols.',
                'example' => 'MySecure123!',
            ],
            'password_confirmation' => [
                'description' => 'Password confirmation. Must match the password field.',
                'example' => 'MySecure123!',
            ],
        ];
    }
}
