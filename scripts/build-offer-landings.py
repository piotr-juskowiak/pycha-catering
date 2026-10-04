#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HEAD_LINKS = """  <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W==" referrerpolicy="no-referrer" rel="stylesheet" />
  <link href="/assets/cdn.prod.website-files.com/68a167c0dafd6cd106a07924/css/forkly.webflow.shared.8b3cd058b.css" rel="stylesheet" type="text/css" />
  <link href="/assets/home-fonts.css" rel="stylesheet" type="text/css" />
  <link href="/assets/home-base.css" rel="stylesheet" type="text/css" />
  <link href="/main-styles.css" rel="stylesheet" type="text/css" />
  <link href="/custom-styles.css?v=6" rel="stylesheet" type="text/css" />
  <link href="/assets/inline-sections.css?v=21" rel="stylesheet" type="text/css" />
  <link href="/assets/offer-landing.css?v=15" rel="stylesheet" type="text/css" />
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>"""

PAGES = [
    {
        "slug": "imprezy-firmowe",
        "nav": "Imprezy firmowe",
        "kicker": "Integracje i jubileusze",
        "title": "Catering",
        "title_accent": "na imprezy firmowe",
        "full_title": "Catering na imprezy firmowe",
        "meta_title": "Catering na imprezy firmowe Sochaczew i Żyrardów | Pycha",
        "meta_description": "Catering firmowy na integracje, wigilie i jubileusze. Bufet, finger food i ciepłe dania z dowozem w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Impreza firmowa ma swój rytm: powitanie, toast, rozmowy i luźniejsze zakończenie. Układamy menu, ilości i godzinę dostawy tak, żeby stół działał przez całe spotkanie, a organizator mógł zająć się ludźmi.",
        "image": "/assets/order-occasions/imprezy.webp",
        "image_alt": "Wspólny lunch firmowy przy długim stole",
        "meta": ["Sochaczew i Żyrardów", "Od kilkunastu do ok. 150 osób", "Ciepłe dania i finger food"],
        "teaser": "Bufet albo porcje na integrację, wigilę i jubileusz firmy.",
        "intro_title": "Jak wygląda catering na imprezy firmowe",
        "story": [
            "Impreza firmowa rzadko kończy się na jednym daniu. Ludzie wchodzą o różnych godzinach, część stoi z kieliszkiem, część siada do stołu, a organizator i tak musi pilnować powitania, prezentu i programu.",
            "Dlatego catering na imprezy firmowe układamy od charakteru spotkania, nie od przypadkowej karty. Najpierw pytamy, czy to wigilia w biurze, integracja po konferencji, jubileusz czy letni piknik. Od tego zależy, czy na stole mają być ciepłe dania, finger food, czy jedno i drugie.",
            "Jako catering firmowy z Sochaczewa dowozimy zamówienia do Żyrardowa i okolic. Jedzenie przyjeżdża gotowe do podania, z oznaczonymi dietami i ilościami dopiętymi do listy gości. Wy zajmujecie się ludźmi. My stołem.",
            "Menu może być krótkie i sycące albo rozciągnięte na kilka godzin: powitanie, danie główne, deser i coś małego na koniec. Nie dokładamy pozycji na zapas. Dokładamy to, co naprawdę zostanie zjedzone.",
            "Jeśli potrzebujecie też lunchu dla zespołu albo przerwy kawowej przy innym spotkaniu, da się to zaplanować osobno. Impreza ma swój rytm. Codzienny catering dla firm — inny.",
        ],
        "note": "Najlepszy moment na pierwsze zapytanie to chwila, gdy znacie datę, miejsce i orientacyjną liczbę osób. Resztę menu da się dograć później.",
        "fits": [
            "Wigilia i spotkanie świąteczne w biurze",
            "Integracja zespołu po projekcie albo szkoleniu",
            "Jubileusz firmy i wieczór dla partnerów",
            "After work po konferencji",
            "Piknik firmowy w ogrodzie albo pod namiotem",
        ],
        "cards_title": "Co ustalamy w cateringu firmowym",
        "cards_intro": "Dobra impreza nie potrzebuje dwudziestu pozycji. Potrzebuje jedzenia, które da się zjeść w tym rytmie, w jakim naprawdę przebiega spotkanie.",
        "cards": [
            ("Integracja bez kolejek", "Bufet albo gotowe porcje ustawiamy tak, żeby goście mogli jeść i rozmawiać, zamiast stać w długiej linii po talerz."),
            ("Menu pod charakter spotkania", "Inaczej komponujemy wigilę firmową, inaczej letni piknik, a inaczej wieczór po konferencji. Propozycja wynika z godziny, miejsca i liczby osób."),
            ("Diety ogarnięte z wyprzedzeniem", "Warianty wegetariańskie, wegańskie i bezglutenowe oznaczamy czytelnie, żeby nikt nie musiał dopytywać przy stole."),
        ],
        "included_title": "Co wchodzi w menu na imprezę firmową",
        "included": [
            ("Dania ciepłe", "Główne dania w porcjach albo w wariantach do samodzielnego nakładania, dopasowane do pory roku i długości spotkania."),
            ("Przekąski i finger food", "Małe dania, które da się zjeść w biegu: na powitanie, podczas networkingu albo przy after work."),
            ("Desery i napoje", "Słodkości, woda, kawa i herbata. Na życzenie dokładamy sezonowe dodatki albo wariant bez cukru."),
            ("Dowóz i ustawienie", "Przywozimy jedzenie gotowe do podania. Pomagamy rozstawić poczęstunek i ogarnąć ilości na miejscu."),
        ],
        "steps_title": "Jak wygląda zamówienie",
        "steps": [
            ("Napisz, jaka to impreza", "Podaj datę, liczbę gości, miejsce i czy spotkanie jest stołowe, stojące, czy mieszane."),
            ("Dostajesz konkretną propozycję", "Dobieramy menu, porcje i godzinę dostawy. Dopytujemy tylko o to, co naprawdę zmienia ofertę."),
            ("Przywozimy jedzenie na czas", "W dniu imprezy dowozimy zamówienie do biura, sali albo ogrodu i zostawiamy je gotowe do podania."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Na ile osób robicie catering na imprezę firmową?", "Najczęściej obsługujemy spotkania od kilkunastu do około 150 gości. Przy większej grupie też damy radę, ale wcześniej ustalimy logistykę sali i wydawania porcji."),
            ("Czy da się zamówić catering na wigilę firmową albo piknik?", "Tak. Dopasowujemy menu do sezonu i charakteru wydarzenia: od ciepłych dań na zimowe spotkanie po lżejsze zestawy na integrację na zewnątrz."),
            ("Jak wcześnie trzeba złożyć zamówienie?", "Im wcześniej, tym spokojniej dobierzemy ilości i diety. Przy mniejszych grupach często wystarczy kilka dni roboczych, przy większych imprezach lepiej zgłosić się z większym wyprzedzeniem."),
            ("Czy przyjeżdżacie z obsługą, czy tylko z jedzeniem?", "Standardowo dowozimy i ustawiamy poczęstunek. Jeśli impreza wymaga kogoś przy stole przez cały wieczór, powiedzcie o tym od razu, dobierzemy format."),
            ("Czy robicie catering na imprezy firmowe w Sochaczewie i Żyrardowie?", "Tak. To nasz codzienny teren. Dowozimy do biur, sal i ogrodów w Sochaczewie, Żyrardowie i okolicach."),
            ("Czy można połączyć bufet z finger food?", "Tak. Często tak robimy: coś małego na powitanie i sycące danie, gdy goście już zostaną."),
        ],
        "form_hint": "Data, liczba gości, godzina i czy potrzebny bufet, finger food albo ciepły obiad",
    },
    {
        "slug": "szkolenia-i-konferencje",
        "nav": "Szkolenia i konferencje",
        "kicker": "Przerwy i lunche",
        "title": "Catering",
        "title_accent": "na szkolenia i konferencje",
        "full_title": "Catering na szkolenia i konferencje",
        "meta_title": "Catering na szkolenia i konferencje | Sochaczew, Żyrardów",
        "meta_description": "Catering na szkolenia i konferencje: przerwy kawowe, lunch i coffee break pod agendę. Dowóz w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Na szkoleniu liczy się czas. Kawa ma czekać przed pierwszą sesją, a lunch nie może zająć pół popołudnia. Układamy przerwy i posiłki pod agendę, liczbę uczestników i warunki w sali.",
        "image": "/assets/order-occasions/szkolenia.webp",
        "image_alt": "Przerwa kawowa podczas szkolenia",
        "meta": ["Przerwa kawowa i lunch", "Dostawa pod program", "Oznaczone diety"],
        "teaser": "Kawa, przekąski i lunch, które nie rozjeżdżają agendy.",
        "intro_title": "Catering na szkolenia, który nie rozjeżdża agendy",
        "story": [
            "Szkolenie i konferencja mają twardy harmonogram. Jeśli przerwa się rozjedzie, rozjedzie się cały dzień: trener czeka, sala stygnie, a organizator tłumaczy, czemu wracacie z lunchu o kwadrans za późno.",
            "Dlatego catering na szkolenia i konferencje zaczynamy od godzin, nie od karty dań. Potrzebujemy startu, przerw i lunchu. Od tego zależy, czy wjeżdżają boxy, krótki coffee break, czy szerszy bufet przy dłuższej pauzie.",
            "Jedzenie ma dawać energię, a nie senność po drugim daniu. Porcje są sycące, ale lekkie. Diety podpisujemy tak, żeby nikt nie musiał zgadywać przy stole, co może wziąć.",
            "Dowozimy do sal szkoleniowych, hoteli i biur w Sochaczewie, Żyrardowie i okolicach. Przed wydarzeniem ustalamy godzinę wjazdu, miejsce rozstawienia i osobę, która wpuści dostawę.",
            "Jeśli po bloku merytorycznym potrzebujecie tylko kawy, zostajemy przy przerwie kawowej. Jeśli ludzie są na sali cały dzień, dokładamy lunch. Catering firmowy ma służyć programowi, nie odwrotnie.",
        ],
        "note": "Przy 15-minutowej przerwie wszystko musi stać gotowe wcześniej. Dopytujemy więc nie tylko o godzinę lunchu, ale też o to, od której można wjechać do obiektu.",
        "fits": [
            "Całodniowe szkolenie w sali konferencyjnej",
            "Warsztat z dwiema albo trzema przerwami",
            "Konferencja z lunchem po bloku porannym",
            "Szkolenie zamknięte w hotelu albo przestrzeni eventowej",
            "Dzień otwarty z krótkim programem i poczęstunkiem",
        ],
        "cards_title": "Jak trzymamy dzień szkolenia w ryzach",
        "cards_intro": "Dobry catering konferencyjny jest prawie niewidoczny. Stoi na czas, znika z drogi i nie zostawia organizatorowi kolejnej rzeczy do pilnowania.",
        "cards": [
            ("Przerwa, która nie rozjeżdża programu", "Krótkie okna czasowe wymagają jedzenia, które da się wziąć od razu. Bez krojenia, bez kolejek i bez bałaganu na sali."),
            ("Lunch po bloku merytorycznym", "Boxy albo bufet ustawiamy tak, żeby uczestnicy zdążyli zjeść i wrócić na czas. Porcje są sycące, ale nie ciężkie."),
            ("Jedna osoba kontaktowa", "Przed wydarzeniem ustalamy godzinę wjazdu, miejsce rozstawienia i osobę, która wpuści dostawę."),
        ],
        "included_title": "Co wchodzi w catering na konferencję",
        "included": [
            ("Poranna kawa i herbata", "Napoje, woda i drobne przekąski czekają, zanim uczestnicy wejdą na salę."),
            ("Przerwa kawowa", "Kanapki, owoce, wypieki albo lżejsze finger food dopasowane do pory dnia."),
            ("Lunch w boxach lub bufet", "Indywidualne zestawy ułatwiają diety. Bufet sprawdza się przy dłuższej przerwie i większej przestrzeni."),
            ("Oznaczenia diet", "Warianty wegetariańskie, wegańskie i bezglutenowe podpisujemy tak, żeby organizator nie musiał tłumaczyć każdej porcji."),
        ],
        "steps_title": "Jak to planujemy",
        "steps": [
            ("Zaczynamy od harmonogramu", "Potrzebujemy godzin startu, przerw i lunchu. Od tego zależy, co i kiedy ma stać na miejscu."),
            ("Dobieramy format pod salę", "W ciasnym korytarzu lepiej sprawdzą się boxy. Przy większej przestrzeni można rozstawić bufet."),
            ("Potwierdzamy liczbę porcji", "Ustalamy dzień, w którym zamykamy listę uczestników, trenerów i obsługi."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy lunch musi być w indywidualnych pudełkach?", "Nie. Boxy są wygodne przy dietach i mniejszej sali. Bufet daje większy wybór, ale potrzebuje miejsca i sprawnej kolejki."),
            ("Ile trwa przerwa kawowa, żeby wszystko zdążyć?", "Przy krótkiej, 15-minutowej przerwie wszystko musi stać gotowe wcześniej. Dlatego dopytujemy o godzinę możliwego wjazdu do obiektu."),
            ("Czy obsługujecie szkolenia poza biurem?", "Tak, dowozimy do sal szkoleniowych, hoteli i przestrzeni eventowych w Sochaczewie, Żyrardowie i okolicach."),
            ("Co jeśli liczba uczestników zmieni się w ostatniej chwili?", "Drobne korekty da się wprowadzić, jeśli wiemy o nich z wyprzedzeniem. Duże cięcia albo dopiski w dniu wydarzenia ustalamy indywidualnie, bo wpływają na ilości i diety."),
            ("Czy dowozicie catering na szkolenia do Żyrardowa?", "Tak. Obsługujemy sale w Żyrardowie, Sochaczewie i okolicach. Przy pierwszym kontakcie podajcie adres obiektu i godziny przerw."),
            ("Czy coffee break i lunch można zamówić razem?", "Tak. To najczęstszy zestaw na całodniowe szkolenie: poranna kawa, przerwa i lunch po bloku merytorycznym."),
        ],
        "form_hint": "Godziny przerw i lunchu, liczba osób, adres sali i czy potrzebne boxy",
    },
    {
        "slug": "uroczystosci-rodzinne",
        "nav": "Uroczystości rodzinne",
        "kicker": "W domu i w ogrodzie",
        "title": "Catering",
        "title_accent": "na uroczystości rodzinne",
        "full_title": "Catering na uroczystości rodzinne",
        "meta_title": "Catering na uroczystości rodzinne | Sochaczew i Żyrardów",
        "meta_description": "Catering na chrzciny, komunie i urodziny. Ciepły obiad, przekąski i desery z dowozem do domu w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Rodzinne przyjęcie ma być ciepłe i bez pośpiechu. Dowozimy ciepłe dania, przekąski i słodkości tak, żeby gospodarze mogli świętować z bliskimi, a nie krążyć między kuchnią a stołem.",
        "image": "/assets/order-occasions/uroczystosci.webp",
        "image_alt": "Stół na uroczystość rodzinną",
        "meta": ["Chrzciny, komunie, urodziny", "Gotowe do podania", "Spokój dla gospodarzy"],
        "teaser": "Obiad, przekąski i deser, żebyście mogli być z gośćmi.",
        "intro_title": "Catering na uroczystości rodzinne bez dyżuru w kuchni",
        "story": [
            "Najgorsza chwila rodzinnego przyjęcia to ta, w której gospodarz znika w kuchni. Goście już są, dzieci pytają o ciasto, a na kuchence zostaje jeszcze jedno danie, które zaraz będzie.",
            "Dlatego catering na uroczystości rodzinne przywozimy gotowy do postawienia na stole. Bez kombinowania z wieloma garnkami i bez dzwonienia, że obiad się spóźnia. Stół ma działać od powitania do deseru.",
            "Sprawdzamy się przy chrzcinach, komuniach, urodzinach i kameralnych przyjęciach w domu albo ogrodzie. Dowozimy do Sochaczewa, Żyrardowa i okolic. Można zostać przy jednym dobrym obiedzie albo rozbudować stół o przekąski i słodkości.",
            "Nie musicie mieć zaplecza gastronomicznego. Wystarczy stół, miejsce na naczynia i godzina, o której mają przyjść pierwsi goście. Resztę — ilości, diety i deser — dopytamy w jednej rozmowie.",
            "Jeśli obok przyjęcia rodzinnego organizujecie też coś firmowego, to osobna historia. Tu liczy się spokój gospodarzy, znajomy smak i jedzenie, które da się podać bez stresu.",
        ],
        "note": "Nie musicie mieć profesjonalnej zastawy ani zaplecza gastronomicznego. Wystarczy stół, miejsce na naczynia i godzina, o której mają przyjść pierwsi goście.",
        "fits": [
            "Chrzciny i przyjęcie po uroczystości",
            "Komunia w domu albo w ogrodzie",
            "Urodziny dorosłych i większe rodzinne popołudnie",
            "Rocznica, imieniny, kameralny jubileusz",
            "Spotkanie rodzinne, na którym nie chcecie gotować dla wszystkich",
        ],
        "cards_title": "Co zdejmujemy wam z głowy",
        "cards_intro": "Rodzinny stół nie musi wyglądać jak bankiet. Ma być sycący, znajomy i gotowy wtedy, gdy goście siadają.",
        "cards": [
            ("Obiad, który nie więzi w kuchni", "Dania przyjeżdżają gotowe do podania. Możecie być z gośćmi, a nie nad patelnią."),
            ("Dla dzieci i dorosłych", "Łączymy sycące dania główne z lżejszymi przekąskami i słodkościami, żeby stół działał przez całe popołudnie."),
            ("Mała i większa rodzina", "Sprawdzamy się zarówno przy kameralnym przyjęciu w domu, jak i przy większym stole w ogrodzie albo sali."),
        ],
        "included_title": "Co najczęściej jest na rodzinnym stole",
        "included": [
            ("Danie główne", "Ciepły obiad w porcjach albo zestaw do nakładania, dopasowany do liczby gości i pory roku."),
            ("Przekąski na powitanie", "Deska, sałatki albo małe dania, które można podać zanim wszyscy usiądą do stołu."),
            ("Tort i desery", "Słodki stół nie musi być skomplikowany. Dobieramy desery, które da się łatwo porcjować."),
            ("Napoje i dodatki", "Woda, soki i podstawowe dodatki. Na życzenie podpowiemy, czego nie warto dublować."),
        ],
        "steps_title": "Jak składacie zamówienie",
        "steps": [
            ("Opiszcie uroczystość", "Data, liczba osób, miejsce i czy goście jedzą przy stole, czy raczej w ogrodzie."),
            ("Wybieracie wariant menu", "Proponujemy konkretne dania i ilości. Można uprościć stół albo rozbudować go o przekąski i deser."),
            ("Dostawa pod godzinę przyjęcia", "Przywozimy jedzenie tak, żebyście zdążyli je rozstawić przed przyjściem pierwszych gości."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy dowozicie catering do domu?", "Tak. Najczęściej dostarczamy zamówienie pod wskazany adres w Sochaczewie, Żyrardowie i okolicach."),
            ("Czy trzeba mieć własną zastawę?", "Przy większości zamówień wystarczy Wasz stół i talerze. Jeśli potrzebujecie jednorazowych naczyń albo innego sposobu podania, ustalimy to wcześniej."),
            ("Da się uwzględnić diety gości?", "Tak. Najlepiej od razu podać liczbę osób na diecie wegetariańskiej, wegańskiej albo bezglutenowej."),
            ("Czy przyjmujecie zamówienia na niedziele i święta?", "Tak, o ile damy radę zaplanować produkcję i dostawę. Przy weekendowych uroczystościach warto odezwać się wcześniej niż przy zwykłym tygodniu."),
            ("Czy dowozicie catering na chrzciny i komunie do domu?", "Tak. Najczęściej wjeżdżamy pod wskazany adres w Sochaczewie, Żyrardowie i okolicach, zanim przyjdą pierwsi goście."),
            ("Czy da się zamówić sam obiad, bez przekąsek i tortu?", "Tak. Część rodzin zostaje przy jednym dobrym daniu głównym. Resztę stołu można dołożyć, jeśli ma to sens."),
        ],
        "form_hint": "Rodzaj uroczystości, data, liczba gości i adres domu albo sali",
    },
    {
        "slug": "eventy-i-premiery",
        "nav": "Eventy i premiery",
        "kicker": "Oprawa wydarzenia",
        "title": "Catering",
        "title_accent": "na eventy i premiery",
        "full_title": "Catering na eventy i premiery",
        "meta_title": "Catering na eventy i premiery | Pycha Catering",
        "meta_description": "Catering na eventy, premiery i otwarcia. Finger food i krótkie menu z dowozem w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Na premierze i otwarciu goście stoją, rozmawiają i robią zdjęcia. Catering ma być częścią oprawy: estetyczny, wygodny do zjedzenia w rozmowie i gotowy, zanim otworzycie drzwi.",
        "image": "/assets/order-occasions/eventy.webp",
        "image_alt": "Przekąski na event",
        "meta": ["Premiery i otwarcia", "Finger food", "Networking bez talerza obiadowego"],
        "teaser": "Finger food i krótkie menu, które dobrze wychodzi na zdjęciach.",
        "intro_title": "Catering na eventy, który nie konkuruje ze sceną",
        "story": [
            "Event ma pierwszą kwadrans, w której wszystko albo się klei, albo sypie. Goście wchodzą, szukają miejsca na kurtkę i kieliszek, a organizator nie może w tym momencie dostać telefonu, że catering stoi pod niewłaściwym wejściem.",
            "Catering na eventy i premiery ma więc wyglądać dobrze i dać się zjeść jedną ręką. Omijamy sosy, które kapną na ubranie, i dania, które wymagają siadania, jeśli wieczór jest stojący.",
            "Układamy krótkie menu: mniej pozycji, lepiej podanych. Finger food, kanapki i mały deser. Dopytujemy o zaplecze, windę i godzinę montażu, bo event nie lubi dostawy w ostatniej minucie na środku sceny.",
            "Dowozimy do lokali, salonów i przestrzeni eventowych w Sochaczewie, Żyrardowie i okolicach. Najczęściej wjeżdżamy i rozstawiamy poczęstunek zanim otworzycie drzwi.",
            "Jeśli po części oficjalnej jest dłuższa przerwa, można dołożyć sycące mini dania albo lunch. Samo otwarcie zwykle potrzebuje mniejszego, czystszego stołu.",
        ],
        "note": "Najczęściej wjeżdżamy i rozstawiamy poczęstunek zanim otworzycie drzwi. Potem stół po prostu działa, a wy możecie witać gości.",
        "fits": [
            "Premiera produktu albo nowej kolekcji",
            "Otwarcie salonu, biura albo punktu usługowego",
            "Wieczór networkingowy i after party",
            "Prezentacja dla partnerów i klientów",
            "Krótki event z finger food zamiast obiadu",
        ],
        "cards_title": "Co robi różnicę na evencie",
        "cards_intro": "Tu nie wygrywa najdłuższy bufet. Wygrywa poczęstunek, który wspiera pierwsze wrażenie i nie blokuje drogi do sceny.",
        "cards": [
            ("Jedzenie na stojąco", "Małe formy, które da się wziąć jedną ręką. Bez sosów kapriących się na ubranie i bez długiego siedzenia przy stole."),
            ("Wygląd ma znaczenie", "Układamy menu tak, żeby poczęstunek dobrze wyglądał na tacy, na zdjęciach i przy wejściu gości."),
            ("Logistyka pod lokal", "Dopytujemy o zaplecze, windę i godzinę montażu. Event nie lubi dostawy w ostatniej minucie na środku sceny."),
        ],
        "included_title": "Co przygotowujemy na premierę i otwarcie",
        "included": [
            ("Finger food i kanapki", "Małe przekąski na powitanie, podczas networkingu i na zakończenie części oficjalnej."),
            ("Słodki akcent", "Mini desery albo sezonowe słodkości, które domykają poczęstunek bez ciężkiego bufetu."),
            ("Napoje", "Woda, kawa i herbata. Resztę można dołożyć albo zostawić po stronie organizatora baru."),
            ("Ustawienie strefy", "Pomagamy zaplanować, gdzie poczęstunek nie zablokuje wejścia, sceny ani ścieżki gości."),
        ],
        "steps_title": "Jak domykamy event",
        "steps": [
            ("Zbieramy brief wydarzenia", "Godzina, liczba gości, charakter premiery i to, czy ludzie będą jeść w ruchu, czy przy stolikach."),
            ("Projektujemy krótkie menu", "Mniej pozycji, lepiej podanych. Na evencie liczy się tempo i pierwsze wrażenie."),
            ("Wjeżdżamy przed gośćmi", "Dostawa i rozstawienie kończą się zanim otworzycie drzwi. Potem poczęstunek po prostu działa."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy robicie tylko finger food, czy też ciepły lunch?", "Na eventach najczęściej sprawdzają się przekąski. Jeśli po części oficjalnej jest dłuższa przerwa, możemy dołożyć sycące mini dania albo lunch."),
            ("Czy obsłużycie otwarcie salonu albo premierę produktu?", "Tak. Takie wydarzenia lubią estetyczne, poręczne menu i punktualną dostawę przed wejściem pierwszych gości."),
            ("Ile pozycji menu warto mieć na evencie?", "Lepiej mniej, ale spójnie. Zbyt szeroki bufet spowalnia wydawanie i rozmywa wrażenie."),
            ("Czy potrzebujecie zaplecza kuchennego na miejscu?", "Zwykle nie. Przyjeżdżamy z jedzeniem gotowym do podania. Jeśli lokal ma trudny wjazd albo brak windy, powiedzcie o tym wcześniej."),
            ("Czy robicie catering na eventy firmowe w Sochaczewie?", "Tak. Obsługujemy premiery, otwarcia i wieczory networkingowe w Sochaczewie, Żyrardowie i okolicach."),
            ("Czym różni się ten catering od imprezy firmowej?", "Na evencie jedzenie ma wspierać pierwsze wrażenie i dać się zjeść w ruchu. Na imprezie firmowej częściej wjeżdża sycący bufet albo ciepły obiad."),
        ],
        "form_hint": "Typ eventu, godzina otwarcia drzwi, liczba gości i adres lokalu",
    },
    {
        "slug": "spotkania-biznesowe",
        "nav": "Spotkania biznesowe",
        "kicker": "Narady i klienci",
        "title": "Catering",
        "title_accent": "na spotkania biznesowe",
        "full_title": "Catering na spotkania biznesowe",
        "meta_title": "Catering na spotkania biznesowe | Lunch do biura",
        "meta_description": "Catering na spotkania biznesowe: schludny lunch i przekąski do biura. Dowóz w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Spotkanie z klientem albo zarządem nie potrzebuje wielkiego bufetu. Potrzebuje porządnego lunchu, czystego podania i ciszy w tle. Przygotowujemy zestawy, które da się rozdać w sali bez chaosu.",
        "image": "/assets/order-occasions/spotkania.webp",
        "image_alt": "Kameralny lunch na spotkanie biznesowe",
        "meta": ["Lunch bento", "Kameralne spotkania", "Biuro i sala konferencyjna"],
        "teaser": "Schludny lunch i przekąski na naradę z klientem albo zarządem.",
        "intro_title": "Catering na spotkania biznesowe, który nie rozprasza",
        "story": [
            "Na spotkaniu biznesowym jedzenie ma jedną robotę: nie rozpraszać. Nikt nie chce otwierać pudełka, z którego coś kapie na wydruk oferty, ani tłumaczyć gościowi, czemu jego porcja wygląda inaczej niż reszta stołu.",
            "Dlatego catering na spotkania biznesowe układamy jako kameralny lunch i lekkie przekąski w spójnych porcjach. Od kilku do kilkudziesięciu osób. Menu wygląda równo, nawet gdy część gości je inną dietę.",
            "Dostawa schodzi się z kalendarzem. Wnosimy zamówienie do sali albo aneksu w Sochaczewie, Żyrardowie i okolicznych biurach, zanim usiądziecie do rozmowy. Sztućce, serwetki i oznaczenia są częścią zestawu.",
            "Jeśli spotkanie jest krótkie, często wystarczy kawa, woda i kilka starannie podanych przekąsek. Lunch dokładamy wtedy, gdy ludzie naprawdę mają czas usiąść.",
            "To nie jest codzienny lunch pracowniczy ani bufet na integrację. Tu liczy się czyste podanie, jedna godzina i stół, przy którym da się spokojnie rozmawiać.",
        ],
        "note": "Jeśli spotkanie jest krótkie, często wystarczy kawa, woda i kilka starannie podanych przekąsek. Lunch dokładamy wtedy, gdy ludzie naprawdę mają czas usiąść.",
        "fits": [
            "Spotkanie z klientem w sali konferencyjnej",
            "Narada zarządu albo zespołu projektowego",
            "Rozmowa rekrutacyjna z lunchem",
            "Warsztat strategiczny dla kilku osób",
            "Wizyta partnerów w biurze",
        ],
        "cards_title": "Dlaczego ten format działa przy stole",
        "cards_intro": "Kameralne spotkanie nie wybacza przypadkowego pudełka. Ma wyglądać tak, jakby ktoś o nim pomyślał.",
        "cards": [
            ("Kameralna skala", "Od kilku do kilkudziesięciu osób. Menu wygląda spójnie, nawet gdy część gości je inną dietę."),
            ("Czyste podanie", "Boxy i porcje, które nie rozleją się na dokumenty. Sztućce, serwetki i oznaczenia są częścią zamówienia."),
            ("Godzina dopięta do kalendarza", "Dostawa schodzi się z agendą spotkania. Nie wjeżdżamy w środku prezentacji."),
        ],
        "included_title": "Co sprawdza się na spotkaniu z klientem",
        "included": [
            ("Lunch w porcjach", "Danie główne, dodatek i świeży element, które da się zjeść w 30-45 minut."),
            ("Lekkie przekąski", "Jeśli spotkanie zaczyna się rano albo ciągnie się po lunchu, dokładamy coś małego do kawy."),
            ("Warianty dla gości", "Można przygotować kilka identycznych zestawów i osobne diety, żeby stół wyglądał równo."),
            ("Dostawa do sali", "Wnosimy zamówienie tam, gdzie naprawdę jecie, nie tylko pod recepcję."),
        ],
        "steps_title": "Jak to zamawiacie",
        "steps": [
            ("Podajecie liczbę osób i godzinę", "Do tego dieta gości i adres sali. Tyle wystarczy, żebyśmy złożyli propozycję."),
            ("Wybieracie jeden spójny zestaw", "Na spotkaniu biznesowym lepiej wygląda kilka dopracowanych pozycji niż długi bufet."),
            ("Dostawa przed spotkaniem", "Jedzenie czeka w sali albo w aneksie, zanim usiądziecie do rozmowy."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy nadaje się to na spotkanie z klientem?", "Tak. Właśnie po to układamy schludne, porcjowane lunche, które nie wyglądają jak przypadkowy lunch z pudełka."),
            ("Jaka jest minimalna liczba osób?", "Obsługujemy też małe narady. Napiszcie liczbę gości, a dobierzemy format, który ma sens przy tym stole."),
            ("Czy można zamówić tylko przekąski, bez lunchu?", "Tak. Przy krótszych spotkaniach często wystarczy kawa, woda i kilka starannie podanych przekąsek."),
            ("Czy lunch przyjeżdża ciepły?", "Tak, dowiezione dania są gotowe do podania. Jeśli sala nie ma aneksu, dobierzemy format, który dobrze zniesie krótkie oczekiwanie."),
            ("Czy dowozicie catering na spotkanie biznesowe do biura w Sochaczewie?", "Tak. Wnosimy lunch do sali konferencyjnej albo aneksu w Sochaczewie, Żyrardowie i okolicach."),
            ("Czym ten lunch różni się od lunchu dla pracowników?", "Na spotkaniu z klientem stawiamy na jeden spójny zestaw i czyste podanie. Lunch pracowniczy jest od powtarzalności i łatwego potwierdzania porcji."),
        ],
        "form_hint": "Liczba osób, godzina spotkania, diety gości i adres sali",
    },
    {
        "slug": "lunch-dla-firm",
        "nav": "Lunch dla firm",
        "kicker": "Codzienne posiłki",
        "title": "Lunch",
        "title_accent": "dla firm i zespołów",
        "full_title": "Lunch dla firm i zespołów",
        "meta_title": "Lunch dla firm Sochaczew i Żyrardów | Catering pracowniczy",
        "meta_description": "Lunch dla firm i pracowników. Regularny catering pracowniczy z dowozem do biur w Sochaczewie, Żyrardowie i okolicach.",
        "lead": "Codzienny lunch w firmie działa wtedy, gdy jest przewidywalny: ta sama godzina, jasne porcje i menu, które da się potwierdzić z wyprzedzeniem. Dowozimy świeże posiłki w dni, w których ludzie naprawdę są na miejscu.",
        "image": "/assets/blog-covers/lunch-pracownikow.webp",
        "image_alt": "Świeże boxy lunchowe przygotowane do dostawy",
        "meta": ["Zamówienia cykliczne", "Dostawa do biura", "Menu na tydzień"],
        "teaser": "Regularny lunch do biura, magazynu i zespołu hybrydowego.",
        "intro_title": "Lunch dla firm, który nie spada na jedną osobę z open space",
        "story": [
            "W wielu firmach lunch organizuje się tak, że ktoś zbiera zamówienia na czacie, ktoś inny dzwoni po pizze, a o 13:40 wciąż brakuje dwóch porcji. To męczy bardziej niż samo jedzenie.",
            "Lunch dla firm układamy tak, żeby koordynator nie musiał pytać każdej osoby osobno. Raz ustalacie dni, widełki godzinowe i warianty. Potem zostaje tylko liczba porcji na dany dzień.",
            "To catering pracowniczy, nie jednorazowy event. Obsługujemy biura, magazyny i zakłady w Sochaczewie, Żyrardowie i okolicach. W modelu hybrydowym zmniejszacie ilości w dni z mniejszą frekwencją.",
            "Menu rotujemy, żeby zespół chciał zamawiać dalej. Diety wegetariańskie, wegańskie i bezglutenowe oznaczamy czytelnie. Godzina dostawy ma być stała, bo od tego zależy przerwa całego biura.",
            "Jeśli w niektóre dni potrzebujecie też coffee break albo lunch na spotkanie z klientem, da się to dołożyć. Sam lunch pracowniczy ma jednak zostać prostą rutyną, nie kolejnym projektem.",
        ],
        "note": "Najlepiej zacząć od kilku dni próbnych. Sprawdzicie godzinę dostawy, diety i to, czy zespół woli jeden zestaw dnia, czy dwa-trzy warianty.",
        "fits": [
            "Biuro, które chce stały lunch zamiast zrzutki na jedzenie",
            "Zespół hybrydowy z różną frekwencją w tygodniu",
            "Magazyn i produkcja z twardą przerwą",
            "Mała firma, która nie ma stołówki",
            "Dni szkoleniowe albo sprinty, gdy wszyscy są na miejscu",
        ],
        "cards_title": "Co sprawia, że lunch zostaje na dłużej",
        "cards_intro": "Ludzie odpuszczają catering nie dlatego, że jedzenie jest złe. Odpuszczają, gdy godzina skacze, porcje są niejasne, a menu kręci się w kółko.",
        "cards": [
            ("Stała godzina dostawy", "Zespół wie, kiedy jedzenie wjeżdża. To porządkuje przerwę i ogranicza dopytywanie w chatcie."),
            ("Menu, które da się rotować", "Nie serwujemy jednego dania w kółko. Układamy tygodnie tak, żeby ludzie chcieli zamawiać dalej."),
            ("Hybryda bez zgadywania", "W dni z mniejszą frekwencją zmniejszacie liczbę porcji. Nie musicie utrzymywać sztucznego minimum przez cały tydzień."),
        ],
        "included_title": "Jak wygląda lunch dla pracowników",
        "included": [
            ("Zestaw dnia", "Danie główne z dodatkami, które da się zjeść przy biurku albo w kuchni socjalnej."),
            ("Kilka wariantów", "Mięsny, wegetariański i w razie potrzeby wegański albo bezglutenowy. Porcje są oznaczone."),
            ("Dostawa pod firmę", "Przywozimy lunch do Sochaczewa, Żyrardowa i okolicznych biur oraz zakładów."),
            ("Proste potwierdzanie", "Raz ustalacie dni i widełki godzinowe. Potem zostaje tylko liczba osób na dany dzień."),
        ],
        "steps_title": "Jak wdrażamy lunch w firmie",
        "steps": [
            ("Testujecie kilka dni", "Zaczynamy od krótkiego okresu próbnego, żeby sprawdzić godziny, ilości i diety."),
            ("Ustalamy rytm tygodnia", "Wybieracie dni stałe albo zamawiacie pod obecność zespołu w modelu hybrydowym."),
            ("Jedzenie wjeżdża o stałej porze", "Po wdrożeniu lunch ma być rutyną, a nie codziennym projektem organizacyjnym."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy lunch musi być codziennie?", "Nie. Część firm zamawia trzy dni w tygodniu, część tylko w dni z większą obecnością. Dopasowujemy się do kalendarza zespołu."),
            ("Jak zgłaszać diety pracowników?", "Wystarczy prosta lista: liczba porcji i rodzaje wariantów. Nie potrzebujemy imion, chyba że zestawy mają być podpisane."),
            ("Czy dowozicie też do zakładów i magazynów?", "Tak. Obsługujemy biura, produkcję i miejsca, w których przerwa lunchowa ma twarde ramy czasowe."),
            ("Czy można zacząć od jednego tygodnia na próbę?", "Tak. To najrozsądniejszy start. Po kilku dniach widać, o której lunch ma wjeżdżać i ile porcji naprawdę schodzi."),
            ("Czy dowozicie lunch dla firm do Żyrardowa i Sochaczewa?", "Tak. Regularny lunch pracowniczy dowozimy do biur, magazynów i zakładów w Sochaczewie, Żyrardowie i okolicach."),
            ("Czy lunch pracowniczy trzeba zamawiać na cały miesiąc?", "Nie. Część firm zaczyna od kilku dni próbnych, część zostaje przy trzech dniach w tygodniu. Rytm dopasowujemy do obecności zespołu."),
        ],
        "form_hint": "Dni tygodnia, liczba porcji, godzina przerwy i adres firmy",
    },
    {
        "slug": "coffee-break",
        "nav": "Coffee break",
        "kicker": "Przerwy kawowe",
        "title": "Coffee break",
        "title_accent": "do biura i na szkolenie",
        "full_title": "Coffee break do biura i na szkolenie",
        "meta_title": "Coffee break i przerwa kawowa | Sochaczew, Żyrardów",
        "meta_description": "Coffee break i przerwy kawowe do biura oraz na szkolenie. Kawa, przekąski i woda z dostawą w Sochaczewie i Żyrardowie.",
        "lead": "Przerwa kawowa działa, gdy wszystko stoi zanim ludzie wyjdą z sali. Dobieramy kawę, wodę i przekąski do długości spotkania: rano lżej, po południu trochę bardziej sycąco, zawsze bez bałaganu na stole.",
        "image": "/assets/footer-catering-v2/refreshments.webp",
        "image_alt": "Przekąski i napoje na przerwę kawową",
        "meta": ["Kawa, herbata, woda", "Krótkie i całodniowe przerwy", "Do biura i na warsztat"],
        "teaser": "Kawa, woda i przekąski gotowe zanim zacznie się przerwa.",
        "intro_title": "Coffee break, który stoi zanim wyjdziecie z sali",
        "story": [
            "Coffee break ma odświeżyć zespół, a nie zamienić spotkanie w drugi obiad. Jeśli na stole ląduje za dużo jedzenia, przerwa się rozciąga. Jeśli za mało wody i kawy, ludzie i tak wychodzą szukać czajnika.",
            "Przerwę kawową dobieramy do czasu, który naprawdę macie. Piętnaście minut to napoje i jedna-dwie przekąski. Cały dzień szkolenia wymaga uzupełniania i większej różnorodności.",
            "Omijamy dania, które się kruszą, ciekną albo zostawiają zapach w małej sali. Poczęstunek ma być gotowy przed przerwą, nie w momencie, gdy uczestnicy już wychodzą na korytarz.",
            "Dowozimy coffee break do biur, sal szkoleniowych i eventów w Sochaczewie, Żyrardowie i okolicach. Jeśli w sali jest już ekspres, dokładamy to, czego naprawdę brakuje.",
            "Gdy ludzie są u Was przez cały dzień, przerwa kawowa nie zastąpi lunchu. Wtedy lepiej zaplanować osobny posiłek i krótsze coffee breaki dookoła.",
        ],
        "note": "Do zamówienia wystarczą godzina przerwy, liczba osób i adres sali. Resztę — napoje, przekąski i ewentualny lunch — dogadamy w jednej wiadomości.",
        "fits": [
            "Poranny briefing w biurze",
            "Warsztat z jedną albo dwiema przerwami",
            "Szkolenie, które potrzebuje kawy przed startem",
            "Krótki event bez pełnego lunchu",
            "Spotkanie z klientami, na którym wystarczy poczęstunek do kawy",
        ],
        "cards_title": "Jak składamy przerwę, która nie rozjeżdża dnia",
        "cards_intro": "Dobra przerwa kawowa jest prosta: napoje w zasięgu ręki, przekąska, którą da się zjeść w kilka minut, i zero sprzątania po sosie.",
        "cards": [
            ("Gotowe przed przerwą", "Nie ustawiamy bufetu w momencie, gdy uczestnicy już wychodzą. Dostawa schodzi się z agendą."),
            ("Skala pod czas", "15 minut to napoje i jedna-dwie przekąski. Cały dzień szkolenia wymaga uzupełniania i większej różnorodności."),
            ("Bez bałaganu na sali", "Omijamy dania, które się kruszą, ciekną albo zostawiają zapach w małym pomieszczeniu."),
        ],
        "included_title": "Co może wejść w coffee break",
        "included": [
            ("Napoje", "Kawa, herbata i woda. To podstawa, bez której reszta menu nie ma sensu."),
            ("Słone przekąski", "Kanapki, mini wypieki albo lekkie finger food, które da się zjeść w kilka minut."),
            ("Owoce i słodkości", "Sezonowy dodatek albo mały deser, szczególnie przy dłuższym warsztacie."),
            ("Uzupełnienie w ciągu dnia", "Przy całodniowym szkoleniu możemy zaplanować więcej niż jedną dostawę albo szerszy bufet na start."),
        ],
        "steps_title": "Jak zamawiacie coffee break",
        "steps": [
            ("Podajecie godzinę przerwy", "Do tego liczbę osób i czy to krótki briefing, czy całodniowe szkolenie."),
            ("Dobieramy zestaw", "Nie dokładamy jedzenia na zapas. Skala ma pasować do czasu, który naprawdę macie."),
            ("Poczęstunek czeka na sali", "Wnosimy i ustawiamy go wcześniej, żeby przerwa mogła się zacząć od razu."),
        ],
        "faq_title": "Najczęstsze pytania",
        "faqs": [
            ("Czy coffee break wystarczy zamiast lunchu?", "Przy krótkim spotkaniu tak. Jeśli ludzie są u Was przez cały dzień, lepiej dołożyć osobny lunch."),
            ("Czy dowozicie przerwę kawową tylko do biur?", "Nie. Obsługujemy też sale szkoleniowe, warsztaty i eventy, na których przerwa ma twardy limit czasu."),
            ("Da się zrobić wersję słodką albo bardziej wytrawną?", "Tak. Rano częściej sprawdzają się kanapki i owoce, po południu można położyć większy nacisk na deser."),
            ("Czy przywozicie też kawę, czy tylko jedzenie?", "Możemy przygotować przerwę z kawą, herbatą i wodą. Jeśli w sali jest już ekspres, dokładamy to, czego naprawdę brakuje."),
            ("Czy dowozicie przerwę kawową do Sochaczewa i Żyrardowa?", "Tak. Coffee break dowozimy do biur, sal szkoleniowych i eventów w Sochaczewie, Żyrardowie i okolicach."),
            ("Czy coffee break da się zamówić razem z cateringiem na szkolenie?", "Tak. To częste połączenie: poranna kawa, przerwa w środku dnia i lunch po bloku merytorycznym."),
        ],
        "form_hint": "Godzina przerwy, liczba osób i czy to krótki briefing, czy cały dzień",
    },
]

EXTRAS = {
    "imprezy-firmowe": {
        "need": [
            "Data, godzina i orientacyjna liczba gości",
            "Czy spotkanie jest stołowe, stojące, czy mieszane",
            "Diety, o których wiecie z góry",
        ],
        "related": ["szkolenia-i-konferencje", "eventy-i-premiery", "uroczystosci-rodzinne"],
        "cta_title": "Powiedz, jaka to impreza",
        "cta_text": "Zostaw kontakt i kilka szczegółów. Oddzwonimy z propozycją menu, ilości i godziny dostawy w Sochaczewie albo Żyrardowie.",
        "highlights": [
            ("Gdzie dowozimy", "Sochaczew, Żyrardów i okolice"),
            ("Skala", "Od kilkunastu do ok. 150 osób"),
            ("Format", "Bufet, porcje albo finger food"),
        ],
        "gallery": [
            ("/assets/order-occasions/imprezy.webp", "Wspólny stół na imprezie firmowej"),
            ("/assets/blog-covers/catering-dla-firm.webp", "Catering firmowy gotowy do podania"),
        ],
        "area_title": "Catering na imprezy firmowe w Sochaczewie i Żyrardowie",
        "area_text": "Dowozimy catering firmowy do biur, sal i ogrodów. Najczęściej jeździmy po Sochaczewie, Żyrardowie i okolicach, więc godzinę dostawy da się dopiąć bez zgadywania trasy.",
        "places": ["Sochaczew", "Żyrardów", "Biura i sale w okolicach", "Ogrody i przestrzenie eventowe"],
        "fits_title": "Na jakie imprezy firmowe przyjeżdżamy",
        "cta_image": "/assets/catering-cards/imprezy-firmowe-natural-v2.webp",
        "cta_image_alt": "Zespół przy wspólnym stole z cateringiem firmowym",
    },
    "szkolenia-i-konferencje": {
        "need": [
            "Godziny startu, przerw i lunchu",
            "Liczba uczestników i adres sali",
            "Czy lepiej sprawdzą się boxy, czy bufet",
        ],
        "related": ["coffee-break", "lunch-dla-firm", "spotkania-biznesowe"],
        "cta_title": "Wyślij agendę, dobierzemy menu",
        "cta_text": "Wystarczą godziny przerw i liczba osób. Resztę — format, diety i wjazd — dopytamy w jednej wiadomości.",
        "highlights": [
            ("Gdzie dowozimy", "Sale w Sochaczewie i Żyrardowie"),
            ("Co wjeżdża", "Coffee break, lunch, boxy"),
            ("Klucz", "Godziny z agendy"),
        ],
        "gallery": [
            ("/assets/order-occasions/szkolenia.webp", "Przerwa kawowa na szkoleniu"),
            ("/assets/blog-covers/szkolenie.webp", "Catering na konferencję"),
        ],
        "area_title": "Catering na szkolenia w Sochaczewie, Żyrardowie i okolicach",
        "area_text": "Przyjeżdżamy do sal szkoleniowych, hoteli i biur. Krótka trasa z kuchni do obiektu pomaga utrzymać godzinę przerwy i temperaturę lunchu.",
        "places": ["Sochaczew", "Żyrardów", "Hotele i sale szkoleniowe", "Biura i przestrzenie eventowe"],
        "fits_title": "Na jakie szkolenia i konferencje",
        "cta_image": "/assets/catering-cards/szkolenia-konferencje-natural-v2.webp",
        "cta_image_alt": "Lunch i przerwa podczas szkolenia",
    },
    "uroczystosci-rodzinne": {
        "need": [
            "Data przyjęcia i liczba gości",
            "Adres domu, ogrodu albo sali",
            "Czy na stole mają być dziecięce porcje albo diety",
        ],
        "related": ["imprezy-firmowe", "eventy-i-premiery", "coffee-break"],
        "cta_title": "Zostaw datę, resztą zajmiemy się my",
        "cta_text": "Napisz, jakie to święto i ilu będzie gości. Zaproponujemy obiad, przekąski i deser gotowe do postawienia na stole.",
        "highlights": [
            ("Gdzie dowozimy", "Dom, ogród, sala"),
            ("Na jakie święta", "Chrzciny, komunie, urodziny"),
            ("Co przywozimy", "Obiad gotowy do podania"),
        ],
        "gallery": [
            ("/assets/order-occasions/uroczystosci.webp", "Stół na uroczystość rodzinną"),
            ("/assets/footer-catering-v4/danie.webp", "Ciepłe danie cateringowe"),
        ],
        "area_title": "Catering na przyjęcia rodzinne w Sochaczewie i Żyrardowie",
        "area_text": "Najczęściej wjeżdżamy pod dom albo do ogrodu. Dowóz w Sochaczewie, Żyrardowie i okolicach planujemy tak, żebyście zdążyli rozstawić stół przed pierwszym gościem.",
        "places": ["Sochaczew", "Żyrardów", "Domy i ogrody", "Kameralne sale"],
        "fits_title": "Na jakie uroczystości rodzinne",
        "cta_image": "/assets/catering-cards/uroczystosci-rodzinne-natural-v2.webp",
        "cta_image_alt": "Stół zastawiony na przyjęcie rodzinne",
    },
    "eventy-i-premiery": {
        "need": [
            "Godzina otwarcia drzwi dla gości",
            "Liczba osób i charakter wydarzenia",
            "Jak wygląda wjazd, winda i miejsce na poczęstunek",
        ],
        "related": ["imprezy-firmowe", "szkolenia-i-konferencje", "spotkania-biznesowe"],
        "cta_title": "Opowiedz o evencie",
        "cta_text": "Podaj godzinę, liczbę gości i adres lokalu. Ułożymy krótkie menu, które da się zjeść w rozmowie.",
        "highlights": [
            ("Format", "Finger food i krótkie menu"),
            ("Kiedy", "Przed otwarciem drzwi"),
            ("Gdzie", "Sochaczew, Żyrardów, lokale"),
        ],
        "gallery": [
            ("/assets/order-occasions/eventy.webp", "Finger food na event"),
            ("/assets/footer-catering-v2/refreshments.webp", "Poczęstunek na premierę"),
        ],
        "area_title": "Catering na eventy w Sochaczewie, Żyrardowie i okolicach",
        "area_text": "Dowozimy do salonów, biur i przestrzeni eventowych. Ustalamy wjazd i godzinę montażu, żeby poczęstunek stał zanim wejdą pierwsi goście.",
        "places": ["Sochaczew", "Żyrardów", "Salony i lokale", "Przestrzenie eventowe"],
        "fits_title": "Na jakie eventy i premiery",
        "cta_image": "/assets/catering-cards/eventy-premiery-natural-v2.webp",
        "cta_image_alt": "Poczęstunek przygotowany na event",
    },
    "spotkania-biznesowe": {
        "need": [
            "Liczba osób i godzina spotkania",
            "Diety gości, jeśli już je znacie",
            "Adres sali albo aneksu",
        ],
        "related": ["lunch-dla-firm", "szkolenia-i-konferencje", "coffee-break"],
        "cta_title": "Zamów lunch na spotkanie",
        "cta_text": "Napisz, ile osób siada do stołu i o której. Przygotujemy spójne porcje, które nie rozleją się na dokumenty.",
        "highlights": [
            ("Skala", "Od kilku do kilkudziesięciu osób"),
            ("Podanie", "Schludny lunch do sali"),
            ("Teren", "Biura w Sochaczewie i Żyrardowie"),
        ],
        "gallery": [
            ("/assets/order-occasions/spotkania.webp", "Lunch na spotkanie biznesowe"),
            ("/assets/blog-covers/spotkanie-biznesowe.webp", "Catering do biura"),
        ],
        "area_title": "Catering na spotkania biznesowe w Sochaczewie i Żyrardowie",
        "area_text": "Wnosimy lunch do sali konferencyjnej albo aneksu. Krótka trasa po Sochaczewie, Żyrardowie i okolicach pomaga trafić w godzinę z kalendarza, nie w korek.",
        "places": ["Sochaczew", "Żyrardów", "Sale konferencyjne", "Aneksy i małe biura"],
        "fits_title": "Na jakie spotkania biznesowe",
        "cta_image": "/assets/catering-cards/spotkania-biznesowe-natural-v2.webp",
        "cta_image_alt": "Lunch na spotkaniu w biurze",
    },
    "lunch-dla-firm": {
        "need": [
            "Dni tygodnia, w które lunch ma wjeżdżać",
            "Liczba porcji i warianty diet",
            "Godzina przerwy i adres firmy",
        ],
        "related": ["coffee-break", "szkolenia-i-konferencje", "spotkania-biznesowe"],
        "cta_title": "Zacznijcie od kilku dni na próbę",
        "cta_text": "Podajcie dni, liczbę porcji i godzinę przerwy. Ułożymy lunch, który da się potwierdzać bez zbierania zamówień na czacie.",
        "highlights": [
            ("Model", "Lunch cykliczny albo próbny"),
            ("Dla kogo", "Biuro, magazyn, hybryda"),
            ("Dostawa", "Sochaczew, Żyrardów i okolice"),
        ],
        "gallery": [
            ("/assets/blog-covers/lunch-pracownikow.webp", "Lunch boxy dla zespołu"),
            ("/assets/footer-catering-v4/lunch.webp", "Wspólny lunch pracowników"),
        ],
        "area_title": "Lunch dla firm w Sochaczewie, Żyrardowie i okolicach",
        "area_text": "Regularny catering pracowniczy dowozimy do biur, magazynów i zakładów. Stała godzina ma sens dopiero wtedy, gdy trasa jest krótka i powtarzalna.",
        "places": ["Sochaczew", "Żyrardów", "Biura i open space", "Magazyny i produkcja"],
        "fits_title": "Dla jakich zespołów woźimy lunch",
        "cta_image": "/assets/order-inquiry-lunch-natural-v2.webp",
        "cta_image_alt": "Dwoje współpracowników przy świeżym lunchu",
    },
    "coffee-break": {
        "need": [
            "Godzina przerwy",
            "Liczba osób",
            "Czy to krótki briefing, czy cały dzień",
        ],
        "related": ["szkolenia-i-konferencje", "spotkania-biznesowe", "lunch-dla-firm"],
        "cta_title": "Zamów przerwę, która stoi na czas",
        "cta_text": "Napiszcie godzinę i liczbę osób. Dobierzemy kawę, wodę i przekąski do czasu, który naprawdę macie.",
        "highlights": [
            ("Na kiedy", "Przed startem przerwy"),
            ("Co wjeżdża", "Kawa, woda, przekąski"),
            ("Gdzie", "Biura i sale w okolicy"),
        ],
        "gallery": [
            ("/assets/footer-catering-v2/refreshments.webp", "Przekąski na przerwę kawową"),
            ("/assets/blog-covers/szkolenie.webp", "Coffee break na szkoleniu"),
        ],
        "area_title": "Coffee break w Sochaczewie, Żyrardowie i okolicach",
        "area_text": "Przerwę kawową dowozimy do biur, sal szkoleniowych i eventów. Żeby coffee break zdążył stanąć, musimy znać godzinę przerwy i adres obiektu.",
        "places": ["Sochaczew", "Żyrardów", "Biura", "Sale szkoleniowe i eventy"],
        "fits_title": "Na jakie przerwy kawowe",
        "cta_image": "/assets/catering-cards/szkolenia-konferencje-natural-v2.webp",
        "cta_image_alt": "Bufet na przerwę kawową i szkolenie",
    },
}


def extract_chrome(index_html: str) -> tuple[str, str]:
    header_start = index_html.find('<header class="header-section">')
    header_end = index_html.find("</header>", header_start) + len("</header>")
    if header_start < 0 or header_end < len("</header>"):
        raise RuntimeError("Could not extract homepage header")

    chrome_start = index_html.find("<!-- CULINI FOOTER IMPORT -->")
    chrome_end = index_html.find("</body>")
    if chrome_start < 0 or chrome_end < 0:
        raise RuntimeError("Could not extract homepage footer")

    return index_html[header_start:header_end], index_html[chrome_start:chrome_end]


def mark_current_header(header: str, slug: str) -> str:
    header = header.replace(
        '<details class="nav-offer">',
        '<details class="nav-offer is-current">',
        1,
    )
    return header.replace(
        f'<a class="nav-offer__link" href="/{slug}">',
        f'<a class="nav-offer__link is-current" aria-current="page" href="/{slug}">',
        1,
    )


def mark_current_footer(chrome: str, slug: str) -> str:
    return re.sub(
        rf'<a class="pycha-site-footer__link" href="/{slug}">',
        f'<a class="pycha-site-footer__link is-current" href="/{slug}" aria-current="page">',
        chrome,
        count=1,
    )


def footer_links(current: str = "") -> str:
    items = []
    for page in PAGES:
        href = f"/{page['slug']}"
        cls = ' class="pycha-site-footer__link is-current"' if page["slug"] == current else ' class="pycha-site-footer__link"'
        current_attr = ' aria-current="page"' if page["slug"] == current else ""
        items.append(f'          <a{cls} href="{href}"{current_attr}>{page["nav"]}</a>')
    return "\n".join(items)


def offer_nav_html(current: str = "") -> str:
    return (
        '        <nav class="pycha-site-footer__links" aria-label="Oferta">\n'
        '          <div class="pycha-site-footer__heading">Oferta</div>\n'
        f"{footer_links(current)}\n"
        "        </nav>"
    )


def merge_page(page: dict) -> dict:
    return {**page, **EXTRAS[page["slug"]]}


def related_cards(page: dict) -> str:
    by_slug = {item["slug"]: item for item in PAGES}
    cards = []
    for slug in page["related"]:
        related = by_slug[slug]
        cards.append(
            f'''        <a class="offer-related__card" href="/{related["slug"]}">
          <div class="offer-related__image">
            <img src="{related["image"]}" alt="{related["image_alt"]}" width="800" height="600" loading="lazy" decoding="async" />
            <span>{related["kicker"]}</span>
          </div>
          <h3>{related["nav"]}</h3>
          <p>{related["teaser"]}</p>
          <span class="offer-related__more">Zobacz ofertę <span>→</span></span>
        </a>'''
        )
    return "\n".join(cards)


def render_main(page: dict) -> str:
    story = "\n".join(f"          <p>{paragraph}</p>" for paragraph in page["story"])
    chips = "\n".join(f"            <li>{item}</li>" for item in page["fits"])
    need = "\n".join(f"            <li>{item}</li>" for item in page["need"])
    places = "\n".join(f"            <li>{item}</li>" for item in page["places"])
    stats = "\n".join(
        f"          <div><dt>{label}</dt><dd>{value}</dd></div>"
        for label, value in page["highlights"]
    )
    cards = "\n".join(
        f'''        <article class="offer-card">
          <div class="offer-card__num">0{index}</div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>'''
        for index, (title, text) in enumerate(page["cards"], start=1)
    )
    included = "\n".join(
        f'''        <li>
          <span class="offer-included__index">0{index}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>'''
        for index, (title, text) in enumerate(page["included"], start=1)
    )
    steps = "\n".join(
        f'''        <article class="offer-step">
          <div class="offer-step__num">{index}</div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>'''
        for index, (title, text) in enumerate(page["steps"], start=1)
    )
    faqs = "\n".join(
        f'''        <details>
          <summary><span class="offer-faq__num">{index:02d}</span><span>{question}</span></summary>
          <p>{answer}</p>
        </details>'''
        for index, (question, answer) in enumerate(page["faqs"], start=1)
    )
    gallery = "\n".join(
        f'''        <figure>
          <img src="{src}" alt="{alt}" width="1200" height="900" loading="lazy" decoding="async" />
          <figcaption>{alt}</figcaption>
        </figure>'''
        for src, alt in page["gallery"]
    )
    return f'''  <main>
    <section class="offer-hero">
      <div class="offer-wrap">
        <nav class="offer-crumb" aria-label="Okruszki">
          <a href="/">Strona główna</a><span>/</span>
          <a href="/#pychaCateringTypesTitle">Oferta</a><span>/</span>
          <strong>{page["nav"]}</strong>
        </nav>
        <div class="offer-hero__grid">
          <div class="offer-hero__copy">
            <p class="offer-kicker">{page["kicker"]}</p>
            <h1>{page["title"]} <em>{page["title_accent"]}</em></h1>
            <p class="offer-hero__lead">{page["lead"]}</p>
            <div class="offer-hero__actions">
              <a class="offer-btn offer-btn--primary" href="#zamow-catering">Zapytaj o ofertę</a>
              <a class="offer-btn offer-btn--ghost" href="/menu.html">Zobacz menu</a>
            </div>
            <p class="offer-hero__phone">Albo zadzwoń: <a class="offer-hero__phone-link" href="tel:888849509">888 849 509</a></p>
          </div>
          <figure class="offer-hero__media">
            <img src="{page["image"]}" alt="{page["image_alt"]}" width="1400" height="1050" />
            <span>{page["kicker"]}</span>
          </figure>
        </div>
        <dl class="offer-stats">
{stats}
        </dl>
      </div>
    </section>

    <section class="offer-section offer-section--paper">
      <div class="offer-wrap offer-story__grid">
        <div class="offer-story__copy">
          <p class="offer-section__kicker">Jak to u nas wygląda</p>
          <h2>{page["intro_title"]}</h2>
{story}
        </div>
        <aside class="offer-aside">
          <p class="offer-note">{page["note"]}</p>
          <div class="offer-need">
            <h3>Co warto mieć pod ręką</h3>
            <ol>
{need}
            </ol>
          </div>
        </aside>
      </div>
    </section>

    <section class="offer-section offer-section--sage offer-section--chips">
      <div class="offer-wrap">
        <p class="offer-section__kicker">Okazje</p>
        <h2>{page["fits_title"]}</h2>
        <ul class="offer-chips">
{chips}
        </ul>
      </div>
    </section>

    <section class="offer-section offer-section--cream">
      <div class="offer-wrap">
        <p class="offer-section__kicker">Na co zwracamy uwagę</p>
        <h2>{page["cards_title"]}</h2>
        <p class="offer-section__intro">{page["cards_intro"]}</p>
        <div class="offer-cards">
{cards}
        </div>
      </div>
    </section>

    <section class="offer-section offer-section--paper">
      <div class="offer-wrap">
        <p class="offer-section__kicker">Z kuchni</p>
        <h2>Tak to wygląda na stole</h2>
        <div class="offer-gallery">
{gallery}
        </div>
      </div>
    </section>

    <section class="offer-section offer-section--sage">
      <div class="offer-wrap">
        <p class="offer-section__kicker">W ofercie</p>
        <h2>{page["included_title"]}</h2>
        <ul class="offer-included">
{included}
        </ul>
      </div>
    </section>

    <section class="offer-area">
      <div class="offer-wrap offer-area__grid">
        <div class="offer-area__copy">
          <p class="offer-section__kicker">Dostawa</p>
          <h2>{page["area_title"]}</h2>
          <p>{page["area_text"]}</p>
        </div>
        <ul class="offer-places">
{places}
        </ul>
      </div>
    </section>

    <section class="offer-section offer-section--paper">
      <div class="offer-wrap">
        <p class="offer-section__kicker">Współpraca</p>
        <h2>{page["steps_title"]}</h2>
        <div class="offer-steps">
{steps}
        </div>
      </div>
    </section>

    <section class="offer-section offer-section--faq">
      <div class="offer-wrap offer-faq__grid">
        <div class="offer-faq__intro">
          <p class="offer-section__kicker">Pytania</p>
          <h2>{page["faq_title"]}</h2>
          <p class="offer-section__intro">Krótko o ilościach, diecie i dowozie w Sochaczewie oraz Żyrardowie. Jeśli nie ma Waszej odpowiedzi, zostawcie kontakt na dole strony.</p>
        </div>
        <div class="offer-faq">
{faqs}
        </div>
      </div>
    </section>

    <section class="offer-section offer-section--paper">
      <div class="offer-wrap">
        <p class="offer-section__kicker">Inne okazje</p>
        <h2>Zobacz pozostałą ofertę Pycha Catering</h2>
        <p class="offer-section__intro">Ten sam catering dla firm i spotkań: świeże jedzenie, jasne porcje i dostawa dopięta do godziny w Sochaczewie oraz Żyrardowie.</p>
        <div class="offer-related">
{related_cards(page)}
        </div>
      </div>
    </section>

    <section class="offer-cta" id="zamow-catering">
      <div class="offer-wrap">
        <div class="offer-cta__copy">
          <figure class="offer-cta__media">
            <img src="{page["cta_image"]}" alt="{page["cta_image_alt"]}" width="1200" height="900" loading="lazy" decoding="async" />
            <span>{page["kicker"]}</span>
          </figure>
          <p class="offer-section__kicker">Zamówienie</p>
          <h2>{page["cta_title"]}</h2>
          <p class="offer-cta__text">{page["cta_text"]}</p>
          <div class="offer-cta__contacts">
            <a class="offer-cta__phone" href="tel:888849509">888 849 509</a>
            <a class="offer-cta__mail" href="mailto:biuro@pycha-catering.pl">biuro@pycha-catering.pl</a>
          </div>
        </div>
        <form class="offer-form" action="https://formspree.io/f/mgobjjvv" method="POST">
          <p class="offer-form__title">Wyślij zapytanie</p>
          <input type="hidden" name="_subject" value="Zapytanie: {page["nav"]}" />
          <input type="hidden" name="Oferta" value="{page["nav"]}" />
          <label>Telefon lub e-mail
            <input name="Kontakt" type="text" required placeholder="Wpisz kontakt, oddzwonimy" />
          </label>
          <label>Firma i miejsce dostawy
            <input name="Firma i adres" type="text" placeholder="Sochaczew, Żyrardów albo inny adres" />
          </label>
          <label>Krótki opis spotkania
            <textarea name="Opis" placeholder="{page["form_hint"]}"></textarea>
          </label>
          <label class="offer-consent">
            <input name="Zgoda" type="checkbox" value="Tak" required />
            <span>Akceptuję <a href="/utility/terms-and-condition">Regulamin</a> i zapoznałem/am się z <a href="/utility/privacy-policy">Polityką prywatności</a>.</span>
          </label>
          <button type="submit">Wyślij zapytanie</button>
        </form>
      </div>
    </section>
  </main>
'''


def render_page(page: dict, header: str, chrome: str) -> str:
    faq_entities = ",\n      ".join(
        f'''{{
        "@type": "Question",
        "name": {json.dumps(question, ensure_ascii=False)},
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": {json.dumps(answer, ensure_ascii=False)}
        }}
      }}'''
        for question, answer in page["faqs"]
    )
    head = f'''<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index, follow" />
  <title>{page["meta_title"]}</title>
  <meta name="description" content="{page["meta_description"]}" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:site_name" content="Pycha Catering" />
  <meta property="og:title" content="{page["meta_title"]}" />
  <meta property="og:description" content="{page["meta_description"]}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pychacatering.pl/{page["slug"]}" />
  <meta property="og:image" content="https://pychacatering.pl{page["image"]}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{page["meta_title"]}" />
  <meta name="twitter:description" content="{page["meta_description"]}" />
  <link rel="canonical" href="https://pychacatering.pl/{page["slug"]}" />
  <link rel="icon" type="image/png" sizes="256x256" href="/favicon.png?v=7" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=7" />
  <meta name="theme-color" content="#0b250c" />
@@HEAD_LINKS@@
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": {json.dumps(page["full_title"], ensure_ascii=False)},
    "serviceType": {json.dumps(page["full_title"], ensure_ascii=False)},
    "description": {json.dumps(page["meta_description"], ensure_ascii=False)},
    "url": "https://pychacatering.pl/{page["slug"]}",
    "areaServed": [
      {{"@type": "City", "name": "Sochaczew"}},
      {{"@type": "City", "name": "Żyrardów"}}
    ],
    "provider": {{
      "@type": "CateringService",
      "name": "Pycha Catering",
      "telephone": "+48888849509",
      "url": "https://pychacatering.pl/",
      "areaServed": "Sochaczew, Żyrardów i okolice"
    }}
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{"@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://pychacatering.pl/"}},
      {{"@type": "ListItem", "position": 2, "name": {json.dumps(page["nav"], ensure_ascii=False)}, "item": "https://pychacatering.pl/{page["slug"]}"}}
    ]
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {faq_entities}
    ]
  }}
  </script>
</head>
<body class="offer-page">
'''
    return (
        head.replace("@@HEAD_LINKS@@", HEAD_LINKS)
        + mark_current_header(header, page["slug"])
        + "\n"
        + render_main(page)
        + mark_current_footer(chrome, page["slug"])
        + "\n</body>\n</html>\n"
    )


OFFER_NAV_RE = re.compile(
    r'<nav class="pycha-site-footer__links" aria-label="Oferta">.*?</nav>',
    re.S,
)


def update_existing_footers() -> int:
    updated = 0
    replacement = offer_nav_html()
    skip = {f"{page['slug']}.html" for page in PAGES}
    for path in ROOT.rglob("*.html"):
        if path.name in skip:
            continue
        text = path.read_text(encoding="utf-8")
        new_text, count = OFFER_NAV_RE.subn(replacement, text, count=1)
        if count:
            path.write_text(new_text, encoding="utf-8")
            updated += 1
    return updated


def update_sitemap() -> None:
    sitemap = ROOT / "sitemap.xml"
    text = sitemap.read_text(encoding="utf-8")
    entries = []
    for page in PAGES:
        loc = f"https://pychacatering.pl/{page['slug']}"
        if loc in text:
            continue
        entries.append(
            "  <url>\n"
            f"    <loc>{loc}</loc>\n"
            "    <lastmod>2026-10-04</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "  </url>"
        )
    if entries:
        sitemap.write_text(text.replace("</urlset>", "\n".join(entries) + "\n</urlset>\n"), encoding="utf-8")


def main() -> None:
    header, chrome = extract_chrome((ROOT / "index.html").read_text(encoding="utf-8"))
    for page in PAGES:
        merged = merge_page(page)
        target = ROOT / f"{merged['slug']}.html"
        target.write_text(render_page(merged, header, chrome), encoding="utf-8")
        print(f"wrote {target.name}")
    update_sitemap()


if __name__ == "__main__":
    main()
