from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

profiles = [
    {
        "initials": "AK",
        "color": "#3B82F6", # Blue
        "name": "Anna Kaczmarek",
        "role_time": "Office Manager • 2 tygodnie temu"
    },
    {
        "initials": "MW",
        "color": "#10B981", # Green
        "name": "Michał Wójcik",
        "role_time": "HR Director • miesiąc temu"
    },
    {
        "initials": "KP",
        "color": "#EF4444", # Red
        "name": "Katarzyna P.",
        "role_time": "Event Coordinator • 3 tygodnie temu"
    },
    {
        "initials": "TR",
        "color": "#F59E0B", # Yellow
        "name": "Tomasz Rybarczyk",
        "role_time": "CEO, StartUp Hub • tydzień temu"
    },
    {
        "initials": "EN",
        "color": "#8B5CF6", # Purple
        "name": "Ewa Nowak",
        "role_time": "Administration Spec. • 2 miesiące temu"
    }
]

wrapper = soup.find('div', class_='testimonial-wrapper')
boxes = wrapper.find_all('div', class_='testimonial-details-box')

for i, box in enumerate(boxes):
    if i >= len(profiles): break
    
    # Remove existing author box if any
    existing_author = box.find('div', class_='testimonial-author-box')
    if existing_author:
        existing_author.decompose()
        
    p = profiles[i]
    # Append new detailed author info
    author_html = f"""
    <div class="testimonial-author-box" style="margin-top: 20px; display: flex; align-items: center; gap: 12px; text-align: left;">
      <div style="width: 44px; height: 44px; min-width: 44px; border-radius: 50%; background-color: {p['color']}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 2px solid rgba(255,255,255,0.1);">
          {p['initials']}
      </div>
      <div style="display: flex; flex-direction: column; gap: 3px;">
          <span style="font-weight: 700; color: #fff; font-size: 16px; line-height: 1.2;">{p['name']}</span>
          <span style="color: #a0a0a0; font-size: 13px; line-height: 1.2;">{p['role_time']}</span>
      </div>
    </div>
    """
    author_tag = BeautifulSoup(author_html, 'html.parser')
    box.append(author_tag)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
