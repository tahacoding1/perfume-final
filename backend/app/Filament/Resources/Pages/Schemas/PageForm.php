<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')
                ->required()
                ->maxLength(255),

            TextInput::make('slug')
                ->required()
                ->maxLength(100)
                ->unique(ignoreRecord: true)
                ->helperText('e.g. privacy, terms, shipping'),

            RichEditor::make('content')
                ->required()
                ->columnSpanFull()
                ->toolbarButtons([
                    'bold', 'italic', 'underline',
                    'h2', 'h3',
                    'bulletList', 'orderedList',
                    'link', 'undo', 'redo',
                ]),
        ]);
    }
}
