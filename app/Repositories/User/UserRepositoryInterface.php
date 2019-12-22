<?php
namespace App\Repositories\User;

interface UserRepositoryInterface
{

    public function searchByEmail($emailAddress, $excludeId);
}
