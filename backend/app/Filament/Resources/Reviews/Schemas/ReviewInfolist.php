<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ReviewInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextEntry::make('product.name')
                ->label('Product'),

            TextEntry::make('author'),

            TextEntry::make('rating')
                ->label('Rating')
                ->formatStateUsing(fn($state) => $state . ' / 5 ⭐'),

            TextEntry::make('content')
                ->label('Review')
                ->columnSpanFull(),

            TextEntry::make('created_at')
                ->label('Submitted')
                ->dateTime('d M Y')
                ->placeholder('-'),
        ]);
    }
}
