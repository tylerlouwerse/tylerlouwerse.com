<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = PostResource::collection(Post::latest()->get());

        return Inertia::render('Admin/Post/Index', [
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $post = Post::create([
            'title' => 'Untitled Post',
            'tag' => 'Personal',
            'reading_mins' => 0,
        ]);

        return redirect()->route('admin.posts.edit', $post);
    }

    public function edit(Request $request, Post $post)
    {
        return Inertia::render('Admin/Post/Edit', [
            'post' => new PostResource($post),
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();

        $post->update($validated);
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();

        return redirect()->back();
    }
}
