import React, { useRef, useState, useMemo } from "react";
import boi from "../assets/boi.png";

/* -------- Helpers: Number → Words (Indian currency) -------- */
function numToWordsBelowThousand(n, ones, tens) {
  let str = "";
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  if (hundred) {
    str += ones[hundred] + " Hundred";
    if (rest) str += " ";
  }
  if (rest) {
    if (rest < 20) {
      str += ones[rest];
    } else {
      const t = Math.floor(rest / 10);
      const o = rest % 10;
      str += tens[t];
      if (o) str += " " + ones[o];
    }
  }
  return str.trim();
}

function numberToIndianWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (num === 0) return "Zero";

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundredBelow = Math.floor(num % 1000);

  const words = [];
  if (crore) words.push(numToWordsBelowThousand(crore, ones, tens) + " Crore");
  if (lakh) words.push(numToWordsBelowThousand(lakh, ones, tens) + " Lakh");
  if (thousand)
    words.push(numToWordsBelowThousand(thousand, ones, tens) + " Thousand");
  if (hundredBelow)
    words.push(numToWordsBelowThousand(hundredBelow, ones, tens));

  return words.join(" ").trim();
}

function amountToIndianCurrencyWords(input) {
  if (input == null || input === "") return "";
  const num = Number(input);
  if (isNaN(num)) return "";

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  const rupeeWords = numberToIndianWords(rupees);
  if (paise > 0) {
    const paiseWords = numberToIndianWords(paise);
    return ` ${rupeeWords} and ${paiseWords} Paise Only`;
  }
  return ` ${rupeeWords} Only`;
}

/* -------- UI bits -------- */
const Row = ({ children, className = "" }) => (
  <div className={`flex items-center ${className}`}>{children}</div>
);

const Label = ({ children, w = 190 }) => (
  <div className="shrink-0" style={{ width: w }}>
    {children}
  </div>
);

