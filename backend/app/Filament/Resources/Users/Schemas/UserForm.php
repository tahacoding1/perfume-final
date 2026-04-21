<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Account Information')
                ->description('Basic user account details')
                ->icon('heroicon-o-user')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(100)
                        ->columnSpan(1),

                    TextInput::make('email')
                        ->label('Email Address')
                        ->email()
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->columnSpan(1),
                ]),

            Section::make('Password')
                ->description('Leave blank to keep existing password')
                ->icon('heroicon-o-lock-closed')
                ->schema([
                    TextInput::make('password')
                        ->password()
                        ->revealable()
                        ->label('New Password')
                        ->minLength(6)
                        ->dehydrated(fn($state) => filled($state))
                        ->dehydrateStateUsing(fn($state) => bcrypt($state))
                        ->required(fn(string $operation) => $operation === 'create')
                        ->helperText('Minimum 6 characters. Leave empty to keep current password.'),
                ]),

            Section::make('Permissions & Role')
                ->description('Control what this user can access')
                ->icon('heroicon-o-shield-check')
                ->schema([
                    Toggle::make('is_admin')
                        ->label('Admin Access')
                        ->helperText('Grant full access to the admin panel')
                        ->onColor('danger')
                        ->offColor('gray')
                        ->inline(false),
                ]),

        ]);
    }
}
