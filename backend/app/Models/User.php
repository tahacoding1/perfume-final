<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'is_admin'          => 'boolean',
        ];
    }

    /**
     * Filament Admin Panel access.
     * is_admin = true wale users hi andar ja sakte hain.
     * Fallback: admin@lumiere.com ko hamesha allow karo.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // Email se bhi allow karo agar is_admin column kisi wajah se null ho
        if ($this->email === 'admin@lumiere.com') {
            return true;
        }

        return (bool) ($this->is_admin ?? false);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
