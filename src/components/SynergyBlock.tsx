import Link from 'next/link';
import Image from 'next/image';
import { Synergy, Hero } from '@/types/heroes';
import '../styles/SynergyBlock.css';

interface SynergyBlockProps {
  synergies: Synergy[];
  heroes: Hero[];
}

export default function SynergyBlock({ synergies, heroes }: SynergyBlockProps) {
  // Получить информацию о герое
  const getHero = (heroId: string): Hero | undefined => {
    return heroes.find(h => h.id === heroId);
  };

  // Рендер шкалы эффективности
  const renderEffectiveness = (effectiveness: number) => {
    return (
      <div className="synergyEffectiveness" aria-label={`Эффективность: ${effectiveness} из 5`}>
        {[1, 2, 3, 4, 5].map(star => (
          <div 
            key={star}
            className={`synergyStar ${star <= effectiveness ? 'synergyStar--filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  if (!synergies || synergies.length === 0) {
    return null;
  }

  // Сортировать по эффективности
  const sortedSynergies = [...synergies].sort((a, b) => b.effectiveness - a.effectiveness);

  return (
    <div className="synergyBlock">
      <div className="synergyHeader">
        <span className="synergyIcon">🔥</span>
        <h3 className="synergyTitle">Имба-связки</h3>
      </div>

      <div className="synergyList">
        {sortedSynergies.map(synergy => {
          const partner = getHero(synergy.partnerId);
          if (!partner) return null;

          return (
            <Link 
              key={synergy.partnerId}
              href={`/hero/${partner.id}`}
              className="synergyItem"
              aria-label={`Синергия с ${partner.nameRu}`}
            >
              <div className="synergyPartnerAvatar">
                <Image
                  src={partner.portrait}
                  alt={partner.nameRu}
                  width={56}
                  height={56}
                  className="synergyPartnerAvatarImg"
                  loading="lazy"
                  unoptimized
                />
              </div>

              <div className="synergyInfo">
                <div className="synergyName">{synergy.name}</div>
                <div className="synergyPartnerName">+ {partner.nameRu}</div>
                <div className="synergyReason">{synergy.reason}</div>
              </div>

              <div className="synergyMeta">
                {renderEffectiveness(synergy.effectiveness)}
                <span className="synergySource">{synergy.source}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
