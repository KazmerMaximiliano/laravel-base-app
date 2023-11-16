<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel Base App</title>

        <style>
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #ecf1fd;
            }

            .card {
                width: 400px;
                height: 400px;
                background-color: #fff;
                border-radius: 32px;
                box-shadow: 8px 8px 52px 21px rgba(115, 116, 160, .25);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            .title {
                font-size: 32px;
                font-weight: 700;
                color: #3f3d56;
                font-family: 'Arial'
            }
        </style>
    </head>
    <body class="container">
        <div class="card">
            <h1 class="title">Laravel Base App</h1>
        </div>
    </body>
</html>
