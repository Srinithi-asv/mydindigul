<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserAddressController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IndustryController;
use App\Http\Controllers\Api\SubIndustryController;
use App\Http\Controllers\Api\VendorController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\JobPostingController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\EventBookingController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\VendorCustomerController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\VendorDashboardController;

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/vendor/register', [AuthController::class, 'vendorRegister']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/industries', [IndustryController::class, 'index']);
Route::get('/industries/{id}', [IndustryController::class, 'show']);
Route::post('/industries', [IndustryController::class, 'store']);
Route::put('/industries/{id}', [IndustryController::class, 'update']);
Route::delete('/industries/{id}', [IndustryController::class, 'destroy']);


// Sub-Industries - Public routes
Route::get('/sub-industries', [SubIndustryController::class, 'index']);
Route::get('/sub-industries/industry/{industryId}', [SubIndustryController::class, 'byIndustry']);
Route::get('/sub-industries/{id}', [SubIndustryController::class, 'show']);
Route::post('/sub-industries', [SubIndustryController::class, 'store']);
Route::put('/sub-industries/{id}', [SubIndustryController::class, 'update']);
Route::delete('/sub-industries/{id}', [SubIndustryController::class, 'destroy']);

// Vendors - Public routes
Route::get('/vendors', [VendorController::class, 'index']);
Route::get('/vendors/{id}', [VendorController::class, 'show']);
Route::post('/vendors', [VendorController::class, 'store']);
Route::put('/vendors/{id}', [VendorController::class, 'update']);
Route::delete('/vendors/{id}', [VendorController::class, 'destroy']);

