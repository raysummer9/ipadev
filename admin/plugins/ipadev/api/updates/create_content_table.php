<?php namespace Ipadev\Api\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateContentTable extends Migration
{
    public function up()
    {
        Schema::create('ipadev_api_content', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('key')->unique();
            $table->text('value');
            $table->string('type')->default('text'); // text, json, image
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ipadev_api_content');
    }
} 