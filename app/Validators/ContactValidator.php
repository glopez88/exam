<?php
namespace App\Validators;

class ContactValidator extends BaseValidator
{

    public static $createRules = [
        "first_name" => "required|max:100",
        "last_name" => "required|max:100",
        "company" => "sometimes|required|max:200",
        "notes" => "sometimes|required",
        "user_id" => "nullable|exists:users,id",
        "contact" => "required|array",
        "contact.*" => "required|array",
        "contact.*.number" => "required|numeric",
        "contact.*.type" => "required|in:home,cell,fax,work,other",
        "emails.*" => "required|email",
        "address.*" => "required|array",
        "address.*.street" => "required",
        "address.*.city" => "required",
        "address.*.state" => "required",
        "address.*.country" => "required",
        "address.*.postal_code" => "required|max:20",
        "address.*.type" => "required|in:primary,secondary,work,mailing",
    ];

    public static $updateRules = [
        "first_name" => "required|max:100",
        "last_name" => "required|max:100",
        "company" => "sometimes|required|max:200",
        "notes" => "sometimes|required",
        "user_id" => "nullable|exists:users",
        "contact" => "required|array",
        "contact.*" => "required|array",
        "contact.*.number" => "required|numeric",
        "contact.*.type" => "required|in:home,cell,fax,work,other",
        "emails.*" => "required|email",
        "address.*" => "required|array",
        "address.*.street" => "required",
        "address.*.city" => "required",
        "address.*.state" => "required",
        "address.*.country" => "required",
        "address.*.postal_code" => "required|max:20",
        "address.*.type" => "required|in:primary,secondary,work,mailing"
    ];

    protected $messages = [
        "first_name.required" => "First name is required.",
        "first_name.max" => "First name must not exceed 100chars.",
        "last_name.required" => "Last name is required.",
        "last_name.max" => "Last name must not exceed 100chars.",
        "company.max" => "Company name must not exceed 200chars.",
        "user_id.exists" => "User must be an active user of the system.",
        "contact.required" => "Contact info is required.",
        "contact.array" => "Contact info must be valid.",
        "contact.*.number.required" => "Number is required.",
        "contact.*.number.numeric" => "Number must be valid",
        "contact.*.type.required" => "Number type is required.",
        "contact.*.type.in" => "Number type must be valid.",
        "emails.*.required" => "Email address is required.",
        "address.*.array" => "Address info is required.",
        "address.*.street.required" => "Street is required.",
        "address.*.city.required" => "City is required.",
        "address.*.state.required" => "State is required.",
        "address.*.country.required" => "Country is required.",
        "address.*.postal_code.required" => "Postal code is required.",
        "address.*.postal_code.max" => "Postal code must not exceed 20chars.",
        "address.*.type.in" => "Address type must be valid.",
        "address.*.type.required" => "Address type is required.",
    ];
}
