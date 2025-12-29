<?php

namespace App\Http\Requests;

use App\Http\Traits\DetectsLocale;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
        $rules = [
            'name' => 'required|string|max:255',
            'role' => 'required|string',
        ];

        if ($this->isMethod('post')) {
            $rules['email'] = 'required|email|unique:users,email|max:255';
        } else {
            $userId = $this->route('user') ? $this->route('user')->id : null;
            $rules['email'] = 'required|email|unique:users,email,' . $userId . '|max:255';
        }

        if ($this->isMethod('post')) {
            $rules['password'] = [
                'required',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised(),
                'confirmed',
            ];
        } else {
            $rules['password'] = [
                'nullable',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised(),
                'confirmed',
            ];
        }

        return $rules;
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
            'role.required' => __('register.role_required'),
        ];
    }

    public function expectsJson(): bool
    {
        return false;
    }

    /**
     * Get the proper failed validation response for the request.
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {

        parent::failedValidation($validator);
        return;

    }
}
