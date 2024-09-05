<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'tag' => $this->tag,
            'title' => $this->title,
            'slug' => $this->slug,
            'teaser' => $this->teaser,
            'body' => $this->body,
            'published' => $this->published,
            'published_at' => $this->published_at,
        ];
    }
}
