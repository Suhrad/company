<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaralImportJob extends Model
{
    protected $fillable = [
        'business_company_id',
        'user_id',
        'file_name',
        'payload_hash',
        'status',
        'invoice_count',
        'imported_count',
        'skipped_count',
        'error_count',
        'summary_json',
        'result_json',
        'original_payload',
    ];

    public function company()
    {
        return $this->belongsTo(BusinessCompany::class, 'business_company_id');
    }

    public function rows()
    {
        return $this->hasMany(SaralImportRow::class, 'saral_import_job_id');
    }
}
