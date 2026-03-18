export interface HeroSlide {
  _key: string;
  image: {
    asset?: {
      _ref: string;
      _type?: string;
    };
    hotspot?: object;
    crop?: object;
    _type?: string;
  };
  title: string;
  description?: string | null;
  button?: {
    text: string | null;
    link: string | null;
  } | null;
}

export interface HeroSlider {
  slides: HeroSlide[];
  slideDuration: number;
}
