<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Models\Product;
use App\Models\Category;
use App\Models\SiteSetting;
use App\Models\Review;
use App\Models\ContactMessage;
use App\Models\User;
use App\Models\Order;
use App\Models\Faq;
use App\Models\Page;
use App\Models\NewsletterSubscriber;
use App\Models\OtpCode;
use App\Mail\OtpMail;
use App\Mail\OrderStatusMail;

// ─── PRODUCTS ─────────────────────────────────────────────────────────────

Route::get('/products', fn() => Product::with('reviews')->get());
Route::get('/products/{id}', fn($id) => Product::with('reviews')->findOrFail($id));

// ─── PUBLIC ───────────────────────────────────────────────────────────────

Route::get('/categories',    fn() => Category::all());
Route::get('/site-settings', fn() => SiteSetting::all()->pluck('value', 'key'));
Route::get('/reviews',       fn() => Review::with('product')->get());
Route::get('/faqs',          fn() => Faq::where('is_active', true)->orderBy('sort_order')->get());
Route::get('/pages/{slug}',  fn($slug) => Page::where('slug', $slug)->firstOrFail());

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'subject' => 'required|string|max:200',
        'message' => 'required|string',
    ]);
    return ContactMessage::create($validated);
});

Route::post('/newsletter/subscribe', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:newsletter_subscribers,email',
    ]);
    return NewsletterSubscriber::create($validated);
});

// ─── AUTH ─────────────────────────────────────────────────────────────────

Route::post('/login', function (Request $request) {
    $request->validate(['email' => 'required|email', 'password' => 'required']);
    $user = User::where('email', $request->email)->first();
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages(['email' => ['These credentials do not match our records.']]);
    }
    return ['user' => $user, 'token' => $user->createToken('auth-token')->plainTextToken];
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'name'     => 'required|string|max:100',
        'email'    => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);
    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);
    return ['user' => $user, 'token' => $user->createToken('auth-token')->plainTextToken];
});

// ─── FORGOT PASSWORD (OTP) ────────────────────────────────────────────────

// Step 1: Send OTP
Route::post('/forgot-password/send-otp', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $user = User::where('email', $request->email)->first();
    if (! $user) {
        // Return success anyway to prevent user enumeration
        return response()->json(['message' => 'If this email exists, an OTP has been sent.']);
    }

    // Delete old OTPs for this email
    OtpCode::where('email', $request->email)->delete();

    $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

    OtpCode::create([
        'email'      => $request->email,
        'otp'        => $otp,
        'expires_at' => now()->addMinutes(10),
        'used'       => false,
    ]);

    try {
        Mail::to($request->email)->send(new OtpMail($otp, $user->name));
    } catch (\Exception $e) {
        // Log but don't fail — dev environment may not have mail
        \Log::error('OTP mail failed: ' . $e->getMessage());
    }

    return response()->json(['message' => 'OTP sent to your email address.']);
});

// Step 2: Verify OTP
Route::post('/forgot-password/verify-otp', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'otp'   => 'required|string|size:6',
    ]);

    $record = OtpCode::where('email', $request->email)
                     ->where('otp', $request->otp)
                     ->where('used', false)
                     ->latest()
                     ->first();

    if (! $record || ! $record->isValid()) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 422);
    }

    return response()->json(['message' => 'OTP verified.', 'valid' => true]);
});

// Step 3: Reset password
Route::post('/forgot-password/reset', function (Request $request) {
    $request->validate([
        'email'    => 'required|email',
        'otp'      => 'required|string|size:6',
        'password' => 'required|min:6|confirmed',
    ]);

    $record = OtpCode::where('email', $request->email)
                     ->where('otp', $request->otp)
                     ->where('used', false)
                     ->latest()
                     ->first();

    if (! $record || ! $record->isValid()) {
        return response()->json(['message' => 'Invalid or expired OTP.'], 422);
    }

    $user = User::where('email', $request->email)->first();
    if (! $user) {
        return response()->json(['message' => 'User not found.'], 404);
    }

    $user->update(['password' => Hash::make($request->password)]);
    $record->update(['used' => true]);

    return response()->json(['message' => 'Password reset successfully.']);
});

// ─── ORDER TRACKING (public) ──────────────────────────────────────────────

Route::get('/track/{orderId}', function ($orderId) {
    $id    = ltrim(str_replace('ORD-', '', strtoupper($orderId)), '0') ?: $orderId;
    $order = Order::find((int) $id);

    if (! $order) {
        return response()->json(['message' => 'Order not found.'], 404);
    }

    return [
        'id'               => $order->id,
        'order_id'         => 'ORD-' . $order->id,
        'status'           => $order->status,
        'tracking_number'  => $order->tracking_number ?? null,
        'total_price'      => $order->total_price,
        'created_at'       => $order->created_at,
        'shipping_address' => is_string($order->shipping_address)
                                ? json_decode($order->shipping_address, true)
                                : $order->shipping_address,
    ];
});

// ─── PROTECTED (Sanctum) ──────────────────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', fn(Request $request) => $request->user());

    Route::put('/user', function (Request $request) {
        $user = $request->user();
        $user->update($request->only(['name', 'phone', 'address']));
        return $user;
    });

    Route::post('/orders', function (Request $request) {
        $order = Order::create([
            'user_id'          => $request->user()->id,
            'total_price'      => $request->total_price,
            'shipping_address' => json_encode($request->shipping_details),
            'payment_method'   => $request->payment_method,
            'items'            => $request->items,
            'status'           => 'pending',
        ]);

        // Send order confirmation email
        try {
            Mail::to($request->user()->email)
                ->send(new OrderStatusMail($order->load('user'), 'confirmed'));
        } catch (\Exception $e) {
            \Log::error('Order confirmation email failed: ' . $e->getMessage());
        }

        return $order;
    });

    Route::get('/user/orders', function (Request $request) {
        return Order::where('user_id', $request->user()->id)
                    ->orderBy('created_at', 'desc')
                    ->get();
    });
});
