<?php namespace Ipadev\Api\Models;

use Model;

class TeamMember extends Model
{
    public $table = 'ipadev_api_team_members';

    protected $fillable = [
        'name',
        'role',
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

    public static function boot()
    {
        parent::boot();
        
        static::saving(function($model) {
            trace_log("=== MODEL SAVING ===");
            trace_log("Model data: " . json_encode($model->toArray()));
            trace_log("Dirty attributes: " . json_encode($model->getDirty()));
            trace_log("Photo file relation: " . ($model->photo_file ? 'EXISTS' : 'NULL'));
        });
        
        static::saved(function($model) {
            trace_log("=== MODEL SAVED ===");
            trace_log("Model ID: " . $model->id);
            trace_log("Final model data: " . json_encode($model->toArray()));
            trace_log("Photo file relation after save: " . ($model->photo_file ? 'EXISTS' : 'NULL'));
            if ($model->photo_file) {
                trace_log("Photo file details after save: " . json_encode([
                    'id' => $model->photo_file->id,
                    'disk_name' => $model->photo_file->disk_name,
                    'file_name' => $model->photo_file->file_name
                ]));
            }
        });
    }

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