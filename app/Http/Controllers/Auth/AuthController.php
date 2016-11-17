<?php
/**
 * Created by PhpStorm.
 * User: liorwen
 * Date: 2016/11/16
 * Time: 下午 3:23
 */
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\IdTokenRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\AuthRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function signUp(RegisterRequest $request)
    {
        try {
            $this->authRepository->signUp($request);
        } catch (HttpException $exception) {
            return response()->json([
                'code'    => 'error',
                'message' => 'register error',
            ], 500);
        }

        return response()->json([
            'code'    => 'success',
            'message' => 'register success',
        ], 200);
    }

    public function signIn(LoginRequest $request)
    {
        try {
            $token = JWTAuth::attempt($request->only('email', 'password'), [
                'exp' => Carbon::now()->addWeek()->timestamp,
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 500);
        }
        if (!$token) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 401);
        } else {
            $data = [];
            $meta = [];
            $data[ 'name' ] = $request->user()->name;
            $meta[ 'token' ] = $token;

            return response()->json([
                'data' => $data,
                'meta' => $meta,
            ]);
        }
    }

    public function checkAuth(IdTokenRequest $request)
    {
        try {
            $token = JWTAuth::getToken();
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 500);
        }
        if (!$token) {
            return response()->json([
                'error' => 'Could not authenticate',
            ], 401);
        } else {
            if ($token == $request['id_token'])
            {
                $data = [];
                $meta = [];
                $user = JWTAuth::parseToken()->authenticate();
                $data[ 'name' ] = $user->name;
                $meta[ 'token' ] = $token;

                return response()->json([
                    'data' => $data,
                    'meta' => $meta,
                ]);
            }
            else {
                return response()->json([
                    'error' => 'Token invaild',
                ], 401);
            }
        }
    }
}