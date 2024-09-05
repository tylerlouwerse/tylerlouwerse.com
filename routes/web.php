<?php

use Inertia\Inertia;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

Route::middleware('auth')->group(function () {
    Route::controller(AdminPostController::class)->group(function () {
        Route::get('/admin/posts/', 'index')->name('admin.posts.index');
        Route::post('/admin/posts', 'store')->name('admin.posts.store');
        Route::get('/admin/posts/{post:uuid}/edit', 'edit')->name('admin.posts.edit');
        Route::patch('/admin/posts/{post:uuid}', 'update')->name('admin.posts.update');
        Route::delete('/admin/posts/{post:uuid}', 'destroy')->name('admin.posts.destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/404', function () {
    return Inertia::render('404');
})->name('404');

require __DIR__.'/auth.php';
