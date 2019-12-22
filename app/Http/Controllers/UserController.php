<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;

class UserController extends Controller
{
    private $userRepo;

    public function __construct(
        UserRepositoryInterface $userRepo
        )
    {
        $this->userRepo = $userRepo;
    }

    public function search(
        Request $request
        )
    {
        try {
            $user = $this->userRepo->searchByEmail($request->input("email"), Auth::id());

            if(!$user) {
                throw new Exception("No user found");
            }

            return response()->json([
                "status" => "success",
                "data" => $user
            ]);
        } catch(Exception $e) {
        }

        return response()->json([
            "status" => "error",
            "message" => "Sorry, no user of that email address exists."
        ]);
    }
}
