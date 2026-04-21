<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->required()
                ->maxLength(100),

            TextInput::make('slug')
                ->required()
                ->maxLength(100)
                ->unique(ignoreRecord: true)
                ->helperText('e.g. oud, attar, signature'),

            TextInput::make('image')
                ->label('Image URL')
                ->url()
                ->placeholder('https://images.unsplash.com/...')
                ->columnSpanFull(),
        ]);
    }
}
