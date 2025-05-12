import React from "react";

export default function GarantiePage() {
  return (
    <main>
      <section className="relative text-white pt-44 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900"></div>
        </div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Garantie
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 prose max-w-none mt-12">
        <p className="mb-6">
          Hieronder vindt u de garantievoorwaarden van Karsten Energy BV voor
          zonnepanelen en zonnestroomsystemen.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Garantievoorwaarden
        </h2>

        <p>
          Zolang Wederpartij niet aan alle op hem rustende financiële
          verplichtingen voortvloeiend uit de Overeenkomst heeft voldaan kan hij
          geen aanspraak maken op garantie.
        </p>

        <p className="mt-4">
          De garantie zoals bedoeld in dit artikel en in de garantieverklaring
          vervalt indien:
        </p>

        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            Wederpartij het Zonnestroomsysteem en/of een van de onderdelen
            daarvan – zelf demonteert en/of monteert c.q. verplaatst;
          </li>
          <li>
            Door anderen dan Karsten Energy BV het Zonnestroomsysteem en/of een
            van haar onderdelen is gewijzigd, gedemonteerd en/of gemonteerd c.q.
            verplaatst en/of wijzigingen zijn aangebracht;
          </li>
          <li>
            De op de Zaken aangebrachte, individuele herkenningstekens zijn
            verwijderd of verwijderd zijn geweest;
          </li>
          <li>
            De Producten op een ondeskundige wijze en/of zonder inachtneming van
            de daarvoor geldende (wettelijke) regels en gebruiksvoorschriften
            zijn geïnstalleerd of gebruikt, tenzij de installatie door Karsten
            Energy BV zelf werd verricht.
          </li>
          <li>
            Gedurende de garantietermijn geen periodiek onderhoud is verricht
            aan Zaken die onderhoud behoeven.
          </li>
          <li>
            Producten voor andere doeleinden werden gebruikt dan waarvoor die
            volgens de productinformatie en/of Overeenkomst zijn bestemd.
          </li>
          <li>
            Indien de originele factuur niet kan worden overgelegd, de originele
            factuur is gewijzigd of onleesbaar is gemaakt;
          </li>
          <li>
            Indien gebreken het gevolg zijn van niet met de bestemming
            corresponderend of onoordeelkundig gebruik;
          </li>
          <li>
            Indien beschadiging is ontstaan door externe oorzaken of invloeden;
          </li>
          <li>
            Indien beschadiging is ontstaan door opzet, grove onachtzaamheid of
            nalatig onderhoud.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Garantie op installatie
        </h2>

        <p>
          Karsten Energy BV garandeert dat eventuele gebreken in de installatie
          van het Product voor de afgesproken installatiegarantietermijn na
          oplevering worden verholpen, tenzij het gebrek geen direct gevolg is
          van het geleverde werk.
        </p>

        <p className="mt-4">
          Zodra de installatiegarantie op het Zonnestroomsysteem en/of andere
          Zaken is verstreken, behoudt Karsten Energy BV zich het recht voor om
          arbeidsloon en materialen in rekening te brengen bij eventuele
          storingen (internet/uitval omvormer/optimizer).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Uitsluitingen van garantie
        </h2>

        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>
            Sporen van microcracks, snailtrails en kleurverschil vallen buiten
            de vrijwaring van verborgen gebreken en garantie.
          </li>
          <li>
            Op kleurverschil in de Zonnepanelen wordt geen garantie gegeven,
            daarmee valt kleurverschil in geen enkel geval onder de te geven of
            gegeven garantie.
          </li>
          <li>
            De communicatie met het internet valt, vanwege de afhankelijkheid
            van derde partijen zoals de 'Internet Service Provider' (ISP),
            expliciet buiten de garantie.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Overdracht en aanschaf
        </h2>

        <p>
          In geval Wederpartij het systeem in eigendom overdraagt aan een derde
          partij, vervalt de garantie zoals gegeven aan Wederpartij niet.
        </p>

        <p className="mt-4">
          In het geval Wederpartij alleen de Zaken bij Karsten Energy BV heeft
          aangeschaft en Karsten Energy BV de materialen niet heeft
          geïnstalleerd, dan geeft Karsten Energy geen garantie op de werking
          van de Zaken en het Zonnestroomsysteem.
        </p>

        <p className="mt-8">
          Voor meer informatie over onze garantievoorwaarden of bij vragen over
          garantie, neem contact op via onze{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contactpagina
          </a>
          .
        </p>
      </div>
    </main>
  );
}
