<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Post;

class PostPolicy
{
    public function show(?User $user, Post $post)
    {
        return $post->published == true;
    }

    public function before(?User $user)
    {
        if($user) {
            return true;
        }

        return null;
    }
}
