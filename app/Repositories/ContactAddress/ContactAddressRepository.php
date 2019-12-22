<?php
namespace App\Repositories\ContactAddress;

use App\Models\ContactAddress;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Traits\ContactDataTrait;

class ContactAddressRepository extends BaseRepository implements ContactAddressRepositoryInterface
{
    use ContactDataTrait;

    public function __construct(ContactAddress $contactAddress)
    {
        parent::__construct($contactAddress);
    }

    public function createMultiple(array $addresses, $contactId)
    {
        foreach($addresses as $address)
        {
            $this->create([
                "contact_id" => $contactId,
                "type" => $address["type"],
                "street" => $address["street"],
                "city" => $address["city"],
                "state" => $address["state"],
                "country" => $address["country"],
                "postal_code" => $address["postal_code"],
            ]);
        }
    }
}
