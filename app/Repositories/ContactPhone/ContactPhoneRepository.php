<?php
namespace App\Repositories\ContactPhone;

use App\Models\ContactPhone;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Traits\ContactDataTrait;

class ContactPhoneRepository extends BaseRepository implements ContactPhoneRepositoryInterface
{
    use ContactDataTrait;

    public function __construct(ContactPhone $contactPhone)
    {
        parent::__construct($contactPhone);
    }

    public function createMultiple(array $phones, $contactId)
    {
        foreach($phones as $phone)
        {
            $this->create([
                "number" => $phone["number"],
                "type" => $phone["type"],
                "contact_id" => $contactId,
            ]);
        }
    }
}
