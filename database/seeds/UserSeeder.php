<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $c = DB::table('users')->insert([
            'id' => 1,
            'name' => "Godwinh",
            'email' => 'godwinh@gmail.com',
            'password' => bcrypt('password'),
        ]);


        $faker = Faker\Factory::create();

        for($i = 0; $i < 5; $i++)
        {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password'),
            ]);
        }


    }
}
