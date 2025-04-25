"use client";

import ReviewSlider from "./ReviewSlider";

// Mock review data
const mockReviews = [
  {
    id: 1,
    reviewerName: "Jan Smit",
    rating: 5,
    reviewText:
      "Absoluut fantastische service! Het team van Karsten Energy was professioneel, stipt en leverde uitstekende waarde. Onze zonnepanelen werden snel geïnstalleerd en werken perfect. Sterk aanbevolen voor iedereen die zonne-energie wil gebruiken.",
    date: "3 weken geleden",
  },
  {
    id: 2,
    reviewerName: "Sara Jansen",
    rating: 5,
    reviewText:
      "We hebben onze energie-audit laten uitvoeren door Karsten Energy en waren onder de indruk van hun grondigheid en expertise. De aanbevelingen die ze hebben gedaan, hebben ons al geld bespaard op onze energierekeningen. Zeer tevreden!",
    date: "1 maand geleden",
  },
  {
    id: 3,
    reviewerName: "Michel de Vries",
    reviewerImg: "https://i.pravatar.cc/150?img=11",
    rating: 4,
    reviewText:
      "Het installatieteam was professioneel en efficiënt. Ze hebben uitstekend werk geleverd met onze zonnepanelen en alles werd duidelijk uitgelegd. De enige reden voor 4 sterren in plaats van 5 is dat er een kleine vertraging was bij het plannen, maar het bedrijf communiceerde goed gedurende het hele proces.",
    date: "2 maanden geleden",
  },
  {
    id: 4,
    reviewerName: "Emma Willemsen",
    reviewerImg: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    reviewText:
      "Van consultatie tot installatie, het was een genoegen om met Karsten Energy samen te werken. Hun team beantwoordde al mijn vragen en gaf waardevolle inzichten voor het optimaliseren van de energie-efficiëntie van ons huis. De zonnepanelen zien er geweldig uit en presteren zelfs beter dan verwacht!",
    date: "3 maanden geleden",
  },
  {
    id: 5,
    reviewerName: "David Thomassen",
    rating: 5,
    reviewText:
      "De beste beslissing die we hebben genomen was om voor Karsten Energy te kiezen voor onze thuisbatterij-installatie. Ze waren deskundig, behulpzaam, en het vakmanschap was uitstekend. De batterij is een game-changer geweest tijdens stroomuitval en voor het beheren van onze energiekosten.",
    date: "3 maanden geleden",
  },
  {
    id: 6,
    reviewerName: "Maria de Groot",
    reviewerImg: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    reviewText:
      "Karsten Energy heeft ons huis getransformeerd tot een energiezuinig meesterwerk! De zonne-installatie was snel en het systeem heeft onze verwachtingen overtroffen. Hun klantenservice is uitzonderlijk - altijd bereid om vragen te beantwoorden en advies te geven.",
    date: "4 maanden geleden",
  },
  {
    id: 7,
    reviewerName: "Jaap Willems",
    rating: 4,
    reviewText:
      "Geweldige ervaring met Karsten Energy. Ze waren zeer professioneel en hun kennis over hernieuwbare energieoplossingen is indrukwekkend. De enige reden dat ik geen 5 sterren geef, is vanwege een klein communicatieprobleem dat snel werd opgelost.",
    date: "4 maanden geleden",
  },
  {
    id: 8,
    reviewerName: "Linda Martens",
    reviewerImg: "https://i.pravatar.cc/150?img=7",
    rating: 5,
    reviewText:
      "We hebben nu 6 maanden zonnepanelen en kunnen niet gelukkiger zijn. Het hele proces van eerste consultatie tot installatie verliep soepel en professioneel. Karsten Energy heeft alles geleverd wat ze beloofden en meer!",
    date: "5 maanden geleden",
  },
];

// Additional reviews for the second slider
const moreReviews = [
  {
    id: 9,
    reviewerName: "Robert Bruin",
    reviewerImg: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    reviewText:
      "Uitstekende klantenservice van begin tot eind. Het team van Karsten Energy was professioneel, deskundig en altijd beschikbaar om onze vragen te beantwoorden. De installatie werd op tijd en binnen budget voltooid. Onze zonnepanelen werken geweldig!",
    date: "1 maand geleden",
  },
  {
    id: 10,
    reviewerName: "Jennifer Timmermans",
    rating: 5,
    reviewText:
      "We konden niet gelukkiger zijn met onze beslissing om voor Karsten Energy te kiezen voor de installatie van zonnepanelen in ons huis. Het hele proces verliep soepel en transparant, en het team was een plezier om mee samen te werken. Sterk aanbevolen!",
    date: "2 maanden geleden",
  },
  {
    id: 11,
    reviewerName: "Thomas Andersen",
    rating: 4,
    reviewText:
      "Zeer professioneel bedrijf met uitstekende klantenservice. Het installatieteam was efficiënt en netjes. Het systeem presteert goed en we zien al besparingen op onze energierekeningen. De enige reden voor 4 sterren is een kleine vertraging bij het opstarten.",
    date: "2 maanden geleden",
  },
  {
    id: 12,
    reviewerName: "Lisa Damen",
    reviewerImg: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    reviewText:
      "Karsten Energy maakte overstappen op zonne-energie zo gemakkelijk! Hun team begeleidde ons door het hele proces, van het selecteren van het juiste systeem voor onze behoeften tot installatie en setup. We zijn erg blij met de resultaten en de doorlopende ondersteuning die ze bieden.",
    date: "3 maanden geleden",
  },
  {
    id: 13,
    reviewerName: "Daniël de Wit",
    rating: 5,
    reviewText:
      "Uitstekende service en kwaliteit. Onze zonnepanelen werden efficiënt geïnstalleerd en het systeem werkt feilloos. De energiebesparingen zijn zelfs beter dan voorspeld. Zou zeker weer gebruik maken van Karsten Energy!",
    date: "4 maanden geleden",
  },
  {
    id: 14,
    reviewerName: "Sophia Rodenburg",
    reviewerImg: "https://i.pravatar.cc/150?img=26",
    rating: 5,
    reviewText:
      "We hebben een geweldige ervaring gehad met Karsten Energy. Hun team was professioneel, beleefd en zeer deskundig. De installatie werd snel en met minimale verstoring voltooid. Ons zonnesysteem presteert uitstekend, zelfs op bewolkte dagen!",
    date: "4 maanden geleden",
  },
  {
    id: 15,
    reviewerName: "Willem van Leeuwen",
    rating: 5,
    reviewText:
      "Karsten Energy overtrof onze verwachtingen in alle opzichten. Van de eerste consultatie tot de uiteindelijke installatie was hun team professioneel en behulpzaam. We produceren nu meer dan genoeg energie om ons huis van stroom te voorzien en konden niet gelukkiger zijn met de investering.",
    date: "5 maanden geleden",
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
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-8 mr-3"
            />
          </div>
        </div>

        <div className="">
          {/* First slider - moving right by default */}
          <ReviewSlider
            reviews={mockReviews}
            cardWidth={330}
            gap={20}
            speed={60}
          />

          {/* Second slider - moving left by default and when scrolling down */}
          <ReviewSlider
            reviews={moreReviews}
            cardWidth={330}
            gap={20}
            speed={50}
            reverse={true}
            reverseScroll={true}
          />
        </div>
      </div>
    </section>
  );
}
