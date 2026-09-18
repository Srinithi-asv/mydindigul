<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhoneOtp extends Model
{
    use HasFactory;

    protected $table = 'phone_otps';

    protected $fillable = [
        'phone',
        'otp_code',
        'purpose',
        'attempts',
        'max_attempts',
        'ip_address',
        'expires_at',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'attempts' => 'integer',
            'max_attempts' => 'integer',
            'expires_at' => 'datetime',
            'verified_at' => 'datetime',
        ];
    }

    public function isValid(): bool
    {
        return is_null($this->verified_at) &&
               $this->expires_at->isFuture() &&
               $this->attempts < $this->max_attempts;
    }
}
