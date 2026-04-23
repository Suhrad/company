<?php

namespace App\Http\Controllers;

use App\Models\SaralImportJob;
use App\Models\Sale;
use App\Services\SaralSalesImportService;
use Illuminate\Http\Request;

class SaralImportController extends BaseController
{
    public function __construct(protected SaralSalesImportService $service)
    {
    }

    public function companies(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Sale::class);

        return app(BusinessCompanyController::class)->index($request);
    }

    public function preview(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Sale::class);

        $request->validate([
            'business_company_id' => 'required|integer|exists:business_companies,id',
            'file' => 'required|file',
        ]);

        $payload = $this->service->parseFile($request->file('file'));

        return response()->json(
            $this->service->preview($payload, (int) $request->business_company_id)
        );
    }

    public function import(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Sale::class);

        $request->validate([
            'business_company_id' => 'required|integer|exists:business_companies,id',
            'file' => 'required|file',
        ]);

        $file = $request->file('file');
        $payload = $this->service->parseFile($file);

        return response()->json(
            $this->service->import(
                $payload,
                (int) $request->business_company_id,
                (int) $request->user('api')->id,
                $file->getClientOriginalName()
            )
        );
    }

    public function history(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Sale::class);

        $jobs = SaralImportJob::with('company')
            ->orderByDesc('id')
            ->limit(25)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'company_name' => optional($job->company)->name,
                    'file_name' => $job->file_name,
                    'status' => $job->status,
                    'invoice_count' => $job->invoice_count,
                    'imported_count' => $job->imported_count,
                    'skipped_count' => $job->skipped_count,
                    'error_count' => $job->error_count,
                    'created_at' => optional($job->created_at)->toDateTimeString(),
                ];
            });

        return response()->json([
            'jobs' => $jobs,
        ]);
    }
}
