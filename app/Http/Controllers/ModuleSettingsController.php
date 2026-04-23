<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Nwidart\Modules\Facades\Module;

class ModuleSettingsController extends BaseController
{
    public function get_modules_info(): JsonResponse
    {
        if (!File::isDirectory(base_path('Modules'))) {
            return response()->json([]);
        }

        $modules = collect(Module::all())
            ->map(function ($module) {
                return [
                    'module_name' => $module->getName(),
                    'current_version' => data_get($module->json()->getAttributes(), 'version', '1.0.0'),
                    'status' => $module->isEnabled(),
                ];
            })
            ->values();

        return response()->json($modules);
    }

    public function update_status_module(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'status' => ['required', 'boolean'],
        ]);

        if (!File::isDirectory(base_path('Modules'))) {
            return $this->sendError('Module support is not installed.');
        }

        $module = Module::find($data['name']);

        if (!$module) {
            return $this->sendError('Module not found.');
        }

        $data['status'] ? $module->enable() : $module->disable();

        return $this->sendResponse([
            'module_name' => $module->getName(),
            'status' => $module->isEnabled(),
        ], 'Module status updated successfully.');
    }

    public function upload_module(Request $request): JsonResponse
    {
        $request->validate([
            'module_zip' => ['required', 'file', 'mimes:zip'],
        ]);

        return response()->json([
            'message' => 'Module upload is not available in this project package.',
        ], 422);
    }
}
