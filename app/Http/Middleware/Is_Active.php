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
            if (auth()->check()) auth()->logout();
            return response()->json(['message' => 'Account is inactive.'], 403);
        }
        
        return $next($request);
    }
}