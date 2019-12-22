<?php
namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\Base\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{

    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    public function searchByEmail($emailAddress, $excludeId)
    {
        return $this->model->where("email", $emailAddress)
            ->where("id", "<>", $excludeId)
            ->first();
    }
}
