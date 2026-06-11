from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

reviews = [
    {
        "name": "Anna Kaczmarek",
        "time": "2 tygodnie temu",
        "text": "Pycha Catering obsługuje nasze firmowe lunche od ponad roku. Jedzenie jest zawsze świeże, ciepłe i dobrze zapakowane. Pracownicy są zadowoleni, bo każdy znajdzie coś dla siebie. Naprawdę ułatwia nam to codzienne funkcjonowanie biura."
    },
    {
        "name": "Michał Wójcik",
        "time": "miesiąc temu",
        "text": "Organizowałem szkolenie dla 80 osób i trochę obawiałem się o jedzenie. Niepotrzebnie — Pycha Catering przyjechali na czas, rozstawili bufet, a wszystko smakowało jak domowe. Goście nawet dopytywali, skąd zamawialiśmy! Zdecydowanie polecam."
    },
    {
        "name": "Katarzyna P.",
        "time": "3 tygodnie temu",
        "text": "Codzienne dostawy lunchów przebiegają u nas bezproblemowo. Cenię ich za to, że uwzględniają diety wege i bezglutenowe bez żadnego marudzenia. Wszystko zawsze pyszne i na czas."
    },
    {
        "name": "Tomasz Rybarczyk",
        "time": "tydzień temu",
        "text": "Zamówiliśmy catering na 10-lecie firmy. Mieliśmy różne wymagania dietetyczne i mało czasu na organizację. Ekipa Pycha Cateringu spisała się na medal. Ciepłe dania dojechały gorące, a bufet wyglądał bardzo elegancko. Na pewno jeszcze skorzystamy!"
    },
    {
        "name": "Ewa Nowak",
        "time": "2 miesiące temu",
        "text": "Zamawiamy Pycha Catering na spotkania z klientami i nigdy się nie zawiedliśmy. Składniki są zawsze świeże, dania ładnie podane. Cenowo też wychodzi bardzo rozsądnie. Dobry partner do stałej współpracy."
    }
]

wrapper = soup.find('div', class_='testimonial-wrapper')
boxes = wrapper.find_all('div', class_='testimonial-details-box')

for i, box in enumerate(boxes):
    if i >= len(reviews): break
    
    # Update text
    desc = box.find('p', class_='testimonial-description')
    if desc:
        desc.string = reviews[i]['text']
    
    # Remove existing author box if any
    existing_author = box.find('div', class_='testimonial-author-box')
    if existing_author:
        existing_author.decompose()
        
    # Append new author info
    author_html = f"""
    <div class="testimonial-author-box" style="margin-top: 20px; display: flex; flex-direction: column; gap: 4px;">
      <span style="font-weight: 700; color: #fff; font-size: 16px;">{reviews[i]['name']}</span>
      <span style="color: #a0a0a0; font-size: 14px;">{reviews[i]['time']}</span>
    </div>
    """
    author_tag = BeautifulSoup(author_html, 'html.parser')
    box.append(author_tag)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
