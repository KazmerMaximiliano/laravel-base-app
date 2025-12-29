@component('mail::message')
# {{ __('auth.verify_email_subject') }}

{{ __('auth.verify_email_line') }}

@component('mail::button', ['url' => $url])
{{ __('auth.verify_email_action') }}
@endcomponent

{{ __('auth.verify_email_footer') }}

{{ config('app.name') }}
@endcomponent
