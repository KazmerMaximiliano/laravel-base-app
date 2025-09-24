<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel Base App</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div id="wrapper">
            <section id="intro" class="wrapper section fullscreen fade-up">
                <div class="inner">
                    <h1>Laravel Base App</h1>
                    <p>A simple and clean Laravel backend API implementation with authentication functionality using Laravel Sanctum.</p>
                    <ul class="actions">
                        <li>
                            <a href="/docs" class="button scrolly">API Documentation</a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </body>
</html>
