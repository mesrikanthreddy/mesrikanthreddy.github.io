"""Code the downloaded comments against the six-theme keyword codebook.

Usage:  python3 code_comments.py        (reads data/*.json from fetch_threads.py)

A comment counts toward a theme if any of the theme's patterns match. A
comment can match several themes. Only comments of 15 words or more are
analysed. Keyword matching is crude: precision was hand-checked on 12 random
matches per theme (see results.json) and recall was not measured, so treat
every count as a lower bound.
"""
import collections, glob, json, re

MIN_WORDS = 15

CODEBOOK = {
    'intent': '\\b(specs?|specification|specifications|requirements?|know what (?:you|to|we)|what to build|what you want|understand(?:ing)? the problem|problem definition|ambigu\\w+|unclear|domain (?:knowledge|expertise)|the hard part)\\b',
    'review': '\\b(code reviews?|reviewing|reviewers?|review (?:burden|bottleneck|fatigue)|pull requests?|PRs?|unit tests?|test suites?|tests pass\\w*|verif\\w+|validat\\w+|hallucinat\\w+|correctness|CI)\\b|\\btested\\b|\\btests\\b|\\bbugs?\\b',
    'ownership': "\\b(maintain\\w*|maintainab\\w+|tech(?:nical)? debt|legacy|bus factor|comprehension debt|on-?call|incidents?|outages?|(?:don't|do not|didn't|doesn't|never|no longer) (?:really |fully |actually )?understand(?:ing)? (?:the |your |what |how |why |that )?(?:code|codebase|system|it works|what (?:it|the code))|understand(?:ing)? (?:the|your|what|how|why) (?:code|codebase|system)|ownership|own the code|read(?:ing)? (?:the )?code)\\b",
    'slop': '\\b(slop|(?:so|too|much|more|10x|massive|huge|thousands of) (?:more )?(?:lines of )?code|multi-thousand-line|volume of (?:code|prs?)|firehose|flood\\w*)\\b',
    'atrophy': '\\b(atroph\\w+|deskill\\w*|skills? (?:degrad|erod|decay|loss|atroph)\\w*|cognitive (?:offload|decline|debt|deteriorat|atroph)\\w*|offload(?:ing)? (?:my |our |your )?(?:thinking|brain|knowledge|skills?)|(?:dependen(?:ce|cy)|reliance|rely|relying) (?:on|upon) (?:AI|LLMs?|the (?:AI|LLM|model|agent))|crutch|stop(?:ped)? thinking|(?:forgotten|forgetting|forgot) how to|lose (?:my|the|our) (?:ability|skills?|edge)|lost (?:my|the|our) (?:ability|skills?|edge)|use it or lose it|muscle memory)\\b',
    'perception': '(?:feel\\w*|perceiv\\w+|perception|self-report\\w*|illusion|placebo|vibes|subjective|believ\\w+)\\W+(?:\\w+\\W+){0,8}?(?:faster|slower|productiv\\w+|speed\\w*)|(?:faster|slower|productiv\\w+|speed\\w*)\\W+(?:\\w+\\W+){0,8}?(?:feel\\w*|perceiv\\w+|perception|self-report\\w*|illusion|placebo|vibes|subjective)',
}

patterns = {name: re.compile(rx, re.I) for name, rx in CODEBOOK.items()}
total = collections.Counter()
per_thread = collections.defaultdict(collections.Counter)
analysed = collections.Counter()
any_theme = 0
rows = 0

for path in sorted(glob.glob("data/*.json")):
    thread = json.load(open(path))
    for comment in thread["comments"]:
        if len(comment["text"].split()) < MIN_WORDS:
            continue
        rows += 1
        analysed[thread["id"]] += 1
        matched = [name for name, rx in patterns.items() if rx.search(comment["text"])]
        any_theme += bool(matched)
        for name in matched:
            total[name] += 1
            per_thread[thread["id"]][name] += 1

print(f"comments analysed: {rows}; matching any theme: {any_theme} ({100 * any_theme / rows:.1f}%)")
for name in CODEBOOK:
    print(f"{name:<11} {total[name]:>4}  {100 * total[name] / rows:5.1f}%")
print()
for thread_id, n in analysed.items():
    shares = " ".join(f"{name}={100 * per_thread[thread_id][name] / n:4.1f}%" for name in CODEBOOK)
    print(thread_id, f"n={n:<4}", shares)
