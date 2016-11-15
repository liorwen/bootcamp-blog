<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/15
 * Time: 下午 9:32
 */
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

abstract class Request extends FormRequest
{
    public function authorize()
    {
        return $this->input('address') == '';
    }
}