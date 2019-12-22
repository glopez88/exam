<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{

    use SoftDeletes;

    protected $guarded = [];

    /*
    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }
    */

    public function emails()
    {
        return $this->hasMany('App\Models\ContactEmail');
    }

    public function phones()
    {
        return $this->hasMany('App\Models\ContactPhone');
    }

    public function addresses()
    {
        return $this->hasMany('App\Models\ContactAddress');
    }
}
