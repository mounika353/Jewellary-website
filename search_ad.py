import urllib.request
import re

html = urllib.request.urlopen("https://www.youtube.com/results?search_query=jewellery+bridal+walk+ad+india").read().decode()
video_ids = re.findall(r'"videoId":"(.*?)"', html)
seen = set()
for vid in video_ids:
    if vid not in seen and len(vid) == 11:
        print(vid)
        seen.add(vid)
    if len(seen) == 1:
        break
