<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = PostResource::collection(Post::latest()->wherePublished(true)->get());

        return Inertia::render('Post/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(Request $request, Post $post)
    {
        Gate::authorize('show', $post);

        return Inertia::render('Post/Show', [
            'post' => new PostResource($post),
        ]);
    }
}
