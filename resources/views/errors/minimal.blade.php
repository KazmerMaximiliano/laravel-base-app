<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title')</title>
        @vite(['resources/js/app.tsx', 'resources/css/app.css'])

        <style>
          .error {
            background: var(--color-primary);
            color: var(--color-white-300);
            min-height: 100vh;
            line-height: 1.75;
          }

          .error h1 {
            color: var(--color-white);
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }

          .error p {
            margin-bottom: 2em;
            font-size: 1.2em;
          }

          .error .wrapper {
            position: relative;
            background-attachment: fixed;
            background-image: url("../images/intro.svg");
            background-position: top right;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .error .wrapper.section {
            background-color: var(--color-primary-light);
          }

          .error .wrapper.fullscreen {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 100vh;
          }

          .error .wrapper > .inner {
            padding: 5em;
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
          }

          .error ul.actions {
            display: flex;
            list-style: none;
            justify-content: center;
            gap: 1em;
          }

          @media (max-width: 768px) {
            .error {
              font-size: 14px;
            }

            .error h1 {
              font-size: 2em;
            }

            .error p {
              font-size: 1em;
            }

            .error .wrapper > .inner {
              padding: 3em 2em;
            }

            .error ul.actions {
              flex-direction: column;
              align-items: center;
            }

            .error .button {
              width: 100%;
              max-width: 300px;
            }
          }

        </style>

    </head>
    <body>
        <div class="error">
          <section id="intro" class="wrapper section fullscreen fade-up">
            <div class="inner">
              <h1>@yield('code') | @yield('title')</h1>
              <p>
                @yield('message')
              </p>
              <ul class="actions">
                <li>
                  <Link type="secondary" href="/dashboard" label="Dashboard" />
                </li>
                <li>
                  <Link type="secondary" href="/docs" label="API Documentation" />
                </li>
              </ul>
            </div>
          </section>
        </div>
    </body>
</html>
