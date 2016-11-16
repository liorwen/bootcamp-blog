<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/17
 * Time: 上午 12:01
 */
namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class LoginRequest extends Request
{
    public function rules()
    {
        return [
            'email' => 'required',
            'password' => 'required',
        ];
    }
}