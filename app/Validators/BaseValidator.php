<?php
namespace App\Validators;

use Validator;

abstract class BaseValidator
{

    protected $validator;

    protected $messages = [
        'required' => 'The :attribute field is required.'
    ];

    public function validate($data, $rules)
	{
		$this->validator = Validator::make($data, $rules, $this->messages);

		if ($this->validator->fails()) {
			return false;
		}

		return true;
	}

    public function errors()
	{
		return $this->validator->errors();
	}
}
