<?php
namespace App\Repositories\Contact;

interface ContactRepositoryInterface
{

    public function contacts($user_id);

    public function isOwnedBy($contactId, $userId);
}
