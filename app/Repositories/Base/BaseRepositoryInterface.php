<?php
namespace App\Repositories\Base;

interface BaseRepositoryInterface
{
    public function all();

    public function create(array $data);

    public function update(array $data, $id);

    public function delete($id);

    public function show($id);

    public function exists($id);

    public function get($where, $value = null, $operator = '=');
}
