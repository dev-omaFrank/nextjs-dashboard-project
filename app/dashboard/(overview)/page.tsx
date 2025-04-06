import { Suspense, useEffect, useState } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default function Page() {
  const [latestInvoices, setLatestInvoices] = useState(null);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const invoices = await fetchLatestInvoices();
      const cards = await fetchCardData();
      setLatestInvoices(invoices);
      setCardData(cards);
    };
    fetchData();
  }, []);

  if (!latestInvoices || !cardData) {
    return (
      <div>
        {/* Loading skeletons while data is being fetched */}
        <CardsSkeleton />
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    );
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />
        </Suspense>
      </div>
    </main>
  );
}
