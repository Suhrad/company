<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
      ref="myData"
      class="sidebar-left rtl-ps-none ps scroll"
    >
      <div>
        <ul class="navigation-left">
          <!-- 1. Dashboard -->
          <li
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'dashboard' }"
            class="nav-item"
            data-item="dashboard"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/dashboard">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="nav-text">{{ $t("dashboard") }}</span>
            </router-link>
          </li>

          <!-- 2. Productions -->
          <li
            v-show="currentUserPermissions 
              && (currentUserPermissions.includes('adjustment_view')
              || currentUserPermissions.includes('adjustment_add'))"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'adjustments' }"
            data-item="adjustments"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Edit-Map"></i>
              <span class="nav-text">Production</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 3. Purchases -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('Purchases_view') 
                        || currentUserPermissions.includes('Purchases_add'))"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'purchases' }"
            data-item="purchases"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Receipt"></i>
              <span class="nav-text">{{$t('Purchases')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 4. Sales -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('Sales_view') 
                        || currentUserPermissions.includes('Sales_add'))"
            class="nav-item"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'sales' }"
            data-item="sales"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Full-Cart"></i>
              <span class="nav-text">{{$t('Sales')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 5. Job Work -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('job_work_view')
                      || currentUserPermissions.includes('job_work_add'))"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'job_work' }"
            data-item="job_work"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Factory"></i>
              <span class="nav-text">Job Work</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 6. Transfers -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('transfer_view')
                      || currentUserPermissions.includes('transfer_add'))"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'transfers' }"
            data-item="transfers"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Back"></i>
              <span class="nav-text">{{$t('StockTransfers')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 7. Reports -->
          <li
            v-show="currentUserPermissions && 
                      (currentUserPermissions.includes('Reports_payments_Sales') 
                      || currentUserPermissions.includes('Reports_payments_Purchases')
                      || currentUserPermissions.includes('Reports_payments_Sale_Returns')
                      || currentUserPermissions.includes('Reports_payments_purchase_Return')
                      || currentUserPermissions.includes('Warehouse_report')
                      || currentUserPermissions.includes('Reports_profit')
                      || currentUserPermissions.includes('inventory_valuation')
                      || currentUserPermissions.includes('expenses_report')
                      || currentUserPermissions.includes('deposits_report')
                      || currentUserPermissions.includes('Reports_purchase') 
                      || currentUserPermissions.includes('Reports_quantity_alerts')
                      || currentUserPermissions.includes('Reports_sales') 
                      || currentUserPermissions.includes('product_sales_report')
                      || currentUserPermissions.includes('product_purchases_report')
                      || currentUserPermissions.includes('Reports_suppliers')
                      || currentUserPermissions.includes('Top_Suppliers_Report')
                      || currentUserPermissions.includes('Reports_customers')
                      || currentUserPermissions.includes('Top_products')
                      || currentUserPermissions.includes('inactive_customers_report')
                      || currentUserPermissions.includes('Top_customers')
                      || currentUserPermissions.includes('product_report')
                       || currentUserPermissions.includes('zeroSalesProducts')
                       || currentUserPermissions.includes('Dead_Stock_Report')
                        || currentUserPermissions.includes('Stock_Aging_Report')
                        || currentUserPermissions.includes('Stock_Transfer_Report')
                       || currentUserPermissions.includes('Stock_Adjustment_Report')
                       || currentUserPermissions.includes('report_transactions')
                        || currentUserPermissions.includes('seller_report')
                       || currentUserPermissions.includes('report_sales_by_category')
                        || currentUserPermissions.includes('report_sales_by_brand')
                      || currentUserPermissions.includes('stock_report'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'reports' }"
            class="nav-item"
            data-item="reports"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Line-Chart"></i>
              <span class="nav-text">{{$t('Reports')}}</span>
            </a>
            <div class="triangle"></div>
          </li>    

          <!-- 8. Products -->
          <li
            v-show="currentUserPermissions 
            && (currentUserPermissions.includes('products_add')
            || currentUserPermissions.includes('products_view') 
            || currentUserPermissions.includes('product_import') 
            || currentUserPermissions.includes('opening_stock_import') 
            || currentUserPermissions.includes('barcode_view')
             || currentUserPermissions.includes('brand') 
             || currentUserPermissions.includes('unit')  
             || currentUserPermissions.includes('count_stock')  
             || currentUserPermissions.includes('category'))"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'products' }"
            data-item="products"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Library-2"></i>
              <span class="nav-text">{{$t('Products')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 9. Sales Return -->
          <li
            v-if="currentUserPermissions && currentUserPermissions.includes('Sale_Returns_view')"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'sale_return' }"
            class="nav-item"
            data-item="sale_return"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/sale_return/list">
              <i class="nav-icon i-Right"></i>
              <span class="nav-text">{{ $t("SalesReturn") }}</span>
            </router-link>
          </li>

          <!-- 10. Purchase Return -->
          <li
            v-if="currentUserPermissions && currentUserPermissions.includes('Purchase_Returns_view')"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'purchase_return' }"
            class="nav-item"
            data-item="purchase_return"
          >
            <router-link tag="a" class="nav-item-hold" to="/app/purchase_return/list">
              <i class="nav-icon i-Left"></i>
              <span class="nav-text">{{ $t("PurchasesReturn") }}</span>
            </router-link>
          </li>

          <!-- 11. HRM -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('company')
                     || currentUserPermissions.includes('department')
                     || currentUserPermissions.includes('designation')
                     || currentUserPermissions.includes('office_shift')
                     || currentUserPermissions.includes('view_employee')
                     || currentUserPermissions.includes('attendance')
                     || currentUserPermissions.includes('leave')
                     || currentUserPermissions.includes('holiday')
                     || currentUserPermissions.includes('payroll')
                     )"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'hrm' }"
            class="nav-item"
            data-item="hrm"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Library"></i>
              <span class="nav-text">{{$t('hrm')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 12. Accounting -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('expense_view')
              || currentUserPermissions.includes('expense_add')
              || currentUserPermissions.includes('deposit_view')
              || currentUserPermissions.includes('deposit_add')
              || currentUserPermissions.includes('account')
              || currentUserPermissions.includes('transfer_money')
              )"
            @mouseenter="toggleSubMenu"
            class="nav-item"
            :class="{ active: selectedParentMenu == 'accounting' }"
            data-item="accounting"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Wallet"></i>
              <span class="nav-text">{{$t('Accounting')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 13. People -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('Customers_view')
                        ||currentUserPermissions.includes('Suppliers_view')
                        |currentUserPermissions.includes('customers_import')
                        |currentUserPermissions.includes('Suppliers_import')
                        |currentUserPermissions.includes('Suppliers_import')
                        ||currentUserPermissions.includes('users_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'People' }"
            class="nav-item"
            data-item="People"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Business-Mens"></i>
              <span class="nav-text">{{$t('People')}}</span>
            </a>
            <div class="triangle"></div>
          </li>

          <!-- 14. Settings -->
          <li
            v-show="currentUserPermissions && (currentUserPermissions.includes('setting_system') 
                        || currentUserPermissions.includes('sms_settings')
                        || currentUserPermissions.includes('notification_template')
                        || currentUserPermissions.includes('pos_settings')
                        || currentUserPermissions.includes('appearance_settings')
                        || currentUserPermissions.includes('translations_settings')
                        || currentUserPermissions.includes('module_settings')
                        || currentUserPermissions.includes('payment_gateway')
                        || currentUserPermissions.includes('mail_settings')
                        || currentUserPermissions.includes('warehouse') 
                        || currentUserPermissions.includes('backup')
                        || currentUserPermissions.includes('payment_methods')  
                        || currentUserPermissions.includes('currency') 
                        || currentUserPermissions.includes('permissions_view'))"
            @mouseenter="toggleSubMenu"
            :class="{ active: selectedParentMenu == 'settings' }"
            class="nav-item"
            data-item="settings"
            :data-submenu="true"
          >
            <a class="nav-item-hold" href="#">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="nav-text">{{$t('Settings')}}</span>
            </a>
            <div class="triangle"></div>
          </li>
        </ul>
      </div>
    </vue-perfect-scrollbar>

    <vue-perfect-scrollbar
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="sidebar-left-secondary ps rtl-ps-none"
    >
      <div ref="sidebarChild">





        <ul
          class="childNav d-none"
          data-parent="products"
          :class="{ 'd-block': selectedParentMenu == 'products' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('products_add')"
          >
            <router-link tag="a" class to="/app/products/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('AddProduct')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('products_view')"
          >
            <router-link tag="a" class to="/app/products/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('productsList')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('product_import')"
          >
            <router-link tag="a" class to="/app/products/import">
              <i class="nav-icon i-Download"></i>
              <span class="item-name">{{ $t('import_products') }}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('opening_stock_import')"
          >
            <router-link tag="a" class to="/app/products/opening_stock_import">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('Opening_Stock')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('barcode_view')"
          >
            <router-link tag="a" class to="/app/products/barcode">
              <i class="nav-icon i-Bar-Code"></i>
              <span class="item-name">{{$t('Printbarcode')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('count_stock')"
          >
            <router-link tag="a" class to="/app/products/count_stock">
              <i class="nav-icon i-Check-2"></i>
              <span class="item-name">{{$t('CountStock')}}</span>
            </router-link>
          </li>
           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('category')"
          >
            <router-link tag="a" class to="/app/products/Categories">
              <i class="nav-icon i-Duplicate-Layer"></i>
              <span class="item-name">{{$t('Categories')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('brand')"
          >
            <router-link tag="a" class to="/app/products/Brands">
              <i class="nav-icon i-Bookmark"></i>
              <span class="item-name">{{$t('Brand')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('unit')"
          >
            <router-link tag="a" class to="/app/products/Units">
              <i class="nav-icon i-Quotes"></i>
              <span class="item-name">{{$t('Units')}}</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="adjustments"
          :class="{ 'd-block': selectedParentMenu == 'adjustments' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('adjustment_add')"
          >
            <router-link tag="a" class to="/app/adjustments/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">Create Production</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('adjustment_view')"
          >
            <router-link tag="a" class to="/app/adjustments/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">Production List</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="transfers"
          :class="{ 'd-block': selectedParentMenu == 'transfers' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('transfer_add')"
          >
            <router-link tag="a" class to="/app/transfers/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('CreateTransfer')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('transfer_view')"
          >
            <router-link tag="a" class to="/app/transfers/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('ListTransfers')}}</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="job_work"
          :class="{ 'd-block': selectedParentMenu == 'job_work' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('job_work_add')"
          >
            <router-link tag="a" class to="/app/job_work/issue">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">Job Work Out (Issue)</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('job_work_add')"
          >
            <router-link tag="a" class to="/app/job_work/receipt">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">Job Work In (Receipt)</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('job_work_view')"
          >
            <router-link tag="a" class to="/app/job_work/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">Job Work List</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="accounting"
          :class="{ 'd-block': selectedParentMenu == 'accounting' }"
        >

        <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('account')"
          >
            <router-link tag="a" class to="/app/accounts">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('List_accounts')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('transfer_money')"
          >
            <router-link tag="a" class to="/app/transfer_money">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('Transfers_Money')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('expense_add')"
          >
            <router-link tag="a" class to="/app/expenses/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('Create_Expense')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('expense_view')"
          >
            <router-link tag="a" class to="/app/expenses/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('ListExpenses')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('deposit_add')"
          >
            <router-link tag="a" class to="/app/deposits/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('Create_deposit')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('deposit_view')"
          >
            <router-link tag="a" class to="/app/deposits/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('List_Deposit')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('expense_view')"
          >
            <router-link tag="a" class to="/app/expenses/category">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('Expense_Category')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('deposit_view')"
          >
            <router-link tag="a" class to="/app/deposits/category">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('Deposit_Category')}}</span>
            </router-link>
          </li>
        </ul>



        <ul
          class="childNav d-none"
          data-parent="purchases"
          :class="{ 'd-block': selectedParentMenu == 'purchases' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Purchases_add')"
          >
            <router-link tag="a" class to="/app/purchases/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('AddPurchase')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Purchases_view')"
          >
            <router-link tag="a" class to="/app/purchases/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('ListPurchases')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Purchases')"
          >
            <router-link tag="a" class to="/app/payments/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">Create Payment</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Purchases')"
          >
            <router-link tag="a" class to="/app/payments/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">Payment List</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="sales"
          :class="{ 'd-block': selectedParentMenu == 'sales' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Sales_add')"
          >
            <router-link tag="a" class to="/app/sales/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">{{$t('AddSale')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Sales_view')"
          >
            <router-link tag="a" class to="/app/sales/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">{{$t('ListSales')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Sales')"
          >
            <router-link tag="a" class to="/app/receipts/store">
              <i class="nav-icon i-Add-File"></i>
              <span class="item-name">Create Receipt</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Sales')"
          >
            <router-link tag="a" class to="/app/receipts/list">
              <i class="nav-icon i-Files"></i>
              <span class="item-name">Receipt List</span>
            </router-link>
          </li>
        </ul>

      

       
      <!-- hrm -->
        <ul
          class="childNav d-none"
          data-parent="hrm"
          :class="{ 'd-block': selectedParentMenu == 'hrm' }"
        >
         <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('company')"
          >
            <router-link tag="a" class to="/app/hrm/company">
              <i class="nav-icon i-Management"></i>
              <span class="item-name">{{$t('Company')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('department')"
          >
            <router-link tag="a" class to="/app/hrm/departments">
              <i class="nav-icon i-Shop"></i>
              <span class="item-name">{{$t('Departments')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('designation')"
          >
            <router-link tag="a" class to="/app/hrm/designations">
              <i class="nav-icon i-Shutter"></i>
              <span class="item-name">{{$t('Designations')}}</span>
            </router-link>
          </li>
           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('office_shift')"
          >
            <router-link tag="a" class to="/app/hrm/office_Shift">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">{{$t('Office_Shift')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('view_employee')"
          >
            <router-link tag="a" class to="/app/hrm/employees">
              <i class="nav-icon i-Engineering"></i>
              <span class="item-name">{{$t('Employees')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('attendance')"
          >
            <router-link tag="a" class to="/app/hrm/attendance">
              <i class="nav-icon i-Clock"></i>
              <span class="item-name">{{$t('Attendance')}}</span>
            </router-link>
          </li>
           <li
            v-if="currentUserPermissions && (currentUserPermissions.includes('leave'))"

           @click.prevent="toggleSidebarDropdwon($event)"
            class="nav-item dropdown-sidemenu"
          >

            <a href="#">
              <i class="nav-icon i-Calendar"></i>
              <span class="item-name">{{$t('Leave_request')}}</span>
              <i class="dd-arrow i-Arrow-Down"></i>
            </a>
            <ul class="submenu">
              <li
              >
                <router-link tag="a" class to="/app/hrm/leaves/list">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('Leave_request')}}</span>
                </router-link>
              </li>
              <li
              >
                <router-link tag="a" class to="/app/hrm/leaves/type">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('Leave_type')}}</span>
                </router-link>
              </li>
              
            </ul>
          </li>
           
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('holiday')"
          >
            <router-link tag="a" class to="/app/hrm/holidays">
              <i class="nav-icon i-Christmas-Bell"></i>
              <span class="item-name">{{$t('Holidays')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('payroll')"
          >
            <router-link tag="a" class to="/app/hrm/payrolls">
              <i class="nav-icon i-Money-2"></i>
              <span class="item-name">{{$t('Payroll')}}</span>
            </router-link>
          </li>

        </ul>


         <!-- People -->
        <ul
          class="childNav d-none"
          data-parent="People"
          :class="{ 'd-block': selectedParentMenu == 'People' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Customers_view')"
          >
            <router-link tag="a" class to="/app/People/Customers">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Customers')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('customers_import')"
          >
            <router-link tag="a" class to="/app/People/Customers_import">
              <i class="nav-icon i-Download"></i>
              <span class="item-name">Import Customers</span>
            </router-link>
          </li>


          <li
            class="nav-item"
            v-if="currentUserPermissions && (currentUserPermissions.includes('Sales_add') || currentUserPermissions.includes('customers_import'))"
          >
            <router-link tag="a" class to="/app/sales/saral-import">
              <i class="nav-icon i-Download"></i>
              <span class="item-name">SARAL Sales Import</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && (currentUserPermissions.includes('Customers_view') || currentUserPermissions.includes('Sales_add'))"
          >
            <router-link tag="a" class to="/app/People/Business_companies">
              <i class="nav-icon i-Building"></i>
              <span class="item-name">Business Companies</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Suppliers_view')"
          >
            <router-link tag="a" class to="/app/People/Suppliers">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Suppliers')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Suppliers_import')"
          >
            <router-link tag="a" class to="/app/People/Suppliers_import">
              <i class="nav-icon i-Download"></i>
              <span class="item-name">Import Suppliers</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('users_view')"
          >
            <router-link tag="a" class to="/app/People/Users">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Users')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Customers_view')"
          >
            <router-link tag="a" class to="/app/People/Transporters">
              <i class="nav-icon i-Administrator"></i>
              <span class="item-name">{{$t('Transporters')}}</span>
            </router-link>
          </li>
        </ul>

        <ul
          class="childNav d-none"
          data-parent="settings"
          :class="{ 'd-block': selectedParentMenu == 'settings' }"
        >
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('setting_system')"
          >
            <router-link tag="a" class to="/app/settings/System_settings">
              <i class="nav-icon i-Gear"></i>
              <span class="item-name">{{$t('SystemSettings')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('appearance_settings')"
          >
            <router-link tag="a" class to="/app/settings/appearance_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('Dynamic_Appearance')}} </span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('translations_settings')"
          >
            <router-link tag="a" class to="/app/settings/translations_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('Languages')}} </span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('payment_methods')"
          >
            <router-link tag="a" class to="/app/settings/payment_methods">
              <i class="nav-icon i-Money-2"></i>
              <span class="item-name">{{$t('Payment_Methods')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('sms_settings')"
          >
            <router-link tag="a" class to="/app/settings/sms_settings">
              <i class="nav-icon i-Speach-Bubble"></i>
              <span class="item-name">{{$t('sms_settings')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('notification_template')"
          >
            <router-link tag="a" class to="/app/settings/sms_templates">
              <i class="nav-icon i-Speach-Bubble"></i>
              <span class="item-name">{{$t('sms_templates')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('mail_settings')"
          >
            <router-link tag="a" class to="/app/settings/mail_settings">
              <i class="nav-icon i-Email"></i>
              <span class="item-name">{{$t('mail_settings')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('notification_template')"
          >
            <router-link tag="a" class to="/app/settings/email_templates">
              <i class="nav-icon i-Email"></i>
              <span class="item-name">{{$t('email_templates')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('pos_settings')"
          >
            <router-link tag="a" class to="/app/settings/pos_settings">
              <i class="nav-icon i-Cash-Register"></i>
              <span class="item-name">{{$t('Pos_Settings')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('module_settings')"
          >
            <router-link tag="a" class to="/app/settings/module_settings">
              <i class="nav-icon i-Data-Settings"></i>
              <span class="item-name">{{$t('module_settings')}}</span>
            </router-link>
          </li>

            <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('setting_system')"
          >
            <router-link tag="a" class to="/app/settings/update_settings">
              <i class="nav-icon i-Upgrade"></i>
              <span class="item-name">{{$t('update_settings')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('payment_gateway')"
          >
            <router-link tag="a" class to="/app/settings/payment_gateway">
              <i class="nav-icon i-Money-2"></i>
              <span class="item-name">{{$t('Payment_Gateway')}}</span>
            </router-link>
          </li>

          

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('permissions_view')"
          >
            <router-link tag="a" class to="/app/settings/permissions">
              <i class="nav-icon i-Key"></i>
              <span class="item-name">{{$t('GroupPermissions')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('warehouse')"
          >
            <router-link tag="a" class to="/app/settings/Warehouses">
              <i class="nav-icon i-Clothing-Store"></i>
              <span class="item-name">{{$t('Warehouses')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('currency')"
          >
            <router-link tag="a" class to="/app/settings/Currencies">
              <i class="nav-icon i-Dollar-Sign"></i>
              <span class="item-name">{{$t('Currencies')}}</span>
            </router-link>
          </li>
         
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('backup')"
          >
            <router-link tag="a" class to="/app/settings/Backup">
              <i class="nav-icon i-Data-Backup"></i>
              <span class="item-name">{{$t('Backup')}}</span>
            </router-link>
          </li>

        </ul>

        <ul
          class="childNav d-none"
          data-parent="reports"
          :class="{ 'd-block': selectedParentMenu == 'reports' }"
        >
          <li
            v-if="currentUserPermissions &&
             (currentUserPermissions.includes('Reports_payments_Purchases') 
           || currentUserPermissions.includes('Reports_payments_Sales')
           || currentUserPermissions.includes('Reports_payments_Sale_Returns')
           || currentUserPermissions.includes('Reports_payments_purchase_Return'))"
            @click.prevent="toggleSidebarDropdwon($event)"
            class="nav-item dropdown-sidemenu"
          >
            <a href="#">
              <i class="nav-icon i-Credit-Card"></i>
              <span class="item-name">{{$t('Payments')}}</span>
              <i class="dd-arrow i-Arrow-Down"></i>
            </a>
            <ul class="submenu">
              <li
                v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Purchases')"
              >
                <router-link tag="a" class to="/app/reports/payments_purchase">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('Purchases')}}</span>
                </router-link>
              </li>
              <li
                v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Sales')"
              >
                <router-link tag="a" class to="/app/reports/payments_sale">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('Sales')}}</span>
                </router-link>
              </li>
              <li
                v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Sale_Returns')"
              >
                <router-link tag="a" class to="/app/reports/payments_sales_returns">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('SalesReturn')}}</span>
                </router-link>
              </li>
              <li
                v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_purchase_Return')"
              >
                <router-link tag="a" class to="/app/reports/payments_purchases_returns">
                  <i class="nav-icon i-ID-Card"></i>
                  <span class="item-name">{{$t('PurchasesReturn')}}</span>
                </router-link>
              </li>
            </ul>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('report_transactions')"
          >
            <router-link tag="a" class to="/app/reports/report_transactions">
              <i class="nav-icon i-Dollar"></i>
              <span class="item-name">{{$t('Report_Transactions')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('seller_report')"
          >
            <router-link tag="a" class to="/app/reports/seller_report">
              <i class="nav-icon i-User"></i>
              <span class="item-name">{{$t('Seller_report')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_profit')"
          >
            <router-link tag="a" class to="/app/reports/profit_and_loss">
              <i class="nav-icon i-Money-Bag"></i>
              <span class="item-name">{{$t('ProfitandLoss')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('inventory_valuation')"
          >
            <router-link tag="a" class to="/app/reports/inventory_valuation_summary">
              <i class="nav-icon i-Pie-Chart"></i>
              <span class="item-name">{{$t('Inventory_Valuation')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('expenses_report')"
          >
            <router-link tag="a" class to="/app/reports/expenses_report">
              <i class="nav-icon i-Receipt-3"></i>
              <span class="item-name">{{$t('Expense_Report')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('deposits_report')"
          >
            <router-link tag="a" class to="/app/reports/deposits_report">
              <i class="nav-icon i-Safe-Box"></i>
              <span class="item-name">{{$t('Deposits_Report')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_quantity_alerts')"
          >
            <router-link tag="a" class to="/app/reports/quantity_alerts">
              <i class="nav-icon i-Alarm"></i>
              <span class="item-name">{{$t('ProductQuantityAlerts')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Warehouse_report')"
          >
            <router-link tag="a" class to="/app/reports/warehouse_report">
              <i class="nav-icon i-Warehouse"></i>
              <span class="item-name">{{$t('Warehouse_report')}}</span>
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('stock_report')"
          >
            <router-link tag="a" class to="/app/reports/stock_report">
              <i class="nav-icon i-Box-Full"></i>
              <span class="item-name">{{$t('stock_report')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('product_report')"
          >
            <router-link tag="a" class to="/app/reports/product_report">
              <i class="nav-icon i-Bar-Code"></i>
              <span class="item-name">{{$t('product_report')}}</span>
            </router-link>
          </li>

          <li class="nav-item" v-if="currentUserPermissions && currentUserPermissions.includes('zeroSalesProducts')">
            <router-link tag="a" class :to="{ name: 'zero_sales_products_report' }">
              <i class="nav-icon i-Remove-Bag"></i>
              <span class="item-name">{{$t('Zero_Sales_Products_Report')}}</span>
            </router-link>
          </li>

          <li class="nav-item" v-if="currentUserPermissions && currentUserPermissions.includes('Dead_Stock_Report')">
            <router-link tag="a" class :to="{ name: 'dead_stock_report' }">
              <i class="nav-icon i-Remove-Bag"></i>
              <span class="item-name">{{$t('Dead_Stock_Report')}}</span>
            </router-link>
          </li>

          <li
          class="nav-item"
          v-if="currentUserPermissions && currentUserPermissions.includes('Stock_Aging_Report')"
        >
          <router-link tag="a" class :to="{ name: 'stock_aging_report' }">
            <i class="nav-icon i-Clock"></i>
            <span class="item-name">{{$t('Stock_Aging_Report')}}</span>
          </router-link>
        </li>

        <li class="nav-item" v-if="currentUserPermissions && currentUserPermissions.includes('Stock_Transfer_Report')">
        <router-link tag="a" class :to="{ name: 'stock_transfer_report' }">
          <i class="nav-icon i-Back"></i>
          <span class="item-name">{{$t('Stock_Transfer_Report')}}</span>
        </router-link>
      </li>

      <li class="nav-item" v-if="currentUserPermissions && (currentUserPermissions.includes('job_work_view') || currentUserPermissions.includes('job_work_add'))">
        <router-link tag="a" class :to="{ name: 'Job_Work_Report' }">
          <i class="nav-icon i-Factory"></i>
          <span class="item-name">Job Work Report</span>
        </router-link>
      </li>

      <li class="nav-item" v-if="currentUserPermissions && currentUserPermissions.includes('Stock_Adjustment_Report')">
        <router-link tag="a" :to="{ name: 'stock_adjustment_report' }">
          <i class="nav-icon i-Edit"></i>
          <span class="item-name">Production Report</span>
        </router-link>
      </li>



          

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_sales')"
          >
            <router-link tag="a" class to="/app/reports/sales_report">
              <i class="nav-icon i-Bar-Chart"></i>
              <span class="item-name">{{$t('SalesReport')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('product_sales_report')"
          >
            <router-link tag="a" class to="/app/reports/product_sales_report">
              <i class="nav-icon i-Line-Chart"></i>
              <span class="item-name">{{$t('product_sales_report')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('report_sales_by_category')"
          >
            <router-link tag="a" class to="/app/reports/report_sales_by_category">
              <i class="nav-icon i-Tag-3"></i>
              <span class="item-name">{{$t('Sales_by_Category')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('report_sales_by_brand')"
          >
            <router-link tag="a" class to="/app/reports/report_sales_by_brand">
              <i class="nav-icon i-Shop"></i>
              <span class="item-name">{{$t('Sales_by_Brand')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_purchase')"
          >
            <router-link tag="a" class to="/app/reports/purchase_report">
              <i class="nav-icon i-Checkout"></i>
              <span class="item-name">{{$t('PurchasesReport')}}</span>
            </router-link>
          </li>

            <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('product_purchases_report')"
          >
            <router-link tag="a" class to="/app/reports/product_purchases_report">
              <i class="nav-icon i-Shopping-Basket"></i>
              <span class="item-name">{{$t('Product_purchases_report')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Reports_customers')"
          >
            <router-link tag="a" class to="/app/reports/companies_report">
              <i class="nav-icon i-User"></i>
              <span class="item-name">{{$t('CompanyReport')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('inactive_customers_report')"
          >
            <router-link tag="a" class to="/app/reports/inactive_customers">
              <i class="nav-icon i-Remove-User"></i>
              <span class="item-name">{{$t('Inactive_Customers_Report')}}</span>
            </router-link>
          </li>

          <li class="nav-item" v-if="currentUserPermissions && currentUserPermissions.includes('Top_Suppliers_Report')">
            <router-link tag="a" class :to="{ name: 'top_suppliers_report' }">
              <i class="nav-icon i-Business-ManWoman"></i>
              <span class="item-name">{{$t('Top_Suppliers_Report')}}</span>
            </router-link>
          </li>

           <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Top_products')"
          >
            <router-link tag="a" class to="/app/reports/top_selling_products">
              <i class="nav-icon i-Trophy"></i>
              <span class="item-name">{{$t('Top_Selling_Products')}}</span>
            </router-link>
          </li>

          <li
            class="nav-item"
            v-if="currentUserPermissions && currentUserPermissions.includes('Top_customers')"
          >
            <router-link tag="a" class to="/app/reports/top_customers">
              <i class="nav-icon i-Trophy"></i>
              <span class="item-name">{{$t('Top_customers')}}</span>
            </router-link>
          </li>


          


        </ul>
      </div>
    </vue-perfect-scrollbar>
    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{ open: getSideBarToggleProperties.isSecondarySideNavOpen }"
    ></div>
  </div>
  <!--=============== Left side End ================-->
</template>

<script>
import Topnav from "./TopNav";
import { isMobile } from "mobile-device-detect";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Topnav
  },

  data() {
    return {
      isDisplay: true,
      isMenuOver: false,
      isStyle: true,
      selectedParentMenu: "",
      isMobile,
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    window.addEventListener("resize", this.handleWindowResize);
    document.addEventListener("click", this.returnSelectedParentMenu);
    this.handleWindowResize();
  },

  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
    window.removeEventListener("resize", this.handleWindowResize);
  },

  computed: {
    ...mapGetters(["getSideBarToggleProperties", "currentUserPermissions"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSecondarySidebarPropertiesViaMenuItem",
      "changeSecondarySidebarPropertiesViaOverlay",
      "changeSidebarProperties"
    ]),

    handleWindowResize() {
      if (window.innerWidth <= 1200) {
        if (this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
        if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
          this.changeSecondarySidebarProperties();
        }
      } else {
        if (!this.getSideBarToggleProperties.isSideNavOpen) {
          this.changeSidebarProperties();
        }
      }
    },
    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter(x => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "dashboard";
      }
    },
    toggleSubMenu(e) {
      let hasSubmenu = e.target.dataset.submenu;
      let parent = e.target.dataset.item;

      if (hasSubmenu) {
        this.selectedParentMenu = parent;

        this.changeSecondarySidebarPropertiesViaMenuItem(true);
      } else {
        this.selectedParentMenu = parent;
        this.changeSecondarySidebarPropertiesViaMenuItem(false);
      }
    },

    removeOverlay() {
      this.changeSecondarySidebarPropertiesViaOverlay();
      if (window.innerWidth <= 1200) {
        this.changeSidebarProperties();
      }
      this.toggleSelectedParentMenu();
    },
    returnSelectedParentMenu() {
      if (!this.isMenuOver) {
        this.toggleSelectedParentMenu();
      }
    },

    toggleSidebarDropdwon(event) {
      let dropdownMenus = this.$el.querySelectorAll(".dropdown-sidemenu.open");

      event.currentTarget.classList.toggle("open");

      dropdownMenus.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
  }
};
</script>

<style lang="" scoped>
</style>

