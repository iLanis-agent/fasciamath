import json, random
def dec2(n):
    w, f = divmod(n, 100)
    fs = str(f).zfill(2).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def fascia(r, b):
    n = (r + b - 1)//b; sp = n*b - r
    tail = ", with nothing left over" if sp == 0 else f", leaving {sp} ft of the last one"
    return f"The run of {r} ft takes {pl(n,' board',' boards')} of {b} ft{tail}."
def soffit(r, d):
    return f"The run of {r} ft at {d} inches deep needs {dec2(hu(r*d*100,12))} sq ft of soffit."
def panels(a, c):
    n = (a + c - 1)//c
    return f"The {a} sq ft with panels of {c} sq ft each takes {pl(n,' panel',' panels')}, leaving {n*c-a} sq ft of the last one."
def cost(b, bp, n, pp, r):
    c = b*bp + n*pp
    return f"The {pl(b,' board',' boards')} at ${dec2(bp)} and the {pl(n,' panel',' panels')} at ${dec2(pp)} cost ${money(c)}, or ${money(hu(c,r))} a foot over the {r} ft."
random.seed(753)
R=random.randint
cases = [
 dict(fn="fascia", args=["120","16"], expect=fascia(120,16)),
 dict(fn="soffit", args=["120","18"], expect=soffit(120,18)),
 dict(fn="panels", args=["180","12"], expect=panels(180,12)),
 dict(fn="cost", args=["8","24","15","14","120"], expect=cost(8,2400,15,1400,120)),
]
for _ in range(25):
    r,b=R(1,10000),R(1,24); cases.append(dict(fn="fascia", args=[str(r),str(b)], expect=fascia(r,b)))
for _ in range(25):
    r,d=R(1,10000),R(1,120); cases.append(dict(fn="soffit", args=[str(r),str(d)], expect=soffit(r,d)))
for _ in range(20):
    a,c=R(1,10000000),R(1,100); cases.append(dict(fn="panels", args=[str(a),str(c)], expect=panels(a,c)))
for _ in range(20):
    b,bp,n,pp,r=R(1,100000),R(1,1000000),R(1,1000000),R(1,1000000),R(1,10000)
    cases.append(dict(fn="cost", args=[str(b),dec2(bp),str(n),dec2(pp),str(r)], expect=cost(b,bp,n,pp,r)))
errs=[["fascia",["0","16"]],["fascia",["120","0"]],["soffit",["0","18"]],["soffit",["120","0"]],["panels",["0","12"]],["panels",["180","0"]],
 ["cost",["0","24","15","14","120"]],["cost",["8","0","15","14","120"]],["cost",["8","24","0","14","120"]],["cost",["8","24","15","0","120"]],["cost",["8","24","15","14","0"]],["fascia",["12.5","16"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
