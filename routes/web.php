<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::prefix('notification')->group(function () {
        Route::post('/', [NotificationController::class, 'store'])->name('notifications.store');
        Route::post('mark-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markallasread');
        Route::post('{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markasread');
        Route::post('{id}/mark-as-unread', [NotificationController::class, 'markAsUnread'])->name('notifications.markasunread');
        Route::delete('{id}', [NotificationController::class, 'delete'])->name('notifications.delete');
    });
    Route::resource('customers', CustomerController::class);
});


Route::get('auth/google', [LoginController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);
