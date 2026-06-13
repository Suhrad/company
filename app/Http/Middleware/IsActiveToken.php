<?php

namespace App\Http\Middleware;

use App\Models\OauthAccessToken;
use Closure;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class IsActiveToken
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
        $user = Auth::user();
        $userSerialize = serialize($user);
        $userUnserializeArray = (array) unserialize($userSerialize);

        $arrayKeys = array_keys($userUnserializeArray);
        foreach ($arrayKeys as $value)
        {

            if (strpos($value, 'Stocky_token') !== false) {

                $userAccessTokenArray = (array) $userUnserializeArray[$value];
                $arrayAccessKeys = array_keys($userAccessTokenArray);
                foreach ($arrayAccessKeys as $arrayAccessValue) {

                    if (strpos($arrayAccessValue, 'original') !== false) {

                        $userTokenId = $userAccessTokenArray[$arrayAccessValue]['id'];
                        $checkToken = OauthAccessToken::where([
                            ['id', '=', $userTokenId],
                            ['expires_at', '>', Carbon::now()]
                        ])->first();

                        if ( !$checkToken ) {
                            return response()->json([
                                'error'=>true,
                                'msg'=> 'Token time has expired. Please log in again.'
                            ]);
                        }
                    }
                }
            }
        }

        return $next($request);
    }
}