<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Dashboard;
use App\Filament\Resources\Categories\CategoryResource;
use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Resources\Faqs\FaqResource;
use App\Filament\Resources\NewsletterSubscribers\NewsletterSubscriberResource;
use App\Filament\Resources\Orders\OrderResource;
use App\Filament\Resources\Pages\PageResource;
use App\Filament\Resources\Products\ProductResource;
use App\Filament\Resources\Reviews\ReviewResource;
use App\Filament\Resources\Users\UserResource;
use App\Filament\Widgets\OrdersLineChart;
use App\Filament\Widgets\RevenueBarChart;
use App\Filament\Widgets\SessionsLineChart;
use App\Filament\Widgets\StatsOverview;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->passwordReset()
            ->colors([
                'primary' => Color::hex('#8a1c3b'),
                'danger'  => Color::Rose,
                'gray'    => Color::Slate,
                'info'    => Color::Blue,
                'success' => Color::Emerald,
                'warning' => Color::Orange,
            ])
            ->brandName('LUMIÈRE')
            // ✅ No ->font() — removes Google Fonts external HTTP call
            ->favicon(asset('favicon.ico'))
            ->sidebarCollapsibleOnDesktop()
            // ✅ Custom CSS injected (no Google Fonts inside it either)
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn () => '<link rel="stylesheet" href="' . asset('css/admin-custom.css') . '?' . filemtime(public_path('css/admin-custom.css')) . '">'
            )
            // ✅ Explicit resources — no filesystem scanning every request
            ->resources([
                ProductResource::class,
                OrderResource::class,
                UserResource::class,
                CategoryResource::class,
                ReviewResource::class,
                ContactMessageResource::class,
                FaqResource::class,
                PageResource::class,
                NewsletterSubscriberResource::class,
            ])
            ->pages([
                Dashboard::class,
            ])
            // ✅ Explicit widgets — no filesystem scanning
            ->widgets([
                StatsOverview::class,
                OrdersLineChart::class,
                RevenueBarChart::class,
                SessionsLineChart::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
