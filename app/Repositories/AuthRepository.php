<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/16
 * Time: 下午 9:56
 */
namespace App\Repositories;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;

class AuthRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function signUp(RegisterRequest $inputs)
    {
        $this->model->name = $inputs[ 'name' ];
        $this->model->email = $inputs[ 'email' ];
        $this->model->password = bcrypt($inputs[ 'password' ]);

        $this->model->save();

        return $this->model;
    }
}