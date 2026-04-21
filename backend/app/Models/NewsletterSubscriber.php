<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    use HasFactory;

    protected $fillable = ['email'];

    // Table has subscribed_at not created_at/updated_at
    public $timestamps = false;

    protected static function booted(): void
    {
        static::creating(function ($subscriber) {
            $subscriber->subscribed_at = now();
        });
    }
}
