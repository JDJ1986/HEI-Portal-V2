"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
import Image from 'next/image';
import { differenceInDays, parse } from 'date-fns';

const USER_DATA = [
  {
    email: "Ben@test.com",
    name: "Ben V R",
    address: "3110 Cottonwood Road, Walla Walla WA 99362",
    initialHomeValue: 1200000,
    currentHomeValue: 1450000,
    premiumIssued: 200000,
    issueDate: "2/24/2021",
    homePaceShare: 0.58,
    strike: 395000,
    heiCapRate: 0.1999
  },
  {
    email: "Megan@test.com",
    name: "Megan Gr",
    address: "192 Tomahawk Ln, Breckenridge CO 80424",
    initialHomeValue: 2000000,
    currentHomeValue: 1800000,
    premiumIssued: 100000,
    issueDate: "6/30/2022",
    homePaceShare: 0.1625,
    strike: 192500,
    heiCapRate: 0.23
  },
  {
    email: "Bo@test.com",
    name: "Bo Joerg",
    address: "13 Cove At forest Crk, Oakridge TN, 37830",
    initialHomeValue: 750000,
    currentHomeValue: 800000,
    premiumIssued: 75000,
    issueDate: "7/1/2023",
    homePaceShare: 0.40,
    strike: 150000,
    heiCapRate: 0.2150
  }
];

export default function PortalContent() {
  const router = useRouter();
  const [userData, setUserData] = useState<typeof USER_DATA[0] | null>(null);
  const [currentHomeValue, setCurrentHomeValue] = useState(0);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const user = USER_DATA.find(u => u.email === userEmail);
    if (user) {
      setUserData(user);
      setCurrentHomeValue(user.currentHomeValue);
    } else {
      router.push('/login');
    }
  }, [router]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const handleCurrentHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCurrentHomeValue(Number(value));
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    router.push("/login");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const contractDaysOutstanding = differenceInDays(new Date(), parse(userData.issueDate, 'M/d/yyyy', new Date()));
  const uncappedUnwindValue = Math.round((currentHomeValue * userData.homePaceShare) - userData.strike);
  const cappedUnwindValue = Math.round(userData.premiumIssued * Math.pow(1 + userData.heiCapRate, contractDaysOutstanding / 365));
  const estimatedObligation = Math.min(uncappedUnwindValue, cappedUnwindValue);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-64 mb-8">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="House Banner"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">HEI Portal</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Welcome, {userData.name}</h2>
            <p className="text-gray-600">{userData.address}</p>
          </div>
          <Button variant="destructive" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Initial Contract Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <p className="font-semibold">Initial Home Value:</p>
                  <p>{formatCurrency(userData.initialHomeValue)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Premium Issued:</p>
                  <p>{formatCurrency(userData.premiumIssued)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">HomePace Share:</p>
                  <p>{(userData.homePaceShare * 100).toFixed(2)}%</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Strike:</p>
                  <p>{formatCurrency(userData.strike)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">HEI Cap Rate:</p>
                  <p>{(userData.heiCapRate * 100).toFixed(2)}%</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Issue Date:</p>
                  <p>{userData.issueDate}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">Contract Days Outstanding:</p>
                  <p>{contractDaysOutstanding}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>HomePace Option Contract</li>
                <li>In Person Home Inspection</li>
                <li>Recorded DOT</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Estimated Current Consumer Obligation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Current Home Value:</p>
                <Input
                  type="text"
                  value={formatCurrency(currentHomeValue)}
                  onChange={handleCurrentHomeValueChange}
                  className="w-40 text-right text-blue-500 font-semibold"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Uncapped Unwind Value:</p>
                <p className="text-lg font-semibold">{formatCurrency(uncappedUnwindValue)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Capped Unwind Value:</p>
                <p className="text-lg font-semibold">{formatCurrency(cappedUnwindValue)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Estimated Obligation Using a Current Home Value of {formatCurrency(currentHomeValue)}:</p>
                <p className="text-lg font-semibold">{formatCurrency(estimatedObligation)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="bg-gray-200 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-semibold mb-2">Contact HomePace</h3>
          <p>E-mail: Support@homepace.com</p>
          <p>PH: 1 212 313 4457</p>
        </div>
      </footer>
    </div>
  );
}