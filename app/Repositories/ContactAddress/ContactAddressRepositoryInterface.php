<?php
namespace App\Repositories\ContactAddress;

interface ContactAddressRepositoryInterface
{

    public function createMultiple(array $addresses, $contactId);
}
