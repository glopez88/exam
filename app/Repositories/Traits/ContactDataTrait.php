<?php

namespace App\Repositories\Traits;

trait ContactDataTrait {

    public function deleteByContactId($contactId)
    {
        return $this->model->where("contact_id", $contactId)->delete();
    }

    public function contactIdExists($contactId)
    {
        return $this->model->where("contact_id", $contactId)->count() > 0;
    }
}
