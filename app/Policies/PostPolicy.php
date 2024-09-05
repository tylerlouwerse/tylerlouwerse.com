<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    public function before(?User $user)
    {
        if ($user) {
            return true;
        }

        return null;
    }

    public function show(?User $user, Post $post)
    {
        return $post->published === true;
    }
}
