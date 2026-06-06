"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { Panel } from "@/components/ui/panel";
import { SectionLabel } from "@/components/ui/section-label";

export function SeasonalSafetyWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const month = new Date().getMonth();
    // 0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr, 4 = May
    // 5 = Jun, 6 = Jul, 7 = Aug, 8 = Sep
    // 9 = Oct, 10 = Nov, 11 = Dec
    // Display from October 1st to May 31st
    if (month < 5 || month > 8) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <section className="pb-8 sm:pb-16">
      <div className="shell-container">
        <Reveal>
          <Panel className="border-rose-200 bg-rose-50/50 p-6 dark:border-rose-900/50 dark:bg-rose-900/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                {/* We use AlertTriangle if available, otherwise fallback to Info style with Rose color */}
                <div className="text-2xl font-bold">!</div>
              </div>
              <div>
                <SectionLabel variant="rose" className="mb-2">Seasonal Safety Warning</SectionLabel>
                <h2 className="heading-item font-bold text-rose-950 dark:text-rose-100">Dangerous Conditions Outside Summer</h2>
                <div className="mt-3 space-y-3 text-body-lg leading-relaxed text-rose-900/90 dark:text-rose-300/90">
                  <p>
                    Between <strong>October and June</strong>, the Valbona Pass (1,800m) is frequently covered in deep snow and ice. Outside the peak summer window, the standard trail markings often become invisible and the terrain becomes extremely hazardous.
                  </p>
                  <p>
                    The descent toward Valbona involves crossing steep, exposed slopes where a slip can be fatal without specialized winter equipment and expertise.
                  </p>
                  <p className="font-bold text-rose-950 dark:text-rose-50">
                    If you are visiting in the shoulder season, you MUST check current pass conditions (our hostel staff can provide info), or hire a local mountain guide before attempting the trek.
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
