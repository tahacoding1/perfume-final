<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order,
        public string $statusType // confirmed | processing | shipped | delivered | cancelled
    ) {}

    public function envelope(): Envelope
    {
        $subjects = [
            'confirmed'  => '✅ Order Confirmed — ORD-' . $this->order->id,
            'processing' => '⚙️ Your Order is Being Prepared — ORD-' . $this->order->id,
            'shipped'    => '🚚 Your Order is On Its Way! — ORD-' . $this->order->id,
            'delivered'  => '🎁 Your Order Has Been Delivered — ORD-' . $this->order->id,
            'cancelled'  => '❌ Order Cancelled — ORD-' . $this->order->id,
        ];

        return new Envelope(
            subject: $subjects[$this->statusType] ?? 'Order Update — ORD-' . $this->order->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order-status',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
