<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/15
 * Time: 下午 10:55
 */
namespace App\Repositories;

use App\Models\User;
use App\Models\UserProfile;

class UserProfileRepository extends BaseRepository
{
    public function __construct(UserProfile $userProfile)
    {
        $this->model = $userProfile;
    }

    public function storeProfile(User $user)
    {
        $this->model->nickname = $user->name;
        $this->model->user_id = $user->id;

        $this->model->save();

        return $this->model;
    }
}