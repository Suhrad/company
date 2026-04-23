<?php
$file = 'resources/src/views/app/pages/people/customers.vue';
$content = file_get_contents($file);

// 1. Add fields to template
$searchTemplate = '             <b-col md="6" sm="12" class="mt-4 mb-4">
              <label class="checkbox checkbox-primary mb-3"><input type="checkbox" v-model="client.is_royalty_eligible"><h5>{{ $t(\'Is_Royalty_Eligible\') }} </h5><span class="checkmark"></span></label>
            </b-col>';

$replaceTemplate = $searchTemplate . '

            <!-- Opening Balance -->
            <b-col md="6" sm="12">
                <b-form-group label="Opening Balance">
                  <b-form-input
                    v-model.number="client.opening_balance"
                    type="number"
                    placeholder="0.00"
                  ></b-form-input>
                </b-form-group>
            </b-col>

            <!-- Opening Balance Type -->
            <b-col md="6" sm="12">
                <b-form-group label="Balance Type">
                  <b-form-select
                    v-model="client.opening_balance_type"
                    :options="[{value:\'Dr\', text:\'Debit (Receivable)\'}, {value:\'Cr\', text:\'Credit (Payable)\'}]"
                  ></b-form-select>
                </b-form-group>
            </b-col>';

$content = str_replace($searchTemplate, $replaceTemplate, $content);

// 2. Add to API calls (Create_Client and Update_Client)
$searchApi = '          is_royalty_eligible: this.client.is_royalty_eligible
        })';
$replaceApi = '          is_royalty_eligible: this.client.is_royalty_eligible,
          opening_balance: this.client.opening_balance,
          opening_balance_type: this.client.opening_balance_type
        })';

$content = str_replace($searchApi, $replaceApi, $content);

file_put_contents($file, $content);
echo "customers.vue updated.\n";
