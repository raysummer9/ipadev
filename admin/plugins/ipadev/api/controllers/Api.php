<?php namespace Ipadev\Api\Controllers;

use Backend\Classes\Controller;
use Response;

class Api extends Controller
{
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
        $team = [
            'executive_director' => [
                'name' => 'Dr. Margaret Fagboyo',
                'title' => 'Executive Director',
                'bio' => 'With 24 years of experience in international development and multilateral partnerships, Dr Fagboyo is a seasoned development practitioner...',
                'photo' => '/img/dr-margaret-fagboyo.jpg',
                'vision' => 'A just and inclusive society where every individual, regardless of gender, background, or status, has equal opportunities to thrive and contribute to sustainable development.',
                'message' => 'Welcome to IPADEV. We are committed to building bridges between communities, policymakers, and development practitioners...'
            ],
            'board_members' => [
                [
                    'name' => 'Adesina Fagbenro-Byron',
                    'role' => 'Board Member',
                    'photo' => '/img/dr-adesina.jpeg'
                ],
                [
                    'name' => 'Abiodun Essiet',
                    'role' => 'Board Member',
                    'photo' => '/img/essiet.jpeg'
                ],
                [
                    'name' => 'Olamide Juliana Falana',
                    'role' => 'Board Member',
                    'photo' => '/img/olamide-falana.jpeg'
                ],
                [
                    'name' => 'Olubunmi Adelugba',
                    'role' => 'Board Member',
                    'photo' => '/img/adelugba.jpeg'
                ],
                [
                    'name' => 'Dominion Dolapo Fagboyo',
                    'role' => 'Board Member',
                    'photo' => '/img/dominion.jpeg'
                ],
                [
                    'name' => 'Samuel Ruth Chadi',
                    'role' => 'Secretary',
                    'photo' => '/img/ruth.jpeg'
                ]
            ]
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
        $data = input();
        
        // Validate and process the data
        // Send email notification
        // Store in database if needed
        
        return Response::json(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon.']);
    }

    public function subscribeNewsletter()
    {
        // Handle newsletter subscription
        $email = input('email');
        
        // Validate email
        // Add to newsletter list
        // Send confirmation email
        
        return Response::json(['success' => true, 'message' => 'Thank you for subscribing to our newsletter!']);
    }
} 