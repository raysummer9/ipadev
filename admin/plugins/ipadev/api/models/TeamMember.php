<?php namespace Ipadev\Api\Models;

use Model;

class TeamMember extends Model
{
    public $table = 'ipadev_api_team_members';

    protected $fillable = [
        'name',
        'role',
        'photo',
        'bio',
        'is_executive_director',
        'vision',
        'message',
        'sort_order',
        'is_active'
    ];

    public $attachOne = [
        'photo_file' => 'System\Models\File'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeExecutiveDirector($query)
    {
        return $query->where('is_executive_director', true);
    }

    public function scopeBoardMembers($query)
    {
        return $query->where('is_executive_director', false);
    }
} 