'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CounterInfo, Hero, HeroRole, ROLE_LABELS } from '@/types/heroes';
import '../styles/CounterList.css';

interface CounterListProps {
  counters: CounterInfo[];
  heroes: Hero[];
  title?: string;
}

type SortOrder = 'effectiveness' | 'name';

export default function CounterList({ counters, heroes, title = 'Контрпики' }: CounterListProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('effectiveness');

  // Получить информацию о герое
  const getHero = (heroId: string): Hero | undefined => {
    return heroes.find(h => h.id === heroId);
  };

  // Сортировка контрпиков
  const sortedCounters = useMemo(() => {
    const sorted = [...counters];
    
    if (sortOrder === 'effectiveness') {
      sorted.sort((a, b) => b.effectiveness - a.effectiveness);
    } else {
      sorted.sort((a, b) => {
        const heroA = getHero(a.heroId);
        const heroB = getHero(b.heroId);
        return (heroA?.nameRu || '').localeCompare(heroB?.nameRu || '', 'ru');
      });
    }
    
    return sorted;
  }, [counters, sortOrder]);

  // Рендер шкалы эффективности
  const renderEffectiveness = (effectiveness: number) => {
    return (
      <div className="counterItemEffectiveness" aria-label={`Эффективность: ${effectiveness} из 5`}>
        {[1, 2, 3, 4, 5].map(star => (
          <div 
            key={star}
            className={`counterItemStar counterItemStar--${effectiveness} ${star <= effectiveness ? 'counterItemStar--filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  if (counters.length === 0) {
    return (
      <div className="counterListEmpty">
        Контрпики не найдены
      </div>
    );
  }

  return (
    <div className="counterList">
      {/* Заголовок и сортировка */}
      {title && (
        <div className="counterListHeader">
          <h3 className="counterListTitle">{title}</h3>
          <div className="counterListSort" role="group" aria-label="Сортировка">
            <button
              className={`counterListSortBtn ${sortOrder === 'effectiveness' ? 'counterListSortBtn--active' : ''}`}
              onClick={() => setSortOrder('effectiveness')}
              aria-pressed={sortOrder === 'effectiveness'}
            >
              По силе
            </button>
            <button
              className={`counterListSortBtn ${sortOrder === 'name' ? 'counterListSortBtn--active' : ''}`}
              onClick={() => setSortOrder('name')}
              aria-pressed={sortOrder === 'name'}
            >
              По имени
            </button>
          </div>
        </div>
      )}

      {/* Список контрпиков */}
      {sortedCounters.map((counter, idx) => {
        const hero = getHero(counter.heroId);
        if (!hero) return null;
        
        return (
          <Link 
            key={counter.heroId} 
            href={`/hero/${hero.id}`}
            className="counterItem"
            aria-label={`${hero.nameRu} - эффективность ${counter.effectiveness} из 5`}
          >
            <div className={`counterItemRank counterItemRank--${counter.effectiveness}`}>
              #{idx + 1}
            </div>
            
            <div className={`counterItemAvatar counterItemAvatar--${hero.role}`}>
              <Image
                src={hero.portrait}
                alt={hero.nameRu}
                width={48}
                height={48}
                className="counterItemAvatarImg"
                loading="lazy"
                unoptimized
              />
            </div>
            
            <div className="counterItemInfo">
              <div className="counterItemName">{hero.nameRu}</div>
              <div className="counterItemRole">{ROLE_LABELS[hero.role]}</div>
            </div>
            
            <div className="counterItemReason">
              {counter.reason}
            </div>
            
            {renderEffectiveness(counter.effectiveness)}
          </Link>
        );
      })}
    </div>
  );
}
