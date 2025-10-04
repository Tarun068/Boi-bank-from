import React, { useRef, useState, useMemo } from "react";
import boi from "./assets/boi.png";

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

  let words = [];

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundredBelow = Math.floor(num % 1000);

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

const data = [
  {
    "Beneficiary name": "Prajapati sunil",
    "Account number": "206210110015211",
    "Branch Name": "Kubernagar",
    Center: "ahmedabad",
    Bank: "Bank of india",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "206210110013737",
    "Branch Name": "KUBERNAGAR",
    Center: "AHMEDABAD",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
];

const Row = ({ children, className = "" }) => (
  <div className={`flex items-center ${className}`}>{children}</div>
);

const Label = ({ children, w = 190 }) => (
  <div className="shrink-0" style={{ width: w }}>
    {children}
  </div>
);

const LineInput = ({ value, onChange, w = "100%", placeholder = "", list }) => (
  <input
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

export default function BOIFormPixelPerfect() {
  const [form, setForm] = useState({
    remitter: "",
    titleOfAccount: "",
    applicantAccountNo: "",
    chqNo: "",
    chqDate: "",
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
    date: "",
    mobile: "",
    debitedApplicantAc: "",
    sfmsUsersOnly: "",
    dateOfTransfer: "",
    sfmsTrnNo: "",
    finalUtrNo: "",
  });

  const lookup = useMemo(() => {
    const map = new Map();
    data.forEach((d) => {
      const key = String(d["Beneficiary name"] || "")
        .trim()
        .toLowerCase();
      if (key) map.set(key, d);
    });
    return map;
  }, []);

  const beneficiaryOptions = useMemo(
    () => data.map((d) => d["Beneficiary name"]).filter(Boolean),
    []
  );

  const setField = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleBeneficiaryChange = (e) => {
    const name = e.target.value;
    setField({ beneficiaryName: name });
    const found = lookup.get(name.trim().toLowerCase());
    if (found) {
      setForm((prev) => ({
        ...prev,
        beneficiaryName: found["Beneficiary name"] || "",
        accountNumber: found["Account number"] || "",
        branch: found["Branch Name"] || "",
        center: found["Center"] || "",
        bank: found["Bank"] || "",
        ifsc: found["IFS Code No"] || "",
      }));
    }
  };

  /** Auto-calc total and words on Amount/Charges change */
  const handleAmountOrCharges = (key, val) => {
    const cleanVal = val.replace(/[^\d.]/g, "");
    const next = { ...form, [key]: cleanVal };

    const a = parseFloat(next.amount || "0") || 0;
    const c = parseFloat(next.bankCharges || "0") || 0;
    const total = a + c;

    next.total = total ? String(total.toFixed(2)) : "";
    // Auto-fill the "Rupees" in words line from "Amount"
    next.rupeesInWords = a ? amountToIndianCurrencyWords(a) : "";
    // Also reflect in declaration amount if you want it to mirror main amount
    next.declAmount = next.declAmount || (a ? String(a.toFixed(2)) : "");

    setForm(next);
  };
  // put this inside the component, next to other handlers
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

  return (
    <div className="w-full flex justify-center bg-white print:bg-white">
      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          .no-print { display: none !important; }
          input { -webkit-appearance: none; appearance: none; }
          .a4 { box-shadow: none !important; border-width: 1px !important; }
        }
      `}</style>

      <div
        className="a4 relative bg-white text-black shadow-sm border border-black"
        style={{ width: 794, height: 1123, padding: 22 }}
      >
        <button
          onClick={() => window.print()}
          className="no-print mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow"
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
            DETAILS OF APPLICANT (मोकद्दार)
          </div>
          <div className="border-t border-black w-[245px] mt-[1px]" />
          <div className="mt-[10px] text-[12px]">
            <Row className="mb-[8px]">
              <Label w={90}>(Remitter)</Label>
              <LineInput
                value={form.remitter}
                onChange={(e) => setField({ remitter: e.target.value })}
              />
            </Row>

            <Row className="mb-[8px]">
              <Label w={190}>1. Title of Account</Label>
              <LineInput
                value={form.titleOfAccount}
                onChange={(e) => setField({ titleOfAccount: e.target.value })}
              />
            </Row>

            <Row className="mb-[4px]">
              <Label w={190}>2. Account No.</Label>
              <LineInput
                value={form.applicantAccountNo}
                onChange={(e) =>
                  setField({ applicantAccountNo: e.target.value })
                }
              />
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
              <Label w={50}>Date :</Label>
              <LineInput
                w={140}
                placeholder="DD/MM/YYYY"
                value={form.chqDate}
                onChange={(e) => setField({ chqDate: e.target.value })}
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
            <Row>
              <Label w={190}>1. Beneficiary's name</Label>
              <LineInput
                value={form.beneficiaryName}
                onChange={handleBeneficiaryChange}
                list="beneficiaries"
              />
              <datalist id="beneficiaries">
                {beneficiaryOptions.map((n, i) => (
                  <option key={i} value={n} />
                ))}
              </datalist>
            </Row>

            <Row>
              <Label w={190}>2. Account No.</Label>
              <DigitBoxes
                length={16}
                name="beneficiary_account"
                restrict="num"
                value={form.accountNumber}
                onChange={(val) => setField({ accountNumber: val })}
              />
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
            className="w-[100px] mx-[6px] border-b border-black outline-none h-[18px] text-[11px] font-bold"
            value={form.declAmount}
            onChange={(e) =>
              setField({ declAmount: e.target.value.replace(/[^\d.]/g, "") })
            }
          />
          to the beneficiary as per the details mentioned above by debiting the
          said amount and your charges to my/our account. I have read the terms
          and conditions given overleaf and I agree to abide by them.
        </div>

        {/* Sign + mobile */}
        <div className="mt-[15px] grid grid-cols-2 gap-x-[30px]">
          <Label w={60}>Date :</Label>
          <LineInput
            placeholder="DD/MM/YYYY"
            value={form.date}
            onChange={(e) => setField({ date: e.target.value })}
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
        <div className="mt-[28px] flex justify-end">
          <div className="w-[240px] text-center">
            <div className="border-b border-black h-[18px]" />
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
              <LineInput
                placeholder="DD/MM/YYYY"
                value={form.dateOfTransfer}
                onChange={(e) => setField({ dateOfTransfer: e.target.value })}
              />
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
      </div>
    </div>
  );
}
