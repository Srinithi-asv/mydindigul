<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vendor extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'vendors';

    public const FREE_CUSTOMER_LIMIT = 5;
    public const FREE_LEAD_LIMIT = 5;
    public const FREE_ACTIVE_JOB_LIMIT = 1;
    public const FREE_EVENT_LIMIT = 1;

    protected $fillable = [
        'user_id',
        'industry_id',
        'sub_industry_id',
        'business_name',
        'slug',
        'tagline',
        'about_us',
        'company_registration_no',
        'gst_number',
        'pan_number',
        'logo_url',
        'cover_url',
        'contact_person',
        'phone',
        'whatsapp_number',
        'email',
        'website_url',
        'address_line1',
        'address_line2',
        'city',
        'pincode',
        'latitude',
        'longitude',
        'map_location_url',
        'terms_and_conditions',
        'privacy_policy',
        'verification_status',
        'rejection_reason',
        'plan_type',
        'plan_status',
        'plan_expires_at',
        'is_verified',
        'is_featured',
        'avg_rating',
        'review_count',
        'view_count',
        'social_links',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'plan_expires_at' => 'datetime',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'avg_rating' => 'decimal:2',
            'review_count' => 'integer',
            'view_count' => 'integer',
            'social_links' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function owner(): BelongsTo
    {
        return $this->user();
    }

    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class);
    }

    public function subIndustry(): BelongsTo
    {
        return $this->belongsTo(SubIndustry::class);
    }

    public function businessHours(): HasMany
    {
        return $this->hasMany(VendorBusinessHour::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function catalogues(): HasMany
    {
        return $this->hasMany(VendorCatalogue::class);
    }

    public function jobPostings(): HasMany
    {
        return $this->hasMany(JobPosting::class);
    }

    public function jobs(): HasMany
    {
        return $this->jobPostings();
    }

    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function eventBookings(): HasMany
    {
        return $this->hasMany(EventBooking::class);
    }

    public function enquiries(): HasMany
    {
        return $this->hasMany(Enquiry::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(VendorCustomer::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(VendorSubscription::class);
    }

    public function currentSubscription(): HasOne
    {
        return $this->hasOne(VendorSubscription::class)->latestOfMany();
    }

    public function analytics(): HasMany
    {
        return $this->hasMany(VisitorAnalytic::class);
    }

    public function visitorAnalytics(): HasMany
    {
        return $this->analytics();
    }

    public function wishlists(): MorphMany
    {
        return $this->morphMany(Wishlist::class, 'wishlistable');
    }

    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /*
     |--------------------------------------------------------------------------
     | MyDindigul Free / Premium Plan Business Helpers
     |--------------------------------------------------------------------------
     */

    public function isPremium(): bool
    {
        return $this->plan_type === 'premium' && $this->plan_status === 'active';
    }

    public function isFree(): bool
    {
        return $this->plan_type === 'free';
    }

    public function shouldMaskLeadPhone(): bool
    {
        return ! $this->isPremium();
    }

    public function canAcceptOrders(): bool
    {
        return $this->isPremium();
    }

    public function canAccessDetailedAnalytics(): bool
    {
        return $this->isPremium();
    }

    public function canAddCustomer(): bool
    {
        if ($this->isPremium()) {
            return true;
        }

        return $this->customers()->count() < self::FREE_CUSTOMER_LIMIT;
    }

    public function canAddLead(): bool
    {
        if ($this->isPremium()) {
            return true;
        }

        return $this->leads()->count() < self::FREE_LEAD_LIMIT;
    }

    public function canPostJob(): bool
    {
        if ($this->isPremium()) {
            return true;
        }

        return $this->jobPostings()->where('status', 'active')->count() < self::FREE_ACTIVE_JOB_LIMIT;
    }

    public function canCreateEvent(): bool
    {
        if ($this->isPremium()) {
            return true;
        }

        return $this->events()->count() < self::FREE_EVENT_LIMIT;
    }
}
