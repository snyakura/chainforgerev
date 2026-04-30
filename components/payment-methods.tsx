"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bitcoin, 
  Smartphone,
  FileUp, 
  Wallet, 
  Check, 
  Briefcase, 
  TrendingUp, 
  User, 
  ArrowRight,
  Zap,
  ArrowLeft, 
  Upload, 
  QrCode, 
  ExternalLink, 
  CheckCircle2,
  History,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const countryCodes = [
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+376", name: "Andorra", flag: "🇦🇩" },
  { code: "+244", name: "Angola", flag: "🇦🇴" },
  { code: "+1", name: "Anguilla", flag: "🇦🇮" },
  { code: "+1", name: "Antigua", flag: "🇦🇬" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+297", name: "Aruba", flag: "🇦🇼" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "+1", name: "Bahamas", flag: "🇧🇸" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+1", name: "Barbados", flag: "🇧🇧" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+501", name: "Belize", flag: "🇧🇿" },
  { code: "+229", name: "Benin", flag: "🇧🇯" },
  { code: "+1", name: "Bermuda", flag: "🇧🇲" },
  { code: "+975", name: "Bhutan", flag: "🇧🇹" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+387", name: "Bosnia", flag: "🇧🇦" },
  { code: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "+257", name: "Burundi", flag: "🇧🇮" },
  { code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { code: "+1", name: "Cayman Islands", flag: "🇰🇾" },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { code: "+235", name: "Chad", flag: "🇹🇩" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+269", name: "Comoros", flag: "🇰🇲" },
  { code: "+242", name: "Congo", flag: "🇨🇬" },
  { code: "+243", name: "DR Congo", flag: "🇨🇩" },
  { code: "+682", name: "Cook Islands", flag: "🇨🇰" },
  { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { code: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "+1", name: "Dominica", flag: "🇩🇲" },
  { code: "+1", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+503", name: "El Salvador", flag: "🇸🇻" },
  { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { code: "+372", name: "Estonia", flag: "🇪🇪" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
  { code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
  { code: "+679", name: "Fiji", flag: "🇫🇯" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+594", name: "French Guiana", flag: "🇬🇫" },
  { code: "+689", name: "French Polynesia", flag: "🇵🇫" },
  { code: "+241", name: "Gabon", flag: "🇬🇦" },
  { code: "+220", name: "Gambia", flag: "🇬🇲" },
  { code: "+995", name: "Georgia", flag: "🇬🇪" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "+350", name: "Gibraltar", flag: "🇬🇮" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+299", name: "Greenland", flag: "🇬🇱" },
  { code: "+1", name: "Grenada", flag: "🇬🇩" },
  { code: "+590", name: "Guadeloupe", flag: "🇬🇵" },
  { code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { code: "+224", name: "Guinea", flag: "🇬🇳" },
  { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+592", name: "Guyana", flag: "🇬🇾" },
  { code: "+509", name: "Haiti", flag: "🇭🇹" },
  { code: "+504", name: "Honduras", flag: "🇭🇳" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+98", name: "Iran", flag: "🇮🇷" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮" },
  { code: "+1", name: "Jamaica", flag: "🇯🇲" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+686", name: "Kiribati", flag: "🇰🇮" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+856", name: "Laos", flag: "🇱🇦" },
  { code: "+371", name: "Latvia", flag: "🇱🇻" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { code: "+231", name: "Liberia", flag: "🇱🇷" },
  { code: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { code: "+853", name: "Macau", flag: "🇲🇴" },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰" },
  { code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { code: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+960", name: "Maldives", flag: "🇲🇻" },
  { code: "+223", name: "Mali", flag: "🇲🇱" },
  { code: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
  { code: "+222", name: "Mauritania", flag: "🇲🇷" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+691", name: "Micronesia", flag: "🇫🇲" },
  { code: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "+377", name: "Monaco", flag: "🇲🇨" },
  { code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { code: "+1", name: "Montserrat", flag: "🇲🇸" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { code: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "+674", name: "Nauru", flag: "🇳🇷" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+687", name: "New Caledonia", flag: "🇳🇨" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { code: "+227", name: "Niger", flag: "🇳🇪" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+683", name: "Niue", flag: "🇳🇺" },
  { code: "+850", name: "North Korea", flag: "🇰🇵" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+680", name: "Palau", flag: "🇵🇼" },
  { code: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "+507", name: "Panama", flag: "🇵🇦" },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "+1", name: "Saint Kitts", flag: "🇰🇳" },
  { code: "+1", name: "Saint Lucia", flag: "🇱🇨" },
  { code: "+1", name: "Saint Vincent", flag: "🇻🇨" },
  { code: "+685", name: "Samoa", flag: "🇼🇸" },
  { code: "+378", name: "San Marino", flag: "🇸🇲" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+221", name: "Senegal", flag: "🇸🇳" },
  { code: "+381", name: "Serbia", flag: "🇷🇸" },
  { code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { code: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+211", name: "South Sudan", flag: "🇸🇸" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+249", name: "Sudan", flag: "🇸🇩" },
  { code: "+597", name: "Suriname", flag: "🇸🇷" },
  { code: "+268", name: "Eswatini", flag: "🇸🇿" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+670", name: "Timor-Leste", flag: "🇹🇱" },
  { code: "+228", name: "Togo", flag: "🇹🇬" },
  { code: "+676", name: "Tonga", flag: "🇹🇴" },
  { code: "+1", name: "Trinidad", flag: "🇹🇹" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "+1", name: "Turks and Caicos", flag: "🇹🇨" },
  { code: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+1", name: "Virgin Islands, British", flag: "🇻🇬" },
  { code: "+1", name: "Virgin Islands, U.S.", flag: "🇻🇮" },
  { code: "+967", name: "Yemen", flag: "🇾🇪" },
  { code: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
].sort((a, b) => a.name.localeCompare(b.name));

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string, countryCode?: string) => {
  const digits = phone.replace(/\s+/g, '');
  return /^\d{7,15}$/.test(digits) && !/^(.)\1+$/.test(digits); // Length 7-15, not repeating dummy digits
};

export function PaymentMethods() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const chainforgeUSDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // Standard TRC20 USDT Format

  const handleCopy = () => {
    navigator.clipboard.writeText(chainforgeUSDT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+263",
    broker: "",
    brokerId: "",
    gateway: "",
    amount: "100",
    type: "deposit",
    gatewayNumber: "",
    usdtAccount: "",
    usdtRef: "",
    proofName: "",
    idDoc: "",
    passportDoc: "",
    binanceQrName: ""
  });

  const updateForm = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  type GatewayOption = {
    id: string;
    icon: typeof Smartphone;
    color: string;
  };

  const gatewayOptions: GatewayOption[] = [
    { id: "EcoCash", icon: Smartphone, color: "text-green-500" },
    { id: "InnBucks", icon: Wallet, color: "text-blue-500" },
    { id: "Cash", icon: Briefcase, color: "text-blue-500" },
    { id: "FNB (EFT)", icon: Wallet, color: "text-indigo-500" }
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Fee calculation logic
  const calculateFees = (amountStr: string, gateway: string, broker: string, type: string) => {
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return { brokerFee: 0, gatewayFee: 0, totalDeduction: 0, netAmount: 0 };

    let brokerFee = 0;
    let gatewayFee = 0;

    // Broker Fee (10% for Weltrade, Deriv, Other)
    // This fee applies to the broker, not the payment method itself.
    if (broker === "Weltrade" || broker === "Deriv" || broker === "Other") {
      brokerFee = amount * 0.10;
    }

    // Payment Gateway Fee
    switch (gateway) {
      case "EcoCash":
        // EcoCash fee: 2% or minimum $0.10 for small amounts
        gatewayFee = amount <= 5 ? 0.10 : amount * 0.02;
        break;
      case "InnBucks":
        // InnBucks fee: Flat $0.50
        gatewayFee = 0.50;
        break;
      case "FNB (EFT)":
        // FNB (EFT) fee: Fixed $4 charge
        gatewayFee = 4.00;
        break;
      // USDT and Cash are assumed to have their processing covered by the broker fee, or no direct gateway fee
      case "USDT":
      case "Cash":
      default:
        gatewayFee = 0;
        break;
    }

    const totalDeduction = brokerFee + gatewayFee;
    const netAmount = amount - totalDeduction;

    return { brokerFee, gatewayFee, totalDeduction, netAmount: Math.max(0, netAmount) };
  };

  const { netAmount, brokerFee, gatewayFee } = calculateFees(formData.amount, formData.gateway, formData.broker, formData.type);

  return (
    <section id="services" className="relative border-y border-border/50 py-24 overflow-hidden bg-background isolate transition-colors duration-500">
      {/* Replaced bg.png with a dynamic gradient to prevent 404 */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500/5 to-transparent opacity-50" />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 -right-20 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 -left-20 h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-none px-4 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-6">
            <Briefcase className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">SERVICES & PRODUCTS</span>
          </div>
          <h2 className="text-pretty text-4xl font-black tracking-tighter text-foreground sm:text-5xl lg:text-6xl mb-6 uppercase leading-[1.1]">
            Our Core Service <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">The Bridge</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
           We specialize in one thing and we do it perfectly: moving your Money where you need it,
when you need it.
          </p>
        </motion.div>

        {/* Service Highlight Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          {/* Forex Traders Card - Blue Neon Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 rounded-[3rem] bg-card/60 dark:bg-zinc-900/40 border border-border dark:border-white/5 backdrop-blur-3xl hover:border-blue-500/50 transition-all duration-500 group shadow-[0_0_50px_-12px_rgba(59,130,246,0.1)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700" />
            
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500">
              <TrendingUp className="h-7 w-7 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-3xl font-black text-foreground mb-8 uppercase tracking-tighter">
              FOR FOREX <span className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">TRADERS</span>
            </h3>
            
            <div className="space-y-8">
              {[
                { title: "Instant Deposits", desc: "Fund your MT4, MT5, cTrader, and other brokerage accounts without delays." },
                { title: "Fast Withdrawals", desc: "Access your profits quickly with streamlined withdrawal processing." },
                { title: "Multiple Currencies", desc: "Support for major fiat currencies (USD, EUR, GBP, etc.) with competitive exchange rates." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group/item">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 shrink-0 mt-0.5 transition-transform group-hover/item:scale-110" />
                  <div>
                    <h4 className="text-base font-bold text-foreground uppercase tracking-tight">{item.title}</h4>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Crypto Traders Card - Purple Neon Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative p-10 rounded-[3rem] bg-card/60 dark:bg-zinc-900/40 border border-border dark:border-white/5 backdrop-blur-3xl hover:border-purple-500/50 transition-all duration-500 group shadow-[0_0_50px_-12px_rgba(168,85,247,0.1)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-700" />

            <div className="h-14 w-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500">
              <Bitcoin className="h-7 w-7 text-purple-500 dark:text-purple-400" />
            </div>
            <h3 className="text-3xl font-black text-foreground mb-8 uppercase tracking-tighter">
              FOR CRYPTO <span className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">TRADERS</span>
            </h3>
            
            <div className="space-y-8">
              {[
                { title: "One-Click Transfers", desc: "Easily deposit crypto from your personal wallet to any major exchange (Binance, Coinbase, Bybit, etc.)." },
                { title: "Direct to Wallet", desc: "Withdraw your trading gains directly back to your secure cold storage wallet." },
                { title: "Multi-Chain Support", desc: "Seamless transactions across various blockchain networks with optimized gas fees." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group/item">
                  <CheckCircle2 className="h-6 w-6 text-purple-500 shrink-0 mt-0.5 transition-transform group-hover/item:scale-110" />
                  <div>
                    <h4 className="text-base font-bold text-foreground uppercase tracking-tight">{item.title}</h4>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8 uppercase tracking-tight">
            Make a withdrawal or deposit
          </h3>
          <div className="bg-card/60 dark:bg-zinc-900/60 border border-border dark:border-blue-500/30 ring-1 ring-blue-500/10 dark:ring-blue-500/20 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.1)] dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] group/form">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none group-hover/form:bg-blue-600/20 dark:group-hover/form:bg-blue-600/30 transition-colors duration-500" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Client Details</h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 01 / 04</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Full Name</Label>
                      <Input 
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        suppressHydrationWarning
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Email Address</Label>
                      <Input 
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                        placeholder="john@example.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        suppressHydrationWarning
                      />
                      {formData.email && !isValidEmail(formData.email) && (
                        <p className="text-[10px] text-destructive font-bold uppercase ml-1">Invalid email address</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest ml-1">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input 
                          className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500 max-w-[80px] text-center"
                          placeholder="+263"
                          value={formData.countryCode}
                          onChange={(e) => updateForm({ countryCode: e.target.value.startsWith('+') ? e.target.value : '+' + e.target.value.replace(/\D/g, '') })}
                          suppressHydrationWarning
                        />
                        <Input 
                          className="flex-1 bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                          placeholder="770 000 000"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateForm({ phone: e.target.value.replace(/\D/g, '') })}
                          suppressHydrationWarning
                        />
                      </div>
                      {formData.phone && !isValidPhone(formData.phone, formData.countryCode) && (
                        <p className="text-[10px] text-destructive font-bold uppercase ml-1">Invalid phone format (7-15 digits total)</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Identity Verification (ID or Passport)</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group/id">
                          <input 
                            type="file" 
                            onChange={(e) => updateForm({ idDoc: e.target.files?.[0]?.name || "" })}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            suppressHydrationWarning
                          />
                          <div className="h-20 w-full border border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/30 group-hover/id:border-blue-500/50 transition-all">
                            {formData.idDoc ? (
                              <span className="text-[10px] text-blue-400 font-bold px-2 text-center">{formData.idDoc.substring(0, 15)}...</span>
                            ) : (
                              <><FileUp className="h-4 w-4 text-muted-foreground mb-1" /><span className="text-[9px] font-bold text-muted-foreground uppercase">National ID</span></>
                            )}
                          </div>
                        </div>

                        <div className="relative group/passport">
                          <input 
                            type="file" 
                            onChange={(e) => updateForm({ passportDoc: e.target.files?.[0]?.name || "" })}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            suppressHydrationWarning
                          />
                          <div className="h-20 w-full border border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-secondary/30 group-hover/passport:border-blue-500/50 transition-all">
                            {formData.passportDoc ? (
                              <span className="text-[10px] text-blue-400 font-bold px-2 text-center">{formData.passportDoc.substring(0, 15)}...</span>
                            ) : (
                              <><FileUp className="h-4 w-4 text-muted-foreground mb-1" /><span className="text-[9px] font-bold text-muted-foreground uppercase">Passport</span></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.name || !isValidEmail(formData.email) || !isValidPhone(formData.phone, formData.countryCode) || (!formData.idDoc && !formData.passportDoc)}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                    suppressHydrationWarning
                  >
                    Continue to Broker Selection <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <button onClick={prevStep} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">Broker Info</h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 02 / 04</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Transaction Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {["deposit", "withdrawal"].map((t) => (
                        <button 
                          key={t}
                          onClick={() => updateForm({ type: t, gateway: "" })}
                          className={`py-4 rounded-xl border text-sm font-bold uppercase transition-all ${formData.type === t ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-secondary/50 text-muted-foreground"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <Label className="text-xs uppercase font-bold text-muted-foreground">Select Broker</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Weltrade", "Deriv", "Other"].map((b) => (
                        <button 
                          key={b}
                          onClick={() => updateForm({ broker: b, brokerId: "" })}
                          className={`py-4 rounded-xl border text-sm font-bold uppercase transition-all ${formData.broker === b ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-border bg-secondary/50 text-muted-foreground"}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {formData.broker && (
                      <>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        {(formData.broker === "Weltrade" || formData.broker === "Other") && (
                          <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/20 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">ChainForge Deposit Address (TRC20)</span>
                              <QrCode className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="flex flex-col items-center gap-4">
                              <div className="bg-white p-2 rounded-xl">
                                <img 
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${chainforgeUSDT}`} 
                                  alt="ChainForge QR" 
                                  className="h-32 w-32"
                                />
                              </div>
                              <div 
                                onClick={handleCopy}
                                className="w-full flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-background/50 backdrop-blur-sm border border-border p-3 rounded-xl cursor-pointer hover:bg-secondary/80 transition-all group"
                              >
                                <span className="truncate mr-2">{chainforgeUSDT}</span>
                                {copied ? (
                                  <Check className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3 shrink-0 group-hover:text-blue-500" />
                                )}
                              </div>
                              <p className="text-[9px] text-muted-foreground text-center font-bold uppercase tracking-tighter">
                                Copy this address for your {formData.broker} transfer
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {formData.type === "deposit" && (
                          <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-muted-foreground">
                              {formData.broker === "Deriv" ? "CR Number" : "Broker Account ID (e.g. MT4/MT5 Login)"}
                            </Label>
                            <Input 
                              className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                              placeholder={formData.broker === "Deriv" ? "e.g. CR123456" : "Enter your account number"}
                              value={formData.brokerId}
                              onChange={(e) => updateForm({ brokerId: e.target.value })}
                            />
                          </div>
                        )}
                      </motion.div>
                      </>
                    )}
                  </div>
                  <Button 
                    disabled={!formData.broker || (formData.type === "deposit" && !formData.brokerId)} 
                    onClick={nextStep} 
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    {formData.type === "deposit" ? "Choose Payment Gateway" : "Withdrawal Methods"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <button onClick={prevStep} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight">
                        {formData.type === "deposit" ? "Deposit Details" : "Withdrawal Details"}
                      </h3>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Step 03 / 04</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {gatewayOptions.map((g) => (
                        <button 
                          key={g.id}
                          onClick={() => updateForm({ gateway: g.id })}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${formData.gateway === g.id ? "border-blue-500 bg-blue-500/10" : "border-border bg-secondary/50 hover:border-blue-500/30"}`}
                        >
                          <div className="relative">
                            <g.icon className={`h-6 w-6 ${g.color}`} />
                            {formData.gateway === g.id && (
                              <motion.div layoutId="active" className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3B82F6]" />
                            )}
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${formData.gateway === g.id ? "text-foreground" : "text-muted-foreground"}`}>{g.id}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs uppercase font-bold text-muted-foreground">Amount (USD)</Label>
                        {formData.gateway === "Cash" && (
                          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Min $1</span>
                        )}
                      </div>
                      <Input 
                        type="number"
                        className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500 text-xl font-bold"
                        value={formData.amount}
                        onChange={(e) => updateForm({ amount: e.target.value })}
                      />
                      
                      {parseFloat(formData.amount) > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">
                              {formData.type === "deposit" ? "Funds to be Received" : "Net Payout Amount"}
                            </span>
                            <span className="text-lg font-black text-blue-500">
                              ${netAmount.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[9px] text-muted-foreground leading-tight">
                            {brokerFee > 0 && `A 10% processing fee ($${brokerFee.toFixed(2)})`}
                            {brokerFee > 0 && gatewayFee > 0 && " and "}
                            {gatewayFee > 0 && 
                              (formData.gateway === "EcoCash" 
                                ? `an EcoCash fee of $${gatewayFee.toFixed(2)}` 
                                : formData.gateway === "InnBucks" 
                                  ? `an InnBucks fee of $${gatewayFee.toFixed(2)}` 
                                  : formData.gateway === "FNB (EFT)" 
                                    ? `an FNB (EFT) fee of $${gatewayFee.toFixed(2)}` 
                                    : "")}
                            {(brokerFee > 0 || gatewayFee > 0) 
                              ? ` will be deducted from your ${formData.type} ${formData.type === 'deposit' ? 'to' : 'from'} ${formData.broker}.` 
                              : "No additional fees for this transaction."}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {formData.gateway === "EcoCash" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <Label className="text-xs uppercase font-bold text-muted-foreground">{formData.gateway} Number</Label>
                        <Input 
                          className="bg-secondary/30 border-border py-6 rounded-xl focus:border-blue-500"
                          placeholder="077..."
                          value={formData.gatewayNumber}
                          onChange={(e) => updateForm({ gatewayNumber: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </div>

                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.gateway || (formData.gateway === "Cash" && (parseFloat(formData.amount) < 1 || !formData.amount))}
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-7 rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    Confirm & Process Transaction
                  </Button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                    <div className="h-24 w-24 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center relative">
                      <CheckCircle2 className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-4">Transaction Initiated</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-10">
                    Thank you, <span className="text-foreground font-bold">{formData.name}</span>. Your <span className="text-blue-500 font-bold uppercase">{formData.type}</span> request via <span className="text-blue-500 font-bold">{formData.gateway}</span> is now being processed.
                  </p>
                  
                  <div className="bg-muted rounded-3xl p-6 border border-border text-left mb-10">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase text-muted-foreground">
                      <History className="h-3 w-3" /> Status Tracking
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-foreground">Validation successful</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-foreground">Broker: {formData.broker} {formData.type === "deposit" && `(${formData.brokerId})`}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs text-blue-500 font-bold uppercase">Processing withdrawal/funding...</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-8 italic">
                    A confirmation will be sent to {formData.email}. Our team will get back to you within 2-4 hours.
                  </p>
                  
                  <Button onClick={() => setStep(1)} variant="outline" className="border-border text-muted-foreground hover:text-foreground px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest">
                    Make Another Transfer
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
