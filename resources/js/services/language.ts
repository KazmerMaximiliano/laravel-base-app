import { router } from '@inertiajs/react';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { i18n } from 'i18next';

declare global {
  interface Window {
    axios?: AxiosInstance;
    csrfToken?: string;
  }
}

export interface LanguageHelper {
  changeLanguage: (locale: string) => Promise<void>;
  getCurrentLanguage: () => Promise<string>;
  syncWithReactI18n: (i18n: i18n) => void;
}

class LanguageService implements LanguageHelper {
  private supportedLocales = ['en', 'es'];
  private isInternalSync = false;

  async changeLanguage(locale: string): Promise<void> {
    if (!this.supportedLocales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    try {
      await this.changeLaravelLanguage(locale);

      this.saveLanguageInBrowser(locale);

      router.reload();
    } catch (error) {
      console.error('Error changing language:', error);
      throw error;
    }
  }

  syncWithReactI18n(i18n: i18n): void {
    this.getCurrentLanguage().then(locale => {
      if (i18n.language !== locale) {
        this.isInternalSync = true;
        i18n.changeLanguage(locale);
      }
    });

    i18n.on('languageChanged', (lng: string) => {
      if (!this.isInternalSync) {
        this.saveLanguageInBrowser(lng);
        this.setAxiosLocaleHeader(lng);
      } else {
        this.isInternalSync = false;
      }
    });
  }

  async getCurrentLanguage(): Promise<string> {
    try {
      const axiosInstance = this.getAxiosInstance();
      const response = await axiosInstance.get('/language/current', {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      return response.data.current_locale;
    } catch (error) {
      console.error('Error getting current language:', error);
      return 'en';
    }
  }

  private async changeLaravelLanguage(locale: string): Promise<void> {
    const axiosInstance = this.getAxiosInstance();
    const csrfToken = this.getCsrfToken();

    await axiosInstance.post('/language/change',
      { locale },
      {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken,
        },
      }
    ).catch((error) => {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to change language';
      throw new Error(errorMessage);
    }).finally(() => {
      this.setAxiosLocaleHeader(locale);
    });
  }

  private saveLanguageInBrowser(locale: string): void {
    document.cookie = `i18next=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    localStorage.setItem('i18nextLng', locale);
  }

  private setAxiosLocaleHeader(locale: string): void {
    const axiosInstance = this.getAxiosInstance();
    axiosInstance.defaults.headers.common['X-Locale'] = locale;
  }

  private getAxiosInstance(): AxiosInstance {
    return window.axios || axios;
  }

  private getCsrfToken(): string {
    let token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (!token) {
      token = window.csrfToken;
    }

    if (!token) {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }

    if (!token) {
      throw new Error('CSRF token not found in meta tag, window, or cookie');
    }

    return token;
  }

  detectAndSetBrowserLanguage(): string {
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = this.supportedLocales.includes(browserLang) ? browserLang : 'en';

    const currentCookie = this.getLocaleCookie();

    if (!currentCookie) {
      this.saveLanguageInBrowser(supportedLang);
      return supportedLang;
    }

    return currentCookie;
  }

  private getLocaleCookie(): string | null {
    const cookieMatch = document.cookie.match(/i18next=([^;]+)/);
    if (cookieMatch) {
      return cookieMatch[1];
    }

    const localStorageValue = localStorage.getItem('i18nextLng');
    if (localStorageValue) {
      return localStorageValue;
    }

    return null;
  }
}

export const languageService = new LanguageService();
