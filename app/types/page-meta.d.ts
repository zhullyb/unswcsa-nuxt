export interface HeroAction {
  label: string
  to: string
  icon?: string
  variant?: 'primary' | 'red' | 'ghost'
}

export interface HeroMeta {
  title: string
  eyebrow?: string
  subtitle?: string
  /** Small secondary line under the subtitle (e.g. the English name). */
  note?: string
  actions?: HeroAction[]
}

declare module '#app' {
  interface PageMeta {
    /** Rendered by the persistent <SiteHero> in the default layout. */
    hero?: HeroMeta
  }
}
