<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/15
 * Time: 下午 8:52
 */
namespace App\Repositories;

abstract class BaseRepository
{
    /**
     * The Model instance.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * Get Model by id.
     *
     * @param $id
     *
     * @return \App\Models\Model
     */
    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Destroy Model by id.
     *
     * @param $id
     *
     * @return void
     */
    public function destroy($id)
    {
        $this->getById($id)->delete();
    }

}