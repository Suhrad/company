<?php

namespace App\Http\Controllers;

use App\Models\Transporter;
use App\utils\helpers;
use Illuminate\Http\Request;

class TransportersController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Transporter::class);

        $transporters = Transporter::orderBy('id', 'desc')->get();
        return response()->json($transporters);
    }

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Transporter::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transporter::create([
            'name' => $request['name'],
            'phone' => $request['phone'],
            'address' => $request['address'],
        ]);

        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Transporter::class);

        request()->validate([
            'name' => 'required',
        ]);

        Transporter::whereId($id)->update([
            'name' => $request['name'],
            'phone' => $request['phone'],
            'address' => $request['address'],
        ]);

        return response()->json(['success' => true]);
    }

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transporter::class);

        $transporter = Transporter::findOrFail($id);
        $transporter->delete();

        return response()->json(['success' => true]);
    }

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transporter::class);

        $selectedIds = $request->selectedIds;
        Transporter::whereIn('id', $selectedIds)->delete();

        return response()->json(['success' => true]);
    }
}
