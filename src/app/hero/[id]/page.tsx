import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CounterList from '@/components/CounterList';
import SynergyBlock from '@/components/SynergyBlock';
import heroesData from '@/data/heroes.json';
import countersData from '@/data/counters.json';
import metaData from '@/data/meta.json';
import synergiesData from '@/data/synergies.json';
import { Hero, HeroRole, ROLE_LABELS, SUBROLE_LABELS, HeroCounters, HeroSynergies } from '@/types/heroes';
import { HeroMeta, Tier, TierInfo } from '@/types/meta';
import styles from './page.module.css';

// Типизация данных
const heroes = heroesData as Hero[];
const counters = countersData as HeroCounters[];
const synergies = synergiesData as HeroSynergies;
const meta = metaData as {
  season: number;
  seasonName: string;
  patch: string;
  lastUpdated: string;
  tiers: Record<Tier, TierInfo>;
  heroes: HeroMeta[];
};

// Новые герои Season 1
const NEW_HEROES = ['domina', 'anran', 'emre', 'jetpackcat', 'mizuki'];

// Иконки ролей
const ROLE_ICONS: Record<HeroRole, string> = {
  Tank: '🛡️',
  Damage: '⚔️',
  Support: '💚',
};

// Генерация метаданных
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const hero = heroes.find(h => h.id === id);
  
  if (!hero) {
    return { title: 'Герой не найден' };
  }
  
  return {
    title: `${hero.nameRu} - Контрпики`,
    description: `Узнай, кто контрит ${hero.nameRu} в Overwatch. Лучшие контрпики с объяснениями. Season 1.`,
  };
}

// Генерация статических путей
export async function generateStaticParams() {
  return heroes.map((hero) => ({
    id: hero.id,
  }));
}

// Страница героя
export default async function HeroDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  // Найти героя
  const hero = heroes.find(h => h.id === id);
  if (!hero) {
    notFound();
  }
  
  // Найти контрпики для этого героя
  const heroCounters = counters.find(c => c.heroId === id);
  
  // Найти мета-информацию
  const heroMeta = meta.heroes.find(m => m.heroId === id);
  
  // Найти синергии
  const heroSynergies = synergies[id] || [];
  
  const isNew = NEW_HEROES.includes(hero.id);
  
  return (
    <div className={styles.heroDetailPage}>
      <div className={styles.heroDetailContainer}>
        {/* Кнопка назад */}
        <Link href="/" className={styles.heroDetailBack} aria-label="Вернуться на главную">
          ← На главную
        </Link>
        
        {/* Шапка героя */}
        <header className={styles.heroDetailHeader}>
          <div className={`${styles.heroDetailAvatar} ${styles[`heroDetailAvatar--${hero.role}`]}`}>
            <Image
              src={hero.portrait}
              alt={hero.nameRu}
              width={120}
              height={120}
              className={styles.heroDetailAvatarImg}
              priority
              unoptimized
            />
          </div>
          
          <div className={styles.heroDetailInfo}>
            <h1 className={styles.heroDetailName}>
              {hero.nameRu}
              <span className={styles.heroDetailNameEn}>{hero.name}</span>
              {isNew && <span className="new-badge">NEW</span>}
            </h1>
            
            <div className={styles.heroDetailMeta}>
              <span className={`${styles.heroDetailBadge} ${styles['heroDetailBadge--role']} ${styles[`heroDetailBadge--${hero.role}`]}`}>
                {ROLE_ICONS[hero.role]} {ROLE_LABELS[hero.role]}
              </span>
              
              {/* Подроль */}
              {hero.subrole && (
                <span 
                  className={`${styles.heroDetailBadgeSubrole} ${styles[`heroDetailBadgeSubrole--${hero.subrole}`] || ''}`}
                >
                  {SUBROLE_LABELS[hero.subrole] || hero.subrole}
                </span>
              )}
              
              {heroMeta && (
                <span className={`${styles.heroDetailBadge} ${styles['heroDetailBadge--tier']} ${styles[`heroDetailBadge--tier-${heroMeta.tier}`]}`}>
                  {heroMeta.tier}-Tier
                </span>
              )}
            </div>
            
            {/* Статистика */}
            {heroMeta && (
              <div className={styles.heroDetailStats}>
                <div className={styles.heroDetailStat}>
                  <div className={styles.heroDetailStatValue}>{heroMeta.pickRate}%</div>
                  <div className={styles.heroDetailStatLabel}>Pick Rate</div>
                </div>
                <div className={styles.heroDetailStat}>
                  <div className={styles.heroDetailStatValue}>{heroMeta.winRate}%</div>
                  <div className={styles.heroDetailStatLabel}>Win Rate</div>
                </div>
              </div>
            )}
            
            {/* Why Meta */}
            {heroMeta && (
              <div className={styles.heroDetailWhyMeta}>
                <div className={styles.heroDetailWhyMetaLabel}>Почему в мете</div>
                <div className={styles.heroDetailWhyMetaText}>{heroMeta.whyMeta}</div>
              </div>
            )}

            {/* Имба-связки */}
            {heroSynergies.length > 0 && (
              <SynergyBlock synergies={heroSynergies} heroes={heroes} />
            )}
          </div>
        </header>
        
        {/* Контрпики */}
        <section className={styles.heroDetailSection} aria-labelledby="counters-heading">
          <h2 id="counters-heading" className={styles.heroDetailSectionTitle}>
            Кто контрит {hero.nameRu}
          </h2>
          <p className={styles.heroDetailSectionDesc}>
            Выбери одного из этих героев, чтобы получить преимущество против {hero.nameRu}
          </p>
          
          {heroCounters && heroCounters.counters.length > 0 ? (
            <CounterList 
              counters={heroCounters.counters}
              heroes={heroes}
              title=""
            />
          ) : (
            <p className={styles.noCountersText}>
              Контрпики для этого героя пока не добавлены
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
