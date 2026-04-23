<?php

namespace App\Http\Controllers;

use App\Models\BusinessCompany;
use Illuminate\Http\Request;

class BusinessCompanyController extends BaseController
{
    public function index(Request $request)
    {
        $companies = BusinessCompany::whereNull('deleted_at')
            ->orderBy('name')
            ->get();

        return response()->json([
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:50|unique:business_companies,code',
        ]);

        $company = BusinessCompany::create($request->only([
            'name',
            'code',
            'legal_name',
            'gstin',
            'pan',
            'address',
            'city',
            'state',
            'pin_code',
            'country',
            'contact_person',
            'phone',
            'email',
            'is_active',
        ]));

        return response()->json($company, 201);
    }
}
