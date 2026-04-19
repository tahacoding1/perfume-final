<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\SiteSetting;
use App\Models\Faq;
use App\Models\Page;
use App\Models\NewsletterSubscriber;
use App\Models\ContactMessage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─── ADMIN USER ───────────────────────────────────────────
        User::firstOrCreate(
            ['email' => 'admin@lumiere.com'],
            [
                'name'     => 'LUMIÈRE Admin',
                'password' => Hash::make('admin1234'),
                'is_admin' => true,
            ]
        );

        // Demo customer
        User::firstOrCreate(
            ['email' => 'demo@lumiere.com'],
            [
                'name'     => 'Demo Customer',
                'password' => Hash::make('demo1234'),
                'is_admin' => false,
            ]
        );

        // ─── CATEGORIES ──────────────────────────────────────────
        $categories = [
            ['name' => 'Oud',          'slug' => 'oud'],
            ['name' => 'Attar',        'slug' => 'attar'],
            ['name' => 'Signature',    'slug' => 'signature'],
            ['name' => 'Under 1500Rs', 'slug' => 'under1500'],
            ['name' => 'Tester Box',   'slug' => 'tester'],
            ['name' => 'Gift Box',     'slug' => 'giftbox'],
            ['name' => 'Main Loyalty', 'slug' => 'loyalty'],
        ];
        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // ─── PRODUCTS ────────────────────────────────────────────
        $products = [
            [
                'name'        => 'Oud Mystique',
                'type'        => 'OUD',
                'category'    => 'oud',
                'price'       => 8500,
                'rating'      => 5,
                'image'       => 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400',
                'description' => 'A deeply enchanting blend of aged Cambodian Oud, intertwined with subtle hints of midnight leather and sweet saffron. Oud Mystique captivates the senses with its remarkably long-lasting sillage.',
            ],
            [
                'name'        => 'Royal Agarwood',
                'type'        => 'OUD',
                'category'    => 'oud',
                'price'       => 10500,
                'rating'      => 4.9,
                'image'       => 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=400',
                'description' => 'Distilled from the rarest agarwood trees, this majestic essence offers a warm, woody core accompanied by light citrus top notes and a trail that commands every room.',
            ],
            [
                'name'        => 'Dark Oud Noir',
                'type'        => 'OUD',
                'category'    => 'oud',
                'price'       => 9800,
                'rating'      => 4.8,
                'image'       => 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
                'description' => 'An intensely smoky Oud layered over dark resins, black amber, and a whisper of tobacco. A bold statement for the discerning collector.',
            ],
            [
                'name'        => 'Sandalwood Rose',
                'type'        => 'ATTAR',
                'category'    => 'attar',
                'price'       => 3200,
                'rating'      => 4.8,
                'image'       => 'https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400',
                'description' => 'The perfect marriage of velvety Taif roses and creamy Indian sandalwood. This concentrated attar unfolds beautifully on the skin, lasting well into the evening.',
            ],
            [
                'name'        => 'Musk Tahara',
                'type'        => 'ATTAR',
                'category'    => 'attar',
                'price'       => 2800,
                'rating'      => 4.7,
                'image'       => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400',
                'description' => 'Pure, clean, and beautifully innocent. Musk Tahara is a thick, luxurious white musk offering a soap-like freshness and powdery dry-down.',
            ],
            [
                'name'        => 'Rose Afghani',
                'type'        => 'ATTAR',
                'category'    => 'attar',
                'price'       => 3600,
                'rating'      => 4.9,
                'image'       => 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400',
                'description' => 'Sourced from the legendary Panjshir Valley, this pure rose attar is one of our finest offerings — dense, heady, and breathtakingly floral.',
            ],
            [
                'name'        => 'Citrus Breeze',
                'type'        => 'UNDER 1500',
                'category'    => 'under1500',
                'price'       => 1400,
                'rating'      => 4.5,
                'image'       => 'https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400',
                'description' => 'An uplifting burst of Sicilian lemon and crushed mint leaves. Citrus Breeze is your perfect summer companion — fresh, vibrant, and instantly mood-lifting.',
            ],
            [
                'name'        => 'White Linen',
                'type'        => 'UNDER 1500',
                'category'    => 'under1500',
                'price'       => 1200,
                'rating'      => 4.2,
                'image'       => 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400',
                'description' => 'Minimalist and pure. White Linen captures the scent of freshly washed fabrics drying in a gentle spring breeze.',
            ],
            [
                'name'        => 'Aqua Horizon',
                'type'        => 'UNDER 1500',
                'category'    => 'under1500',
                'price'       => 1350,
                'rating'      => 4.3,
                'image'       => 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=400',
                'description' => 'A fresh marine accord blended with sea salt, driftwood, and a hint of bergamot. Perfect for everyday casual wear.',
            ],
            [
                'name'        => 'Midnight Bloom',
                'type'        => 'SIGNATURE',
                'category'    => 'signature',
                'price'       => 12000,
                'rating'      => 4.9,
                'image'       => 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400',
                'description' => 'Our most sought-after signature blend. Midnight Bloom combines night-blooming jasmine, dark vanilla bean, and a touch of black pepper for an unforgettable sillage.',
            ],
            [
                'name'        => 'Amber Wood',
                'type'        => 'SIGNATURE',
                'category'    => 'signature',
                'price'       => 14000,
                'rating'      => 5.0,
                'image'       => 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400',
                'description' => 'A deeply resinous and bold composition. Rich golden amber melts into cedarwood and smoked patchouli, creating an aura of timeless sophistication.',
            ],
            [
                'name'        => 'Velvet Noir',
                'type'        => 'SIGNATURE',
                'category'    => 'signature',
                'price'       => 13500,
                'rating'      => 4.8,
                'image'       => 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
                'description' => 'A seductive Oriental chypre. Dark plum and blackcurrant open onto a heart of Bulgarian rose and smooth vetiver, leaving a trail of silky black musk.',
            ],
            [
                'name'        => 'Tester Collection',
                'type'        => 'TESTER BOX',
                'category'    => 'tester',
                'price'       => 4000,
                'rating'      => 4.6,
                'image'       => 'https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400',
                'description' => 'Not sure which scent suits you best? The Tester Collection features 5 curated mini-bottles of our top sellers, presented in a premium gift sleeve.',
            ],
            [
                'name'        => 'Discovery Set',
                'type'        => 'TESTER BOX',
                'category'    => 'tester',
                'price'       => 5500,
                'rating'      => 4.7,
                'image'       => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400',
                'description' => 'Explore our entire fragrance library. This Discovery Set contains 8 mini vials — from our lightest citrus to our deepest Oud — with a scent guide booklet.',
            ],
            [
                'name'        => 'Luxury Gift Set',
                'type'        => 'GIFT BOX',
                'category'    => 'giftbox',
                'price'       => 25000,
                'rating'      => 5.0,
                'image'       => 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400',
                'description' => 'The ultimate gesture of appreciation. Encased in a velvety mahogany box, this set contains our three finest Extraits de Parfum with gold-embossed presentation.',
            ],
            [
                'name'        => 'Couple\'s Edition',
                'type'        => 'GIFT BOX',
                'category'    => 'giftbox',
                'price'       => 18000,
                'rating'      => 4.8,
                'image'       => 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400',
                'description' => 'His & Hers. Two perfectly complementary fragrances presented in a velvet-lined gift box, tied with a hand-knotted silk ribbon. A declaration of elegance.',
            ],
            [
                'name'        => 'Loyalty Exclusive',
                'type'        => 'MAIN LOYALTY',
                'category'    => 'loyalty',
                'price'       => 8000,
                'rating'      => 4.7,
                'image'       => 'https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400',
                'description' => 'A special reserve created exclusively for our most dedicated patrons. Notes of vintage bergamot, tobacco leaf, and tonka bean swirl together in an unforgettable accord.',
            ],
        ];

        foreach ($products as $p) {
            $p['slug'] = Str::slug($p['name']);
            Product::firstOrCreate(['slug' => $p['slug']], $p);
        }

        // ─── REVIEWS ─────────────────────────────────────────────
        $reviewData = [
            ['product_slug' => 'midnight-bloom',  'author' => 'Ayesha K.',     'rating' => 5, 'content' => 'The lasting power of their signature collection is unbelievable. Midnight Bloom is pure luxury in a bottle.'],
            ['product_slug' => 'amber-wood',       'author' => 'Faisal R.',     'rating' => 5, 'content' => 'Amber Wood is extraordinary. I wore it to a wedding and received compliments all evening. Worth every rupee.'],
            ['product_slug' => 'oud-mystique',     'author' => 'Sara N.',       'rating' => 5, 'content' => 'I have tried ouds from across the world and LUMIÈRE\'s Oud Mystique rivals anything I have found in Dubai souks.'],
            ['product_slug' => 'sandalwood-rose',  'author' => 'Zara M.',       'rating' => 5, 'content' => 'This attar is absolutely divine. The rose and sandalwood balance is perfect — not too sweet, not too heavy.'],
            ['product_slug' => 'royal-agarwood',   'author' => 'Hassan A.',     'rating' => 5, 'content' => 'A truly royal fragrance. The agarwood quality is exceptional — deep, rich, and beautifully long-lasting.'],
            ['product_slug' => 'velvet-noir',      'author' => 'Maryam T.',     'rating' => 4, 'content' => 'Velvet Noir is sophisticated and mysterious. The plum and vetiver combination is absolutely stunning.'],
            ['product_slug' => 'musk-tahara',      'author' => 'Bilal Ch.',     'rating' => 5, 'content' => 'Musk Tahara is the cleanest, most beautiful musk I have ever experienced. My entire family has fallen in love.'],
            ['product_slug' => 'luxury-gift-set',  'author' => 'Nadia S.',      'rating' => 5, 'content' => 'I gifted this to my mother and she was speechless. The packaging alone is a work of art.'],
            ['product_slug' => 'tester-collection','author' => 'Omar F.',       'rating' => 4, 'content' => 'The tester collection was the perfect way to sample. I have now ordered three full-size bottles based on my trials.'],
            ['product_slug' => 'loyalty-exclusive','author' => 'Asma B.',      'rating' => 5, 'content' => 'The Loyalty Exclusive feels truly special. The bergamot and tonka combination is unlike anything else in the market.'],
            ['product_slug' => 'rose-afghani',     'author' => 'Imran K.',      'rating' => 5, 'content' => 'The Rose Afghani is hauntingly beautiful. It transports you straight to a mountain rose garden at sunrise.'],
            ['product_slug' => 'citrus-breeze',    'author' => 'Hina J.',       'rating' => 4, 'content' => 'Excellent value for money. Citrus Breeze is my go-to morning fragrance — always fresh and energizing.'],
        ];

        foreach ($reviewData as $r) {
            $product = Product::where('slug', $r['product_slug'])->first();
            if ($product) {
                Review::firstOrCreate(
                    ['product_id' => $product->id, 'author' => $r['author']],
                    ['rating' => $r['rating'], 'content' => $r['content']]
                );
            }
        }

        // ─── FAQS ─────────────────────────────────────────────────
        $faqs = [
            [
                'question'  => 'How long do your perfumes last?',
                'answer'    => 'Our Signature and Oud collections are formulated as Extrait de Parfum and typically last 12–24 hours on skin, and even longer on clothing. Our attars, being pure oil-based, can last up to 48 hours.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'question'  => 'Are your ingredients cruelty-free?',
                'answer'    => 'Yes, all our ingredients are ethically sourced and 100% cruelty-free. We do not test on animals at any stage of production. Our ouds and roses are sustainably harvested.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'question'  => 'What is your return policy?',
                'answer'    => 'We offer a 7-day return policy for sealed, unopened products in their original packaging. Due to hygiene regulations, opened bottles cannot be returned. Tester boxes are strictly final sale.',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'question'  => 'Do you offer international shipping?',
                'answer'    => 'Currently, we ship nationwide within Pakistan via TCS and Leopards Couriers. We are actively working on international shipping and will announce when it is available.',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'question'  => 'How do I track my order?',
                'answer'    => 'Once your order is dispatched, you will receive a tracking number via email or SMS. You can also use the Track Order page on our website by entering your Order ID.',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'question'  => 'Are your attars alcohol-free?',
                'answer'    => 'Yes. All our attars are 100% alcohol-free, making them halal and suitable for all skin types including sensitive skin. They are pure concentrated fragrance oils.',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'question'  => 'Can I get a custom or bespoke fragrance?',
                'answer'    => 'We do offer bespoke fragrance consultations for special occasions and corporate gifting. Please contact our concierge team via the Contact page to discuss your requirements.',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'question'  => 'What payment methods do you accept?',
                'answer'    => 'We currently accept Cash on Delivery (COD) and direct bank transfer. We are integrating online card payments and will update our customers when this option is live.',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::firstOrCreate(['question' => $faq['question']], $faq);
        }

        // ─── PAGES (Policy Content) ────────────────────────────────
        $pages = [
            [
                'title'   => 'Privacy Policy',
                'slug'    => 'privacy',
                'content' => '<h2>Privacy Policy</h2>
<p>At LUMIÈRE, we are deeply committed to safeguarding the privacy of our distinguished clientele. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
<h3>Information We Collect</h3>
<p>We collect your name, email address, shipping address, and phone number exclusively for order fulfillment and personalized service. Payment information is securely processed by our third-party banking partners and is <strong>never stored</strong> on our servers.</p>
<h3>How We Use Your Information</h3>
<p>Your data is used exclusively to deliver your luxury fragrances, provide order updates, and — if you have opted in — to notify you of exclusive private sales and limited edition launches. We will never sell, lease, or trade your data to any external marketing firms.</p>
<h3>Data Security</h3>
<p>All data transmitted through our website is encrypted using industry-standard SSL technology. Our systems are regularly audited for security vulnerabilities.</p>
<h3>Your Rights</h3>
<p>You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact our concierge team via the Contact page.</p>',
            ],
            [
                'title'   => 'Terms of Service',
                'slug'    => 'terms',
                'content' => '<h2>Terms of Service</h2>
<p>Welcome to LUMIÈRE. By accessing our boutique online, you agree to comply with and be bound by the following terms of elegantly conducting business with us.</p>
<h3>Product Availability</h3>
<p>Due to the rare ingredients used in our Oud and Extrait de Parfum collections, highly demanded items may occasionally be placed on backorder. We reserve the right to limit quantities purchased per person to ensure equitable access.</p>
<h3>Pricing</h3>
<p>All prices are listed in Pakistani Rupees (PKR) and are subject to change without prior notice. We strive to maintain absolute accuracy in our pricing, but in the rare event of a typographical error, we reserve the right to cancel orders placed at an incorrect price.</p>
<h3>Intellectual Property</h3>
<p>All imagery, text, branding, and fragrance formulations are the exclusive property of LUMIÈRE and are protected under applicable copyright and trademark laws. Unauthorized reproduction or commercial use is strictly prohibited.</p>
<h3>Limitation of Liability</h3>
<p>LUMIÈRE shall not be held liable for any indirect or consequential damages arising from the use of our products or website. Our maximum liability is limited to the purchase price of the product in question.</p>',
            ],
            [
                'title'   => 'Shipping Policy',
                'slug'    => 'shipping',
                'content' => '<h2>Shipping Policy</h2>
<p>We believe the unboxing experience should be as flawless as the scent itself. Here is exactly what you can expect when ordering from LUMIÈRE.</p>
<h3>Processing & Dispatch</h3>
<p>All orders are meticulously packaged by hand in our signature tissue-wrapped boxes. Orders placed before 2:00 PM PKT on business days are processed the same day. Orders placed on Sundays or public holidays are dispatched the following business day.</p>
<h3>Delivery Times & Charges</h3>
<ul>
<li><strong>Standard Nationwide Shipping:</strong> 3–5 business days — Rs. 250</li>
<li><strong>Express Delivery (Major Cities):</strong> 1–2 business days — Rs. 450</li>
<li><strong>Free Shipping:</strong> On all orders over Rs. 5,000</li>
</ul>
<h3>Returns & Exchanges</h3>
<p>Due to health and safety regulations governing cosmetics, <strong>open or used bottles cannot be returned</strong>. If a product arrives damaged, please photograph it and contact us within 24 hours of delivery with your Order ID. Tester boxes are strictly final sale items.</p>
<h3>COD (Cash on Delivery)</h3>
<p>COD is available on all standard orders across Pakistan. Please ensure someone is available to receive the parcel and payment at the provided address.</p>',
            ],
        ];

        foreach ($pages as $page) {
            Page::firstOrCreate(['slug' => $page['slug']], $page);
        }

        // ─── NEWSLETTER SUBSCRIBERS (Demo) ───────────────────────
        $subscribers = [
            'zarafragrance@gmail.com',
            'sana.perfumes@hotmail.com',
            'hassan.k@yahoo.com',
            'lumierefan@gmail.com',
            'parfumcollector@outlook.com',
        ];

        foreach ($subscribers as $email) {
            NewsletterSubscriber::firstOrCreate(['email' => $email]);
        }

        // ─── DEMO CONTACT MESSAGES ────────────────────────────────
        $messages = [
            [
                'name'    => 'Fatima Ali',
                'email'   => 'fatima.ali@gmail.com',
                'subject' => 'Custom Oud Order',
                'message' => 'Hello, I am interested in placing a bulk order of Oud Mystique for a corporate gifting event. Could you please provide wholesale pricing?',
            ],
            [
                'name'    => 'Ahmed Raza',
                'email'   => 'ahmed.raza@outlook.com',
                'subject' => 'Shipping Inquiry',
                'message' => 'I placed an order 3 days ago (ORD-12) but have not received a tracking number yet. Could you please update me?',
            ],
        ];

        foreach ($messages as $msg) {
            ContactMessage::firstOrCreate(['email' => $msg['email'], 'subject' => $msg['subject']], $msg);
        }

        // ─── SITE SETTINGS ────────────────────────────────────────
        $settings = [
            ['key' => 'site_name',           'value' => 'LUMIÈRE',                                    'type' => 'text'],
            ['key' => 'site_tagline',         'value' => 'Haute Parfumerie — Crafted for Connoisseurs','type' => 'text'],
            ['key' => 'contact_email',        'value' => 'hello@lumiere.pk',                           'type' => 'text'],
            ['key' => 'contact_phone',        'value' => '+92 300 1234567',                            'type' => 'text'],
            ['key' => 'shipping_threshold',   'value' => '5000',                                       'type' => 'number'],
            ['key' => 'shipping_fee',         'value' => '250',                                        'type' => 'number'],
            ['key' => 'instagram_url',        'value' => 'https://instagram.com/lumiere.pk',           'type' => 'text'],
            ['key' => 'whatsapp_number',      'value' => '+923001234567',                              'type' => 'text'],
            ['key' => 'privacy_policy',       'value' => 'See Pages table.',                           'type' => 'text'],
            ['key' => 'shipping_policy',      'value' => 'Free standard shipping on orders over Rs. 5000.', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