const LineInput = ({
  value,
  onChange,
  w = "100%",
  placeholder = "",
  list,
  type = "text",
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    list={list}
    className="outline-none h-[22px] font-bold border-b border-black"
    style={{ width: w }}
  />
);

function DigitBoxes({
  length = 16,
  name = "digits",
  box = 22,
  gap = 6,
  value = "",
  onChange,
  restrict = "alnum",
}) {
  const refs = useRef([]);
  const clean = (ch) =>
    restrict === "num"
      ? ch.slice(0, 1).replace(/[^0-9]/g, "")
      : ch.slice(0, 1).replace(/[^0-9A-Za-z]/g, "");

  const handleChange = (e, i) => {
    const v = clean(e.target.value);
    const arr = value.split("");
    arr[i] = v;
    const joined = arr.join("");
    onChange(joined);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.currentTarget.value && i > 0)
      refs.current[i - 1]?.focus();
  };

  const chars = useMemo(
    () => Array.from({ length }, (_, i) => value[i] || ""),
    [value, length]
  );

  return (
    <div className="flex" style={{ gap }}>
      {chars.map((ch, i) => (
        <input
          key={i}
          name={`${name}_${i}`}
          maxLength={1}
          value={ch}
          ref={(el) => (refs.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className="text-center font-bold border border-black outline-none"
          style={{ width: box, height: box, fontSize: 13 }}
        />
      ))}
    </div>
  );
}
const DateInput = ({ value, onChange, w = "100%" }) => {
  const ref = useRef(null);

  const openPicker = () => {
    // Chrome/Edge support showPicker; others will just focus
    ref.current?.showPicker?.();
    ref.current?.focus();
  };

  return (
    <input
      ref={ref}
      type="date"
      value={value}
      onChange={onChange}
      onClick={openPicker} // click anywhere on field opens picker
      onFocus={(e) => e.target.showPicker?.()} // also open when focused
      className="outline-none h-[22px] font-bold border-b border-black"
      style={{ width: w }}
    />
  );
};

/* -------- Demo data -------- */
const data1 = [
  {
    "Beneficiary name": "SUNIL HARISHANKAR PRAJAPATI",
    "Account number": "206210110015211",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "206210110002242",
  },
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "206210110013737",
  },
  {
    "Beneficiary name": "PRIYA HIREN KAPOOR",
    "Account number": "206210110002100",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR HUF",
    "Account number": "206210110008093",
  },
  {
    "Beneficiary name": "AMAN SADHVANI",
    "Account number": "206210110016789",
  },
  {
    "Beneficiary name": "SONIYA SHIVKUMAR TADAKE",
    "Account number": "206216510000063",
  },
  {
    "Beneficiary name": "MAHEK HIREN KAPOOR",
    "Account number": "206210110016036",
  },
  {
    "Beneficiary name": "DHRUV MAHENDRAKUMAR PRAJAPATI",
    "Account number": "206810110016225",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "206227210000033",
  },
];

const data2 = [
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "84050100028221",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "BANK OF BARODA",
    "IFS Code No": "BARB0DBKUBE",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "89970100001243",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "BANK OF BARODA",
    "IFS Code No": "BARB0DBKUBE",
  },
  {
    "Beneficiary name": "MAHEK HIREN KAPOOR",
    "Account number": "84050100026881",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "BANK OF BARODA",
    "IFS Code No": "BARB0DBKUBE",
  },
  {
    "Beneficiary name": "HITENDRA KAUSHIK PARMAR",
    "Account number": "919010001008120",
    "Branch Name": "KANJUMARG EAST",
    "account type": "savings",
    Center: "MUMBAI",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0004166",
  },
  {
    "Beneficiary name": "MEGHA KAUSHIK PARMAR",
    "Account number": "5870137117",
    "Branch Name": "TIMES SQUARE BR MUM MH",
    "account type": "savings",
    Center: "MUMBAI",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0005115",
  },
  {
    "Beneficiary name": "MUNIBEN PRAJAPATI",
    "Account number": "925010029882093",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "DIGVIJAY CHAVADA",
    "Account number": "925010037615724",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "ADITYA UPADHYAY",
    "Account number": "925010038277743",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "GUPTA  ABHISHEK",
    "Account number": "925010039295201",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "ABBI ABHISHEK",
    "Account number": "924010075287838",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "ABBI PUNAM",
    "Account number": "925010003039628",
    "Branch Name": "OLD PADRA ROAD",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0002862",
  },
  {
    "Beneficiary name": "HIREN SUSHILKUMAR KAPOOR",
    "Account number": "919010047553831",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "3176936093",
    "Branch Name": "SAIJPUR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "PRIYA HIREN KAPOOR",
    "Account number": "5823239684",
    "Branch Name": "SAIJPUR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "5823239764",
    "Branch Name": "SAIJPUR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "5835809164",
    "Branch Name": "SAIJPUR",
    "account type": "overdraft",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "5761277889",
    "Branch Name": "SAIJPUR",
    "account type": "overdraft",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "5835801675",
    "Branch Name": "SAIJPUR",
    "account type": "overdraft",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "PRIYA HIREN KAPOOR",
    "Account number": "5835806628",
    "Branch Name": "SAIJPUR",
    "account type": "overdraft",
    Center: "AHMEDABAD",
    Bank: "CENTRAL BANK OF INDIA",
    "IFS Code No": "CBIN0280555",
  },
  {
    "Beneficiary name": "MILAN THAKUR",
    "Account number": "60501025452",
    "Branch Name": "VESU SURAT",
    "account type": "savings",
    Center: "SURAT",
    Bank: "BANK OF MAHARASHTRA",
    "IFS Code No": "MAHB0002269",
  },
  {
    "Beneficiary name": "SACHIN PRAJAPATI",
    "Account number": "40218633520",
    "Branch Name": "NEEM KA THANA",
    "account type": "savings",
    Center: "NEEM KA THANA",
    Bank: "STATE BANK OF INDIA",
    "IFS Code No": "SBIN0010080",
  },
  {
    "Beneficiary name": "PRIYANKA PRAJAPATI",
    "Account number": "2718000100397437",
    "Branch Name": "NEEM KA THANA",
    "account type": "savings",
    Center: "NEEM KA THANA",
    Bank: "PUNJAB NATIONAL BANK",
    "IFS Code No": "PUNB0271800",
  },
  {
    "Beneficiary name": "SONIYA MAHENDRAKUMAR PRAJAPATI",
    "Account number": "20301913090",
    "Branch Name": "MEGHANINAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "STATE BANK OF INDIA",
    "IFS Code No": "SBIN0006140",
  },
  {
    "Beneficiary name": "L AND T FINANCE LIMITED",
    "Account number": "LTHLH02LP250212185511",
    "Branch Name": "MUMBAI",
    "account type": "current",
    Center: "MUMBAI",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0CCH274",
  },
  {
    "Beneficiary name": "KAUSHIK NAROTTAM PARMAR",
    "Account number": "1606000301099915",
    "Branch Name": "MUMBAI",
    "account type": "savings",
    Center: "MUMBAI",
    Bank: "PUNJAB NATIONAL BANK",
    "IFS Code No": "PUNB0160600",
  },
  {
    "Beneficiary name": "BHATT TIRTH  PARASBHAI",
    "Account number": "8848328812",
    "Branch Name": "ISCON AMBLI ROAD",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "KOTAK MAHINDRA BANK",
    "IFS Code No": "KKBK0002617",
  },
  {
    "Beneficiary name": "KAPOOR KHUSHI",
    "Account number": "925010029877761",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "AHMEDABAD",
    Bank: "AXIS BANK",
    "IFS Code No": "UTIB0003120",
  },
];

