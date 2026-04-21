<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Product Information')->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),

                Select::make('type')
                    ->options([
                        'OUD'         => 'OUD',
                        'ATTAR'       => 'ATTAR',
                        'SIGNATURE'   => 'SIGNATURE',
                        'UNDER 1500'  => 'UNDER 1500',
                        'TESTER BOX'  => 'TESTER BOX',
                        'GIFT BOX'    => 'GIFT BOX',
                        'MAIN LOYALTY'=> 'MAIN LOYALTY',
                    ])
                    ->required(),

                Select::make('category')
                    ->options([
                        'oud'       => 'Oud',
                        'attar'     => 'Attar',
                        'signature' => 'Signature',
                        'under1500' => 'Under 1500Rs',
                        'tester'    => 'Tester Box',
                        'giftbox'   => 'Gift Box',
                        'loyalty'   => 'Main Loyalty',
                    ])
                    ->required(),

                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rs.'),

                TextInput::make('rating')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(5)
                    ->step(0.1)
                    ->default(5.0),

                Textarea::make('description')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),

                TextInput::make('image')
                    ->label('Image URL')
                    ->url()
                    ->placeholder('https://images.unsplash.com/...')
                    ->columnSpanFull(),
            ])->columns(2),

        ]);
    }
}
