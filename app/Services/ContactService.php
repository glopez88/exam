<?php
namespace App\Services;

use App\Repositories\ {
    Contact\ContactRepositoryInterface,
    ContactAddress\ContactAddressRepositoryInterface,
    ContactEmail\ContactEmailRepositoryInterface,
    ContactPhone\ContactPhoneRepositoryInterface
};

class ContactService {

    public function __construct(
        ContactRepositoryInterface $contactRepo,
        ContactAddressRepositoryInterface $contactAddressRepo,
        ContactEmailRepositoryInterface $contactEmailRepo,
        ContactPhoneRepositoryInterface $contactPhoneRepo
    )
    {
        $this->contactRepo = $contactRepo;
        $this->contactAddressRepo = $contactAddressRepo;
        $this->contactEmailRepo = $contactEmailRepo;
        $this->contactPhoneRepo = $contactPhoneRepo;
    }

    public function add($data)
    {
        $contact = $this->contactRepo->create(array_only($data, [
            "first_name", "last_name", "company", "notes", "user_id"
        ]));

        $this->contactPhoneRepo->createMultiple($data["contact"], $contact->id);
        $this->contactEmailRepo->createMultiple($data["emails"], $contact->id);
        $this->contactAddressRepo->createMultiple($data["address"], $contact->id);

        return $contact;
    }

    public function edit($data, $contactId)
    {
        $this->contactRepo->update(array_only($data, [
            "first_name", "last_name", "company", "notes"
        ]), $contactId);

        foreach($data["contact"] as $id => $contact)
        {
            $_data = [
                "number" => $contact["number"],
                "type" => $contact["type"],
                "contact_id" => $contactId
            ];

            if($this->contactPhoneRepo->exists($id)) {
                $this->contactPhoneRepo->update($_data, $id);
            } else {
                $this->contactPhoneRepo->create($_data);
            }
        }

        foreach($data["emails"] as $id => $email)
        {
            $_data = [
                "email" => $email,
                "contact_id" => $contactId
            ];

            if($this->contactEmailRepo->exists($id)) {
                $this->contactEmailRepo->update($_data, $id);
            } else {
                $this->contactEmailRepo->create($_data);
            }
        }

        foreach($data["address"] as $id => $address)
        {
            $_data = [
                "type" => $address["type"],
                "street" => $address["street"],
                "city" => $address["city"],
                "state" => $address["state"],
                "country" => $address["country"],
                "postal_code" => $address["postal_code"],
                "contact_id" => $contactId
            ];

            if($this->contactAddressRepo->exists($id)) {
                $this->contactAddressRepo->update($_data, $id);
            } else {
                $this->contactAddressRepo->create($_data);
            }
        }
    }

    public function deleteAssociation($contactId)
    {
        $this->contactRepo->delete($contactId);
        $this->contactPhoneRepo->deleteByContactId($contactId);
        $this->contactEmailRepo->deleteByContactId($contactId);
        $this->contactAddressRepo->deleteByContactId($contactId);
    }
}
