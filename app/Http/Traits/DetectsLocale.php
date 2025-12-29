<?php

namespace App\Http\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

trait DetectsLocale
{
    /**
     * Set locale based on request data (cookies, headers, etc.)
     */
    protected function setLocaleFromRequest(): void
    {
        $supportedLocales = ['en', 'es'];
        $locale = null;

        if ($this->hasCookie('i18next')) {
            $locale = $this->cookie('i18next');
        }

        if (!$locale && $this->hasHeader('X-Locale')) {
            $locale = $this->header('X-Locale');
        }

        if (!$locale) {
            $locale = session('locale');
        }

        if (!$locale && $this->hasHeader('Accept-Language')) {
            $acceptLanguage = $this->header('Accept-Language');
            $browserLang = substr($acceptLanguage, 0, 2);
            $locale = in_array($browserLang, $supportedLocales) ? $browserLang : 'en';
        }

        if ($locale && in_array($locale, $supportedLocales)) {
            App::setLocale($locale);
            session(['locale' => $locale]);
        }
    }

    /**
     * Get supported locales
     */
    protected function getSupportedLocales(): array
    {
        return ['en', 'es'];
    }
}
