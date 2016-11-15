<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    //
    protected $fillable = ['nickname','birthday','content'];

    public function user()
    {
        return $this->belongsTo('App\Models\Users');
    }
}
