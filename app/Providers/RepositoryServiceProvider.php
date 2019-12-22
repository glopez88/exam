<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\ {
    Contact\ContactRepository,
    Contact\ContactRepositoryInterface,
    ContactAddress\ContactAddressRepository,
    ContactAddress\ContactAddressRepositoryInterface,
    ContactEmail\ContactEmailRepository,
    ContactEmail\ContactEmailRepositoryInterface,
    ContactPhone\ContactPhoneRepository,
    ContactPhone\ContactPhoneRepositoryInterface,
    User\UserRepository,
    User\UserRepositoryInterface
};

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(
            ContactRepositoryInterface::class,
            ContactRepository::class
        );

        $this->app->bind(
            ContactAddressRepositoryInterface::class,
            ContactAddressRepository::class
        );

        $this->app->bind(
            ContactEmailRepositoryInterface::class,
            ContactEmailRepository::class
        );

        $this->app->bind(
            ContactPhoneRepositoryInterface::class,
            ContactPhoneRepository::class
        );

        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );
    }
}
