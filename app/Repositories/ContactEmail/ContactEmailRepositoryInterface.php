<?php
namespace App\Repositories\ContactEmail;

interface ContactEmailRepositoryInterface
{
    public function createMultiple(array $phones, $contactId);
}
