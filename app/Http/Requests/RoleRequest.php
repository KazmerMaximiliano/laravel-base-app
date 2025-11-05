<?php

namespace App\Http\Requests;

use App\Http\Traits\DetectsLocale;
use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
            'permissions' => 'sometimes|array',
            'permissions.*' => 'exists:permissions,name',
        ];

        if ($this->isMethod('post')) {
            $rules['name'] = 'required|string|max:255|unique:roles,name';
        } else {
            $roleId = $this->route('role') ? $this->route('role')->id : null;
            $rules['name'] = 'required|string|max:255|unique:roles,name,' . $roleId;
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
            'name.required' => __('roles.name_required'),
            'name.unique' => __('roles.name_unique'),
            'permissions.array' => __('roles.permissions_invalid'),
            'permissions.*.exists' => __('roles.permission_not_exists'),
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
