<?php namespace Ipadev\Api\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use Ipadev\Api\Models\TeamMember;
use System\Models\File;
use Request;

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
        // Handle regular form submission for file uploads
        if (Request::isMethod('post') && !Request::ajax()) {
            return $this->handleCreateForm();
        }
        
        $this->asExtension('FormController')->create();
    }

    public function update($recordId = null)
    {
        // Handle regular form submission for file uploads
        if (Request::isMethod('post') && !Request::ajax()) {
            return $this->handleUpdateForm($recordId);
        }
        
        $this->asExtension('FormController')->update($recordId);
    }

    public function preview($recordId = null)
    {
        $this->asExtension('FormController')->preview($recordId);
    }

    public function onCreate()
    {
        try {
            trace_log("=== STARTING TEAM MEMBER CREATION ===");
            trace_log("POST data: " . json_encode(Request::all()));
            trace_log("FILES data: " . json_encode($_FILES));
            
            // Check if photo_file is in the request
            if (Request::hasFile('photo_file')) {
                trace_log("Photo file detected in request");
                $file = Request::file('photo_file');
                trace_log("File details: " . json_encode([
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getMimeType(),
                    'error' => $file->getError()
                ]));
            } else {
                trace_log("No photo_file found in request");
            }
            
            $result = $this->asExtension('FormController')->create_onSave();
            trace_log("Create result: " . json_encode($result));
            
            // Verify the record was created and check photo attachment
            $latestMember = TeamMember::orderBy('id', 'desc')->first();
            if ($latestMember) {
                trace_log("Latest member after create: " . json_encode($latestMember->toArray()));
                trace_log("Photo file relation: " . ($latestMember->photo_file ? 'EXISTS' : 'NULL'));
                if ($latestMember->photo_file) {
                    trace_log("Photo file details: " . json_encode([
                        'id' => $latestMember->photo_file->id,
                        'disk_name' => $latestMember->photo_file->disk_name,
                        'file_name' => $latestMember->photo_file->file_name,
                        'file_size' => $latestMember->photo_file->file_size,
                        'path' => $latestMember->photo_file->getPath()
                    ]));
                }
            } else {
                trace_log("No team member found after create");
            }
            
            return $result;
        } catch (\Exception $e) {
            trace_log("Error creating team member: " . $e->getMessage());
            trace_log("Stack trace: " . $e->getTraceAsString());
            throw $e;
        }
    }

    public function onUpdate($recordId = null)
    {
        try {
            trace_log("=== STARTING TEAM MEMBER UPDATE ===");
            trace_log("Record ID: " . $recordId);
            trace_log("POST data: " . json_encode(Request::all()));
            trace_log("FILES data: " . json_encode($_FILES));
            
            // Check for different possible field names
            trace_log("Checking for photo file in different formats:");
            trace_log("TeamMember[photo_file]: " . (Request::input('TeamMember.photo_file') ? 'EXISTS' : 'NOT FOUND'));
            trace_log("photo_file: " . (Request::input('photo_file') ? 'EXISTS' : 'NOT FOUND'));
            trace_log("photo_file_file: " . (Request::input('photo_file_file') ? 'EXISTS' : 'NOT FOUND'));
            
            // Get the record before update
            $beforeUpdate = TeamMember::find($recordId);
            trace_log("Before update: " . json_encode($beforeUpdate ? $beforeUpdate->toArray() : 'null'));
            if ($beforeUpdate && $beforeUpdate->photo_file) {
                trace_log("Before update photo: " . json_encode([
                    'id' => $beforeUpdate->photo_file->id,
                    'disk_name' => $beforeUpdate->photo_file->disk_name
                ]));
            }
            
            // Check if photo_file is in the request
            if (Request::hasFile('photo_file')) {
                trace_log("Photo file detected in update request");
                $file = Request::file('photo_file');
                trace_log("File details: " . json_encode([
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getMimeType(),
                    'error' => $file->getError()
                ]));
            } else {
                trace_log("No photo_file found in update request");
            }
            
            $result = $this->asExtension('FormController')->update_onSave($recordId);
            trace_log("Update result: " . json_encode($result));
            
            // Get the record after update
            $afterUpdate = TeamMember::find($recordId);
            trace_log("After update: " . json_encode($afterUpdate ? $afterUpdate->toArray() : 'null'));
            if ($afterUpdate && $afterUpdate->photo_file) {
                trace_log("After update photo: " . json_encode([
                    'id' => $afterUpdate->photo_file->id,
                    'disk_name' => $afterUpdate->photo_file->disk_name,
                    'path' => $afterUpdate->photo_file->getPath()
                ]));
            } else {
                trace_log("No photo attached after update");
            }
            
            return $result;
        } catch (\Exception $e) {
            trace_log("Error updating team member: " . $e->getMessage());
            trace_log("Stack trace: " . $e->getTraceAsString());
            throw $e;
        }
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

    protected function handleUpdateForm($recordId)
    {
        try {
            trace_log("=== HANDLING REGULAR FORM UPDATE ===");
            trace_log("Record ID: " . $recordId);
            trace_log("POST data: " . json_encode(Request::all()));
            trace_log("FILES data: " . json_encode($_FILES));
            
            // Get the team member
            $teamMember = TeamMember::find($recordId);
            if (!$teamMember) {
                trace_log("Team member not found");
                return redirect()->back()->withErrors(['Team member not found']);
            }
            
            // Update the model with form data
            $teamMember->fill(Request::input('TeamMember', []));
            
            // Handle file upload
            if (Request::hasFile('TeamMember.photo_file')) {
                trace_log("File uploaded via regular form");
                $file = Request::file('TeamMember.photo_file');
                trace_log("File details: " . json_encode([
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getMimeType()
                ]));
                
                // Attach the file to the model
                $teamMember->photo_file = $file;
            }
            
            // Save the model
            $teamMember->save();
            
            trace_log("Team member updated successfully");
            trace_log("Final model: " . json_encode($teamMember->toArray()));
            
            return redirect(Backend::url('ipadev/api/teammembers'))->with('success', 'Team member updated successfully');
            
        } catch (\Exception $e) {
            trace_log("Error in regular form update: " . $e->getMessage());
            trace_log("Stack trace: " . $e->getTraceAsString());
            return redirect()->back()->withErrors([$e->getMessage()]);
        }
    }

    protected function handleCreateForm()
    {
        try {
            trace_log("=== HANDLING REGULAR FORM CREATE ===");
            trace_log("POST data: " . json_encode(Request::all()));
            trace_log("FILES data: " . json_encode($_FILES));
            
            // Create new team member
            $teamMember = new TeamMember();
            $teamMember->fill(Request::input('TeamMember', []));
            
            // Handle file upload
            if (Request::hasFile('TeamMember.photo_file')) {
                trace_log("File uploaded via regular form");
                $file = Request::file('TeamMember.photo_file');
                trace_log("File details: " . json_encode([
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getMimeType()
                ]));
                
                // Attach the file to the model
                $teamMember->photo_file = $file;
            }
            
            // Save the model
            $teamMember->save();
            
            trace_log("Team member created successfully");
            trace_log("Final model: " . json_encode($teamMember->toArray()));
            
            return redirect(Backend::url('ipadev/api/teammembers'))->with('success', 'Team member created successfully');
            
        } catch (\Exception $e) {
            trace_log("Error in regular form create: " . $e->getMessage());
            trace_log("Stack trace: " . $e->getTraceAsString());
            return redirect()->back()->withErrors([$e->getMessage()]);
        }
    }
} 