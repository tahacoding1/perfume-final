<?php

namespace App\Observers;

use App\Mail\OrderStatusMail;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;

class OrderObserver
{
    /**
     * Jab bhi order update ho aur status change ho — email bhejo.
     */
    public function updated(Order $order): void
    {
        // Sirf status change hone par email bhejo
        if (! $order->wasChanged('status')) {
            return;
        }

        $statusToEmail = [
            'processing' => 'processing',
            'shipped'    => 'shipped',
            'delivered'  => 'delivered',
            'cancelled'  => 'cancelled',
        ];

        $emailType = $statusToEmail[$order->status] ?? null;

        if (! $emailType) {
            return;
        }

        // User ka email lo
        $user = $order->user;
        if (! $user || ! $user->email) {
            return;
        }

        try {
            Mail::to($user->email)->send(new OrderStatusMail($order, $emailType));
        } catch (\Exception $e) {
            \Log::error('Order status email failed: ' . $e->getMessage());
        }
    }
}
