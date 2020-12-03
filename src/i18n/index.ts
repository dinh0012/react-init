import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import { getLang } from 'common/utils/lang';
import { initReactI18next } from 'react-i18next';
const lang = getLang();

export const initialLocalize = () =>
  i18next
    .use(HttpApi)
    .use(initReactI18next)
    .init(
      {
        lng: lang,
        fallbackLng: lang,
        preload: [lang],
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      },
      err => {
        if (err) console.error(err);
      },
    );
export default i18next;
