import Link from 'next/link';
import { notFound } from 'next/navigation';
import CounterList from '@/components/CounterList';
import heroesData from '@/data/heroes.json';
import countersData from '@/data/counters.json';
import metaData from '@/data/meta.json';
import { Hero, HeroRole, ROLE_LABELS, HeroCounters } from '@/types/heroes';
import { HeroMeta, Tier, TierInfo } from '@/types/meta';
import styles from './page.module.css';

// Типизация данных
const heroes = heroesData as Hero[];
const counters = countersData as HeroCounters[];
const meta = metaData as {
  season: number;
  patch: string;
  lastUpdated: string;
  tiers: Record<Tier, TierInfo>;
  heroes: HeroMeta[];
};

// Иконки ролей
const ROLE_ICONS: Record<HeroRole, string> = {
  Tank: '🛡️',
  Damage: '⚔️',
  Support: '💚',
};

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
  
  return (
    <div className={styles.heroDetailPage}>
      <div className={styles.heroDetailContainer}>
        {/* Кнопка назад */}
        <Link href="/heroes" className={styles.heroDetailBack}>
          ← Все герои
        </Link>
        
        {/* Шапка героя */}
        <header className={styles.heroDetailHeader}>
          <div className={`${styles.heroDetailAvatar} ${styles[`heroDetailAvatar--${hero.role}`]}`}>
            {ROLE_ICONS[hero.role]}
          </div>
          
          <div className={styles.heroDetailInfo}>
            <h1 className={styles.heroDetailName}>
              {hero.nameRu}
              <span className={styles.heroDetailNameEn}>{hero.name}</span>
            </h1>
            
            <div className={styles.heroDetailMeta}>
              <span className={`${styles.heroDetailBadge} ${styles['heroDetailBadge--role']} ${styles[`heroDetailBadge--${hero.role}`]}`}>
                {ROLE_ICONS[hero.role]} {ROLE_LABELS[hero.role]}
              </span>
              
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
          </div>
        </header>
        
        {/* Контрпики */}
        <section className={styles.heroDetailSection}>
          <h2 className={styles.heroDetailSectionTitle}>
            Контрпики для {hero.nameRu}
          </h2>
          
          {heroCounters && heroCounters.counters.length > 0 ? (
            <CounterList 
              counters={heroCounters.counters}
              heroes={heroes}
              title=""
            />
          ) : (
            <p style={{ color: 'var(--color-text-muted)' }}>
              Контрпики для этого героя пока не добавлены
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
