<?php
namespace App\Repositories\ContactPhone;

interface ContactPhoneRepositoryInterface
{

    public function createMultiple(array $phones, $contactId);
}
