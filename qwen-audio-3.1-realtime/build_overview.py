"""Build the editable capability SVG. Logo reused from the Qwen Audio ASR site."""
from pathlib import Path
import base64
from html import escape
import math

ROOT = Path(__file__).resolve().parent
PURPLE = '#6D48E5'
INK = '#28233E'
MUTED = '#6C657D'
parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100" role="img" aria-labelledby="title desc">', '<title id="title">Qwen-Audio-3.1-Realtime: seven connected capabilities</title>', '<desc id="desc">A central Qwen logo connects multilingual reasoning, long-context instructions, tool execution, persona and empathy, duplex coordination, reliability, and a persistent voice-agent runtime.</desc>', '<rect width="1600" height="1100" fill="white"/>']

def rect(x, y, w, h, fill='#FAF8FE', stroke='#D8CDEC', radius=12):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>')

def text(x, y, value, size=17, color=INK, weight=400, anchor='start'):
    parts.append(f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" font-family="Arial,Helvetica,sans-serif">{escape(value)}</text>')

def path(d, color='#C9B9E9', width=2):
    parts.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>')

def panel(x, y, number, title, w=632, h=280):
    rect(x, y, w, h, radius=16)
    parts.append(f'<circle cx="{x+28}" cy="{y+28}" r="14" fill="{PURPLE}"/>')
    text(x+28, y+34, str(number), 16, 'white', 700, 'middle')
    text(x+51, y+35, title, 22, INK, 700)
    path(f'M{x+18} {y+52}H{x+w-18}', '#E5DCF3', 1)

def pill(x, y, w, label, color=PURPLE):
    rect(x, y, w, 28, '#F0EAFF', 'none', 5)
    text(x+w/2, y+19, label, 12, color, 600, 'middle')

def wave(x, y, width, height, color=PURPLE, seed=0):
    if width <= 0: return
    for i in range(int(width/6)):
        h = 4 + height * (0.2 + 0.8 * abs(math.sin(i*1.9+seed))) * (0.25+0.75*math.sin(math.pi*i/(width/6))**2)
        path(f'M{x+i*6:.1f} {y-h/2:.1f}v{h:.1f}', color, 3)

def box(x, y, w, title, subtitle=None):
    rect(x,y,w,68,'white','#E2D8F0',8)
    text(x+w/2,y+27,title,17,INK,600,'middle')
    if subtitle: text(x+w/2,y+49,subtitle,13,MUTED,400,'middle')

# Six symmetric capability branches; a seventh runs below, split around the caption.
CONNECTOR = '#9F7FE0'
for y in [160, 458, 756]:
    path(f'M652 {y}C704 {y} 697 530 715 530', CONNECTOR, 3)
    path(f'M948 {y}C896 {y} 903 530 885 530', CONNECTOR, 3)
    for x in [652,948]: parts.append(f'<circle cx="{x}" cy="{y}" r="5.5" fill="{CONNECTOR}"/>')
path('M800 676V708', CONNECTOR, 3)
path('M800 794V916', CONNECTOR, 3)
parts.append(f'<circle cx="800" cy="916" r="5.5" fill="{CONNECTOR}"/>')

panel(20,20,1,'Multilingual Understanding & Reasoning')
text(40,99,'Spoken questions. Native audio. Reasoned answers.',17,MUTED)
wave(43,133,215,33)
pill(335,114,131,'14-language BBA')
pill(478,114,151,'Audio understanding')
rect(40,168,592,57,'white','#E8DFF3',8)
text(56,192,'English · Chinese · Arabic · French · Japanese',17)
text(56,212,'Reason across languages, meaning, and acoustic context.',15,MUTED)
pill(40,248,164,'Knowledge & reasoning')
pill(216,248,171,'Speech · sound · music')
pill(399,248,174,'Context-aware answers')

panel(20,318,2,'Long Context & Multi-turn Instructions')
text(40,397,'Keep the goal. Track the changes. Retain the constraints.',17,MUTED)
rect(40,416,440,39,'white','#E5DCF3',6)
text(55,442,'Find a route to the airport.',17)
rect(80,466,440,39,'#F2EDFB','none',6)
text(95,492,'Avoid toll roads. Arrive before 6 pm.',17)
rect(120,516,512,49,'#EEE7FB','#DBCCF1',6)
text(137,546,'New destination → same time and toll constraints.',17,PURPLE,600)
path('M58 456V487H72', '#BBA5DD')
path('M98 506V541H112', '#BBA5DD')

panel(20,616,3,'Tool Use & Executable Actions')
text(40,694,'Turn spoken intent into verifiable outcomes.',17,MUTED)
for x,title,sub in [(40,'Understand','Ground arguments'),(242,'Execute','Tools + retrieval'),(444,'Verify','State + feedback')]:
    box(x,715,188,title,sub)
path('M229 749H238M233 745L238 749L233 753',PURPLE)
path('M431 749H440M435 745L440 749L435 753',PURPLE)
rect(40,801,592,45,'#F1EBFB','none',7)
text(55,829,'Check → clarify → confirm → act → report the result',17,PURPLE,600)
text(40,874,'Search when needed. Acknowledge without claiming success.',15,MUTED)

panel(948,20,4,'Natural Expression, Persona & Empathy')
text(968,98,'Understand the feeling, not only the transcript.',17,MUTED)
wave(972,134,230,35,'#9874C8',3)
pill(1240,119,142,'Acoustic emotion')
pill(1392,119,168,'Consistent character')
rect(968,171,592,43,'white','#E5DCF3',7)
text(985,198,'“I practiced all week... but I’m still nervous.”',18)
rect(1002,228,558,46,'#F0E9FA','none',7)
text(1019,257,'“That makes sense. Let’s take it one step at a time.”',17,'#76519B')

panel(948,318,5,'Full-duplex Conversational Coordination')
text(968,390,'Turn-taking · barge-in · backchannel · multi-party',16,MUTED)
USER_Y, OTHERS_Y, AGENT_Y = 446, 488, 530
AGENT_TONE = '#A082C4'
text(968,USER_Y+4,'USER',11,PURPLE,700)
text(968,OTHERS_Y+4,'OTHERS',11,'#9B87C4',700)
text(968,AGENT_Y+4,'ASSISTANT',11,'#8E68C4',700)
# Scene dividers: dashed, but dark enough to read as four separate examples.
for sx in [1176, 1302, 1429]:
    parts.append(f'<path d="M{sx} 426V554" stroke="#8F6FD6" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>')

# 1 Turn-taking: the user finishes, the assistant takes the floor at the marked junction.
wave(1052,USER_Y,48,20,PURPLE)
wave(1112,AGENT_Y,54,20,AGENT_TONE,3)

# 2 Backchannel: a short user acknowledgement inside the assistant turn, which continues.
wave(1192,AGENT_Y,102,20,AGENT_TONE,5)
wave(1234,USER_Y,24,15,'#A98FE0',6)

# 3 Barge-in: the user starts before the assistant turn ends; the tails overlap and it stops.
wave(1312,AGENT_Y,72,20,AGENT_TONE,2)
wave(1370,USER_Y,48,22,PURPLE,4)
parts.append('<rect x="1368" y="428" width="18" height="120" rx="4" fill="#E3D5FF" fill-opacity="0.75"/>')
path('M1368 428V548','#9C79E2',1.2)
path('M1386 428V548','#9C79E2',1.2)

# 4 Multi-party: someone else speaks during the assistant turn; it is not addressed, so it continues.
wave(1444,USER_Y,30,19,PURPLE,1)
wave(1478,AGENT_Y,84,20,AGENT_TONE,7)
wave(1500,OTHERS_Y,34,15,'#B6A4D8',2)

for cx,name,effect,tone in [(1106,'Turn-taking','user → assistant',MUTED),(1242,'Backchannel','assistant keeps going','#6F60A8'),(1363,'Barge-in','overlap · assistant stops','#7B4FD0'),(1501,'Multi-party','not addressed','#6F60A8')]:
    text(cx,406,name,10,tone,700,'middle')
    text(cx,418,effect,9.5,MUTED,400,'middle')
pill(968,560,157,'Wait for completion')
pill(1136,560,126,'Stop playback')
pill(1273,560,113,'Resume')
pill(1397,560,163,'Semantic control')

panel(948,616,6,'Reliability, Safety & Capability Boundaries')
text(968,694,'Stay factual. Verify first. Know the limits.',17,MUTED)
for y,title,sub in [(716,'Factuality','Ground responses in available evidence.'),(770,'Verification','Confirm before committing to an action.'),(824,'Boundaries','Clarify uncertainty; report unsupported tasks.')]:
    rect(968,y,592,44,'white','#E7DFF1',7)
    parts.append(f'<circle cx="990" cy="{y+22}" r="10" fill="#EFE8FA"/>')
    path(f'M985 {y+22}l4 4 7-8',PURPLE,1.7)
    text(1010,y+28,title,16,PURPLE,600)
    text(1138,y+28,sub,14)

# Reuse the actual Qwen mark, embedded so the SVG is standalone.
parts.append('''<defs>
  <radialGradient id="core-background" cx="38%" cy="28%" r="85%">
    <stop offset="0" stop-color="#FFFFFF"/>
    <stop offset="0.48" stop-color="#EDE3FF"/>
    <stop offset="1" stop-color="#D8C5FA"/>
  </radialGradient>
  <filter id="core-shadow" x="-25%" y="-25%" width="150%" height="160%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="9"/>
    <feOffset dy="9" result="offset-shadow"/>
    <feFlood flood-color="#6942B9" flood-opacity="0.23"/>
    <feComposite operator="in" in2="offset-shadow"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>''')
parts.append('<circle cx="800" cy="540" r="143" fill="#F0E8FD"/>')
parts.append('<circle cx="800" cy="540" r="136" fill="url(#core-background)" stroke="#9C78DE" stroke-width="2" filter="url(#core-shadow)"/>')
parts.append('<circle cx="800" cy="540" r="129" fill="none" stroke="#FFFFFF" stroke-opacity="0.65"/>')
logo = base64.b64encode((ROOT/'assets/qwen-logo.png').read_bytes()).decode()
parts.append(f'<image x="730" y="434" width="140" height="140" href="data:image/png;base64,{logo}"/>')
text(800,356,'Listen. Think.',18,PURPLE,600,'middle')
text(800,382,'Act. Speak.',18,PURPLE,600,'middle')
text(800,590,'Qwen-Audio',25,'#5431AB',700,'middle')
text(800,621,'3.1-Realtime',24,'#5431AB',700,'middle')
rect(688,708,224,86,'white','#D9C9F1',11)
text(800,744,'Continuous conversation',16,PURPLE,700,'middle')
text(800,770,'Grounded action',15,MUTED,500,'middle')

panel(20,916,7,'Persistent Voice Agent',w=1560,h=164)
text(1560,951,'SYSTEM EXTENSION · foreground + background + bounded memory',14,MUTED,400,'end')
for x,w,title,sub in [(42,286,'Live conversation','Keep listening and responding'),(368,270,'Task orchestration','Accept · track · update'),(678,284,'Background execution','Multi-step work across turns'),(1002,266,'Result delivery','Return at the right moment')]:
    box(x,984,w,title,sub)
for x in [338,648,972]:
    path(f'M{x} 1018h20m-6-5 6 5-6 5',PURPLE)
rect(1300,984,260,68,'#EEE7FB','none',8)
text(1430,1011,'Preferences + memory',17,PURPLE,600,'middle')
text(1430,1034,'Separate from live task state',13,MUTED,400,'middle')
parts.append('</svg>')
(ROOT/'assets/overview.svg').write_text('\n'.join(parts),encoding='utf-8')
print('Built assets/overview.svg')
