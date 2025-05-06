export interface HeroSlide {
  _key: string;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  title: string;
  description?: string;
  button?: {
    text: string;
    link: string;
  };
}

export interface HeroSlider {
  slides: HeroSlide[];
  slideDuration: number;
}
