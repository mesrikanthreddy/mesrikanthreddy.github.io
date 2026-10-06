"""Download the full comment trees of the six Hacker News threads used in the study.

Usage:  python3 fetch_threads.py        (writes data/<thread id>.json)

Uses the public Algolia HN API. Comment text is NOT redistributed with the
paper; run this script to rebuild the dataset. Counts may differ slightly if
comments have been added, edited, or removed since 6 October 2026.
"""
import html, json, os, re, urllib.request

THREADS = {
    44522772: "Measuring the impact of AI on experienced open-source developer productivity",
    47142078: "We are changing our developer productivity experiment design",
    46765460: "After two years of vibecoding, I'm back to writing by hand",
    48037128: "Vibe coding and agentic engineering are getting closer than I'd like",
    47125374: "Writing code is cheap now",
    47664912: "The cult of vibe coding is dogfooding run amok",
}


def clean(text):
    if not text:
        return ""
    text = re.sub(r"<p>", "\n\n", text)
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(text).strip()


def walk(node, depth, out):
    for child in node.get("children", []):
        text = clean(child.get("text"))
        if text and not child.get("deleted") and not child.get("dead"):
            out.append({"id": child["id"], "depth": depth, "author": child.get("author"),
                        "created": child.get("created_at"), "text": text})
        walk(child, depth + 1, out)


os.makedirs("data", exist_ok=True)
for thread_id in THREADS:
    item = json.load(urllib.request.urlopen(f"https://hn.algolia.com/api/v1/items/{thread_id}", timeout=120))
    comments = []
    walk(item, 0, comments)
    with open(f"data/{thread_id}.json", "w") as fh:
        json.dump({"id": thread_id, "title": item.get("title"), "points": item.get("points"),
                   "created": item.get("created_at"), "comments": comments}, fh)
    print(thread_id, item.get("title"), len(comments))
