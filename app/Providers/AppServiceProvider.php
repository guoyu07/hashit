<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Blade;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('url', function ($expression) {
            $url = str_replace(['(', ')'], '', $expression);
            $url = 'resources/assets/' . $url;
            $base_path = base_path();
            $hash = json_decode(file_get_contents($base_path.'/assets.json'), true);
            $hashed_url = substr(
                $hash[$url]['path'],
                17 // strlen('resources/assets/')
            );

            return $hashed_url;
        });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
