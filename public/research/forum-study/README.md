# Forum study: what developers say about AI-assisted coding

Supporting material for section 5 of the Yellow Paper
["Syntax Is Solved. Intent Isn't."](https://mesrikanthreddy.github.io/writing/syntax-is-solved)

## What this is

A qualitative, keyword-assisted reading by one coder of 2,731 comments
(15 words or more) from six high-engagement Hacker News threads on
AI-assisted coding, written by 1,428 different people. Raw comments were
downloaded on 6 October 2026.

It shows what developers argue about. It does **not** show how common any
view is in the industry, and it measures nothing about code quality or speed.

## Reproduce it

```
python3 fetch_threads.py     # downloads data/<thread id>.json
python3 code_comments.py     # prints the theme counts
```

`results.json` holds the counts and the precision check from the paper.
Comment text is not redistributed here; the threads are public.

## Threads

| Thread | Date | Points | Comments analysed |
| --- | --- | --- | --- |
| [Measuring the impact of AI on experienced open-source developer productivity](https://news.ycombinator.com/item?id=44522772) | Jul 2025 | 775 | 436 |
| [We are changing our developer productivity experiment design](https://news.ycombinator.com/item?id=47142078) | Feb 2026 | 88 | 58 |
| [After two years of vibecoding, I'm back to writing by hand](https://news.ycombinator.com/item?id=46765460) | Jan 2026 | 865 | 576 |
| [Vibe coding and agentic engineering are getting closer than I'd like](https://news.ycombinator.com/item?id=48037128) | May 2026 | 787 | 785 |
| [Writing code is cheap now](https://news.ycombinator.com/item?id=47125374) | Feb 2026 | 384 | 434 |
| [The cult of vibe coding is dogfooding run amok](https://news.ycombinator.com/item?id=47664912) | Apr 2026 | 616 | 442 |

## Method

1. **Thread selection.** Searched Hacker News's public index for 2025-2026
   threads on AI-assisted coding with more than 200 points; kept the six most
   on-topic. The choice of threads is mine and is a source of bias.
2. **Codebook.** Six themes. Three come from the paper's framework (intent,
   review and verification, ownership). Three emerged from reading a random
   sample of 22 comments before coding (low-quality code volume, skill
   atrophy, perceived versus measured speed).
3. **Coding.** Keyword patterns (see `code_comments.py`). A comment can match
   several themes.
4. **Precision check.** For each theme, 12 random matches were read and
   judged by hand. The first keyword lists for ownership and skill atrophy
   were too loose (skill atrophy matched 1 of 12 correctly) and were
   tightened, then re-checked on a fresh sample.

| Theme | Comments matched | Share | Hand-checked precision |
| --- | --- | --- | --- |
| Review and verification | 395 | 14.5% | 10 of 12 |
| Intent and specs | 210 | 7.7% | 10 of 12 |
| Ownership and maintenance | 181 | 6.6% | 11 of 12 |
| Low-quality code volume | 83 | 3.0% | 11 of 12 |
| Skill atrophy | 27 | 1.0% | 10 of 12 |
| Perceived vs measured speed | 24 | 0.9% | 9 of 12 |

## Limits

- One coder, and the same person who proposed the framework being tested.
  The three framework themes were built into the codebook, so their rank is
  partly by construction.
- Recall was not measured. Counts are lower bounds.
- Precision was checked on small samples (12 per theme), so it is a rough
  guide, not an interval.
- Hacker News is not representative of developers in general.
- Comments are opinions. They are not measurements.
