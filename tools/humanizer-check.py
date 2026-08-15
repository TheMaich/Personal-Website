#!/usr/bin/env python3
"""Tier 1 AI-writing metrics + do-no-harm gate."""
import json, os, re, statistics, sys
from html import unescape

SKIP = {".git","node_modules","assets","assets-2","dist","vendor","tools"}
BLOCK = re.compile(r"<(script|style|svg|noscript|head)\b[^>]*>.*?</\1>", re.S|re.I)

def text_of(html):
    h = BLOCK.sub(" ", html)
    h = re.sub(r"<(p|div|li|h[1-6]|br|section|td|tr)\b[^>]*>", "\n", h, flags=re.I)
    t = unescape(re.sub(r"<[^>]+>", " ", h))
    for a,b in [("\u2019","'"),("\u2018","'"),("\u201c",'"'),("\u201d",'"')]: t = t.replace(a,b)
    t = re.sub(r"[ \t\r\f\v]+", " ", t)
    return "\n".join(l.strip() for l in t.split("\n") if l.strip())

FIRST={"i","me","my","mine","we","us","our","ours"}; SECOND={"you","your","yours"}
AI_VOCAB={"delve","delves","delving","tapestry","pivotal","underscore","underscores","showcase",
 "showcases","showcasing","testament","intricate","realm","landscape","vibrant","seamless",
 "seamlessly","robust","foster","fostering","harness","meticulous","meticulously","groundbreaking",
 "boasts","nestled","crucial","profound","interplay","resonate","elevate","transcend",
 "additionally","moreover","furthermore"}
PIVOT=[re.compile(p,f) for p,f in [
 (r"\b(?:it'?s|this is|that'?s|they'?re)\s+not\s+(?:just|only|merely|simply|about)\b[^.]*[,;]\s*it'?s\b",re.I),
 (r"\bnot\s+(?:just|only|merely|simply)\b[^.]{0,80}\bbut\s+(?:also\s+)?",re.I),
 (r"(?:^|[.?!]\s+)Not\s+\w+",re.M),(r"\bthough not\b",re.I),
 (r"\b(?:does|do|is|are|was|were)\s+not\.(?:\s|$)",re.I)]]
PAT={"false_range":re.compile(r"\bFrom\s+[A-Z0-9][^.,;]{2,40}\s+to\s+[^.,;]{2,40}[.,;]",re.M),
 "copula_avoidance":re.compile(r"\b(?:serves as|stands as|functions as|acts as|boasts)\b",re.I),
 "signposting":re.compile(r"\b(?:let'?s (?:dive|explore|break)|here'?s what you need to know|in conclusion|in summary)\b",re.I),
 "chatbot_residue":re.compile(r"\b(?:great question|i hope this helps|let me know if|certainly!|of course!)\b",re.I),
 "cutoff_hedging":re.compile(r"\b(?:as of my last|based on available information|while specific details)\b",re.I),
 "authority_trope":re.compile(r"\b(?:the real question is|at its core|what really matters|the heart of the matter)\b",re.I),
 "generic_conclusion":re.compile(r"\b(?:the future looks bright|exciting times|step in the right direction)\b",re.I),
 "than_one_that":re.compile(r"\bthan (?:one|a team|a deck|a game) (?:that|who)\b",re.I),
 "template_opener":re.compile(r"(?:^|[.?!]\s+)A\s+\w+\s+(?:that|who|which|with|pushing|pitching)\b",re.M),
 "em_or_en_dash":re.compile(r"[\u2014\u2013]"),
 "emoji":re.compile("[\\U0001F300-\\U0001FAFF\\u2600-\\u27BF\\uFE0F]")}
IT=r"[A-Za-z][^,.;:]{1,60}?"
TRIPLET=re.compile(rf"\b({IT}),\s+({IT}),\s+(?:and\s+|or\s+)?({IT})\s*[.;:]")

