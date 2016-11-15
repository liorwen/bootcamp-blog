<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/15
 * Time: 下午 9:03
 */
namespace App\Repositories;

use App\Models\User;
use App\Models\UserProfile;

class UserRepository extends BaseRepository
{


    public function __construct(User $user)
    {
        $this->model = $user;
        $this->userProfile = $userProfile;
    }

    public function getbyEmail($email)
    {
        $this->model->where('email',$email)->first();
    }

    public function store($inputs)
    {
        $this->model->name = $inputs[ 'name' ];
        $this->model->email = $inputs[ 'email' ];
        $this->model->password = bcrypt($inputs[ 'password' ]);

        $this->model->save();

//        $this->storeProfile($this->getbyEmail($this->model->email));

        return $this->model;
    }


}