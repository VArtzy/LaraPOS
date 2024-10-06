@component('mail::message')
{{ __('Selamat! Anda telah diundang untuk bergabung dengan tim :team!', ['team' => $invitation->team->name]) }}

@if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::registration()))
{{ __('Jika Anda belum memiliki akun, Anda dapat membuatnya dengan klik tombol di bawah ini. Setelah membuat akun, Anda dapat mengklik tombol penerimaan undangan di email ini untuk menerima undangan bergabung ke tim:') }}

@component('mail::button', ['url' => route('register')])
{{ __('Buat Akun') }}
@endcomponent

{{ __('Jika Anda sudah memiliki akun, Anda dapat menerima undangan ini dengan mengklik tombol di bawah ini:') }}

@else
{{ __('Anda dapat menerima undangan ini dengan mengklik tombol di bawah ini:') }}
@endif

@component('mail::button', ['url' => $acceptUrl])
{{ __('Terima Undangan') }}
@endcomponent

{{ __('Catatan: Jika Anda menggunakan akun Google, pastikan Anda sudah masuk sebelum menerima undangan. Jika Anda tidak melihat pesan masuk, silakan mencoba menerima undangan lagi setelah masuk ke akun lewat Google Anda.') }}

{{ __('Jika Anda tidak mengharapkan menerima undangan ke tim ini, Anda dapat mengabaikan email ini.') }}
@endcomponent