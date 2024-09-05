<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'tag' => 'required|string',
            'slug' => 'required|string|unique:posts,slug,' . $this->post->id,
            'title' => 'required',
            'body' => 'nullable',
            'teaser' => 'nullable',
            'published' => 'boolean',
        ];
    }
}
