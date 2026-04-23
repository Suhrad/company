<?php
$file = 'resources/src/views/app/pages/people/customers.vue';
$content = file_get_contents($file);

// Update data object
$searchData = 'is_royalty_eligible: "",

      },';
$replaceData = 'is_royalty_eligible: "",
        opening_balance: 0,
        opening_balance_type: "Dr",
      },';
$content = str_replace($searchData, $replaceData, $content);

// Update reset_Form
$searchReset = 'is_royalty_eligible: "",
      };';
$replaceReset = 'is_royalty_eligible: "",
        opening_balance: 0,
        opening_balance_type: "Dr",
      };';
$content = str_replace($searchReset, $replaceReset, $content);

file_put_contents($file, $content);
echo "customers.vue data/reset updated.\n";
