<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i = 1; $i <= 20; $i++) {
            DB::table('contacts')->insert([
                'id' => $i,
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'company' => $faker->company,
                'notes' => 'Nothing special',
            ]);

            $addressTypes = array('primary', 'secondary', 'work', 'mailing');
            $phoneTypes = array('home', 'cell', 'fax', 'work', 'other');

            DB::table('contact_addresses')->insert([
                'contact_id' => $i,
                'type' => $addressTypes[array_rand($addressTypes, 1)],
                'street' => $faker->streetAddress,
                'city' => $faker->city,
                'state' => $faker->state,
                'country' => $faker->country,
                'postal_code' => $faker->postcode,
            ]);

            DB::table('contact_emails')->insert([
                'contact_id' => $i,
                'email' => $faker->email,
            ]);

            DB::table('contact_phones')->insert([
                'contact_id' => $i,
                'type' => $phoneTypes[array_rand($phoneTypes, 1)],
                'number' => str_replace("+", "", $faker->e164PhoneNumber),
            ]);

            DB::table('contact_user')->insert([
                "contact_id" => $i,
                "user_id" => 1,
            ]);
        }
    }
}
