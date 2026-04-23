<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaralImportRow extends Model
{
    protected $fillable = [
        'saral_import_job_id',
        'row_number',
        'status',
        'source_document_hash',
        'customer_action',
        'product_action',
        'message',
        'preview_json',
    ];

    public function job()
    {
        return $this->belongsTo(SaralImportJob::class, 'saral_import_job_id');
    }
}
