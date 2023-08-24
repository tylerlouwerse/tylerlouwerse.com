<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostPatchController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    public function __invoke(Request $request, Post $post)
    {
        $this->validate($request, [
            'title' => 'required',
            'teaser' => 'nullable',
            'body' => 'nullable',
            'slug' => 'required|string|unique:posts,slug,' . $post->id,
            'published' => 'boolean'
        ]);

        $post->update($request->only('title', 'teaser', 'body', 'published', 'slug'));
    }
}
