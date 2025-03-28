import { en } from './locales/en';
import { zh } from './locales/zh';

let currentLanguage = 'auto';

export const locales = {
  en,
  zh
};

/**
 * 更改当前语言
 * @param lang 语言代码（'en', 'zh', 'auto'）
 */
export function changeLanguage(lang: string): void {
  currentLanguage = lang;
}

/**
 * 获取当前语言
 * @returns 当前语言代码
 */
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * 设置当前语言（为了向后兼容性，作为changeLanguage的别名）
 * @param lang 语言代码（'en', 'zh', 'auto'）
 */
export function setLocale(lang: string): void {
  changeLanguage(lang);
}

/**
 * 获取浏览器首选语言
 * @returns 浏览器首选语言代码
 */
export function getBrowserLanguage(): string {
  const lang = window.navigator.language;
  if (lang.startsWith('zh')) {
    return 'zh';
  }
  return 'en';
}

/**
 * 获取实际使用的语言
 * @returns 实际使用的语言代码
 */
export function getEffectiveLanguage(): string {
  if (currentLanguage === 'auto') {
    return getBrowserLanguage();
  }
  return currentLanguage;
}

/**
 * 翻译函数，支持参数化翻译
 * @param key 翻译键
 * @param params 替换参数
 * @returns 翻译后的文本
 */
export function t(key: string, ...params: any[]): string {
  const lang = getEffectiveLanguage();
  const locale = locales[lang as keyof typeof locales] || locales.en;

  // 使用点表示法解析嵌套键
  const keys = key.split('.');
  let value: any = locale;

  // 遍历键层次结构
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // 如果找不到键，回退到英文
      let fallbackValue = locales.en;
      for (const k2 of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && k2 in fallbackValue) {
          fallbackValue = fallbackValue[k2];
        } else {
          return key; // 如果英文也没有这个键，直接返回键名
        }
      }
      value = fallbackValue;
      break;
    }
  }

  // 如果最终值不是字符串，返回键名
  if (typeof value !== 'string') {
    return key;
  }

  // 如果有参数，替换参数
  if (params && params.length > 0) {
    return value.replace(/\{(\d+)\}/g, (match, index) => {
      return params[parseInt(index)] !== undefined ? params[parseInt(index)] : match;
    });
  }

  return value;
}

/**
 * 获取可用语言列表
 * @returns 可用语言列表，包含值和显示标签
 */
export function getAvailableLanguages(): { value: string, label: string }[] {
  return [
    { value: 'auto', label: t('settings.auto') },
    { value: 'en', label: t('settings.english') },
    { value: 'zh', label: t('settings.chinese') }
  ];
} 