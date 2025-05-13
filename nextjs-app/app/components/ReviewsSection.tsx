"use client";

import Link from "next/link";
import ReviewSlider from "./ReviewSlider";
import Image from "next/image";

// Solar panel reviews from customers
const solarPanelReviews = [
  {
    id: 1,
    reviewerName: "Jelle Ooteman",
    rating: 5,
    reviewText:
      "Zeer tevreden. Drie andere bedrijven gaven aan geen zonnepanelen te kunnen plaatsen op ons Rijksmonumentale pand, Karsten Energy kon en wilde dit wel. Ze hebben het vakkundig gedaan, goed meegedacht en top service geleverd. Wij raden dit bedrijf aan.",
    date: "1 jaar geleden",
  },
  {
    id: 2,
    reviewerName: "Jasper Van Reijsen",
    rating: 5,
    reviewText:
      "Dit bedrijf levert een goede service. Ze denken met de klant mee en komen met oplossingen. Zeer tevreden over de set zonnepanelen en de wijze waarop er wordt gewerkt.",
    date: "1 jaar geleden",
  },
  {
    id: 3,
    reviewerName: "Danielle Rischen",
    rating: 5,
    reviewText:
      "Supertevreden! Zonnepanelen zijn een maand geleden vakkundig geplaatst. Prettig contact, goed advies en erg vriendelijk.",
    date: "1 jaar geleden",
  },
  {
    id: 4,
    reviewerName: "Thijmen de Cock",
    rating: 5,
    reviewText:
      "De mannen leveren geweldig werk, snel en goed. Heel duidelijk en betrouwbaar!",
    date: "6 maanden geleden",
  },
  {
    id: 5,
    reviewerName: "Tom de Wit",
    rating: 5,
    reviewText:
      "Snelle actie door de jongens van Karsten Energy. Snel en kundig. Alles inzichtelijk via een app. Ideaal. Nu moet de zon de rest doen. Aanrader!",
    date: "1 jaar geleden",
  },
  {
    id: 6,
    reviewerName: "Kees Groot",
    rating: 5,
    reviewText:
      "Mede op basis van de positieve reviews voor dit bedrijf gekozen. Daar absoluut geen spijt van. Wat een prettig bedrijf zeg. Heldere communicatie, snelle levering en netjes geïnstalleerd. Een paar dagen na de installatie was, door mijn eigen toedoen, de connectie met de app van slag. Telefonisch lukte het niet om dit weer in orde te maken. Binnen een half uur waren ze bij mij thuis om het in orde te maken. Klasse!",
    date: "7 maanden geleden",
  },
  {
    id: 7,
    reviewerName: "Kevin de Vries",
    rating: 5,
    reviewText:
      "Zeer tevreden over deze vakmannen! Goed en leuk contact, snelle levering en perfecte service. Binnen een paar uur lagen alle zonnepanelen op het dak, er wordt meegedacht en alle mannen waren zeer vriendelijk. Een absolute aanrader!",
    date: "10 maanden geleden",
  },
  {
    id: 8,
    reviewerName: "Susan Koopman",
    rating: 5,
    reviewText: "Goed geholpen, goede service en vriendelijke mensen.",
    date: "5 dagen geleden",
  },
  {
    id: 9,
    reviewerName: "Henk Zoetmeijer",
    rating: 5,
    reviewText:
      "Vandaag 2 augustus 2023 zijn er 7 zonnepanelen geplaatst door de mannen van Karsten Energy. We zijn super tevreden over alles wat de mannen hebben gedaan. Vanaf de offerte tot de plaatsing. Succes verder mannen. Jullie zijn toppers.",
    date: "02-08-2023",
  },
];

