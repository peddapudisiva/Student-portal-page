import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: "Dashboard - IXL Student Portal",
  description: "View your academic overview, timetable, and announcements.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
