<?php
namespace App\Repositories\Contact;

use App\Models\Contact;
use App\Repositories\Base\BaseRepository;

class ContactRepository extends BaseRepository implements ContactRepositoryInterface
{

    public function __construct(Contact $contact)
    {
        parent::__construct($contact);
    }

    public function contacts($userId, $page = 1, $limit = 10)
    {
        $page = $page < 0 ? $page : 1;

        return $this->model->join("contact_user", "contacts.id", "=", "contact_user.contact_id")
            ->where("contact_user.user_id", $userId)
            ->whereNull("contacts.deleted_at")
            ->select("contacts.*")
            ->with(["emails", "phones", "addresses"])
            ->orderBy("created_at", "DESC")
            ->paginate($limit, $page);
    }

    public function isOwnedBy($contactId, $userId)
    {
        return $this->model->join("contact_user", "contacts.id", "=", "contact_user.contact_id")
            ->whereNull("contacts.deleted_at")
            ->where("contact_user.user_id", $userId)
            ->where("contact_user.contact_id", $contactId)
            ->select("contacts.*")
            ->count() > 0;
    }
}
