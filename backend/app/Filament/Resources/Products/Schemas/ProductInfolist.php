<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Product Details')->schema([
                TextEntry::make('name'),

                TextEntry::make('slug'),

                TextEntry::make('type')
                    ->badge()
                    ->color('primary'),

                TextEntry::make('category')
                    ->badge()
                    ->color('info'),

                TextEntry::make('price')
                    ->label('Price')
                    ->formatStateUsing(fn($state) => 'Rs. ' . number_format($state)),

                TextEntry::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn($state) => $state . ' / 5'),

                TextEntry::make('description')
                    ->columnSpanFull(),

                TextEntry::make('image')
                    ->label('Image URL')
                    ->columnSpanFull()
                    ->url(fn($state) => $state)
                    ->openUrlInNewTab(),

                TextEntry::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y'),

                TextEntry::make('updated_at')
                    ->label('Updated')
                    ->dateTime('d M Y'),
            ])->columns(2),

        ]);
    }
}
