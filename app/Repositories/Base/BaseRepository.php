<?php
namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id)
    {
        $record = $this->model->find($id);

        return $record->update($data);
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    public function show($id, $with = array())
    {
        return $this->model->with($with)->findOrFail($id);
    }

    public function exists($id) {
        return $this->model->where("id", $id)->count() > 0;
    }

    public function get($where, $value = null, $operator = '=')
    {
        if (is_array($where)) {
            $this->model->where($where);
        } else {
            $this->model->where($where, $operator, $value);
        }
    }

    public function getModel()
    {
        return $this->model;
    }

    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    public function with($relations)
    {
        return $this->model->with($relations);
    }
}
