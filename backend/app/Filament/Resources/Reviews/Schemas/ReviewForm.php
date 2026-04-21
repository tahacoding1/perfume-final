<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('product_id')
                ->label('Product')
                ->relationship('product', 'name')
                ->searchable()
                ->preload()
                ->required(),

            TextInput::make('author')
                ->required()
                ->maxLength(100),

            TextInput::make('rating')
                ->required()
                ->numeric()
                ->minValue(1)
                ->maxValue(5)
                ->step(0.1)
                ->default(5),

            Textarea::make('content')
                ->label('Review Content')
                ->required()
                ->rows(4)
                ->columnSpanFull(),
        ]);
    }
}
