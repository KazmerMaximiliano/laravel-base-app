import { languageService } from '@/services/language';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageSync = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const detectedLanguage = languageService.detectAndSetBrowserLanguage();
        const laravelLanguage = await languageService.getCurrentLanguage();

        if (laravelLanguage !== detectedLanguage) {
          await languageService.changeLanguage(detectedLanguage);
          return;
        }

        languageService.syncWithReactI18n(i18n);

      } catch (error) {
        console.error('useLanguageSync: Error during language initialization:', error);
      }
    };

    initializeLanguage();
  }, []);

  return {
    isReady: i18n.isInitialized,
    currentLanguage: i18n.language,
  };
};
