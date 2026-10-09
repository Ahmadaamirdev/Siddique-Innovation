import React, { useRef, useEffect, useCallback } from 'react';

export const WebBuildingAnimation: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stgRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<number>(0);

  const fit = useCallback(() => {
    const W = wrapRef.current;
    const S = stgRef.current;
    if (!W || !S) return;

    const containerW = W.clientWidth;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Remaining vertical space after navbar (~65px), H1 (~65px), description (~35px), and padding (~25px):
    const maxAllowableH = Math.max(260, Math.min(540, vh - 200));
    const scaleByW = containerW / 800;
    const scaleByH = maxAllowableH / 540;
    const k = Math.min(1.0, scaleByW, scaleByH);

    const targetW = 800 * k;
    const left = Math.max(0, (containerW - targetW) / 2);
    S.style.transform = `scale(${k})`;
    S.style.left = `${left}px`;
    W.style.height = `${Math.round(540 * k)}px`;
  }, []);

  useEffect(() => {
    fit();
    window.addEventListener('resize', fit);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && wrapRef.current) {
      ro = new ResizeObserver(() => fit());
      ro.observe(wrapRef.current);
    }
    return () => {
      window.removeEventListener('resize', fit);
      ro?.disconnect();
    };
  }, [fit]);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const play = useCallback(async () => {
    const S = stgRef.current;
    if (!S) return;

    const my = ++runRef.current;
    S.innerHTML = '';
    S.classList.remove('live');

    const mk = (h?: string, c?: string) => {
      const d = document.createElement('div');
      d.style.cssText = 'position:absolute;' + (c || '');
      if (h) d.innerHTML = h;
      return d;
    };

    const SX = 80;
    const SY = 70;
    const F = 'font-family:system-ui,sans-serif;';

    const PART: Record<string, { b: [number, number, number, number]; h: string }> = {
      nav: {
        b: [0, 0, 640, 36],
        h: `<div style="${F}display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 20px;background:#fff;border-bottom:1px solid #e2e8f0;border-radius:12px 12px 0 0;box-sizing:border-box">
<b style="font-size:13px;color:#0f172a"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#14b8a6,#0d9488);margin-right:6px"></span>Lumen Studio</b>
<span style="font-size:11px;color:#64748b;display:flex;gap:18px"><span class="lnk">Work</span><span class="lnk">Services</span><span class="lnk">Pricing</span><span class="lnk">Contact</span></span>
<span class="cta" style="background:#0f172a;color:#fff;font-size:11px;border-radius:6px;padding:5px 12px;cursor:pointer">Get started</span></div>`,
      },
      hero: {
        b: [24, 52, 300, 126],
        h: `<div style="${F}">
<div style="display:inline-block;font-size:10px;color:#0f766e;background:#ccfbf1;border-radius:99px;padding:3px 9px;font-weight:600">&#9679; Now booking Q4</div>
<div style="font-size:27px;line-height:1.1;font-weight:700;color:#0f172a;margin-top:8px">Build something<br><span style="color:#0d9488">remarkable.</span></div>
<div style="font-size:11.5px;line-height:1.45;color:#64748b;margin-top:8px;width:270px">Design, engineering and launch &mdash; one small team shipping fast, modern websites.</div>
<div style="display:flex;gap:8px;margin-top:11px"><span class="cta" style="background:#0d9488;color:#fff;font-size:11px;font-weight:600;border-radius:7px;padding:7px 14px;cursor:pointer">Start a project</span><span class="cta" style="border:1px solid #cbd5e1;color:#0f172a;font-size:11px;font-weight:600;border-radius:7px;padding:6px 13px;background:#fff;cursor:pointer">See our work</span></div></div>`,
      },
      feat: {
        b: [24, 196, 592, 92],
        h:
          `<div style="${F}display:flex;gap:12px;width:592px">` +
          [
            ['#14b8a6', 'Design', 'Clean, accessible interfaces that feel effortless.'],
            ['#6366f1', 'Engineering', 'Fast, scalable code with tests that actually run.'],
            ['#f59e0b', 'Launch', 'Hosting, analytics and care long after day one.'],
          ]
            .map(
              (c) =>
                `<div class="card" style="flex:1;height:92px;box-sizing:border-box;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:11px 12px;cursor:pointer"><div style="width:22px;height:22px;border-radius:7px;background:${c[0]};margin-bottom:7px"></div><div style="font-weight:700;font-size:12px;color:#0f172a">${c[1]}</div><div style="font-size:10.5px;line-height:1.4;color:#64748b;margin-top:2px">${c[2]}</div></div>`
            )
            .join('') +
          `</div>`,
      },
      stats: {
        b: [24, 300, 592, 40],
        h:
          `<div style="${F}display:flex;justify-content:space-around;align-items:center;width:592px;height:40px;background:#0f172a;border-radius:10px;color:#fff">` +
          [
            [120, '+', 'Sites shipped'],
            [98, '%', 'Happy clients'],
            [24, '/7', 'Support'],
          ]
            .map(
              (s) =>
                `<div style="text-align:center"><b style="font-size:16px;color:#5eead4"><span class="cnt" data-n="${s[0]}">0</span>${s[1]}</b><span style="font-size:10px;color:#94a3b8;margin-left:6px">${s[2]}</span></div>`
            )
            .join('') +
          `</div>`,
      },
      foot: {
        b: [0, 352, 640, 48],
        h: `<div style="${F}display:flex;align-items:center;justify-content:space-between;width:640px;height:48px;padding:0 24px;box-sizing:border-box;background:#e2e8f0;border-radius:0 0 12px 12px;font-size:10.5px;color:#475569"><b style="color:#0f172a">Lumen Studio</b><span style="display:flex;gap:16px"><span class="lnk" style="cursor:pointer">Privacy</span><span class="lnk" style="cursor:pointer">Terms</span><span class="lnk" style="cursor:pointer">Twitter</span></span><span>&copy; 2026 &middot; Made by tiny hands</span></div>`,
      },
    };

    const VIS = `<div style="width:266px;height:126px;border-radius:12px;background:linear-gradient(135deg,#0d9488,#0e7490 60%,#312e81);position:relative;overflow:hidden;box-shadow:0 8px 18px #0006">
<svg width="266" height="126" viewBox="0 0 266 126"><g fill="#ffffff33"><rect x="24" y="70" width="26" height="44" rx="4"/><rect x="62" y="52" width="26" height="62" rx="4"/><rect x="100" y="60" width="26" height="54" rx="4"/><rect x="138" y="34" width="26" height="80" rx="4"/></g><rect x="176" y="18" width="26" height="96" rx="4" fill="#5eead4"/><path d="M24 62L62 46L100 52L138 28L190 10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="190" cy="10" r="4" fill="#fff"/></svg>
<div style="position:absolute;right:12px;top:14px;background:#fff;border-radius:8px;padding:4px 8px;font:700 11px system-ui;color:#0f766e">+248%</div></div>`;

    const BODY = (hat: string, shirt: string) =>
      `<svg width="30" height="40" viewBox="0 0 30 40" style="display:block;overflow:visible"><rect class="l1" x="10" y="26" width="4.5" height="12" rx="1.5" fill="#334155" style="transform-box:fill-box;transform-origin:50% 0"/><rect class="l2" x="15.5" y="26" width="4.5" height="12" rx="1.5" fill="#1e293b" style="transform-box:fill-box;transform-origin:50% 0"/><rect x="9" y="14" width="12" height="13" rx="3" fill="${shirt}"/><rect x="9" y="20" width="12" height="2" fill="#fde68a"/><circle cx="15" cy="10" r="5" fill="#f0c8a0"/><path d="M9 9.5A6 6 0 0 1 21 9.5Z" fill="${hat}"/><rect x="8" y="8.8" width="14" height="2" rx="1" fill="${hat}"/></svg>`;

    const ARM = (c: string) =>
      `<svg width="26" height="12" viewBox="0 0 26 12" style="display:block;overflow:visible"><rect x="0" y="2" width="13" height="3.4" rx="1.7" fill="${c}"/><circle cx="13" cy="3.7" r="2" fill="#f0c8a0"/><rect x="12" y="3" width="9" height="1.6" fill="#92400e"/><rect x="18.5" y="-0.5" width="4.5" height="7.5" rx="1" fill="#94a3b8"/></svg>`;

    const KF: Keyframe[] = [
      { transform: 'rotate(-65deg)' },
      { transform: 'rotate(-70deg)', offset: 0.25, easing: 'ease-in' },
      { transform: 'rotate(22deg)', offset: 0.62 },
      { transform: 'rotate(-10deg)', offset: 0.78, easing: 'ease-out' },
      { transform: 'rotate(-65deg)' },
    ];

    interface Task {
      k: string;
      side?: number;
      d: number;
      hits: number;
      c?: [string, string];
      crane?: number;
    }

    const T: Task[] = [
      { k: 'nav', side: 1, d: 0, hits: 3, c: ['#facc15', '#f97316'] },
      { k: 'hero', side: 1, d: 1100, hits: 4, c: ['#f87171', '#0ea5e9'] },
      { k: 'vis', crane: 1, d: 700, hits: 1 },
      { k: 'feat', side: -1, d: 2300, hits: 5, c: ['#facc15', '#22c55e'] },
      { k: 'stats', side: 1, d: 3500, hits: 3, c: ['#fb923c', '#a855f7'] },
      { k: 'foot', side: -1, d: 4700, hits: 3, c: ['#facc15', '#f97316'] },
    ];

    const feetOf = (b: [number, number, number, number]) => SY + b[1] + b[3] / 2 + 16;
    const crew: HTMLElement[] = [];
    const E: Record<string, HTMLElement> = {};
    const SK: Record<string, HTMLElement> = {};

    let site: HTMLElement;

    const dust = (x: number, y: number) => {
      for (let i = 0; i < 4; i++) {
        const s = 3 + Math.random() * 2;
        const p = mk(
          '',
          `left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:#94a3b8`
        );
        S.appendChild(p);
        const dx = (Math.random() - 0.5) * 18;
        p.animate(
          [
            { transform: 'translate(0,0)', opacity: 0.7 },
            { transform: `translate(${dx}px,${-8 - Math.random() * 8}px)`, opacity: 0 },
          ],
          { duration: 520, easing: 'ease-out' }
        ).onfinish = () => p.remove();
      }
    };

    const worker = (t: Task, feet: number) => {
      const from = t.side === 1 ? -40 : 840;
      const o = mk(
        '',
        `left:0;top:${feet - 38}px;width:30px;height:40px;transform:translateX(${from}px)`
      );
      const f = mk(
        BODY(t.c![0], t.c![1]),
        `left:0;top:0;width:30px;height:40px;transform-origin:15px 0;transform:scaleX(${t.side})`
      );
      const arm = mk(
        ARM(t.c![1]),
        'left:15px;top:15px;transform-origin:2px 3.7px;transform:rotate(75deg)'
      );
      f.appendChild(arm);
      o.appendChild(f);
      S.appendChild(o);
      crew.push(o);
      return {
        o,
        f,
        arm,
        l1: f.querySelector<HTMLElement>('.l1')!,
        l2: f.querySelector<HTMLElement>('.l2')!,
        an: [] as Animation[],
      };
    };

    const walk = async (
      w: ReturnType<typeof worker>,
      toX: number,
      face: number,
      dur: number
    ) => {
      w.f.style.transform = `scaleX(${face})`;
      w.arm.style.transform = 'rotate(75deg)';
      w.an = [
        w.l1.animate(
          [{ transform: 'rotate(26deg)' }, { transform: 'rotate(-26deg)' }],
          { duration: 300, iterations: Infinity, direction: 'alternate' }
        ),
        w.l2.animate(
          [{ transform: 'rotate(-26deg)' }, { transform: 'rotate(26deg)' }],
          { duration: 300, iterations: Infinity, direction: 'alternate' }
        ),
        w.f.animate([{ top: '0px' }, { top: '-1.5px' }], {
          duration: 300,
          iterations: Infinity,
          direction: 'alternate',
        }),
      ];
      w.o.style.transition = `transform ${dur}ms ease-in-out`;
      w.o.style.transform = `translateX(${toX}px)`;
      await sleep(dur);
      w.an.forEach((a) => a.cancel());
    };

    const reveal = (t: Task, p: number) => {
      const e = E[t.k];
      if (!e) return;
      e.style.clipPath =
        t.side === 1
          ? `inset(0 ${100 - p * 100}% 0 0)`
          : `inset(0 0 0 ${100 - p * 100}%)`;
      if (SK[t.k]) SK[t.k].style.opacity = `${1 - p}`;
    };

    const counters = () => {
      site.querySelectorAll<HTMLElement>('.cnt').forEach((c) => {
        const n = +(c.dataset.n || 0);
        const t0 = performance.now();
        (function s(now) {
          const p = Math.min(1, (now - t0) / 1200);
          c.textContent = String(Math.round(n * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(s);
        })(t0);
      });
    };

    const plank = (t: Task, feet: number) => {
      const x = t.side === 1 ? 44 : 714;
      const p = mk(
        '',
        `left:${x}px;top:${feet + 2}px;width:42px;height:5px;background:#a16207;border-radius:2px;opacity:0;transition:opacity .4s;box-shadow:0 1px 0 #422006`
      );
      S.appendChild(p);
      requestAnimationFrame(() => (p.style.opacity = '1'));
      crew.push(p);
    };

    const build = async (myRun: number, t: Task) => {
      await sleep(t.d);
      if (myRun !== runRef.current) return;
      const b = PART[t.k].b;
      const feet = feetOf(b);
      plank(t, feet);
      const w = worker(t, feet);
      const stand = t.side === 1 ? 48 : 728;
      await sleep(30);
      await walk(w, stand, t.side!, 1100);
      w.arm.style.transform = 'rotate(-65deg)';

      for (let n = 1; n <= t.hits; n++) {
        if (myRun !== runRef.current) return;
        w.arm.animate(KF, { duration: 700 });
        await sleep(434);
        if (myRun !== runRef.current) return;
        dust(t.side === 1 ? stand + 34 : stand - 4, feet - 16);
        reveal(t, n / t.hits);
        await sleep(266);
      }

      if (E[t.k]) E[t.k].style.clipPath = 'none';
      if (t.k === 'stats') counters();

      await sleep(250);
      if (myRun !== runRef.current) return;
      await walk(w, t.side === 1 ? -40 : 840, -t.side!, 1100);
    };

    const crane = async (myRun: number, t: Task) => {
      await sleep(t.d);
      if (myRun !== runRef.current) return;
      const x = SX + 350 + 133;
      const cable = mk(
        '',
        `left:${x}px;top:34px;width:2px;height:12px;background:#fbbf24;transition:height 2.2s ease-in-out`
      );
      const v = mk(
        VIS,
        `left:${SX + 350}px;top:46px;transition:top 2.2s ease-in-out;transform-origin:50% 0`
      );
      S.appendChild(cable);
      S.appendChild(v);
      crew.push(cable, v);
      const sway = v.animate(
        [{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }],
        { duration: 900, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
      );
      await sleep(50);
      v.style.top = `${SY + 50}px`;
      cable.style.height = `${SY + 50 - 34}px`;
      await sleep(2200);
      sway.cancel();
      v.animate(
        [
          { transform: 'translateY(0)' },
          { transform: 'translateY(5px)' },
          { transform: 'translateY(0)' },
        ],
        { duration: 260 }
      );
      dust(x - 60, SY + 180);
      dust(x + 60, SY + 180);
      await sleep(260);
      if (myRun !== runRef.current) return;
      if (SK.vis) SK.vis.style.opacity = '0';
      cable.style.transition = 'height 1.2s ease-in-out';
      cable.style.height = '12px';
    };

    const confetti = () => {
      const cols = ['#5eead4', '#fbbf24', '#f87171', '#818cf8', '#34d399'];
      for (let i = 0; i < 36; i++) {
        const p = mk(
          '',
          `left:${SX + 320}px;top:${SY + 20}px;width:6px;height:9px;background:${cols[i % 5]};border-radius:1px`
        );
        S.appendChild(p);
        const dx = (Math.random() - 0.5) * 520;
        const dy = -60 - Math.random() * 140;
        p.animate(
          [
            { transform: 'translate(0,0) rotate(0)', opacity: 1 },
            {
              transform: `translate(${dx}px,${dy}px) rotate(200deg)`,
              opacity: 1,
              offset: 0.4,
            },
            {
              transform: `translate(${dx * 1.15}px,${380 + Math.random() * 60}px) rotate(600deg)`,
              opacity: 0,
            },
          ],
          { duration: 2000 + Math.random() * 800, easing: 'ease-in' }
        ).onfinish = () => p.remove();
      }
    };

    const finish = async (myRun: number) => {
      site.classList.add('live');
      site.style.boxShadow = '0 0 0 2px #5eead4,0 0 40px #14b8a666';
      const b = mk(
        '<span style="font:700 11px system-ui;color:#022c22;background:#5eead4;border-radius:99px;padding:4px 10px">&#9679; LIVE</span>',
        `left:${SX + 560}px;top:${SY - 26}px;opacity:0;transition:opacity .5s`
      );
      S.appendChild(b);
      crew.push(b);
      requestAnimationFrame(() => (b.style.opacity = '1'));
      confetti();
      await sleep(900);
      if (myRun !== runRef.current) return;
      crew
        .filter((e) => e.className === 'pole' || (e.style && e.style.height === '5px'))
        .forEach((e) => {
          e.style.transition = 'opacity .8s';
          e.style.opacity = '0.15';
        });

      // Auto replay: hold on the completed live website for 5 seconds, then automatically rebuild
      await sleep(5000);
      if (myRun === runRef.current) {
        play();
      }
    };

    const scenery = () => {
      // Subtle glowing base horizon line (no box / card ground)
      S.appendChild(
        mk(
          '',
          'left:30px;top:500px;width:740px;height:1px;background:linear-gradient(90deg,transparent,rgba(0,230,210,0.35) 20%,rgba(0,230,210,0.35) 80%,transparent)'
        )
      );

      // scaffold poles
      [[50], [80 - 12], [714], [736]].forEach(([x]) => {
        const p = mk(
          '',
          `left:${x}px;top:${SY + 4}px;width:8px;height:${500 - SY - 4}px;transform-origin:50% 100%;transition:transform .8s ease-out;transform:scaleY(0)`
        );
        p.className = 'pole';
        S.appendChild(p);
        requestAnimationFrame(() => (p.style.transform = 'scaleY(1)'));
        crew.push(p);
      });

      // crane tower + jib
      const tw = mk('', 'left:772px;top:20px;width:12px;height:482px;');
      tw.className = 'pole';
      S.appendChild(tw);
      S.appendChild(
        mk(
          '',
          'left:480px;top:24px;width:306px;height:8px;background:#f59e0b;border-radius:2px'
        )
      );
      S.appendChild(
        mk(
          '',
          'left:766px;top:14px;width:24px;height:16px;background:#d97706;border-radius:3px'
        )
      );
      S.appendChild(
        mk(
          '',
          `left:${SX + 350 + 133 - 5}px;top:30px;width:12px;height:6px;background:#78350f;border-radius:2px`
        )
      );
    };

    scenery();
    site = mk(
      '',
      `left:${SX}px;top:${SY}px;width:640px;height:400px;background:#f8fafc;border-radius:12px;transition:box-shadow .8s`
    );
    S.appendChild(site);

    Object.entries(PART).forEach(([k, p]) => {
      const b = p.b;
      SK[k] = mk(
        '',
        `left:${b[0]}px;top:${b[1]}px;width:${b[2]}px;height:${b[3]}px;border:1px dashed #94a3b8;border-radius:8px;box-sizing:border-box;transition:opacity .4s`
      );
      site.appendChild(SK[k]);
      const e = mk(
        p.h,
        `left:${b[0]}px;top:${b[1]}px;width:${b[2]}px;height:${b[3]}px;transition:clip-path .4s ease-out`
      );
      e.style.clipPath = 'inset(0 100% 0 0)';
      site.appendChild(e);
      E[k] = e;
    });

    SK.vis = mk(
      '',
      'left:350px;top:50px;width:266px;height:126px;border:1px dashed #94a3b8;border-radius:12px;box-sizing:border-box;transition:opacity .4s'
    );
    site.appendChild(SK.vis);

    await Promise.all(T.map((t) => (t.crane ? crane(my, t) : build(my, t))));
    if (my === runRef.current) finish(my);
  }, []);

  useEffect(() => {
    play();
    const currentRun = runRef;
    return () => {
      currentRun.current++;
    };
  }, [play]);

  return (
    <div className="w-full max-w-[960px] mx-auto mt-1 sm:mt-1.5 relative flex flex-col items-center">
      <style>{STYLE}</style>

      {/* Viewport Wrapper - Seamless, completely transparent, no card background, no border, no shadow */}
      <div id="wrap" ref={wrapRef} className="w-full relative overflow-hidden">
        <div
          id="stg"
          ref={stgRef}
          className="absolute top-0 w-[800px] h-[540px] overflow-hidden select-none"
          style={{
            transformOrigin: '0 0',
            background: 'transparent',
            fontFamily: 'system-ui, sans-serif',
          }}
        />
      </div>
    </div>
  );
};

const STYLE = `
.live .card {
  transition: transform .2s, box-shadow .2s;
}
.live .card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
}
.live .cta {
  transition: transform .15s;
}
.live .cta:hover {
  transform: scale(1.06);
}
.live .lnk:hover {
  color: #0d9488;
}
.pole {
  background: repeating-linear-gradient(135deg, #64748b 0 2px, transparent 2px 9px);
  border-left: 2px solid #94a3b8;
  border-right: 2px solid #94a3b8;
  box-sizing: border-box;
}
`;
