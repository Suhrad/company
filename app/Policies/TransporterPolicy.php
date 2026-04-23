<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Permission;
use App\Models\Transporter;
use Illuminate\Auth\Access\HandlesAuthorization;

class TransporterPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        $permission = Permission::where('name', 'Customers_view')->first();
        return $permission ? $user->hasRole($permission->roles) : false;
    }

    public function create(User $user)
    {
        $permission = Permission::where('name', 'Customers_add')->first();
        return $permission ? $user->hasRole($permission->roles) : false;
    }

    public function update(User $user)
    {
        $permission = Permission::where('name', 'Customers_edit')->first();
        return $permission ? $user->hasRole($permission->roles) : false;
    }

    public function delete(User $user)
    {
        $permission = Permission::where('name', 'Customers_delete')->first();
        return $permission ? $user->hasRole($permission->roles) : false;
    }
}
