<?php

namespace App\Filament\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('type')
                    ->badge()
                    ->color('primary')
                    ->searchable(),

                TextColumn::make('category')
                    ->badge()
                    ->color('info'),

                TextColumn::make('price')
                    ->label('Price')
                    ->formatStateUsing(fn($state) => 'Rs. ' . number_format($state))
                    ->sortable(),

                TextColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn($state) => $state . ' ⭐')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Added')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'oud'       => 'Oud',
                        'attar'     => 'Attar',
                        'signature' => 'Signature',
                        'under1500' => 'Under 1500Rs',
                        'tester'    => 'Tester Box',
                        'giftbox'   => 'Gift Box',
                        'loyalty'   => 'Main Loyalty',
                    ]),
                SelectFilter::make('type')
                    ->options([
                        'OUD'         => 'OUD',
                        'ATTAR'       => 'ATTAR',
                        'SIGNATURE'   => 'SIGNATURE',
                        'UNDER 1500'  => 'UNDER 1500',
                        'TESTER BOX'  => 'TESTER BOX',
                        'GIFT BOX'    => 'GIFT BOX',
                        'MAIN LOYALTY'=> 'MAIN LOYALTY',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
