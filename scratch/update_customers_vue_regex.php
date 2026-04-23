<?php
$file = 'resources/src/views/app/pages/people/customers.vue';
$content = file_get_contents($file);

// 1. Add fields to template
$patternTemplate = '/<b-col md="6" sm="12" class="mt-4 mb-4">\s*<label class="checkbox checkbox-primary mb-3"><input type="checkbox" v-model="client.is_royalty_eligible"><h5>{{ \$t\(\'Is_Royalty_Eligible\'\) }} <\/h5><span class="checkmark"><\/span><\/label>\s*<\/b-col>/';

$replacementTemplate = '$0

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

$content = preg_replace($patternTemplate, $replacementTemplate, $content);

// 2. Add to API calls
$patternApi = '/is_royalty_eligible: this.client.is_royalty_eligible\s*}\)/';
$replacementApi = 'is_royalty_eligible: this.client.is_royalty_eligible,
          opening_balance: this.client.opening_balance,
          opening_balance_type: this.client.opening_balance_type
        })';

$content = preg_replace($patternApi, $replacementApi, $content);

file_put_contents($file, $content);
echo "customers.vue updated with regex.\n";
