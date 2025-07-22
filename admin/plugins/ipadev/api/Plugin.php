<?php namespace Ipadev\Api;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name'        => 'IPADEV API',
            'description' => 'API endpoints for IPADEV website content',
            'author'      => 'IPADEV Team',
            'icon'        => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            'Ipadev\Api\Components\ContentApi' => 'contentApi'
        ];
    }

    public function registerApiEndpoints()
    {
        return [
            'GET /api/hero' => 'Ipadev\Api\Controllers\Api@getHero',
            'GET /api/about' => 'Ipadev\Api\Controllers\Api@getAbout',
            'GET /api/team' => 'Ipadev\Api\Controllers\Api@getTeam',
            'GET /api/areas-of-focus' => 'Ipadev\Api\Controllers\Api@getAreasOfFocus',
            'GET /api/contact' => 'Ipadev\Api\Controllers\Api@getContact',
            'POST /api/contact' => 'Ipadev\Api\Controllers\Api@submitContact',
            'POST /api/newsletter' => 'Ipadev\Api\Controllers\Api@subscribeNewsletter'
        ];
    }
} 