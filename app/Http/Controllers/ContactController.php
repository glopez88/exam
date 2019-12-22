<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Contact\ContactRepositoryInterface;
use App\Validators\ContactValidator;
use App\Exceptions\ValidationException;
use App\Services\ContactService;
use Exception;
use DB;

class ContactController extends Controller
{
    private $contactRepo;

    public function __construct(
        ContactRepositoryInterface $contactRepo
        )
    {
        $this->contactRepo = $contactRepo;
    }

    public function add(
        ContactValidator $validator,
        ContactService $contactService,
        Request $request)
    {
        $responseData = null;

        DB::beginTransaction();
        try {
            $data = $request->all();

            if (!$validator->validate($data, $validator::$createRules)) {
                throw new ValidationException;
            }

            $contact = $contactService->add($data);

            Auth::user()->contacts()->attach($contact->id);

            DB::commit();

            // requery to fetch all data and relationships
            $contact = $this->contactRepo->with([
                "emails",
                "phones",
                "addresses"
            ])->findOrFail($contact->id);

            return response()->json([
                "status" => "success",
                "data" => $contact
            ]);

        } catch(ValidationException $e) {
            $responseData = [
                "status" => "error",
                "errors" => $validator->errors()
            ];
        } catch(Exception $e) {
            $responseData = [
                "status" => "error",
                "message" => $e->getMessage(),
                "trace" => $e->getTraceAsString()
            ];
        }

        DB::rollback();

        return response()->json($responseData);
    }

    public function get(Request $request)
    {
        try {
            $user_id = Auth::id();
            $page = abs(intval($request->input('page')));
            $limit = 10;

            $contacts = $this->contactRepo->contacts($user_id, $page, $limit);

            return response()->json([
                "status" => "success",
                "data" => $contacts
            ]);
        } catch(Exception $e) {
        }

        return response()->json([
            "status" => "error",
            "message" => "Failed to load contacts from server. Please retry."
        ]);
    }

    public function edit(
        ContactValidator $validator,
        ContactService $contactService,
        Request $request,
        $contactId
    )
    {
        DB::beginTransaction();
        $responseData = [];

        try {
            $id = Auth::id();
            $data = $request->all();

            if(!$this->contactRepo->isOwnedBy($contactId, $id)) {
                throw new Exception("Access Forbidden");
            }

            if (!$validator->validate($data, $validator::$updateRules)) {
                throw new ValidationException;
            }

            $contact = $contactService->edit($data, $contactId);

            DB::commit();

            // requery to fetch all data and relationships
            $contact = $this->contactRepo->with([
                "emails",
                "phones",
                "addresses"
            ])->findOrFail($contactId);

            return response()->json([
                "status" => "success",
                "data" => $contact
            ]);
        } catch(ValidationException $e) {
            $responseData = [
                "status" => "error",
                "errors" => $validator->errors()
            ];
        } catch(Exception $e) {
            $responseData = [
                "status" => "error",
                //"message" => "Failed to edit contact. Please retry."
                "message" => $e->getMessage(),
                "trace" => $e->getTraceAsString()
            ];
        }

        DB::rollback();

        return response()->json($responseData);
    }

    public function delete(
        ContactService $contactService,
        $id
    )
    {
        DB::beginTransaction();

        try {
            $user = Auth::user();

            $user->contacts()->detach($id);
            $contactService->deleteAssociation($id);

            DB::commit();

            return response()->json([
                "status" => "success"
            ]);
        } catch(Exception $e) {
        }

        DB::rollback();

        return response()->json([
            "status" => "error",
            "message" => "Cannot delete contact. Please retry."
        ]);
    }
}
