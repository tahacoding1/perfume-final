<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────

Route::get('/products', function () {
    return Product::with('reviews')->get();
});

Route::get('/products/{id}', function ($id) {
    return Product::with('reviews')->findOrFail($id);
});

Route::get('/categories', function () {
    return Category::all();
});

Route::get('/site-settings', function () {
    return SiteSetting::all()->pluck('value', 'key');
});

Route::get('/reviews', function () {
    return Review::with('product')->get();
});

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name'    => 'required|string|max:100',
        'email'   => 'required|email',
        'subject' => 'required|string|max:200',
        'message' => 'required|string',
    ]);
    return ContactMessage::create($validated);
});

Route::get('/faqs', function () {
    return Faq::where('is_active', true)->orderBy('sort_order')->get();
});

Route::get('/pages/{slug}', function ($slug) {
    return Page::where('slug', $slug)->firstOrFail();
});

Route::post('/newsletter/subscribe', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:newsletter_subscribers,email',
    ]);
    return NewsletterSubscriber::create($validated);
});

// ─── AUTH ROUTES ──────────────────────────────────────────────────────────

Route::post('/login', function (Request $request) {
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['These credentials do not match our records.'],
        ]);
    }

    return [
        'user'  => $user,
        'token' => $user->createToken('auth-token')->plainTextToken,
    ];
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

    return [
        'user'  => $user,
        'token' => $user->createToken('auth-token')->plainTextToken,
    ];
});

// ─── PUBLIC ORDER TRACKING ────────────────────────────────────────────────
// Allows anyone to track an order by entering "ORD-{id}" — no auth needed.

Route::get('/track/{orderId}', function ($orderId) {
    // Accept both "ORD-12" and plain "12"
    $id = ltrim(str_replace('ORD-', '', strtoupper($orderId)), '0') ?: $orderId;

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

// ─── PROTECTED ROUTES (Sanctum) ───────────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
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
        return $order;
    });

    Route::get('/user/orders', function (Request $request) {
        return Order::where('user_id', $request->user()->id)
                    ->orderBy('created_at', 'desc')
                    ->get();
    });

    // Update profile name (safe fields only)
    Route::put('/user', function (Request $request) {
        $user = $request->user();
        $user->update($request->only(['name', 'phone', 'address']));
        return $user;
    });
});
