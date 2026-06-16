/* ============================================================
   PYCHA CATERING — Weekly Menu Popup — Premium Redesign v3
   ============================================================ */

(function () {
  /* ─── Asset paths ─────────────────────────────────────── */
  const scriptTag = document.querySelector('script[src*="weekly-menu-popup.js"]');
  const assetBase = scriptTag ? scriptTag.getAttribute('src').replace('weekly-menu-popup.js', 'generated/') : 'assets/menu-popup/generated/';

  const categoryPhotos = {
    'Dania mięsne':     `${assetBase}danie_miesne_1781601930040.png`,
    'Dania wege':       `${assetBase}danie_wege_1781601858442.png`,
    'Zupy':             `${assetBase}zupa_krem_1781601919024.png`,
    'Mączne':           `${assetBase}maczne_pierogi_1781601847671.png`,
    'Desery':           `${assetBase}deser_premium_1781601967825.png`,
    'Sałatki':          `${assetBase}salatka_premium_1781601908870.png`,
    'Makaron':          `${assetBase}makaron_pasta_1781601870171.png`,
    'Stałe codziennie': `${assetBase}stale_codziennie_1781602007202.png`,
    'Kanapki':          `${assetBase}kanapka_premium_1781601880882.png`,
  };

  /* ─── Category icons ──────────────────────────────────── */
  const catIcons = {
    'Dania mięsne':     `https://i.imgur.com/mk96eYb.png`,
    'Dania wege':       `https://i.imgur.com/VcumTo0.png`,
    'Zupy':             `https://i.imgur.com/fQPU7Q3.png`,
    'Mączne':           `https://i.imgur.com/5dmembW.png`,
    'Desery':           `https://i.imgur.com/hMAugNx.png`,
    'Sałatki':          `https://i.imgur.com/VcumTo0.png`,
    'Makaron':          `https://i.imgur.com/mk96eYb.png`,
    'Stałe codziennie': `https://i.imgur.com/fQPU7Q3.png`,
    'Kanapki':          `https://i.imgur.com/5dmembW.png`,
  };

  /* ─── Chef avatar ─────────────────────────────────────── */
  const chefAvatar = 'https://i.imgur.com/f0sl5oR.png';

  /* ─── Fixed structure ─────────────────────────────────── */
  const WEEKS       = ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4'];
  const TOTAL_WEEKS = WEEKS.length;
  const DAYS_ORDER  = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  const DAYS_SHORT  = { 'Poniedziałek': 'Pon', 'Wtorek': 'Wt', 'Środa': 'Śr', 'Czwartek': 'Czw', 'Piątek': 'Pt' };
  const CAT_ORDER   = ['Dania mięsne', 'Dania wege', 'Zupy', 'Mączne', 'Desery', 'Sałatki', 'Makaron', 'Stałe codziennie'];
  const SANDWICHES_KEY = 'Kanapki';

  /* ─── Menu data ───────────────────────────────────────── */
  const weeklyMenu = {
    "Tydzień 1": {
      "Poniedziałek": {
        "Dania mięsne": [
          "22 zł Domowy Schabowy z kapustą zasmażaną, ziemniaki gotowane",
          "21 zł Udziec z kurczaka z ragu, purée ziemniaczane, surówka",
          "20 zł Klopsiki z sosem pieczarkowym , purée ziemniaczane, surówka z marchewki",
          "20 zł Cukinia faszerowana mięsem z mozarellą"
        ],
        "Dania wege": [
          "19 zł Spaghetti Aglio Oglio",
          "19 zł Kotleciki sojowe"
        ],
        "Zupy": [
          "11 zł Ogórkowa",
          "11 zł Barszcz ukraiński"
        ],
        "Mączne": [
          "18 zł Burrito"
        ],
        "Desery": [
          "12 zł Mus jabłkowy pod kruszonką",
          "12 zł Jogurt z granolą i borówkami"
        ],
        "Sałatki": [
          "20 zł Tabule",
          "20 zł Cezar"
        ],
        "Makaron": [
          "20 zł Penne z kurczakiem w sosie śmietanowym"
        ],
        "Stałe codziennie": [
          "leniwe spaghetti bolognese grecka naleśniki na słodko wrapy"
        ]
      },
      "Wtorek": {
        "Dania mięsne": [
          "20 zł Domowy mielony z buraczkami, purée ziemniaczane",
          "21 zł Karkówka pieczona w sosie grzybowym z kaszą gryczaną, surówka z kiszonych ogórków",
          "20 zł Skrzydełka buffalo z sosem gorgonzola , marchewka i seler naciowy w słupkach",
          "20 zł Kurczak curry z ryżem"
        ],
        "Dania wege": [
          "19 zł Tajskie curry z tofu marynowym i ryż jasminowy",
          "19 zł farfalle milanese"
        ],
        "Zupy": [
          "10 zł Rosół",
          "11 zł Krupnik"
        ],
        "Mączne": [
          "18 zł Pierogi z mięsem"
        ],
        "Desery": [
          "12 zł Mus mango z pieczoną gruszka",
          "12 zł serniczek z czekoladą"
        ],
        "Sałatki": [
          "20 zł Meksykańska z grillowanym kurczakiem i salsa mango",
          "19 zł Sałatka z buraka pieczonego z fetą i kolendrą"
        ],
        "Makaron": [
          "19 zł Arrabbiata Spaghetti"
        ],
        "Stałe codziennie": []
      },
      "Środa": {
        "Dania mięsne": [
          "21 zł Zrazy schabowe w sosie Dijon z koptykami , surówka",
          "20 zł Kurczak pieczony w pomidorach , ziemniaki zapiekane, surówka",
          "23 zł kociołek węgierski z plackiem ziemniaczanym",
          "22 zł de volaille z serem, purée ziemniaczane, buraczki zasmażane"
        ],
        "Dania wege": [
          "19 zł Marynowane Tofu w sosie bbq z ryżem, surówka",
          "19 zł Cukinia faszerowana mozzarella i suszonymi pomidorami"
        ],
        "Zupy": [
          "11 zł jarzynowa",
          "11 zł chłodnik"
        ],
        "Mączne": [
          "18 zł krokiety z kapustą i pieczarkami"
        ],
        "Desery": [
          "12 zł kinder country z prażonym ryżem",
          "12 zł malina z bezą i mascarpone"
        ],
        "Sałatki": [
          "21 zł 4 sery",
          "20 zł sałatka grillowa"
        ],
        "Makaron": [
          "20 zł Penne americana"
        ],
        "Stałe codziennie": []
      },
      "Czwartek": {
        "Dania mięsne": [
          "20 zł Pieczony udziec z kurczaka, ziemniaki młode, marchewka z groszkiem",
          "20 zł Kotlet mielony z młodymi ziemniakami i mizeria",
          "19 zł Fasolka po bretońsku",
          "22 zł Roladki z kurczaka ze szpinakiem na sosie serowym z kopytkami i surówka"
        ],
        "Dania wege": [
          "18 zł Placki z cukinii z sosem czosnkowym",
          "20 zł Pad Thai z Tofu"
        ],
        "Zupy": [
          "11 zł Pomidorowa z makaronem",
          "12 zł Krem z kalafiora"
        ],
        "Mączne": [
          "17 zł Naleśniki z serem i musem owocowym"
        ],
        "Desery": [
          "12 zł Mus truskawkowy z mascarpone",
          "12 zł Szarlotka pod kruszonką"
        ],
        "Sałatki": [
          "23 zł Bowl z pieczonym łososiem z sosem mango",
          "19 zł Caprese z pesto i pistacjami"
        ],
        "Makaron": [
          "19 zł Spaghetti Bolognese"
        ],
        "Stałe codziennie": []
      },
      "Piątek": {
        "Dania mięsne": [
          "22 zł Dorsz w cieście piwnym z ziemniakami opiekanymi, surówka z kiszonej kapusty",
          "20 zł Potrawka z kurczaka z ryżem, surówka z marchewki",
          "20 zł Stripsy w panko z sosem chipotle, zapiekane ziemniaki, surówka",
          "24 zł Stifado wołowe z kopytkami, buraczki zasmażane"
        ],
        "Dania wege": [
          "18 zł Kotlet jajeczno-ziemniaczany z sosem pieczarkowym, Surówka",
          "19 zł Penne ze szpinakiem i gorgonzolą"
        ],
        "Zupy": [
          "12 zł Kapuśniak z młodej kapusty",
          "12 zł Soczewicowa"
        ],
        "Mączne": [
          "18 zł Pierogi z mięsem"
        ],
        "Desery": [
          "12 zł Jogurt z borówkami i kruszonką czekoladową",
          "12 zł Chia z owocami"
        ],
        "Sałatki": [
          "20 zł Makaronowa z wędzonym kurczakiem i ananasem, sos jogurtowo-ziołowy",
          "18 zł Grecka"
        ],
        "Makaron": [
          "19 zł Linguine Carbonara"
        ],
        "Stałe codziennie": []
      }
    },
  
    "Tydzień 2": {
      "Poniedziałek": {
        "Dania mięsne": [
          "21 zł Czerwone Curry z kurczakiem z ryżem",
          "20 zł Klopsiki w sosie koperkowym, purée ziemniaczane, surówka",
          "23 zł Żeberka Teriyaki, Ziemniaki zapiekane, colesław",
          "23 zł Strogonow"
        ],
        "Dania wege": [
          "19 zł tagliatelle z warzywnym ragu",
          "19 zł Lasagne ze szpinakiem i ricotta"
        ],
        "Zupy": [
          "11 zł krem z warzyw",
          "12 zł żurek z jajkiem i kiełbasą"
        ],
        "Mączne": [
          "18 zł krokiety z kapustą i pieczarkami"
        ],
        "Desery": [
          "12 zł pudding chia na mleku",
          "12 zł topping mango i świeże owoce"
        ],
        "Sałatki": [
          "21 zł burrata z pomidorem z malinowym balsamico",
          "22 zł bowl z kurczakiem teriyaki"
        ],
        "Makaron": [
          "20 zł spaghetti z chorizo"
        ],
        "Stałe codziennie": []
      },
      "Wtorek": {
        "Dania mięsne": [
          "21 zł Kofta grecka z tzatziki, ziemniaki opiekane, sałata z vinegret",
          "20 zł Bakłażan faszerowany mięsem",
          "23 zł gulasz węgierski",
          "21 zł kurczak z mozzarella i pieczarkami, ryż, surówka"
        ],
        "Dania wege": [
          "20 zł tagliatelle z leśnymi grzybami",
          "19 zł Kotleciki z soczewicy z purée i grillowanymi warzywami"
        ],
        "Zupy": [
          "12 zł harira",
          "11 zł szczawiowa z jajkiem"
        ],
        "Mączne": [
          "18 zł Pierogi z serem z musem owocowym"
        ],
        "Desery": [
          "12 zł serniczek z czekoladą",
          "12 zł kinder bueno deser"
        ],
        "Sałatki": [
          "21 zł sałatka z arbuzem typu feta",
          "21 zł sałatka z pieczonym bobem"
        ],
        "Makaron": [
          "19 zł makaron udon"
        ],
        "Stałe codziennie": []
      },
      "Środa": {
        "Dania mięsne": [
          "21 zł udziki zapiekane w bekonie, ziemniaki zapiekane, surówka",
          "20 zł Gołąbki w sosie pomidorówym z purée",
          "22 zł schab milanese, sałatka z rukoli z vinegret, ziemniaki z wody",
          "21 zł butter chicken z ryżem"
        ],
        "Dania wege": [
          "19 zł scorentina",
          "19 zł Chilli Sin Carne z ryżem"
        ],
        "Zupy": [
          "11 zł zacierkowa",
          "11 zł krem z pomidorów"
        ],
        "Mączne": [
          "18 zł pyzy z mięsem"
        ],
        "Desery": [
          "12 zł brownie bananowe",
          "12 zł rafaello deser"
        ],
        "Sałatki": [
          "23 zł shrimps bowl",
          "21 zł kurczak z pomarańczą"
        ],
        "Makaron": [
          "19 zł penne z kurczakiem i pesto"
        ],
        "Stałe codziennie": []
      },
      "Czwartek": {
        "Dania mięsne": [
          "20 zł gyros z ryżem , surówka",
          "22 zł schab wołyński w sosie kurkowym z purée ziemniaczanym, fasolka szparagowa",
          "20 zł kurczak w sosie słodko kwasnym z ryżem",
          "21 zł rolada z kurczaka z pieczarkami, ziemniaki zapiekane , surówka"
        ],
        "Dania wege": [
          "18 zł tarta ze szpinakiem",
          "20 zł Risotto grzybowe"
        ],
        "Zupy": [
          "11 zł chłodnik",
          "12 zł gulaszowa"
        ],
        "Mączne": [
          "18 zł placki z cukinii sos pieczarkowy"
        ],
        "Desery": [
          "12 zł tapioka",
          "12 zł mus pomarańczowy z chia"
        ],
        "Sałatki": [
          "20 zł Cezar",
          "21 zł rzymska z avocado i mango"
        ],
        "Makaron": [
          "20 zł farfalle z bekonem i pomidorami"
        ],
        "Stałe codziennie": []
      },
      "Piątek": {
        "Dania mięsne": [
          "22 zł dorsz panierowany z ziemniakami, surówka z kapusty kiszonej",
          "19 zł Leczo",
          "21 zł szynka pieczona w ziołach z kaszą bulgur, surówka",
          "21 zł sznycel z kurczaka z mozzarella, z ziemniakami opiekanymi, surówka"
        ],
        "Dania wege": [
          "18 zł udon wege",
          "19 zł Zapiekanka warzywna z fetą"
        ],
        "Zupy": [
          "12 zł meksykanska",
          "11 zł warzywna"
        ],
        "Mączne": [
          "18 zł knedle z owocami"
        ],
        "Desery": [
          "12 zł snickers deser",
          "12 zł śliwka pod kruszonką"
        ],
        "Sałatki": [
          "23 zł Bowl z pieczonym łososiem z sosem mango",
          "20 zł Meksykańska z grillowanym kurczakiem i salsa mango"
        ],
        "Makaron": [
          "21 zł penne z łososiem"
        ],
        "Stałe codziennie": []
      }
    },
  
    "Tydzień 3": {
      "Poniedziałek": {
        "Dania mięsne": [
          "23 zł Zeberka w sosie BBQ Jack Daniels, Pieczone ziemniaki, Coleslaw",
          "22 zł Chilli con carne z ryżem, sałatka ze świeżych warzyw",
          "22 zł Długopieczona Łopatka wieprzowa w jabłkachch, Kasza pęczak , kiszona cebula",
          "21 zł Rolada z indyka z suszonym pomidorem, Quinoa, Surówka",
          "21 zł Marynowana pierść z kurczaka z grilla,warzywa grillowane, kasza bulgur"
        ],
        "Dania wege": [
          "19 zł Tarta ze szparagami i ze szpinakiem",
          "19 zł Falaffel z bulgurem"
        ],
        "Zupy": [
          "10 zł Rosół",
          "12 zł Zupa krem ze szparagów"
        ],
        "Mączne": [
          "18 zł Burrito z sosem chipotle"
        ],
        "Desery": [
          "12 zł Mus jabłkowy pod kruszonką",
          "12 zł Jogurt z granolą i borówkami"
        ],
        "Sałatki": [
          "19 zł Sałatka z buraka pieczonego z fetą i kolendrą",
          "20 zł Cezar"
        ],
        "Makaron": [
          "19 zł Penne putanesca"
        ],
        "Stałe codziennie": []
      },
      "Wtorek": {
        "Dania mięsne": [
          "20 zł kotlety mielone z ziemniakami, buraczkami",
          "22 zł Kurczak mozzarella pomidor z pesto, młody ziemniak, surówka Kofta Z Łopatki wieprzowej, Ryż, surówka",
          "23 zł Gulasz z kaszą i ogórkiem",
          "21 zł Pieczony schab z morelą w sosie własnym, Z purée ziemniaczanym, surówka z buraków"
        ],
        "Dania wege": [
          "20 zł Stek z kalafiora",
          "20 zł Zielone curry z bakłażanem z tofu ryż"
        ],
        "Zupy": [
          "11 zł Pomidorowa",
          "11 zł Flaki z boczniaka"
        ],
        "Mączne": [
          "18 zł Pierogi z mięsem"
        ],
        "Desery": [
          "12 zł Mus mango z pieczoną gruszka",
          "12 zł serniczek z czekoladą"
        ],
        "Sałatki": [
          "19 zł Kuskus z warzywami i kurczakiem, sos tzaziki",
          "20 zł Sałatka meksykańska z kurczakiem"
        ],
        "Makaron": [
          "19 zł Tagliatelle szpinakowe"
        ],
        "Stałe codziennie": []
      },
      "Środa": {
        "Dania mięsne": [
          "23 zł Bitki wołowe z purée ziemniaczanym, buraczki",
          "20 zł Skrzydełka Buffalo, Sos z gorgonzoli marchewka,seler w słupkach",
          "24 zł Sandacz w sosie cytrynowo-kaparowym, mlode ziemniaki, surówka z kapusty",
          "21 zł Czerwone curry z kurczakiem, ryż",
          "21 zł Roladki wieprzowe z ogórkiem, kopytka, surówka z czerwonej kapusty"
        ],
        "Dania wege": [
          "18 zł Placki z cukinii",
          "19 zł Stir fry z Tofu z makaronym ryżowym"
        ],
        "Zupy": [
          "12 zł meksykanska 18zł1",
          "11 zł Kalafiorowa"
        ],
        "Mączne": [
          "18 zł Burrito"
        ],
        "Desery": [
          "12 zł kinder country z prażonym ryżem",
          "12 zł malina z bezą i mascarpone"
        ],
        "Sałatki": [
          "19 zł Sałatka caprese",
          "22 zł Bowl Z Kurczakiem Teriyaki"
        ],
        "Makaron": [
          "20 zł Linguine grzybowe"
        ],
        "Stałe codziennie": []
      },
      "Czwartek": {
        "Dania mięsne": [
          "22 zł Tikka Masalla w formie szaszłyków, ryż basmati. sałatka z sosem vinegret",
          "23 zł Gulasz z plackiem ziemniacznym",
          "23 zł Strogonow",
          "21 zł Musaka",
          "20 zł Gołąbki w sosie pomidorówym z purée"
        ],
        "Dania wege": [
          "19 zł Korma z nerkowca, bakłażan, kalafior, Bataty",
          "19 zł Kasza pęczak z grzybami"
        ],
        "Zupy": [
          "11 zł Chłodnik",
          "12 zł Żurek z jajkiem"
        ],
        "Mączne": [
          "18 zł Pierogi z serem z musem owocowym"
        ],
        "Desery": [
          "12 zł Mus truskawkowy z mascarpone",
          "12 zł Szarlotka pod kruszonką"
        ],
        "Sałatki": [
          "21 zł Sałatka tajska z mango z makaronem ryżowym",
          "20 zł Cezar"
        ],
        "Makaron": [
          "20 zł Spaghetti carbonara"
        ],
        "Stałe codziennie": []
      },
      "Piątek": {
        "Dania mięsne": [
          "20 zł Stripsy z kurczaka, Połówki ziemniaków, Coleslaw",
          "22 zł Fish n Chips, Z purée z zielonego groszku, sos tatarski",
          "21 zł Policzki wieprzowe w sosie, z kaszą jaglaną, surówka",
          "20 zł Potrawka z kurczaka"
        ],
        "Dania wege": [
          "18 zł Tarta warzywna",
          "19 zł Naleśniki szpinakowe, z porem i camembertem"
        ],
        "Zupy": [
          "12 zł Topcheta",
          "11 zł Krem z warzyw"
        ],
        "Mączne": [
          "18 zł Pierogi z mięsem"
        ],
        "Desery": [
          "12 zł Jogurt z borówkami i kruszonką czekoladową",
          "12 zł Chia z owocami"
        ],
        "Sałatki": [
          "21 zł 4 sery",
          "23 zł Bowl z pieczonym łososiem z sosem mango"
        ],
        "Makaron": [
          "20 zł Spaghetti z kurczakiem i grzybkami"
        ],
        "Stałe codziennie": []
      }
    },
  
    "Tydzień 4": {
      "Poniedziałek": {
        "Dania mięsne": [
          "21 zł Kotleciki Shu Shu z purée ziemniaczanym, surówka",
          "21 zł Udziki z czerwoną cebulą i balsamika, ryż , surówka",
          "21 zł Medaliony z polędwiczki wieprzowej w sosie szparagowym, ziemniaki gotowane, surówka",
          "21 zł Sznycel z indyka z jajkiem sadzonym i cytryną, ziemniaki opiekane, sałatka vinegret"
        ],
        "Dania wege": [
          "19 zł Kotlety z buraka, płatków owsianych i słonecznika",
          "19 zł Chilli Sin Carne z ryżem"
        ],
        "Zupy": [
          "11 zł Ogórkowa",
          "11 zł Barszcz ukraiński"
        ],
        "Mączne": [
          "18 zł Burrito z sosem chipotle"
        ],
        "Desery": [
          "12 zł pudding chia na mleku",
          "12 zł topping mango i świeże owoce"
        ],
        "Sałatki": [
          "20 zł Meksykańska z grillowanym kurczakiem i salsa mango",
          "19 zł Sałatka z buraka pieczonego z fetą i kolendrą"
        ],
        "Makaron": [
          "20 zł spaghetti z chorizo"
        ],
        "Stałe codziennie": []
      },
      "Wtorek": {
        "Dania mięsne": [
          "22 zł Karkówka z jabłkiem w boczku, ziemniaki opiekane, surówka z buraków",
          "22 zł Kotlet szwajcarski, purée ziemniaczne , mizeria",
          "21 zł Sakiewki z mięsa drobiowego z pieczarkami, purée, surówka",
          "20 zł Kotlet mielony, purée ziemniaczane, buraczki"
        ],
        "Dania wege": [
          "19 zł Tajskie curry z tofu marynowym i ryż jasminowy",
          "20 zł Risotto grzybowe"
        ],
        "Zupy": [
          "12 zł Zupa Krem z pora z pulpecikami",
          "11 zł Zupa Fasolowa"
        ],
        "Mączne": [
          "18 zł knedle z owocami"
        ],
        "Desery": [
          "12 zł serniczek z czekoladą",
          "12 zł kinder bueno deser"
        ],
        "Sałatki": [
          "21 zł burrata z pomidorem z malinowym balsamico",
          "22 zł bowl z kurczakiem teriyaki"
        ],
        "Makaron": [
          "19 zł makaron udon"
        ],
        "Stałe codziennie": []
      },
      "Środa": {
        "Dania mięsne": [
          "21 zł Kotlet z kurczaka w panierce, purée ziemniaczane, mizeria",
          "20 zł Wątróbka z cebulką i jabłkami, purée ziemniaczane, surówka z kiszonego ogórka",
          "21 zł Pulpety w sosie warzywno pomidorówym, ziemniaki gotowane, surówka",
          "22 zł Bitki wieprzowe, ziemniaki gotowane, surówka"
        ],
        "Dania wege": [
          "19 zł Marynowane Tofu w sosie bbq z ryżem, surówka",
          "19 zł Cukinia faszerowana mozzarella i suszonymi pomidorami"
        ],
        "Zupy": [
          "11 zł Flaki drobiowe",
          "12 zł Zupa cebulowa"
        ],
        "Mączne": [
          "18 zł Naleśniki z pieczarkami i serem"
        ],
        "Desery": [
          "12 zł brownie bananowe",
          "12 zł rafaello deser"
        ],
        "Sałatki": [
          "21 zł sałatka z arbuzem typu feta",
          "21 zł sałatka z pieczonym bobem"
        ],
        "Makaron": [
          "19 zł Arrabbiata Spaghetti"
        ],
        "Stałe codziennie": []
      },
      "Czwartek": {
        "Dania mięsne": [
          "22 zł Schabowy, mizeria, purée ziemniaczane",
          "21 zł Kotlet faszerowany śliwką, ziemniaki opiekane, surówka",
          "21 zł Zielone curry z kurczakiem z ryżem",
          "22 zł Szynka w sosie chrzanowym, Kasza gryczana, surówka"
        ],
        "Dania wege": [
          "18 zł udon wege",
          "19 zł Zapiekanka warzywna z fetą"
        ],
        "Zupy": [
          "11 zł Krem z buraka",
          "11 zł chłodnik"
        ],
        "Mączne": [
          "18 zł Pierogi z serem z musem owocowym"
        ],
        "Desery": [
          "12 zł tapioka",
          "12 zł mus pomarańczowy z chia"
        ],
        "Sałatki": [
          "23 zł shrimps bowl",
          "21 zł kurczak z pomarańczą"
        ],
        "Makaron": [
          "20 zł farfalle z bekonem i pomidorami"
        ],
        "Stałe codziennie": []
      },
      "Piątek": {
        "Dania mięsne": [
          "22 zł Dorsz w cieście piwnym, purée ziemniaczane, surówka z kiszonej kapusty",
          "20 zł Gołąbki w sosie pomidorówym, purée ziemniaczane",
          "20 zł kurczak w sosie słodko kwasnym z ryżem",
          "21 zł rolada z kurczaka z pieczarkami, ziemniaki zapiekane , surówka"
        ],
        "Dania wege": [
          "19 zł Spaghetti Aglio Oglio",
          "19 zł Kotleciki sojowe"
        ],
        "Zupy": [
          "11 zł Ogórkowa",
          "11 zł Pieczarkowa"
        ],
        "Mączne": [
          "18 zł krokiety z kapustą i pieczarkami"
        ],
        "Desery": [
          "12 zł snickers deser",
          "12 zł śliwka pod kruszonką"
        ],
        "Sałatki": [
          "20 zł Cezar",
          "23 zł Bowl z pieczonym łososiem z sosem mango"
        ],
        "Makaron": [
          "21 zł penne z łososiem"
        ],
        "Stałe codziennie": []
      }
    }
  };
  
  const sandwiches = [
    "Tuńczyk z kukurydzą z majonezem",
    "Pulled Pork BBQ, piklowana cebula, ogórek po tajsku",
    "A la Cezar",
    "Krewetki Mary Rose, Sałata, Kiełki",
    "Bajgiel z łososiem",
    "Kurczak teriyaki z ogórkiem z cebulą"
  ];
  
  /* ─── SVG icons ─────────────────────────────────────────── */
  const svgCalendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;
  const svgDownload = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  const svgClose = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const svgChevronLeft  = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
  const svgChevronRight = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

  /* ─── Price badge parser ──────────────────────────────── */
  function parseDish(text) {
    const m = String(text).match(/^(\d+\s*zł)\s+([\s\S]*)/);
    let price = null;
    let name = String(text).trim();
    
    if (m) {
      price = m[1].trim();
      name = m[2].trim();
    }
    
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    return { price, name };
  }

  /* ─── Render menu items ───────────────────────────────── */
  function renderItems(items, numbered) {
    return items.map((text, i) => {
      const { price, name } = parseDish(text);
      const numberBadge = `<span class="wmp-item-num">${i + 1}.</span>`;
      const priceBadge = price ? `<span class="wmp-price-badge-end">${price}</span>` : '';
      
      return `
        <div class="wmp-menu-item">
          ${numberBadge}
          <div class="wmp-item-body">
            <span class="wmp-item-name">${name}</span>
          </div>
          ${priceBadge}
        </div>
      `;
    }).join('');
  }

  /* ─── Get non-empty categories for week+day ───────────── */
  function getAvailableCats(weekName, dayName) {
    const dayData = ((weeklyMenu[weekName] || {})[dayName]) || {};
    return CAT_ORDER.filter(cat => {
      const items = dayData[cat];
      return Array.isArray(items) && items.length > 0;
    });
  }

  /* ─── Render category content area ───────────────────── */
  function renderCategoryView(weekName, dayName, catName) {
    const isSandwich = catName === SANDWICHES_KEY;
    const items  = isSandwich
      ? sandwiches
      : (((weeklyMenu[weekName] || {})[dayName] || {})[catName] || []);
    const icon   = catIcons[catName]       || catIcons['Dania mięsne'];
    const photo  = categoryPhotos[catName] || categoryPhotos['Dania mięsne'];

    return `
      <div class="wmp-category-view">
        <div class="wmp-content-card">
          <div class="wmp-list-col">
            <div class="wmp-cat-heading">
              <div class="wmp-cat-heading-icon">
                <img src="${icon}" alt="" loading="lazy" />
              </div>
              <div class="wmp-cat-heading-copy">
                <h2>${catName}</h2>
                <div class="wmp-heading-divider"></div>
              </div>
            </div>
            <div class="wmp-items-list">
              ${renderItems(items, isSandwich)}
            </div>
          </div>
          <div class="wmp-photo-col">
            <img class="wmp-food-photo" src="${photo}" alt="${catName}" loading="lazy" />
          </div>
        </div>
      </div>
    `;
  }

  /* ─── Render sidebar ──────────────────────────────────── */
  function renderSidebar(weekName, dayName, activeCat) {
    const availableCats = [...getAvailableCats(weekName, dayName), SANDWICHES_KEY];

    const catItems = availableCats.map(cat => `
      <li>
        <button class="wmp-cat-btn${cat === activeCat ? ' active' : ''}" data-cat="${cat}" type="button">
          <div class="wmp-cat-icon-wrap">
            <img src="${catIcons[cat] || catIcons['Dania mięsne']}" alt="" loading="lazy" />
          </div>
          ${cat}
        </button>
      </li>
    `).join('');

    return `
      <aside class="wmp-sidebar">
        <div class="wmp-avatar-wrap">
          <div class="wmp-avatar">
            <img src="${chefAvatar}" alt="Kucharz Pycha Catering" loading="lazy" />
          </div>
        </div>
        <div class="wmp-cat-label">Wybierz kategorię</div>
        <ul class="wmp-cat-list">
          ${catItems}
        </ul>
        <div class="wmp-fresh-box">
          <h4>Świeże składniki</h4>
          <p>Codziennie wybieramy najlepsze produkty od lokalnych dostawców.</p>
        </div>
        <button class="wmp-pdf-btn" type="button" data-print-menu>
          ${svgDownload}
          Pobierz PDF
        </button>
      </aside>
    `;
  }

  /* ─── Render main area ────────────────────────────────── */
  function renderMain(weekIdx, dayIdx, activeCat) {
    const weekName = WEEKS[weekIdx];
    const dayName  = DAYS_ORDER[dayIdx];

    const dayTabs = DAYS_ORDER.map((d, i) =>
      `<button class="catering-day-btn${i === dayIdx ? ' active' : ''}" data-day-idx="${i}" type="button" aria-label="${d}">${DAYS_SHORT[d]}</button>`
    ).join('');

    return `
      <div class="wmp-main">
        <div class="wmp-header">
          <div class="wmp-title-group">
            <h1 class="wmp-title">Menu tygodniowe</h1>
            <div class="wmp-date-row">
              ${svgCalendar}
              <span id="cateringSubtitle">${weekName} · ${dayName}</span>
            </div>
          </div>
          <button class="catering-close-btn" id="cateringCloseBtn" aria-label="Zamknij menu">
            ${svgClose}
          </button>
        </div>

        <div class="wmp-week-nav" id="wmpWeekNav">
          <button class="wmp-week-arrow" id="wmpWeekPrev" type="button" aria-label="Poprzedni tydzień"${weekIdx <= 0 ? ' disabled' : ''}>
            ${svgChevronLeft}
          </button>
          <span class="wmp-week-label" id="wmpWeekLabel">${weekName}</span>
          <button class="wmp-week-arrow" id="wmpWeekNext" type="button" aria-label="Następny tydzień"${weekIdx >= TOTAL_WEEKS - 1 ? ' disabled' : ''}>
            ${svgChevronRight}
          </button>
        </div>

        <div class="catering-tabs-container">
          <div class="catering-days" id="cateringDays">
            ${dayTabs}
          </div>
        </div>

        <div class="catering-body" id="cateringBody">
          ${renderCategoryView(weekName, dayName, activeCat)}
        </div>
      </div>
    `;
  }

  /* ─── Focus trap ──────────────────────────────────────── */
  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
    modal.addEventListener('keydown', handler);
    return () => modal.removeEventListener('keydown', handler);
  }

  /* ─── Liquid-reveal animation ─────────────────────────── */
  function createLiquidReveal(triggerEl, onComplete) {
    if (!window.gsap || !triggerEl) { onComplete(); return; }

    const rect    = triggerEl.getBoundingClientRect();
    const cx      = rect.left + rect.width  / 2;
    const cy      = rect.top  + rect.height / 2;
    const maxDim  = Math.max(window.innerWidth, window.innerHeight);
    const endSize = maxDim * 2.8;

    const ripple = document.createElement('div');
    ripple.className = 'menu-btn-ripple';
    const startSize = Math.max(rect.width, rect.height);
    Object.assign(ripple.style, {
      width:  startSize + 'px',
      height: startSize + 'px',
      left:   (cx - startSize / 2) + 'px',
      top:    (cy - startSize / 2) + 'px'
    });
    document.body.appendChild(ripple);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ripple, {
          opacity: 0, duration: 0.18,
          onComplete: () => { ripple.remove(); }
        });
        onComplete();
      }
    });

    tl.to(ripple, { scale: endSize / startSize, opacity: 1, duration: 0.55, ease: 'power2.inOut' });
  }

  /* ─── Main setup ──────────────────────────────────────── */
  function setupWeeklyPopup() {
    const overlay = document.getElementById('cateringOverlay');
    const modal   = document.getElementById('cateringModal');

    if (!overlay || !modal) return;

    let activeWeekIdx = 0;
    let activeDayIdx  = 0;
    let activeCat     = CAT_ORDER[0]; /* 'Dania mięsne' */
    let isOpen        = false;
    let openTimeline  = null;
    let closeTimeline = null;
    let removeTrap    = () => {};

    /* ── Ensure activeCat is valid for current week/day ─── */
    function normalizeActiveCat() {
      const weekName  = WEEKS[activeWeekIdx];
      const dayName   = DAYS_ORDER[activeDayIdx];
      const available = [...getAvailableCats(weekName, dayName), SANDWICHES_KEY];
      if (!available.includes(activeCat)) {
        activeCat = available[0] || SANDWICHES_KEY;
      }
    }

    /* ── Full re-render of the modal contents ────────────── */
    function fullRender() {
      normalizeActiveCat();
      const weekName = WEEKS[activeWeekIdx];
      const dayName  = DAYS_ORDER[activeDayIdx];
      modal.innerHTML = renderSidebar(weekName, dayName, activeCat) + renderMain(activeWeekIdx, activeDayIdx, activeCat);
      wireEvents();
    }

    /* ── Wire all interactive elements ───────────────────── */
    function wireEvents() {
      modal.querySelector('#cateringCloseBtn')
        ?.addEventListener('click', closeModal);

      modal.querySelector('#wmpWeekPrev')
        ?.addEventListener('click', () => switchWeek(activeWeekIdx - 1));
      modal.querySelector('#wmpWeekNext')
        ?.addEventListener('click', () => switchWeek(activeWeekIdx + 1));

      modal.querySelectorAll('.catering-day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.dayIdx, 10);
          if (isNaN(idx) || idx === activeDayIdx) return;
          switchDay(idx);
        });
      });

      modal.querySelectorAll('.wmp-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cat = btn.dataset.cat;
          if (!cat || cat === activeCat) return;
          switchCategory(cat);
        });
      });

      modal.querySelector('[data-print-menu]')
        ?.addEventListener('click', () => window.print());
    }

    /* ── Animate body, execute fn() in the middle ────────── */
    function animateBody(fn, dir) {
      const body = modal.querySelector('#cateringBody');
      if (!body || !window.gsap) { fn(); return; }
      const d = dir || 1;
      gsap.to(body, {
        opacity: 0, y: -5 * d, duration: 0.13, ease: 'power2.in',
        onComplete: () => {
          fn();
          const newBody = modal.querySelector('#cateringBody');
          if (newBody) {
            newBody.scrollTop = 0;
            gsap.fromTo(newBody,
              { opacity: 0, y: 6 * d },
              { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }
            );
          }
        }
      });
    }

    /* ── Switch category (body only, sidebar unchanged) ──── */
    function switchCategory(cat) {
      activeCat = cat;
      modal.querySelectorAll('.wmp-cat-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.cat === cat)
      );
      const weekName = WEEKS[activeWeekIdx];
      const dayName  = DAYS_ORDER[activeDayIdx];
      animateBody(() => {
        const body = modal.querySelector('#cateringBody');
        if (body) body.innerHTML = renderCategoryView(weekName, dayName, activeCat);
      });
    }

    /* ── Switch day ───────────────────────────────────────── */
    function switchDay(idx) {
      activeDayIdx = idx;
      normalizeActiveCat();
      animateBody(() => fullRender());
    }

    /* ── Switch week ──────────────────────────────────────── */
    function switchWeek(newIdx) {
      if (newIdx < 0 || newIdx >= TOTAL_WEEKS) return;
      const prevIdx    = activeWeekIdx;
      activeWeekIdx    = newIdx;
      normalizeActiveCat();
      const dir = newIdx > prevIdx ? 1 : -1;

      /* animate week-nav + body together */
      const nav  = modal.querySelector('#wmpWeekNav');
      const body = modal.querySelector('#cateringBody');
      if (!window.gsap || !body) { fullRender(); return; }

      gsap.to([nav, body].filter(Boolean), {
        opacity: 0, y: -6 * dir, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          fullRender();
          const newBody = modal.querySelector('#cateringBody');
          const newNav  = modal.querySelector('#wmpWeekNav');
          if (newBody) newBody.scrollTop = 0;
          if (newBody) gsap.fromTo(newBody, { opacity: 0, y: 8 * dir }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
          if (newNav)  gsap.fromTo(newNav,  { opacity: 0, y: 8 * dir }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' });
        }
      });
    }

    /* ── OPEN modal ─────────────────────────────────────── */
    function openModal(event, triggerEl) {
      if (isOpen) return;
      if (event) event.preventDefault();
      if (openTimeline)  openTimeline.kill();
      if (closeTimeline) closeTimeline.kill();

      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      isOpen = true;

      fullRender();

      const doOpen = () => {
        if (!window.gsap) {
          overlay.style.opacity = '1';
          modal.style.opacity   = '1';
          modal.style.transform = 'none';
          modal.focus();
          removeTrap = trapFocus(modal);
          return;
        }

        openTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            modal.focus();
            removeTrap = trapFocus(modal);
          }
        });

        openTimeline.fromTo(overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.22, ease: 'power2.out' }
        );

        openTimeline.fromTo(modal,
          { y: 32, scale: 0.93, opacity: 0 },
          { y: 0,  scale: 1,    opacity: 1, duration: 0.48, ease: 'back.out(1.1)' },
          '-=0.10'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.wmp-sidebar, .wmp-header, .wmp-week-nav, .catering-tabs-container'),
          { y: 10, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.28, stagger: 0.06 },
          '-=0.28'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.wmp-cat-btn'),
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22, stagger: 0.04, ease: 'power2.out' },
          '-=0.20'
        );

        openTimeline.fromTo(
          modal.querySelectorAll('.catering-day-btn'),
          { y: 6, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.22, stagger: 0.035, ease: 'back.out(1.5)' },
          '-=0.18'
        );

        openTimeline.fromTo(
          modal.querySelector('#cateringBody'),
          { y: 14, opacity: 0 },
          { y: 0,  opacity: 1, duration: 0.28, ease: 'power2.out' },
          '-=0.14'
        );
      };

      if (triggerEl && window.gsap) {
        createLiquidReveal(triggerEl, doOpen);
      } else {
        doOpen();
      }
    }

    /* ── CLOSE modal ─────────────────────────────────────── */
    function closeModal() {
      if (!isOpen) return;
      if (openTimeline)  openTimeline.kill();
      if (closeTimeline) closeTimeline.kill();

      removeTrap();
      isOpen = false;

      const finish = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (window.gsap) gsap.set(modal, { clearProps: 'all' });
      };

      if (!window.gsap) {
        overlay.style.opacity = '0';
        modal.style.opacity   = '0';
        finish();
        return;
      }

      closeTimeline = gsap.timeline({ onComplete: finish });

      closeTimeline.to(modal.querySelector('#cateringBody'),
        { y: 8, opacity: 0, duration: 0.14, ease: 'power2.in' }
      );

      closeTimeline.to(modal,
        { y: 20, scale: 0.94, opacity: 0, duration: 0.20, ease: 'power3.in' },
        '-=0.06'
      );

      closeTimeline.to(overlay,
        { opacity: 0, duration: 0.16, ease: 'power2.inOut' },
        '-=0.08'
      );
    }

    /* ── Event listeners ─────────────────────────────────── */

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    document.querySelectorAll('#openMenuModal, #openMenuModal2, #openMenuModal3, .mobile-menu-sticky-btn').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openModal(event, trigger);
      }, { capture: true });
    });

    if (new URLSearchParams(window.location.search).get('menuPopup') === '1') {
      document.documentElement.classList.add('weekly-popup-snapshot');
      window.setTimeout(() => openModal(null, null), 150);
    }
  }

  /* ─── Boot ────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWeeklyPopup);
  } else {
    setupWeeklyPopup();
  }
})();
