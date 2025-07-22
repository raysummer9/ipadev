<?php namespace Ipadev\Api\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateTeamTable extends Migration
{
    public function up()
    {
        Schema::create('ipadev_api_team_members', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->string('role');
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->boolean('is_executive_director')->default(false);
            $table->text('vision')->nullable();
            $table->text('message')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ipadev_api_team_members');
    }
} 