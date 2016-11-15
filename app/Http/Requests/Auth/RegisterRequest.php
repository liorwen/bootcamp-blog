<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/15
 * Time: 下午 9:34
 */
namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class RegisterRequest extends Request
{
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ];
    }
}