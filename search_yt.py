import urllib.request
import re

html = urllib.request.urlopen("https://www.youtube.com/results?search_query=tanishq+jewellery+collection+latest").read().decode()
video_ids = re.findall(r'"videoId":"(.*?)"', html)
# Print first 5 unique
seen = set()
for vid in video_ids:
    if vid not in seen and len(vid) == 11:
        print(vid)
        seen.add(vid)
    if len(seen) == 5:
        break
