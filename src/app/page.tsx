import Link from 'next/link';
import Image from 'next/image';
import HeroGrid from '@/components/HeroGrid';
import heroesData from '@/data/heroes.json';
import metaData from '@/data/meta.json';
import { Hero } from '@/types/heroes';
import { HeroMeta, Tier, TierInfo } from '@/types/meta';
import styles from './page.module.css';

// Типизация данных
const heroes = heroesData as Hero[];
const meta = metaData as {
  season: number;
  patch: string;
  lastUpdated: string;
  tiers: Record<Tier, TierInfo>;
  heroes: HeroMeta[];
};

export default function Home() {
  // Топ-герои по ролям (S-tier)
  const topHeroes = meta.heroes.filter(h => h.tier === 'S');
  
  return (
    <main className={styles.main}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleAccent}>Overpick</span>
            <br />Контрпики Overwatch 2
          </h1>
          <p className={styles.heroSubtitle}>
            Узнай, кем контрить любого героя. Актуальная мета Season {meta.season}.
          </p>
          <div className={styles.heroCta}>
            <Link href="/heroes" className={styles.heroCtaPrimary}>
              Найти контрпик
            </Link>
            <Link href="/meta" className={styles.heroCtaSecondary}>
              Тир-лист
            </Link>
          </div>
        </div>
      </section>

      {/* Быстрый выбор героя */}
      <section className={styles.quickPick}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Выбери героя</h2>
          <p className={styles.sectionSubtitle}>
            Кликни на героя, чтобы увидеть его контрпики
          </p>
        </div>
        <HeroGrid 
          heroes={heroes}
          metaHeroes={meta.heroes}
          showTiers={true}
          groupByRole={true}
        />
      </section>

      {/* Топ меты */}
      <section className={styles.topMeta}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>S-Tier герои</h2>
          <Link href="/meta" className={styles.sectionLink}>
            Полный тир-лист →
          </Link>
        </div>
        <div className={styles.topMetaGrid}>
          {topHeroes.slice(0, 9).map(heroMeta => {
            const hero = heroes.find(h => h.id === heroMeta.heroId);
            if (!hero) return null;
            return (
              <Link 
                key={hero.id} 
                href={`/hero/${hero.id}`}
                className={styles.topMetaCard}
              >
                <div className={styles.topMetaAvatar}>
                  <Image
                    src={hero.portrait}
                    alt={hero.nameRu}
                    width={48}
                    height={48}
                    className={styles.topMetaAvatarImg}
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <div className={styles.topMetaInfo}>
                  <span className={styles.topMetaName}>{hero.nameRu}</span>
                  <span className={styles.topMetaStats}>
                    {heroMeta.winRate}% WR
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Статистика */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{heroes.length}</span>
          <span className={styles.statLabel}>Героев</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>Season {meta.season}</span>
          <span className={styles.statLabel}>Актуальная мета</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{meta.lastUpdated}</span>
          <span className={styles.statLabel}>Обновлено</span>
        </div>
      </section>
    </main>
  );
}
