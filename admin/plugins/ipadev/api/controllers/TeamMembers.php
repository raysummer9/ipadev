<?php namespace Ipadev\Api\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use Ipadev\Api\Models\TeamMember;
use System\Models\File;

class TeamMembers extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController'
    ];

    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Ipadev.Api', 'ipadev', 'teammembers');
    }

    public function index()
    {
        try {
            // Test database connection
            $count = TeamMember::count();
            trace_log("Team members count: " . $count);
            
            // Use custom implementation instead of ListController
            $this->vars['teamMembers'] = TeamMember::orderBy('sort_order')->get();
            $this->vars['count'] = $count;
            
            return $this->makePartial('index');
            
        } catch (\Exception $e) {
            trace_log("Error in TeamMembers index: " . $e->getMessage());
            
            // Fallback to simple display if everything fails
            $this->vars['teamMembers'] = TeamMember::all();
            $this->vars['error'] = $e->getMessage();
            return $this->makePartial('fallback');
        }
    }

    public function create()
    {
        $this->asExtension('FormController')->create();
    }

    public function update($recordId = null)
    {
        $this->asExtension('FormController')->update($recordId);
    }

    public function preview($recordId = null)
    {
        $this->asExtension('FormController')->preview($recordId);
    }

    public function onDelete()
    {
        if (($checkedIds = post('checked')) && is_array($checkedIds) && count($checkedIds)) {
            foreach ($checkedIds as $recordId) {
                if (!$record = TeamMember::find($recordId)) continue;
                $record->delete();
            }
        }
    }

    public function test()
    {
        try {
            $teamMembers = TeamMember::all();
            $this->vars['teamMembers'] = $teamMembers;
            $this->vars['count'] = $teamMembers->count();
            $this->vars['tableExists'] = \Schema::hasTable('ipadev_api_team_members');
            
            return $this->makePartial('test');
        } catch (\Exception $e) {
            $this->vars['error'] = $e->getMessage();
            return $this->makePartial('error');
        }
    }
} 