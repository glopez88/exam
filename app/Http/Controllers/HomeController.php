<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Contact\ContactRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{

    private $contactRepo;

    public function __construct(
        ContactRepositoryInterface $contactRepo
        )
    {
        $this->contactRepo = $contactRepo;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $user_id = Auth::id();
        // $contacts = $this->contactRepo->contacts($user_id);

        return view('home');
    }
}