/* -------- Main -------- */
export default function BOIFormPixelPerfect() {
  const [form, setForm] = useState({
    remitter: "",
    titleOfAccount: "",
    applicantAccountNo: "",
    chqNo: "",
    chqDate: "", // YYYY-MM-DD
    beneficiaryName: "",
    accountNumber: "",
    accountType: {
      savings: false,
      current: false,
      cashCredit: false,
      overdraft: false,
    },
    center: "",
    bank: "",
    ifsc: "",
    branch: "",
    amount: "",
    bankCharges: "",
    total: "",
    rupeesInWords: "",
    declAmount: "",
    date: "", // YYYY-MM-DD
    mobile: "",
    debitedApplicantAc: "",
    sfmsUsersOnly: "",
    dateOfTransfer: "", // YYYY-MM-DD
    sfmsTrnNo: "",
    finalUtrNo: "",
  });

  const [manualEntry, setManualEntry] = useState(false);
  const [signatureSrc, setSignatureSrc] = useState(null);

  /* Lookups */
  // Applicant lookups use data1
  const appByName = useMemo(() => {
    const map = new Map();
    data1.forEach((d) => {
      const key = String(d["Beneficiary name"] || "")
        .trim()
        .toLowerCase();
      if (key) map.set(key, d);
    });
    return map;
  }, []);

  const appByAccount = useMemo(() => {
    const map = new Map();
    data1.forEach((d) => {
      const key = String(d["Account number"] || "").trim();
      if (key) map.set(key, d);
    });
    return map;
  }, []);

  // Beneficiary lookups use data2
  const benByName = useMemo(() => {
    const map = new Map();
    data2.forEach((d) => {
      const key = String(d["Beneficiary name"] || "")
        .trim()
        .toLowerCase();
      if (key) map.set(key, d);
    });
    return map;
  }, []);

  const benByAccount = useMemo(() => {
    const map = new Map();
    data2.forEach((d) => {
      const key = String(d["Account number"] || "").trim();
      if (key) map.set(key, d);
    });
    return map;
  }, []);

  /* Options */
  // Applicant
  const applicantNameOptions = useMemo(
    () => data1.map((d) => d["Beneficiary name"]).filter(Boolean),
    []
  );
  const applicantAccOptions = useMemo(
    () => data1.map((d) => d["Account number"]).filter(Boolean),
    []
  );

  // Beneficiary
  const beneficiaryOptions = useMemo(
    () => data2.map((d) => d["Beneficiary name"]).filter(Boolean),
    []
  );
  const accountNumberOptions = useMemo(
    () => data2.map((d) => d["Account number"]).filter(Boolean),
    []
  );

  const setField = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  /* Applicant handlers (use data1) */
  const handleApplicantTitleSelect = (e) => {
    const val = e.target.value;
    setField({ titleOfAccount: val });
    const found = appByName.get(
      String(val || "")
        .trim()
        .toLowerCase()
    );
    if (found) {
      setField({
        applicantAccountNo: found["Account number"] || "",
      });
    }
  };
  const handleSignatureFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSignatureSrc(reader.result); // data URL works well for print
    reader.readAsDataURL(file);
  };

  const handleApplicantAccountSelect = (e) => {
    const acc = e.target.value;
    if (!acc) return;
    const found = appByAccount.get(acc);
    if (found) {
      setForm((prev) => ({
        ...prev,
        titleOfAccount: found["Beneficiary name"] || "",
        applicantAccountNo: found["Account number"] || "",
      }));
    }
  };

  /* Beneficiary handlers (use data2) */
  const handleBeneficiarySelect = (e) => {
    const val = e.target.value;
    if (val === "__manual__") {
      setManualEntry(true);
      setForm((prev) => ({
        ...prev,
        beneficiaryName: "",
        accountNumber: "",
        branch: "",
        center: "",
        bank: "",
        ifsc: "",
        accountType: {
          savings: false,
          current: false,
          cashCredit: false,
          overdraft: false,
        },
      }));
      return;
    }
    setManualEntry(false);
    setField({ beneficiaryName: val });

    const found = benByName.get(val.trim().toLowerCase());
    if (found) {
      const accountType = (found["account type"] || "").toLowerCase();
      setForm((prev) => ({
        ...prev,
        beneficiaryName: found["Beneficiary name"] || "",
        accountNumber: (found["Account number"] || "").slice(0, 16),
        branch: found["Branch Name"] || "",
        center: found["Center"] || "",
        bank: found["Bank"] || "",
        ifsc: (found["IFS Code No"] || "").toUpperCase().slice(0, 11),
        accountType: {
          savings: accountType === "savings",
          current: accountType === "current",
          cashCredit: accountType === "cash credit",
          overdraft: accountType === "overdraft",
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        accountNumber: "",
        branch: "",
        center: "",
        bank: "",
        ifsc: "",
        accountType: {
          savings: false,
          current: false,
          cashCredit: false,
          overdraft: false,
        },
      }));
    }
  };

  const handleBeneficiaryManual = (e) => {
    const name = e.target.value;
    setManualEntry(true);
    setField({ beneficiaryName: name });
  };

  const handleBeneficiaryAccountSelect = (e) => {
    const acc = e.target.value;
    if (!acc) return;
    const found = benByAccount.get(acc);
    if (found) {
      const accountType = (found["account type"] || "").toLowerCase();
      setForm((prev) => ({
        ...prev,
        beneficiaryName: found["Beneficiary name"] || "",
        accountNumber: (found["Account number"] || "").slice(0, 16),
        branch: found["Branch Name"] || "",
        center: found["Center"] || "",
        bank: found["Bank"] || "",
        ifsc: (found["IFS Code No"] || "").toUpperCase().slice(0, 11),
        accountType: {
          savings: accountType === "savings",
          current: accountType === "current",
          cashCredit: accountType === "cash credit",
          overdraft: accountType === "overdraft",
        },
      }));
      setManualEntry(false);
    }
  };

  /* Amount + Charges -> Total, and Rupees follows TOTAL */
  const handleAmountOrCharges = (key, val) => {
    const cleanVal = val.replace(/[^\d.]/g, "");
    const next = { ...form, [key]: cleanVal };

    const a = parseFloat(next.amount || "0") || 0;
    const c = parseFloat(next.bankCharges || "0") || 0;
    const total = a + c;

    next.total = total ? String(total.toFixed(2)) : "";
    next.rupeesInWords = next.total
      ? amountToIndianCurrencyWords(Number(next.total))
      : "";

    setForm(next);
  };

  const handleTotalChange = (val) => {
    const cleanVal = String(val).replace(/[^\d.]/g, "");
    setForm((prev) => ({
      ...prev,
      total: cleanVal,
      rupeesInWords: cleanVal
        ? amountToIndianCurrencyWords(Number(cleanVal))
        : "",
    }));
  };

  const handleDateChange = (key, e) => {
    const v = e.target.value; // yyyy-mm-dd
    setField({ [key]: v });
  };

  const SearchableSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Select option",
    w = "100%",
    className = "",
  }) => {
    const [search, setSearch] = useState("");
    const filtered = options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="relative w-full">
        <input
          value={search || value}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className={`h-[24px] font-bold border-b border-black outline-none bg-white ${className}`}
          style={{ width: w }}
          onFocus={(e) => e.target.select()}
        />
        {search && (
          <div
            className="absolute left-0 top-[100%] bg-white border border-black max-h-[150px] overflow-y-auto z-50"
            style={{ width: w }}
          >
            {filtered.length ? (
              filtered.map((opt, i) => (
                <div
                  key={i}
                  className="px-2 py-[3px] text-[12px] hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    onChange(opt);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-2 py-[3px] text-[12px] text-gray-500">
                No match
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center bg-white print:bg-white">
      <style>{`
  @page { size: A4; margin: 10mm; }
  @media print {
    .no-print { display: none !important; }
    input, select { -webkit-appearance: none; appearance: none; }
    input[type="checkbox"] {
      -webkit-appearance: checkbox !important;
      appearance: checkbox !important;
    }
    .a4 { box-shadow: none !important; border-width: 1px !important; }
    .signature-img { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`}</style>

      <div
        className="a4 relative bg-white text-black shadow-sm border border-black"
        style={{ width: 794, height: 1123, padding: 22 }}
      >
        {/* Print button (hidden when printing) */}
        <button
          onClick={() => window.print()}
          className="no-print  p-1 bg-blue-600 text-white font-semibold rounded shadow"
        >
          Print Form
        </button>

        {/* Header */}
        <div className="flex items-start justify-center flex-wrap gap-1 mb-1">
          <div className="flex items-center gap-1 ">
            <div className="text-[10px] ">
              <div className="font-semibold text-[12px]">बैंक ऑफ इंडिया</div>
              <div className=" text-[14px] font-bold">Bank of India</div>
            </div>
            <div>
              <div className="text-[43px] font-extrabold tracking-tight leading-none">
                BOI
              </div>
            </div>
            <img className="h-12 w-12" src={boi} alt="" />
          </div>
        </div>
        <div className="text-[18px] text-center font-bold">
          कुबेरनगर शाखा / Kubernagar Branch
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mt-2 text-[18px] font-bold text-center relative inline-block">
            BOI STAR INSTA REMIT APPLICATION FORM RTGS / NEFT / DD / PAY SLIP
            <hr className=" border-t-2 border-black w-full" />
          </div>
        </div>

        {/* Applicant */}
        <div className="mt-[16px]">
          <div className="text-[15px] font-bold">
            DETAILS OF APPLICANT (મોકલનાર )
          </div>
          <div className="border-t border-black w-[245px] mt-[1px]" />
          <div className="mt-[10px] text-[12px]">
            <Row className="mb-[8px]">
              <Label w={90}>(Remitter)</Label>
            </Row>

            <Row className="mb-[8px]">
              <Label w={190}>1. Title of Account</Label>
              {/* Applicant Title dropdown using data1 */}
              <SearchableSelect
                options={applicantNameOptions}
                value={form.titleOfAccount}
                onChange={(val) =>
                  handleApplicantTitleSelect({ target: { value: val } })
                }
                className=""
              />
            </Row>

            <Row className="mb-[4px]">
              <Label w={190}>2. Account No.</Label>
              <div className="flex items-center gap-2 w-full">
                <LineInput
                  value={form.applicantAccountNo}
                  onChange={(e) =>
                    setField({ applicantAccountNo: e.target.value })
                  }
                />
                {/* Add no-print here so it hides on print */}
                <div className="no-print" style={{ width: 220 }}>
                  <SearchableSelect
                    options={applicantAccOptions}
                    value=""
                    onChange={(val) =>
                      handleApplicantAccountSelect({ target: { value: val } })
                    }
                  />
                </div>
              </div>
            </Row>

            <Row className="mb-[10px]">
              <Label w={190}></Label>
              <div className="text-[11px]">
                (Savings / Current / Cash Credit / Overdraft)
              </div>
            </Row>

            <Row className="mb-[8px]">
              <Label w={190}>3. CHQ. No.</Label>
              <LineInput
                w={300}
                value={form.chqNo}
                onChange={(e) => setField({ chqNo: e.target.value })}
              />
              <div className="w-[18px]" />
              <Label w={80}>CHQ Date :</Label>
              <DateInput
                w={160}
                value={form.chqDate}
                onChange={(e) => handleDateChange("chqDate", e)}
              />
            </Row>
          </div>
        </div>

        {/* Beneficiary */}
        <div className="mt-[18px]">
          <div className="text-[15px] font-bold">
            DETAILS OF BENEFICIARY : (ભેાણેફિશયરી)
          </div>
          <div className="border-t border-black w-[272px] mt-[1px]" />
          <div className="mt-[10px] text-[12px] space-y-[10px]">
            {/* HTML Dropdown or Manual Entry */}
            <Row>
              <Label w={190}>1. Beneficiary's name</Label>
              {!manualEntry ? (
                <SearchableSelect
                  options={beneficiaryOptions}
                  value={form.beneficiaryName}
                  onChange={(val) =>
                    handleBeneficiarySelect({ target: { value: val } })
                  }
                />
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <LineInput
                    w={"100%"}
                    value={form.beneficiaryName}
                    onChange={handleBeneficiaryManual}
                    placeholder="Type beneficiary name"
                  />
                  <button
                    type="button"
                    onClick={() => setManualEntry(false)}
                    className="no-print px-2 py-1 text-xs border border-black rounded"
                  >
                    Back to list
                  </button>
                </div>
              )}
            </Row>

            <Row>
              <Label w={190}>2. Account No.</Label>
              <div className="flex items-center gap-2 w-full">
                <DigitBoxes
                  length={16}
                  name="beneficiary_account"
                  restrict="num"
                  value={form.accountNumber}
                  onChange={(val) => setField({ accountNumber: val })}
                />
                {/* This dropdown hides on print */}
                <div className="no-print" style={{ width: 130 }}>
                  <SearchableSelect
                    options={accountNumberOptions}
                    value=""
                    onChange={(val) =>
                      handleBeneficiaryAccountSelect({ target: { value: val } })
                    }
                  />
                </div>
              </div>
            </Row>

            <Row className="items-center">
              <Label w={190}>3. Type of Account</Label>
              <div className="flex items-center gap-5 text-[12px]">
                {[
                  ["savings", "Savings"],
                  ["current", "Current"],
                  ["cashCredit", "Cash Credit"],
                  ["overdraft", "Overdraft"],
                ].map(([key, label]) => (
                  <label key={key} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-[12px] h-[12px] border border-black rounded-none accent-black"
                      checked={form.accountType[key]}
                      onChange={(e) =>
                        setField({
                          accountType: {
                            ...form.accountType,
                            [key]: e.target.checked,
                          },
                        })
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </Row>

            <Row>
              <Label w={190}>4. Center (શાખાનું નામ)</Label>
              <LineInput
                value={form.center}
                onChange={(e) => setField({ center: e.target.value })}
              />
            </Row>

            <Row>
              <Label w={190}>5. Bank</Label>
              <LineInput
                value={form.bank}
                onChange={(e) => setField({ bank: e.target.value })}
              />
            </Row>

            <Row>
              <Label w={190}>6. IFSC Code</Label>
              <DigitBoxes
                length={11}
                name="ifsc"
                restrict="alnum"
                value={form.ifsc}
                onChange={(val) => setField({ ifsc: val.toUpperCase() })}
              />
            </Row>

            <Row>
              <Label w={190}>7. Branch</Label>
              <LineInput
                value={form.branch}
                onChange={(e) => setField({ branch: e.target.value })}
              />
            </Row>
          </div>
        </div>

        {/* Amount block */}
        <div className="mt-[14px] text-[12px]">
          <Row className="mb-[8px]">
            <div>(Amount to be remitted : Rs.</div>
            <div className="mx-[8px]">
              <LineInput
                w={160}
                value={form.amount}
                onChange={(e) =>
                  handleAmountOrCharges("amount", e.target.value)
                }
              />
            </div>
            <div>)</div>
            <div className="ml-[24px]">Bank charges : Rs.</div>
            <div className="ml-[8px]">
              <LineInput
                w={160}
                value={form.bankCharges}
                onChange={(e) =>
                  handleAmountOrCharges("bankCharges", e.target.value)
                }
              />
            </div>
          </Row>

          <Row className="mb-[8px]">
            <div>Total : Rs.</div>
            <div className="ml-[8px]">
              <LineInput
                w={200}
                value={form.total}
                onChange={(e) => handleTotalChange(e.target.value)}
              />
            </div>
          </Row>

          <Row>
            <div>Rupees</div>
            <div className="ml-[8px] flex-1">
              <LineInput
                w={"100%"}
                value={form.rupeesInWords}
                onChange={(e) => setField({ rupeesInWords: e.target.value })}
              />
            </div>
          </Row>
        </div>

        {/* Declaration */}
        <div className="mt-[12px] text-[11px] leading-[16px]">
          Please remit an amount of Rs.
          <input
            className="w-[120px] mx-[6px] border-b border-black outline-none h-[18px] text-[11px] font-bold"
            value={form.total}
            onChange={(e) => handleTotalChange(e.target.value)}
          />
          to the beneficiary as per the details mentioned above by debiting the
          said amount and your charges to my/our account. I have read the terms
          and conditions given overleaf and I agree to abide by them.
        </div>

        {/* Date picker + Mobile */}
        <div className="mt-[15px] grid grid-cols-2 gap-x-[30px] items-center">
          <Label w={60}>Date :</Label>
          <DateInput
            value={form.date}
            onChange={(e) => handleDateChange("date", e)}
          />

          <Label w={90}>Mobile No. :</Label>
          <LineInput
            value={form.mobile}
            onChange={(e) =>
              setField({ mobile: e.target.value.replace(/[^\d]/g, "") })
            }
          />
        </div>

        {/* Sign lines */}
        {/* <div className="w-[100px] flex  no-print shrink-0">
          <input type="file" accept="image/*" onChange={handleSignatureFile} />
          {signatureSrc && (
            <button
              type="button"
              className="text-xs border border-black p-1 rounded w-full"
              onClick={() => setSignatureSrc(null)}
            >
              Remove
            </button>
          )}
        </div> */}

        {/* widen container so both fit comfortably */}

        <div className="w-full flex justify-end gap-10">
          <div className="w-[200px] text-center relative">
            {/* <div className="flex justify-center items-end h-[42px]">
              {signatureSrc && (
                <img
                  src={signatureSrc}
                  alt="Signature"
                  className="signature-img"
                  style={{
                    maxWidth: 300,
                    maxHeight: 36,
                    objectFit: "contain",
                  }}
                />
              )}
            </div> */}
            <div className="mt-16 border-b border-black h-[2px]" />
            <div className="text-[10px] mt-[3px]">(Authorised Signatory)</div>
          </div>
        </div>

        {/* Bank Use Only */}
        <div className="mt-[26px]">
          <div className="text-[12px] font-bold text-center">
            FOR BANK'S USE ONLY
          </div>

          <div className="mt-[10px] text-[12px] grid grid-cols-2 gap-x-[34px] gap-y-[10px]">
            <Row>
              <Label w={170}>Debited Applicant's A/c.</Label>
              <LineInput
                value={form.debitedApplicantAc}
                onChange={(e) =>
                  setField({ debitedApplicantAc: e.target.value })
                }
              />
            </Row>
            <Row>
              <Label w={170}>For SFMS users only</Label>
              <LineInput
                value={form.sfmsUsersOnly}
                onChange={(e) => setField({ sfmsUsersOnly: e.target.value })}
              />
            </Row>
            <Row>
              <Label w={170}>Date of Transfer</Label>
              <LineInput type="text" />
            </Row>
            <Row>
              <Label w={170}>SFMS TRN No.</Label>
              <LineInput
                value={form.sfmsTrnNo}
                onChange={(e) => setField({ sfmsTrnNo: e.target.value })}
              />
            </Row>
            <Row>
              <Label w={170}>Final UTR No.</Label>
              <LineInput
                value={form.finalUtrNo}
                onChange={(e) => setField({ finalUtrNo: e.target.value })}
              />
            </Row>
          </div>

          <div className="mt-[34px] flex justify-between">
            <div className="w-[240px] text-center">
              <div className="border-b border-black h-[18px]" />
              <div className="text-[10px] mt-[3px]">(Authorised Signatory)</div>
            </div>
            <div className="w-[240px] text-center">
              <div className="border-b border-black h-[18px]" />
              <div className="text-[10px] mt-[3px]">(Authorised Signatory)</div>
            </div>
          </div>
        </div>

        {/* Footer marker */}
        <div className="absolute bottom-[18px] left-[22px] text-[9px] opacity-75 select-none">
          BOI
        </div>
      </div>
    </div>
  );
}
