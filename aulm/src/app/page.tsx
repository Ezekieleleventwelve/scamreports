export default function Home() {
  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(217,187,120,0.26),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-[-220px] left-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,180,217,0.18),transparent_60%)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080a]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10 ring-1 ring-white/10" />
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-wide">AULM</div>
              <div className="text-[11px] text-white/60">Private charter</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-white/75 md:flex">
            <a className="hover:text-white" href="#fleet">Fleet</a>
            <a className="hover:text-white" href="#destinations">Destinations</a>
            <a className="hover:text-white" href="#membership">Membership</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#quote"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 md:inline-flex"
            >
              Request quote
            </a>
            <a
              href="#quote"
              className="inline-flex rounded-full bg-[#d9bb78] px-4 py-2 text-sm font-semibold text-black hover:bg-[#e6cc8a]"
            >
              Book now
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 md:grid-cols-2 md:items-center md:gap-12 md:pb-24 md:pt-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9bb78]" />
                24/7 concierge · Global availability
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                Fly private, the way it should feel.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg">
                Transparent pricing, curated aircraft, and a concierge team that moves at your speed.
                From same-day departures to multi-leg itineraries.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#quote"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#d9bb78] px-6 text-sm font-semibold text-black hover:bg-[#e6cc8a]"
                >
                  Get an instant quote
                </a>
                <a
                  href="#fleet"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white/85 hover:bg-white/10"
                >
                  Explore aircraft
                </a>
              </div>

              <div className="mt-9 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="text-lg font-semibold">15m</div>
                  <div className="text-xs text-white/60">Average quote time</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">250+</div>
                  <div className="text-xs text-white/60">Curated aircraft</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">Global</div>
                  <div className="text-xs text-white/60">Coverage</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(217,187,120,0.35),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.08),transparent_55%)]" />
              </div>

              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-[#07080a]/70 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">Zurich → Dubai</div>
                    <div className="mt-0.5 text-xs text-white/60">Tomorrow · 6 pax · Light jet</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">From €18,900</div>
                    <div className="mt-0.5 text-xs text-white/60">All fees included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 md:grid-cols-2 md:items-start md:py-20">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Request a quote</h2>
              <p className="mt-3 max-w-prose text-sm leading-6 text-white/65">
                Tell us your route and passenger count. We’ll respond with aircraft options, total price,
                and availability. No spam.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#d9bb78]" />
                  <p>Clear pricing with taxes, handling, and landing fees included.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#d9bb78]" />
                  <p>Aircraft & operator vetting — safety first, always.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#d9bb78]" />
                  <p>Concierge support for catering, ground transport, and multi-leg planning.</p>
                </div>
              </div>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1">
                  <div className="text-xs font-medium text-white/70">From</div>
                  <input
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#07080a]/40 px-3 text-sm outline-none ring-0 placeholder:text-white/35 focus:border-white/20 focus:bg-[#07080a]/55"
                    placeholder="ZRH, GVA, LHR…"
                    name="from"
                  />
                </label>
                <label className="space-y-1">
                  <div className="text-xs font-medium text-white/70">To</div>
                  <input
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#07080a]/40 px-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-[#07080a]/55"
                    placeholder="DXB, NCE, PMI…"
                    name="to"
                  />
                </label>
                <label className="space-y-1">
                  <div className="text-xs font-medium text-white/70">Date</div>
                  <input
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#07080a]/40 px-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-[#07080a]/55"
                    placeholder="YYYY-MM-DD"
                    name="date"
                  />
                </label>
                <label className="space-y-1">
                  <div className="text-xs font-medium text-white/70">Passengers</div>
                  <input
                    className="h-11 w-full rounded-xl border border-white/10 bg-[#07080a]/40 px-3 text-sm outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-[#07080a]/55"
                    placeholder="e.g. 6"
                    name="pax"
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-1">
                <div className="text-xs font-medium text-white/70">Notes (optional)</div>
                <textarea
                  className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-[#07080a]/40 px-3 py-2 text-sm outline-none placeholder:text-white/35 focus:border-white/20 focus:bg-[#07080a]/55"
                  placeholder="Preferred aircraft, timing, catering, ground transport…"
                  name="notes"
                />
              </label>

              <button
                type="button"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#d9bb78] text-sm font-semibold text-black hover:bg-[#e6cc8a]"
              >
                Send request
              </button>

              <p className="mt-3 text-xs text-white/45">
                This is a demo UI. Next step: wire to email/CRM + validation.
              </p>
            </form>
          </div>
        </section>

        <section id="fleet" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Aircraft, curated</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/65">
                  Choose the cabin size you need. We’ll propose the best available aircraft for your route,
                  with transparent pricing and operator details.
                </p>
              </div>
              <a href="#quote" className="text-sm font-medium text-[#d9bb78] hover:text-[#e6cc8a]">
                Get options →
              </a>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Light jet", desc: "Up to 7 pax · Short to mid-range", tag: "Efficient" },
                { title: "Midsize jet", desc: "Up to 9 pax · More cabin comfort", tag: "Balanced" },
                { title: "Heavy jet", desc: "Up to 14 pax · Intercontinental", tag: "Long-range" },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {c.tag}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-white/65">{c.desc}</p>
                  <div className="mt-5 h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="destinations" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Popular routes</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              A few routes we handle frequently. Every itinerary is tailored — including repositioning, slots, and permits.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["London", "Nice", "Same-day departures"],
                ["Zurich", "Ibiza", "Weekend getaways"],
                ["Paris", "Dubai", "Intercontinental comfort"],
                ["Milan", "Mykonos", "Seasonal slots support"],
              ].map(([a, b, c]) => (
                <div key={`${a}-${b}`} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{a} → {b}</div>
                    <div className="text-xs text-white/55">From 2h</div>
                  </div>
                  <p className="mt-2 text-sm text-white/65">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="membership" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 md:grid-cols-2 md:items-center md:p-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Membership (optional)</h2>
                <p className="mt-2 text-sm text-white/65">
                  Priority availability, preferred pricing, and a dedicated concierge. Built for frequent flyers.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#quote"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#d9bb78] px-6 text-sm font-semibold text-black hover:bg-[#e6cc8a]"
                  >
                    Talk to concierge
                  </a>
                  <a
                    href="#faq"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white/85 hover:bg-white/10"
                  >
                    See FAQ
                  </a>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Priority quoting", "Fast options for time-sensitive travel."],
                  ["Dedicated support", "One point of contact, 24/7."],
                  ["Operator transparency", "Know who flies you and why."],
                  ["Preferential rates", "Built for frequent flight patterns."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-white/10 bg-[#07080a]/35 p-4">
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="mt-1 text-xs leading-5 text-white/60">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["How fast can you confirm a flight?", "Usually within hours. For urgent travel we can quote and confirm on the same day depending on aircraft availability."],
                ["Is pricing all-in?", "Yes. We quote total pricing including taxes and typical airport fees. Any optional concierge add-ons are always disclosed upfront."],
                ["Can you arrange multi-leg itineraries?", "Absolutely. We plan positioning, slots, permits, and ground transport as a single itinerary."],
                ["What about safety?", "We work with vetted operators and aircraft. We can share operator details and documentation on request."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold">{q}</div>
                  <p className="mt-2 text-sm leading-6 text-white/65">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-white/60">
                <span className="font-semibold text-white">AULM</span> · Private charter concierge
              </div>
              <div className="flex gap-6 text-sm text-white/60">
                <a className="hover:text-white" href="#quote">Quote</a>
                <a className="hover:text-white" href="#fleet">Fleet</a>
                <a className="hover:text-white" href="#faq">FAQ</a>
              </div>
            </div>
            <p className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} AULM. Demo landing page scaffold.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
