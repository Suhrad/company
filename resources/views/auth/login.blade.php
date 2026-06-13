<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="/css/master.css">
    
    <link rel="icon" href="{{ asset('images/' . ($app_settings->favicon ?? 'favicon.ico')) }}">
    <title>{{ $app_settings->app_name ?? 'Stocky | Ultimate Inventory With POS' }}</title>

    <script>
      window.addEventListener('error', function(event) {
        var loader = document.getElementById('loading_wrap');
        if (loader) {
          loader.style.display = 'block';
          var spinner = loader.querySelector('.loading');
          if (spinner) spinner.style.animation = 'none';
          var errorBox = document.getElementById('runtime-error-box');
          if (!errorBox) {
            errorBox = document.createElement('div');
            errorBox.id = 'runtime-error-box';
            errorBox.style.position = 'absolute';
            errorBox.style.top = '60%';
            errorBox.style.left = '10%';
            errorBox.style.right = '10%';
            errorBox.style.background = '#ffebee';
            errorBox.style.color = '#c62828';
            errorBox.style.padding = '15px';
            errorBox.style.borderRadius = '5px';
            errorBox.style.fontFamily = 'monospace';
            errorBox.style.fontSize = '14px';
            errorBox.style.border = '1px solid #ef9a9a';
            errorBox.style.zIndex = '999999';
            errorBox.style.whiteSpace = 'pre-wrap';
            errorBox.style.maxHeight = '30%';
            errorBox.style.overflowY = 'auto';
            loader.appendChild(errorBox);
          }
          errorBox.textContent = '❌ Runtime Error:\n' + event.message + '\nat ' + event.filename + ':' + event.lineno + ':' + event.colno + '\n\nStack:\n' + (event.error ? event.error.stack : 'No stack trace');
        }
      });
      window.addEventListener('unhandledrejection', function(event) {
        var loader = document.getElementById('loading_wrap');
        if (loader) {
          loader.style.display = 'block';
          var spinner = loader.querySelector('.loading');
          if (spinner) spinner.style.animation = 'none';
          var errorBox = document.getElementById('runtime-error-box');
          if (!errorBox) {
            errorBox = document.createElement('div');
            errorBox.id = 'runtime-error-box';
            errorBox.style.position = 'absolute';
            errorBox.style.top = '60%';
            errorBox.style.left = '10%';
            errorBox.style.right = '10%';
            errorBox.style.background = '#ffebee';
            errorBox.style.color = '#c62828';
            errorBox.style.padding = '15px';
            errorBox.style.borderRadius = '5px';
            errorBox.style.fontFamily = 'monospace';
            errorBox.style.fontSize = '14px';
            errorBox.style.border = '1px solid #ef9a9a';
            errorBox.style.zIndex = '999999';
            errorBox.style.whiteSpace = 'pre-wrap';
            errorBox.style.maxHeight = '30%';
            errorBox.style.overflowY = 'auto';
            loader.appendChild(errorBox);
          }
          errorBox.textContent = '❌ Unhandled Promise Rejection:\n' + (event.reason ? (event.reason.message || event.reason) : 'Unknown reason') + '\n\nStack:\n' + (event.reason && event.reason.stack ? event.reason.stack : 'No stack trace');
        }
      });
    </script>
  </head>

  <body class="text-left">
    <noscript>
      <strong>
        We're sorry but Stocky doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>

    <!-- built files will be auto injected -->
    <div class="loading_wrap" id="loading_wrap">
      <div class="loader_logo">
      <img src="{{ asset('images/' . ($app_settings->logo ?? 'logo.png')) }}" class="" alt="logo" />

      </div>

      <div class="loading"></div>
    </div>
    <div id="login">
        <login-component></login-component>
      </div>

      <script src="/js/login.min.js?v=5.1"></script>
  </body>
</html>

    