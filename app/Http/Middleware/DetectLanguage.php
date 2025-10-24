<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class DetectLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        Log::info('DetectLanguage middleware: Processing request', [
            'url' => $request->url(),
            'headers' => $request->headers->all()
        ]);

        $locale = $this->detectLocale($request);

        Log::info('DetectLanguage middleware: Detected locale', ['locale' => $locale]);

        if ($locale) {
            App::setLocale($locale);
            Session::put('locale', $locale);
            Log::info('DetectLanguage middleware: Set locale', ['locale' => $locale]);
        }

        return $next($request);
    }

    /**
     * Detect the appropriate locale for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    private function detectLocale(Request $request): ?string
    {
        $supportedLocales = ['en', 'es'];

        $reactLocale = $this->getReactI18nLocale($request);
        if ($reactLocale && in_array($reactLocale, $supportedLocales)) {
            return $reactLocale;
        }

        $requestLocale = $request->input('locale') ?? $request->route('locale');
        if ($requestLocale && in_array($requestLocale, $supportedLocales)) {
            return $requestLocale;
        }

        $sessionLocale = Session::get('locale');
        if ($sessionLocale && in_array($sessionLocale, $supportedLocales)) {
            return $sessionLocale;
        }

        $browserLocale = $this->getBrowserLocale($request, $supportedLocales);
        if ($browserLocale) {
            return $browserLocale;
        }

        return config('app.locale');
    }

    /**
     * Get locale from React i18n.
     * This can come from various sources like headers, cookies, etc.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    private function getReactI18nLocale(Request $request): ?string
    {
        if ($request->hasHeader('X-Locale')) {
            return $request->header('X-Locale');
        }

        if ($request->hasCookie('i18next')) {
            return $request->cookie('i18next');
        }

        if ($request->hasHeader('X-Inertia')) {
            $inertiaProps = $request->header('X-Inertia-Partial-Data');
            if ($inertiaProps && str_contains($inertiaProps, 'locale')) {
                // This would need to be parsed if locale is in Inertia props
            }
        }

        return null;
    }

    /**
     * Get the best matching locale from browser Accept-Language header.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $supportedLocales
     * @return string|null
     */
    private function getBrowserLocale(Request $request, array $supportedLocales): ?string
    {
        $acceptLanguage = $request->header('Accept-Language');

        if (!$acceptLanguage) {
            return null;
        }

        $languages = [];
        preg_match_all('/([a-z]{1,8}(?:-[a-z]{1,8})?)\s*(?:;\s*q\s*=\s*(1(?:\.0{1,3})?|0(?:\.[0-9]{1,3})?)?)?/i', $acceptLanguage, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $language = strtolower($match[1]);
            $quality = isset($match[2]) ? (float) $match[2] : 1.0;

            $mainLang = substr($language, 0, 2);

            $languages[] = [
                'language' => $language,
                'main_lang' => $mainLang,
                'quality' => $quality,
            ];
        }

        usort($languages, function ($a, $b) {
            return $b['quality'] <=> $a['quality'];
        });

        foreach ($languages as $lang) {
            if (in_array($lang['language'], $supportedLocales)) {
                return $lang['language'];
            }

            if (in_array($lang['main_lang'], $supportedLocales)) {
                return $lang['main_lang'];
            }
        }

        return null;
    }
}
