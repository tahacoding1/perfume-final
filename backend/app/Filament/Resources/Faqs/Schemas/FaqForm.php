<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('question')
                ->required()
                ->maxLength(500)
                ->columnSpanFull(),

            Textarea::make('answer')
                ->required()
                ->rows(4)
                ->columnSpanFull(),

            TextInput::make('sort_order')
                ->label('Sort Order')
                ->numeric()
                ->default(0)
                ->helperText('Lower number = shown first'),

            Toggle::make('is_active')
                ->label('Active')
                ->default(true),
        ]);
    }
}
