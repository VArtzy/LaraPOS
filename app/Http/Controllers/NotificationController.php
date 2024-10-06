<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'title' => 'required|max:255',
            'message' => 'required',
            'url' => '',
        ]);

        $user = User::find($validatedData['user_id']);
        $user->notify(new SystemNotification($validatedData['title'], $validatedData['message'], $validatedData['url']));

        return 'Notification sent!';
    }

    public function MarkAllAsRead()
    {
        $user = User::find(Auth::id());
        $user->unreadNotifications->markAsRead();
        return redirect()->back()->banner('Semua notifikasi telah dibaca! 🎉');
    }

    public function MarkAsRead($id)
    {
        $user = User::find(Auth::id());
        $user->unreadNotifications->where('id', $id)->markAsRead();
        return redirect()->back()->banner('Notifikasi telah dibaca! 🎉');
    }

    public function MarkAsUnread($id)
    {
        $user = User::find(Auth::id());
        $user->notifications->where('id', $id)->markAsUnread();
        return redirect()->back()->banner('Notifikasi telah ditandai belum dibaca! 🤔');
    }

    public function Delete($id)
    {
        if ($id == 'all') {
            $user = User::find(Auth::id());
            $user->notifications()->delete();
            return redirect()->back()->banner('Semua notifikasi telah dihapus! 🗑');
        } else {
            $user = User::find(Auth::id());
            $user->notifications()->where('id', $id)->delete();
            return redirect()->back()->banner('Notifikasi telah dihapus! 🗑');
        }
    }
}
