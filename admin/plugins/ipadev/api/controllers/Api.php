<?php namespace Ipadev\Api\Controllers;

use Backend\Classes\Controller;
use Response;
use Input;
use Request;

class Api extends Controller
{
    public function __construct()
    {
        parent::__construct();
        
        // Add CORS headers
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        
        // Handle preflight requests
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    public function getHero()
    {
        $hero = [
            'title' => 'Inclusive Pathway Development Initiative',
            'subtitle' => 'Empowering Communities, Building Futures',
            'description' => 'We are dedicated to creating pathways for inclusive development across Nigeria\'s most marginalized communities.',
            'image' => '/img/hero-bg.jpg',
            'cta_text' => 'Learn More',
            'cta_link' => '/about'
        ];

        return Response::json($hero);
    }

    public function getAbout()
    {
        $about = [
            'mission' => 'To promote equal opportunities, social justice, and community empowerment through inclusive development initiatives.',
            'vision' => 'A just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.',
            'values' => [
                'Inclusivity',
                'Transparency',
                'Community Engagement',
                'Sustainable Development',
                'Social Justice'
            ],
            'description' => 'IPADEV works to bridge gaps in development by focusing on the most vulnerable populations and creating sustainable solutions.'
        ];

        return Response::json($about);
    }

    public function getTeam()
    {
        // Get executive director
        $executiveDirector = \Ipadev\Api\Models\TeamMember::active()->executiveDirector()->first();
        
        // Get board members
        $boardMembers = \Ipadev\Api\Models\TeamMember::active()->boardMembers()->orderBy('sort_order')->get();
        
        $team = [
            'executive_director' => $executiveDirector ? [
                'name' => $executiveDirector->name,
                'title' => $executiveDirector->role,
                'bio' => $executiveDirector->bio,
                'photo' => $executiveDirector->photo_file ? 'https://admin.ipadev.ng' . $executiveDirector->photo_file->getPath() : '/img/placeholder-avatar.svg',
                'vision' => $executiveDirector->vision,
                'message' => $executiveDirector->message
            ] : null,
            'board_members' => $boardMembers->map(function($member) {
                return [
                    'name' => $member->name,
                    'role' => $member->role,
                    'photo' => $member->photo_file ? 'https://admin.ipadev.ng' . $member->photo_file->getPath() : '/img/placeholder-avatar.svg'
                ];
            })->toArray()
        ];

        return Response::json($team);
    }

    public function getAreasOfFocus()
    {
        $areas = [
            'title' => 'Areas of Focus',
            'description' => 'Our strategic focus areas address the most pressing challenges facing marginalized communities in Nigeria.',
            'areas' => [
                [
                    'title' => 'Education & Skills Development',
                    'description' => 'Promoting access to quality education and vocational training for underserved communities.',
                    'icon' => 'education'
                ],
                [
                    'title' => 'Healthcare Access',
                    'description' => 'Improving healthcare delivery and access to essential medical services.',
                    'icon' => 'healthcare'
                ],
                [
                    'title' => 'Economic Empowerment',
                    'description' => 'Supporting entrepreneurship and creating economic opportunities.',
                    'icon' => 'economy'
                ],
                [
                    'title' => 'Community Development',
                    'description' => 'Building resilient communities through infrastructure and social programs.',
                    'icon' => 'community'
                ]
            ]
        ];

        return Response::json($areas);
    }

    public function getContact()
    {
        $contact = [
            'address' => 'Lagos, Nigeria',
            'email' => 'info@ipadev.ng',
            'phone' => '+234 XXX XXX XXXX',
            'social_media' => [
                'twitter' => 'https://twitter.com/ipadev',
                'facebook' => 'https://facebook.com/ipadev',
                'instagram' => 'https://instagram.com/ipadev',
                'youtube' => 'https://youtube.com/ipadev'
            ]
        ];

        return Response::json($contact);
    }

    public function submitContact()
    {
        // Handle contact form submission
        $data = Request::all();
        
        // Validate and process the data
        // Send email notification
        // Store in database if needed
        
        return Response::json(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon.']);
    }

    public function subscribeNewsletter()
    {
        // Handle newsletter subscription
        $email = Request::input('email');
        
        // Validate email
        // Add to newsletter list
        // Send confirmation email
        
        return Response::json(['success' => true, 'message' => 'Thank you for subscribing to our newsletter!']);
    }
} 