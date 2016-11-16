<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ elixir('css/app.css') }}" rel="stylesheet" type="text/css">
        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>
        <title>app</title>
    </head>
    <body>
        <div id="app">
        </div>
        <script type="text/javascript" src="https://unpkg.com/vue-router"></script>
        <script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
    </body>
</html>
