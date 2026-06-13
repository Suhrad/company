<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\Auth;
class Is_Active
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = auth()->user() ?? auth('api')->user();
        
        if($user && !$user->statut){
            // For API requests, return JSON 403
            if ($request->expectsJson() || $request->is('api/*')) {
                if (auth()->check()) auth()->logout();
                return response()->json(['message' => 'Account is inactive.'], 403);
            }
            // For web login attempts, logout and redirect back with error
            if (auth()->check()) auth()->logout();
            return redirect('/login')->withErrors(['email' => 'Your account is inactive. Please contact the administrator.']);
        }
        
        return $next($request);
    }
}