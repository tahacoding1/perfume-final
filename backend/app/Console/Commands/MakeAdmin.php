<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class MakeAdmin extends Command
{
    protected $signature   = 'make:admin';
    protected $description = 'Create or reset the LUMIÈRE admin user';

    public function handle(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@lumiere.com'],
            [
                'name'     => 'LUMIÈRE Admin',
                'password' => Hash::make('admin1234'),
                'is_admin' => true,
            ]
        );

        $this->info("✅ Admin ready!");
        $this->line("   Email:    admin@lumiere.com");
        $this->line("   Password: admin1234");
        $this->line("   Panel:    http://127.0.0.1:8000/admin");
    }
}
