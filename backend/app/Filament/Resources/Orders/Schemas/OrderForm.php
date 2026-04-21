<?php

namespace App\Filament\Resources\Orders\Schemas;

use App\Models\User;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Order Details')->schema([
                Select::make('user_id')
                    ->label('Customer')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                TextInput::make('total_price')
                    ->label('Total Price')
                    ->required()
                    ->numeric()
                    ->prefix('Rs.'),

                Select::make('status')
                    ->options([
                        'pending'    => 'Pending',
                        'processing' => 'Processing',
                        'shipped'    => 'Shipped',
                        'delivered'  => 'Delivered',
                        'cancelled'  => 'Cancelled',
                    ])
                    ->required()
                    ->default('pending'),

                Select::make('payment_method')
                    ->options([
                        'cod'          => 'Cash on Delivery',
                        'bank_transfer'=> 'Bank Transfer',
                    ])
                    ->required(),
            ])->columns(2),

            Section::make('Shipping & Tracking')->schema([
                TextInput::make('tracking_number')
                    ->label('Tracking Number')
                    ->placeholder('Add courier tracking number...')
                    ->maxLength(255),

                Textarea::make('shipping_address')
                    ->label('Shipping Address')
                    ->rows(3)
                    ->columnSpanFull(),

                Textarea::make('admin_notes')
                    ->label('Admin Notes (Internal)')
                    ->rows(2)
                    ->placeholder('Internal notes not shown to customer...')
                    ->columnSpanFull(),
            ]),

        ]);
    }
}
