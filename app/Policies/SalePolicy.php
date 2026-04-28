<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Sale;
use Illuminate\Auth\Access\HandlesAuthorization;

class SalePolicy
{
    use HandlesAuthorization;

    public function view(User $user) { return true; }
    public function create(User $user) { return true; }
    public function update(User $user) { return true; }
    public function delete(User $user) { return true; }
    public function Reports_sales(User $user) { return true; }
    public function Sales_pos(User $user) { return true; }
    public function product_sales_report(User $user) { return true; }
    public function report_sales_by_category(User $user) { return true; }
    public function report_sales_by_brand(User $user) { return true; }
    public function draft_invoices_report(User $user) { return true; }
    public function discount_summary_report(User $user) { return true; }
    public function tax_summary_report(User $user) { return true; }
    public function check_record(User $user, $sale) { return true; }
    public function viewAny(User $user) { return true; }
    public function restore(User $user) { return true; }
    public function forceDelete(User $user) { return true; }
}
