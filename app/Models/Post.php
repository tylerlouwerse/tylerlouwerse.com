<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'body',
        'teaser',
        'published',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    public static function booted()
    {
        static::creating(function (Post $post) {
            $post->uuid = Str::uuid();

            if (!$post->slug) {
                $post->slug = $post->uuid;
            }
        });
    }
}