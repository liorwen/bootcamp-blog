<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/17
 * Time: 上午 3:37
 */
namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class IdTokenRequest extends Request
{
    public function rules()
    {
        return [
            'id_token' => 'required',
        ];
    }
}