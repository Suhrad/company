<?php

// app/Http/Middleware/SetSessionConfig.php
namespace App\Http\Middleware;

use Closure;
use Config;

class SetSessionConfig
{
    public function handle($request, Closure $next)
    {
        // Note: We do NOT change the session cookie name here because the
        // StartSession middleware has already read the cookie by this point,
        // and changing it here causes session loss. The session driver config
        // (session.php) handles the cookie naming for different session stores.

        return $next($request);
    }
}
