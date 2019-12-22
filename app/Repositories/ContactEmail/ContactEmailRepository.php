<?php
namespace App\Repositories\ContactEmail;

use App\Models\ContactEmail;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Traits\ContactDataTrait;

class ContactEmailRepository extends BaseRepository implements ContactEmailRepositoryInterface
{
    use ContactDataTrait;

    public function __construct(ContactEmail $contactEmail)
    {
        parent::__construct($contactEmail);
    }

    public function createMultiple(array $emails, $contactId) {
        foreach($emails as $email)
        {
            $this->create([
                "email" => $email,
                "contact_id" => $contactId,
            ]);
        }
    }
}