// Air conditioning reviews from customers
const aircoReviews = [
  {
    id: 10,
    reviewerName: "Ronald Vrijman",
    rating: 5,
    reviewText:
      "Sinds 5 jaar hebben wij een airco systeem (3 airco's draaiende op 1 buitenunit) van Panasonic laten plaatsen door een ander bedrijf. Karsten Energy via Facebook toevallig tegengekomen en zo contact weten te leggen. De mannen hebben het probleem vakkundig opgelost. Zijn daarna nog een keer teruggekomen om te kijken waarom de klep niet goed meer dicht ging. Ook hier werd goed de tijd voor genomen. Prima bedrijf, vakkundige en zeer vriendelijke monteurs. Zeker een aanbeveling waard.",
    date: "5 maanden geleden",
  },
  {
    id: 11,
    reviewerName: "Peter Taal",
    rating: 5,
    reviewText:
      "Professionele mensen uit de streek. Jan en Niels hebben vandaag keurig een airconditioning geplaatst, deze vakkundig aangesloten, uitleg van de werking, en ze namen de tijd om alles goed af te werken.",
    date: "1 maand geleden",
  },
  {
    id: 12,
    reviewerName: "Klaas Ates",
    rating: 5,
    reviewText:
      "Goede voorbereiding is het halve werk, doordacht systeem van airco's in onze woning geplaatst, we zijn zeer tevreden over de kwaliteit van het materiaal en zeker ook zeer tevreden over de vakmensen van Karsten Energy.",
    date: "1 maand geleden",
  },
  {
    id: 13,
    reviewerName: "Nick de Wit",
    rating: 5,
    reviewText:
      "Zeer tevreden over het algehele traject bij Karsten. Snelle en duidelijke communicatie, kwamen hun afspraken na en ook na plaatsing zeer service gericht. De heren zelf ook erg professioneel en harde werkers. Positief allemaal.",
    date: "1 jaar geleden",
  },
  {
    id: 14,
    reviewerName: "GVE",
    rating: 5,
    reviewText:
      "Goede voorbereiding is het halve werk, doordacht systeem van airco's in onze woning geplaatst, we zijn zeer tevreden over de kwaliteit van het materiaal en zeker ook zeer tevreden over de vakmensen van Karsten Energy.",
    date: "3 weken geleden",
  },
  {
    id: 15,
    reviewerName: "Wendy van den Haak",
    rating: 5,
    reviewText:
      "Top bedrijf, snelle levering en plaatsing van 2 airco units. Denken met je mee over oplossingen. Alles netjes geplaatst en niet te vergeten alles netjes achtergelaten. Leuke en vakkundige mannen. Echt een aanrader.",
    date: "7 maanden geleden",
  },
  {
    id: 16,
    reviewerName: "Jan Koster",
    rating: 5,
    reviewText:
      "Top bedrijf! Zeer positief en enthousiast personeel alles is van A tot Z geregeld! Prijs / kwaliteit verhouding meer dan prima. Ik kan Karsten Energy absoluut aanbevelen! Ga zo door!",
    date: "1 jaar geleden",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12 flex flex-row items-center justify-between">
          <h2 className="text-4xl font-base tracking-tighter text-blue-600 mb-4 max-w-lg">
            Wat onze klanten over ons zeggen
          </h2>

          <div className="flex items-center justify-center mt-6">
            <Link
              href="https://www.google.com/search?sa=X&sca_esv=3f663a9f48f5c032&rlz=1C5CHFA_enNL1020NL1020&tbm=lcl&sxsrf=AHTn8zrqns_H6LYBZ_XPhs0mjo6cYobg9g:1746715272322&q=Karsten+Energy+BV+Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NDK2NDQ1NDe2NDA3tzS1NLA03sDI-IpR0juxqLgkNU_BNS-1KL1SwSlMISi1LDO1vHgRK245AKcqIdpSAAAA&rldimm=1239151739077959093&hl=nl-NL&ved=2ahUKEwj5lNK6jZSNAxUZhf0HHfm3KLYQ9fQKegQIPxAF&biw=1512&bih=823&dpr=2#lkt=LocalPoiReviews"
              target="_blank"
            >
              <Image
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-8 mr-3 w-auto"
                width={92}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        {/* First slider - moving right by default */}
        <ReviewSlider
          reviews={solarPanelReviews}
          cardWidth={330}
          gap={20}
          speed={60}
        />

        {/* Second slider - moving left by default and when scrolling down */}
        <ReviewSlider
          reviews={aircoReviews}
          cardWidth={330}
          gap={20}
          speed={50}
          reverse={true}
          reverseScroll={true}
        />
      </div>
    </section>
  );
}
