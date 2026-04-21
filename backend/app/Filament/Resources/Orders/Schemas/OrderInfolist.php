<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class OrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Order Summary')->schema([
                TextEntry::make('id')
                    ->label('Order ID')
                    ->formatStateUsing(fn($state) => 'ORD-' . $state),

                TextEntry::make('user.name')
                    ->label('Customer'),

                TextEntry::make('user.email')
                    ->label('Customer Email'),

                TextEntry::make('total_price')
                    ->label('Total Price')
                    ->formatStateUsing(fn($state) => 'Rs. ' . number_format($state)),

                TextEntry::make('status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending'    => 'warning',
                        'processing' => 'info',
                        'shipped'    => 'primary',
                        'delivered'  => 'success',
                        'cancelled'  => 'danger',
                        default      => 'gray',
                    }),

                TextEntry::make('payment_method')
                    ->label('Payment Method')
                    ->formatStateUsing(fn($state) => match($state) {
                        'cod'           => 'Cash on Delivery',
                        'bank_transfer' => 'Bank Transfer',
                        default         => $state,
                    }),

                TextEntry::make('tracking_number')
                    ->label('Tracking Number')
                    ->placeholder('Not assigned yet'),

                TextEntry::make('created_at')
                    ->label('Order Date')
                    ->dateTime('d M Y, h:i A'),
            ])->columns(2),

            Section::make('Shipping Address')->schema([
                TextEntry::make('shipping_address')
                    ->label('')
                    ->columnSpanFull(),
            ]),

            Section::make('Admin Notes')->schema([
                TextEntry::make('admin_notes')
                    ->label('')
                    ->placeholder('No notes')
                    ->columnSpanFull(),
            ]),

        ]);
    }
}
