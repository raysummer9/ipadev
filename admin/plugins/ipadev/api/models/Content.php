<?php namespace Ipadev\Api\Models;

use Model;

class Content extends Model
{
    public $table = 'ipadev_api_content';

    protected $fillable = [
        'key',
        'value',
        'type'
    ];

    public static function getValue($key, $default = null)
    {
        $content = self::where('key', $key)->first();
        return $content ? $content->value : $default;
    }

    public static function setValue($key, $value, $type = 'text')
    {
        $content = self::firstOrNew(['key' => $key]);
        $content->value = $value;
        $content->type = $type;
        $content->save();
        return $content;
    }
} 