// Services - Public routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/vendor/{vendorId}', [ServiceController::class, 'byVendor']);
Route::get('/services/sub-industry/{subIndustryId}', [ServiceController::class, 'bySubIndustry']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

// Products - Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/vendor/{vendorId}', [ProductController::class, 'byVendor']);
Route::get('/products/sub-industry/{subIndustryId}', [ProductController::class, 'bySubIndustry']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Job Postings - Public routes
Route::get('/job-postings', [JobPostingController::class, 'index']);
Route::get('/job-postings/vendor/{vendorId}', [JobPostingController::class, 'byVendor']);
Route::get('/job-postings/{id}', [JobPostingController::class, 'show']);
Route::post('/job-postings', [JobPostingController::class, 'store']);
Route::put('/job-postings/{id}', [JobPostingController::class, 'update']);
Route::delete('/job-postings/{id}', [JobPostingController::class, 'destroy']);

// Job Applications - Public routes
Route::get('/job-applications', [JobApplicationController::class, 'index']);
Route::get('/job-applications/job/{jobPostingId}', [JobApplicationController::class, 'byJob']);
Route::get('/job-applications/user/{userId}', [JobApplicationController::class, 'byUser']);
Route::get('/job-applications/{id}', [JobApplicationController::class, 'show']);
Route::post('/job-applications', [JobApplicationController::class, 'store']);
Route::put('/job-applications/{id}', [JobApplicationController::class, 'update']);
Route::delete('/job-applications/{id}', [JobApplicationController::class, 'destroy']);

// Events - Public routes
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/vendor/{vendorId}', [EventController::class, 'byVendor']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::post('/events', [EventController::class, 'store']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

// Event Bookings - Public routes
Route::get('/event-bookings', [EventBookingController::class, 'index']);
Route::get('/event-bookings/event/{eventId}', [EventBookingController::class, 'byEvent']);
Route::get('/event-bookings/user/{userId}', [EventBookingController::class, 'byUser']);
Route::get('/event-bookings/{id}', [EventBookingController::class, 'show']);
Route::post('/event-bookings', [EventBookingController::class, 'store']);
Route::put('/event-bookings/{id}', [EventBookingController::class, 'update']);
Route::delete('/event-bookings/{id}', [EventBookingController::class, 'destroy']);

// Enquiries - Public routes
Route::get('/enquiries', [EnquiryController::class, 'index']);
Route::get('/enquiries/vendor/{vendorId}', [EnquiryController::class, 'byVendor']);
Route::get('/enquiries/{id}', [EnquiryController::class, 'show']);
Route::post('/enquiries', [EnquiryController::class, 'store']);
Route::put('/enquiries/{id}', [EnquiryController::class, 'update']);
Route::delete('/enquiries/{id}', [EnquiryController::class, 'destroy']);

// Vendor Customers - Public routes
Route::get('/vendor-customers', [VendorCustomerController::class, 'index']);
Route::get('/vendor-customers/vendor/{vendorId}', [VendorCustomerController::class, 'byVendor']);
Route::get('/vendor-customers/{id}', [VendorCustomerController::class, 'show']);
Route::post('/vendor-customers', [VendorCustomerController::class, 'store']);
Route::put('/vendor-customers/{id}', [VendorCustomerController::class, 'update']);
Route::delete('/vendor-customers/{id}', [VendorCustomerController::class, 'destroy']);


// Leads - Public routes
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/leads/vendor/{vendorId}', [LeadController::class, 'byVendor']);
Route::get('/leads/{id}', [LeadController::class, 'show']);
Route::post('/leads', [LeadController::class, 'store']);
Route::put('/leads/{id}', [LeadController::class, 'update']);
Route::delete('/leads/{id}', [LeadController::class, 'destroy']);


// Offers - Public routes
Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/vendor/{vendorId}', [OfferController::class, 'byVendor']);
Route::get('/offers/{id}', [OfferController::class, 'show']);
Route::post('/offers', [OfferController::class, 'store']);
Route::put('/offers/{id}', [OfferController::class, 'update']);
Route::delete('/offers/{id}', [OfferController::class, 'destroy']);

// Orders - Public routes
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/vendor/{vendorId}', [OrderController::class, 'byVendor']);
Route::get('/orders/user/{userId}', [OrderController::class, 'byUser']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::post('/orders', [OrderController::class, 'store']);
Route::put('/orders/{id}', [OrderController::class, 'update']);
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);


// Order Items - Public routes
Route::get('/order-items', [OrderItemController::class, 'index']);
Route::get('/order-items/order/{orderId}', [OrderItemController::class, 'byOrder']);
Route::get('/order-items/{id}', [OrderItemController::class, 'show']);
Route::post('/order-items', [OrderItemController::class, 'store']);
Route::put('/order-items/{id}', [OrderItemController::class, 'update']);
Route::delete('/order-items/{id}', [OrderItemController::class, 'destroy']);

// Wishlists - Public routes
Route::get('/wishlists', [WishlistController::class, 'index']);
Route::get('/wishlists/user/{userId}', [WishlistController::class, 'byUser']);
Route::get('/wishlists/{id}', [WishlistController::class, 'show']);
Route::post('/wishlists', [WishlistController::class, 'store']);
Route::put('/wishlists/{id}', [WishlistController::class, 'update']);
Route::delete('/wishlists/{id}', [WishlistController::class, 'destroy']);

// Reviews - Public routes
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/user/{userId}', [ReviewController::class, 'byUser']);
Route::get('/reviews/{type}/{id}', [ReviewController::class, 'byReviewable']);
Route::get('/reviews/{id}', [ReviewController::class, 'show']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    // User
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/vendor/dashboard', [VendorDashboardController::class, 'index']);

    // User Addresses
    Route::get('/addresses', [UserAddressController::class, 'index']);
    Route::post('/addresses', [UserAddressController::class, 'store']);
    Route::get('/addresses/{id}', [UserAddressController::class, 'show']);
    Route::put('/addresses/{id}', [UserAddressController::class, 'update']);
    Route::delete('/addresses/{id}', [UserAddressController::class, 'destroy']);


    // Industries

});