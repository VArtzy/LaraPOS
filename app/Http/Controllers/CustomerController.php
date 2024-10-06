<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CustomerController extends Controller
{
    private $rules = [
        'name' => ['required'],
        'email' => ['email', 'unique:customers,email', 'max:100', 'nullable'],
        'phone' => ['max:20', 'nullable'],
        'address' => ['max:100', 'nullable'],
        'avatar' => ['max:2048', 'nullable', 'image', 'mimes:jpeg,png,jpg'],
        'team_id' => ['required', 'exists:teams,id']
    ];

    /**
     * Render the customer page.
     * 
     * @return \Inertia\Response
     */

    public function index()
    {
        $userTeam = User::find(Auth::id())->current_team_id;

        return Inertia::render('Customer/Index', [
            'customers' => Customer::where('team_id', $userTeam)->get()
        ]);
    }

    /**
     * Store a newly created customer in storage.
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            Validator::make($request->all(), $this->rules)->validate();

            $input = $request->all();
            if ($request->hasFile('avatar')) {
                $input['avatar'] = str_replace('public/', 'storage/', $request->file('avatar')->store('public/profile-photos'));
            }
        } catch (ValidationException $exception) {
            return redirect()->back()->dangerBanner($exception->getMessage() . ' 😢');
        }
        Customer::create($input);
        return redirect()->route('customers.index')->banner('Berhasil menambahkan pelanggan. 🎉');
    }

    /**
     * Update the specified customer in storage.
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Customer $customer
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Customer $customer)
    {
        try {
            if ($request->email == $customer->email) {
                $this->rules['email'] = ['email', 'max:100', 'nullable'];
            }

            Validator::make($request->all(), $this->rules)->validate();

            $input = $request->all();
            if ($request->hasFile('avatar')) {
                if ($customer->avatar) {
                    Storage::delete(str_replace('storage/', 'public/', $customer->avatar));
                }
                $input['avatar'] = str_replace('public/', 'storage/', $request->file('avatar')->store('public/profile-photos'));
            }
        } catch (ValidationException $exception) {
            return redirect()->back()->dangerBanner($exception->getMessage() . ' 😢');
        }
        $customer->update($input);
        return redirect()->route('customers.index')->banner('Berhasil memperbarui pelanggan. 🎉');
    }

    /**
     * Remove the specified customer from storage.
     * 
     * @param \App\Models\Customer $customer
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Customer $customer)
    {
        if ($customer->avatar) {
            Storage::delete(str_replace('storage/', 'public/', $customer->avatar));
        }

        $customer->delete();

        return redirect()->route('customers.index')->banner('Berhasil menghapus pelanggan. 😢');
    }
}
