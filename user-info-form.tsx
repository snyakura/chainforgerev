"use client";

import { UserData } from "@/types/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserInfoFormProps {
  data: UserData;
  updateData: (data: UserData) => void;
  onNext: () => void;
}

export function UserInfoForm({ data, updateData, onNext }: UserInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation logic here (e.g., Zod)
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={handleChange}
            className="bg-black/20 border-white/10"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={handleChange}
            className="bg-black/20 border-white/10"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+263 77..."
            value={data.phone}
            onChange={handleChange}
            className="bg-black/20 border-white/10"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            name="country"
            value={data.country}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md bg-[#0B0F19] border border-white/10 text-sm focus:ring-2 focus:ring-[#F7931A]"
          >
            <option>Zimbabwe</option>
            <option>South Africa</option>
            <option>United Kingdom</option>
            <option>United States</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Trading St."
            value={data.address}
            onChange={handleChange}
            className="bg-black/20 border-white/10"
          />
        </div>
      </div>
      <Button type="submit" className="w-full bg-[#F7931A] text-black hover:bg-[#F7931A]/90 py-6 text-lg font-bold">
        Continue to Plan Selection
      </Button>
    </form>
  );
}