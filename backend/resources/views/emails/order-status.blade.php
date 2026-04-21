<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: Georgia, serif; background: #0d0d0d; margin: 0; padding: 40px 20px; }
  .container { max-width: 580px; margin: 0 auto; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden; }
  .header { background: #8a1c3b; padding: 32px 40px; text-align: center; }
  .logo { font-size: 28px; letter-spacing: 8px; color: #fff; font-weight: 400; }
  .logo span { font-style: italic; color: #f0c0c0; }
  .status-banner { padding: 20px 40px; text-align: center; background: #111; border-bottom: 1px solid #2a2a2a; }
  .status-banner .emoji { font-size: 36px; }
  .status-banner h2 { color: #fff; margin: 8px 0 0; font-size: 20px; font-weight: 400; }
  .body { padding: 36px 40px; color: #ccc; }
  .body p { line-height: 1.7; margin: 0 0 16px; font-size: 15px; }
  .order-box { background: #111; border: 1px solid #2a2a2a; border-radius: 4px; padding: 20px 24px; margin: 24px 0; }
  .order-box table { width: 100%; border-collapse: collapse; }
  .order-box td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #2a2a2a; }
  .order-box td:last-child { text-align: right; color: #fff; }
  .order-box tr:last-child td { border-bottom: none; }
  .items-box { background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 4px; padding: 16px 20px; margin: 16px 0; }
  .item-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; }
  .item-row:last-child { border-bottom: none; }
  .total-row { padding-top: 12px; margin-top: 12px; border-top: 1px solid #8a1c3b; display: flex; justify-content: space-between; font-size: 15px; }
  .total-row span:last-child { color: #8a1c3b; font-weight: bold; }
  .btn { display: inline-block; background: #8a1c3b; color: #fff !important; text-decoration: none; padding: 12px 28px; border-radius: 2px; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin-top: 16px; }
  .footer { padding: 24px 40px; border-top: 1px solid #2a2a2a; text-align: center; font-size: 12px; color: #555; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo">LU<span>M</span>IÈRE</div>
  </div>

  @php
    $configs = [
      'confirmed'  => ['emoji' => '✅', 'title' => 'Order Confirmed!',             'msg' => 'Thank you for your purchase. We have received your order and our team is reviewing it now.'],
      'processing' => ['emoji' => '⚙️', 'title' => 'Your Order is Being Prepared', 'msg' => 'Your order is now being carefully packaged by our team. We take great pride in ensuring every bottle is perfectly presented.'],
      'shipped'    => ['emoji' => '🚚', 'title' => 'Your Order is On Its Way!',    'msg' => 'Wonderful news — your LUMIÈRE order has been dispatched. Your fragrance is on its journey to you.'],
      'delivered'  => ['emoji' => '🎁', 'title' => 'Order Delivered!',             'msg' => 'Your LUMIÈRE order has been delivered. We hope it brings you as much joy as it brought us to craft.'],
      'cancelled'  => ['emoji' => '❌', 'title' => 'Order Cancelled',              'msg' => 'Your order has been cancelled as requested. If you believe this is a mistake or have any questions, please contact us immediately.'],
    ];
    $cfg = $configs[$statusType] ?? $configs['confirmed'];
  @endphp

  <div class="status-banner">
    <div class="emoji">{{ $cfg['emoji'] }}</div>
    <h2>{{ $cfg['title'] }}</h2>
  </div>

  <div class="body">
    <p>Dear {{ $order->user?->name ?? 'Valued Customer' }},</p>
    <p>{{ $cfg['msg'] }}</p>

    <div class="order-box">
      <table>
        <tr>
          <td style="color:#888">Order ID</td>
          <td>ORD-{{ $order->id }}</td>
        </tr>
        <tr>
          <td style="color:#888">Payment Method</td>
          <td>{{ strtoupper($order->payment_method) }}</td>
        </tr>
        <tr>
          <td style="color:#888">Status</td>
          <td style="text-transform:capitalize; color:#8a1c3b">{{ $order->status }}</td>
        </tr>
        @if($order->tracking_number)
        <tr>
          <td style="color:#888">Tracking Number</td>
          <td>{{ $order->tracking_number }}</td>
        </tr>
        @endif
      </table>
    </div>

    @if($order->items && count($order->items) > 0)
    <p style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:#888; margin-bottom:8px">Items Ordered</p>
    <div class="items-box">
      @foreach($order->items as $item)
      <div class="item-row">
        <span>{{ $item['name'] ?? 'Product' }} × {{ $item['quantity'] ?? 1 }}</span>
        <span style="color:#ccc">Rs. {{ number_format(($item['price'] ?? 0) * ($item['quantity'] ?? 1)) }}</span>
      </div>
      @endforeach
      <div class="total-row">
        <span style="color:#888">Total Paid</span>
        <span>Rs. {{ number_format($order->total_price) }}</span>
      </div>
    </div>
    @endif

    <p style="margin-top:24px">If you have any questions, our concierge team is always here to help.</p>
    <a href="http://localhost:5173/track-order" class="btn">Track Your Order</a>
  </div>

  <div class="footer">
    © {{ date('Y') }} LUMIÈRE &nbsp;|&nbsp; hello@lumiere.pk &nbsp;|&nbsp; +92 300 1234567
  </div>
</div>
</body>
</html>
