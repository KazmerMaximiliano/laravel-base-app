<?php

namespace App\Http\Controllers\WEB;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    /**
     * Change the application language.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function change(Request $request)
    {
        $locale = $request->input('locale');
        $supportedLocales = ['en', 'es'];

        if (!$locale || !in_array($locale, $supportedLocales)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Invalid locale provided.',
                    'supported_locales' => $supportedLocales,
                ], 400);
            }

            return back()->withErrors(['locale' => 'Invalid language selected.']);
        }

        App::setLocale($locale);

        Session::put('locale', $locale);

        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Language changed successfully.',
                'locale' => $locale,
            ]);
        }

        return back()->with('success', 'Language changed successfully.');
    }

    /**
     * Get the current locale.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function current(): JsonResponse
    {
        return response()->json([
            'current_locale' => App::getLocale(),
            'supported_locales' => ['en', 'es'],
        ]);
    }
}
