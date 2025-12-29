<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject(__('auth.verify_email_subject'))
                ->greeting(__('auth.verify_email_greeting'))
                ->line(__('auth.verify_email_line'))
                ->action(__('auth.verify_email_action'), $url)
                ->salutation(__('auth.verify_email_salutation'));
        });
    }
}