def scan(path):
    raw=open(path,encoding="utf-8",errors="replace").read(); t=text_of(raw)
    w=re.findall(r"[A-Za-z']+",t.lower())
    if len(w)<120: return None
    s=[x for x in re.split(r"(?<=[.?!])\s+",t) if x.strip()]; L=[len(x.split()) for x in s] or [0]
    f={}
    for n,rx in PAT.items():
        h=[m.group(0).strip()[:90] for m in rx.finditer(t)]
        if h: f[n]=h
    p=sorted({m.group(0).strip()[:90] for rx in PIVOT for m in rx.finditer(t)})
    if p: f["negation_pivot"]=p
    tri=[f"{a}, {b}, {c}"[:90] for a,b,c in TRIPLET.findall(t)]
    if tri: f["rule_of_three_advisory"]=tri
    v=sorted({x for x in w if x in AI_VOCAB})
    if v: f["ai_vocabulary"]=v
    fp=sum(1 for x in w if x in FIRST)
    return {"path":path,"words":len(w),"sentences":len(s),"first_person":fp,
     "fp_per_1000":round(fp/len(w)*1000,2),"second_person":sum(1 for x in w if x in SECOND),
     "len_mean":round(statistics.mean(L),1),
     "len_stdev":round(statistics.stdev(L),2) if len(L)>1 else 0.0,
     "triplets":len(tri),"templates":len(f.get("template_opener",[])),"pivots":len(p),"findings":f}

def files(a):
    if a: return sorted(x for x in a if x.endswith((".html",".htm")))
    o=[]
    for r,d,n in os.walk("."):
        d[:]=[x for x in d if x not in SKIP and not x.startswith(".")]
        o+=[os.path.join(r,x) for x in n if x.endswith((".html",".htm"))]
    return sorted(o)

RULES=[(lambda b,a:a["first_person"]<b["first_person"],
  "first-person pronouns dropped {b[first_person]} -> {a[first_person]}; pronoun collapse IS the AI signature"),
 (lambda b,a:a["len_stdev"]<b["len_stdev"]-0.5,
  "sentence-length variety fell {b[len_stdev]} -> {a[len_stdev]}; uniform rhythm reads as machine-written"),
 (lambda b,a:a["triplets"]>b["triplets"],"rule-of-three rose {b[triplets]} -> {a[triplets]}"),
 (lambda b,a:a["pivots"]>b["pivots"],"negation pivots rose {b[pivots]} -> {a[pivots]}"),
 (lambda b,a:"em_or_en_dash" in a["findings"] and "em_or_en_dash" not in b["findings"],
  "em/en dash introduced; house rule forbids them")]

def cli():
    av=sys.argv[1:]; pos=[]; cmp=None; i=0
    while i<len(av):
        if av[i]=="--compare": cmp=av[i+1] if i+1<len(av) else None; i+=2; continue
        if av[i].startswith("--"): i+=1; continue
        pos.append(av[i]); i+=1
    return pos,cmp,"--json" in av

def main():
    pos,cmp,as_json=cli()
    res=[r for r in (scan(x) for x in files(pos)) if r]
    if as_json: print(json.dumps({r["path"]:r for r in res},indent=2)); return 0
    if cmp:
        base=json.load(open(cmp)); bad=[]
        if not res: print("ERROR: no prose pages scanned; check the path"); return 1
        for r in res:
            b=base.get(r["path"])
            if not b: print(f"  ~ {r['path']}: no baseline entry, skipped"); continue
            for cond,msg in RULES:
                if cond(b,r): bad.append(f"{r['path']}: "+msg.format(b=b,a=r))
        if bad:
            print("DO-NO-HARM CHECK FAILED\n"); [print("  x "+x) for x in bad]; return 1
        print(f"Do-no-harm check passed on {len(res)} page(s)."); return 0
    for r in res:
        print(f"\n{'='*70}\n{r['path']}\n  {r['words']}w {r['sentences']}s | "
              f"1st-person {r['first_person']} ({r['fp_per_1000']}/1k) 2nd {r['second_person']} | "
              f"len {r['len_mean']} sd {r['len_stdev']}")
        if r["fp_per_1000"]<3 and r["words"]>400: print("  ! PRONOUN COLLAPSE")
        if r["len_stdev"]<5: print("  ! LOW RHYTHM VARIETY")
        for n,h in sorted(r["findings"].items()):
            print(f"  [{len(h):>2}] {n}")
            for x in h[:5]: print(f"        - {x}")
            if len(h)>5: print(f"        ... +{len(h)-5} more")
    print(); return 0

sys.exit(main())
