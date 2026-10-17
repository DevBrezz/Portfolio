import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';

const labels = { en: 'Donate', id: 'Donasi', zh: '捐赠', nl: 'Doneren' } as const;
export function FloatingDonate() {
  const { language } = useLanguage();
  return <Link className="kb-floating-donate" to="/donate" aria-label={labels[language]} title={labels[language]}><Heart size={17}/><span>{labels[language]}</span></Link>;
}
