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
            'icon'        => 'icon-leaf',
            'homepage'    => 'https://ipadev.ng'
        ];
    }

    public function register()
    {
        // Register routes when the plugin is loaded
        $this->registerRoutes();
    }

    public function registerNavigation()
    {
        return [
            'ipadev' => [
                'label' => 'IPADEV',
                'url' => \Backend::url('ipadev/api/teammembers'),
                'icon' => 'icon-leaf',
                'permissions' => ['ipadev.api.*'],
                'order' => 500,
                'sideMenu' => [
                    'teammembers' => [
                        'label' => 'Team Members',
                        'icon' => 'icon-users',
                        'url' => \Backend::url('ipadev/api/teammembers'),
                    ],
                ]
            ]
        ];
    }

    protected function registerRoutes()
    {
        // Register API routes
        \Route::group(['prefix' => 'api'], function () {
            \Route::get('hero', 'Ipadev\Api\Controllers\Api@getHero');
            \Route::get('about', 'Ipadev\Api\Controllers\Api@getAbout');
            \Route::get('team', 'Ipadev\Api\Controllers\Api@getTeam');
            \Route::get('areas-of-focus', 'Ipadev\Api\Controllers\Api@getAreasOfFocus');
            \Route::get('contact', 'Ipadev\Api\Controllers\Api@getContact');
            \Route::post('contact', 'Ipadev\Api\Controllers\Api@submitContact');
            \Route::post('newsletter', 'Ipadev\Api\Controllers\Api@subscribeNewsletter');
        });
    }
} 