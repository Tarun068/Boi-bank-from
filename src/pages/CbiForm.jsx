import { useMemo, useState, useRef } from "react";
import cbi from "../assets/cbi.png";
const APPLICANT_DATA = [
  {
    name: "HIREN SUSHIL KAPOOR",
    "Account number": "3176936093",
    "Account Type": "saving bank",
  },
  {
    name: "PRIYA HIREN KAPOOR",
    "Account number": "5823239684",
    "Account Type": "saving bank",
  },
  {
    name: "VARUN HIREN KAPOOR",
    "Account number": "5823239764",
    "Account Type": "saving bank",
  },
  {
    name: "HIREN SUSHIL KAPOOR",
    "Account number": "5835809164",
    "Account Type": "overdraft",
  },
  {
    name: "HIREN SUSHIL KAPOOR",
    "Account number": "5761277889",
    "Account Type": "overdraft",
  },
  {
    name: "VARUN HIREN KAPOOR",
    "Account number": "5835801675",
    "Account Type": "overdraft",
  },
  {
    name: "PRIYA HIREN KAPOOR",
    "Account number": "5835806628",
    "Account Type": "overdraft",
  },
];

const BENEFICIARY_DATA = [
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
    "Beneficiary name": "SUNIL HARISHANKAR PRAJAPATI",
    "Account number": "206210110015211",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "206210110002242",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "VARUN HIREN KAPOOR",
    "Account number": "206210110013737",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "PRIYA HIREN KAPOOR",
    "Account number": "206210110002100",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR HUF",
    "Account number": "206210110008093",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "AMAN SADHVANI",
    "Account number": "206210110016789",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "SONIYA SHIVKUMAR TADAKE",
    "Account number": "206216510000063",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "MAHEK HIREN KAPOOR",
    "Account number": "206210110016036",
    "Branch Name": "KUBERNAGAR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "DHRUV MAHENDRAKUMAR PRAJAPATI",
    "Account number": "206810110016225",
    "Branch Name": "MEGHANINAGR",
    "account type": "savings",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
  },
  {
    "Beneficiary name": "HIREN SUSHIL KAPOOR",
    "Account number": "206227210000033",
    "Branch Name": "KUBERNAGAR",
    "account type": "overdraft",
    Center: "VADODARA",
    Bank: "BANK OF INDIA",
    "IFS Code No": "BKID0002062",
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

const SectionTitle = ({ children }) => (
  <div className="font-semibold text-[12px] tracking-wide px-2 py-1 border-b border-black text-center">
    {children}
  </div>
);

const Label = ({ children, w = "w-[140px]" }) => (
  <span className={`shrink-0 ${w}`}>{children}</span>
);

const TextLine = ({ className = "", ...props }) => (
  <input
    className={`w-full border-b border-black outline-none align-bottom text-base ${className}`}
    {...props}
  />
);

const SelectLine = ({ options = [], className = "", ...props }) => (
  <select
    className={`w-full border-b border-black outline-none bg-transparent ${className}`}
    {...props}
  >
    {options.map((o, i) => (
      <option key={i} value={o === "Select" ? "" : o}>
        {o}
      </option>
    ))}
  </select>
);

const SearchSelect = ({
  value,
  onChange,
  options,
  listId,
  className = "",
  placeholder = "",
}) => (
  <>
    <input
      list={listId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border-b border-black outline-none text-base bg-transparent ${className}`}
    />
    <datalist id={listId}>
      {options.map((opt) => (
        <option key={opt} value={opt} />
      ))}
    </datalist>
  </>
);

const banks = [
  "Select",
  "Central Bank of India",
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Bank of Baroda",
];

const accountTypes = [
  "Select",
  "Savings",
  "Current",
  "Cash Credit",
  "Overdraft",
  "Term Deposit",
];

export default function CbiForm() {
  const [form, setForm] = useState({ chqDate: "" });

  const handleDateChange = (key, e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };
  /* Applicant state */
  const [applicant, setApplicant] = useState({
    name: "",
    accountNumber: "",
    accountType: "",
    customerId: "",
    address: "",
    phone: "",
    email: "",
    pan: "",
  });

  /* Beneficiary state */
  const [beneficiary, setBeneficiary] = useState({
    ifsc: "",
    bank: "",
    branch: "",
    accountNumber: "",
    repeatAccountNumber: "",
    accountType: "",
    name: "",
    phoneFax: "",
  });

  /* Options for searchable fields */
  const applicantNameOptions = useMemo(
    () => APPLICANT_DATA.map((a) => a.name),
    []
  );
  const applicantAccountOptions = useMemo(
    () => APPLICANT_DATA.map((a) => a["Account number"]),
    []
  );
  const beneficiaryNameOptions = useMemo(
    () => BENEFICIARY_DATA.map((b) => b["Beneficiary name"]),
    []
  );
  const beneficiaryAccountOptions = useMemo(
    () => BENEFICIARY_DATA.map((b) => b["Account number"]),
    []
  );

  /* Helpers */
  const norm = (v) =>
    String(v || "")
      .trim()
      .toLowerCase();

  const fillApplicantFromRecord = (rec) => {
    if (!rec) return;
    setApplicant((s) => ({
      ...s,
      name: rec.name,
      accountNumber: rec["Account number"],
      accountType: rec["Account Type"],
    }));
  };

  const fillBeneficiaryFromRecord = (rec) => {
    if (!rec) return;
    setBeneficiary((s) => ({
      ...s,
      name: rec["Beneficiary name"],
      accountNumber: rec["Account number"],
      repeatAccountNumber: rec["Account number"],
      bank: rec.Bank,
      branch: rec["Branch Name"],
      ifsc: rec["IFS Code No"],
      accountType: rec["account type"],
    }));
  };

  /* Triggers: selecting/typing Name or A/C No */
  const onApplicantNameChange = (val) => {
    setApplicant((s) => ({ ...s, name: val }));
    const hit = APPLICANT_DATA.find((a) => norm(a.name) === norm(val));
    fillApplicantFromRecord(hit);
  };

  const onApplicantAccountChange = (val) => {
    setApplicant((s) => ({ ...s, accountNumber: val }));
    const hit = APPLICANT_DATA.find(
      (a) => norm(a["Account number"]) === norm(val)
    );
    fillApplicantFromRecord(hit);
  };

  const onBeneficiaryNameChange = (val) => {
    setBeneficiary((s) => ({ ...s, name: val }));
    const hit = BENEFICIARY_DATA.find(
      (b) => norm(b["Beneficiary name"]) === norm(val)
    );
    fillBeneficiaryFromRecord(hit);
  };

  const onBeneficiaryAccountChange = (val) => {
    setBeneficiary((s) => ({
      ...s,
      accountNumber: val,
      repeatAccountNumber: val,
    }));
    const hit = BENEFICIARY_DATA.find(
      (b) => norm(b["Account number"]) === norm(val)
    );
    fillBeneficiaryFromRecord(hit);
  };

  const DateInput = ({ value, onChange, w = "100%" }) => {
    const ref = useRef(null);
    const openPicker = () => ref.current?.showPicker?.();
    return (
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={onChange}
        onClick={openPicker}
        onFocus={(e) => e.target.showPicker?.()}
        className="outline-none h-[22px] font-bold border-b border-black"
        style={{ width: w }}
      />
    );
  };

  return (
    <div className="p-4">
      <div className="mx-auto max-w-[980px] bg-white text-black border border-gray-500 shadow-sm p-4 md:p-5 print:p-5 font-['Poppins']">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-3">
          <div className="h-10 w-40 flex items-center justify-center text-[10px]">
            <img src={cbi} alt="" />
          </div>
          <div className="text-center flex-1">
            <h1 className="uppercase font-bold text-[18px] md:text-[18px] leading-tight">
              Application for Funds Transfer RTGS/NEFT
            </h1>
          </div>
        </div>

        {/* Address block */}
        <div className="mt-3 text-[14px] leading-5">
          <div>To,</div>
          <div>The Branch Manager</div>
          <div className="font-semibold">Central Bank of India</div>
          <div className="flex flex-wrap gap-4 mt-1">
            <div className="flex items-end gap-2">
              <TextLine className="w-44" />
              <span>Branch</span>
            </div>
            <div className="ml-auto flex items-end gap-2">
              <span>Date:</span>
              <DateInput
                w={160}
                value={form.chqDate}
                onChange={(e) => handleDateChange("chqDate", e)}
              />
            </div>
          </div>
        </div>

        {/* Amount line */}
        <div className="mt-2 text-[14px] leading-5">
          Dear Sir / Madam,
          <br />
          Please remit a sum of Rs.&nbsp;&nbsp;
          <input
            type="text"
            className="w-[150px] border-b outline-none text-base"
          />{" "}
          (Rs.&nbsp;&nbsp;
          <input
            type="text"
            className="w-[250px] border-b outline-none text-base"
          />
          ) only as per details given below and debit the amount with your
          charges to my/our account with you.
        </div>

        {/* Cash / Cheque */}
        <div className="flex gap-10 mt-3 text-[12px]">
          <label className="inline-flex items-center gap-2 text-base">
            <input type="checkbox" className="w-4 h-4" />
            Cash
          </label>
          <label className="inline-flex items-center gap-2 text-base">
            <input type="checkbox" className="w-4 h-4" />
            Cheque
          </label>
        </div>

        {/* Two-column boxed table */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 border border-black">
          {/* Applicant */}
          <div className="border-r border-black">
            <SectionTitle>DETAILS OF APPLICANT</SectionTitle>
            <div
              className="p-2 grid"
              style={{ gridTemplateRows: "repeat(8, minmax(28px, auto))" }}
            >
              <div className="flex items-end gap-2">
                <Label w="w-[150px]">NAME:</Label>
                <SearchSelect
                  listId="applicant-name-list"
                  value={applicant.name}
                  onChange={onApplicantNameChange}
                  options={applicantNameOptions}
                  placeholder="Select or type name"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">A/C NO:</Label>
                <SearchSelect
                  listId="applicant-ac-list"
                  value={applicant.accountNumber}
                  onChange={onApplicantAccountChange}
                  options={applicantAccountOptions}
                  placeholder="Select or type account"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">TYPE OF A/C:</Label>
                <SearchSelect
                  listId="applicant-type-list"
                  value={applicant.accountType}
                  onChange={(v) =>
                    setApplicant((s) => ({ ...s, accountType: v }))
                  }
                  options={accountTypes}
                  placeholder="Select"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">CUSTOMER ID NO:</Label>
                <TextLine
                  value={applicant.customerId}
                  onChange={(e) =>
                    setApplicant((s) => ({ ...s, customerId: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-2">
                <Label w="w-[150px]">ADDRESS:</Label>
                <textarea
                  rows={3}
                  className="w-full border border-black p-1 outline-none mt-1"
                  value={applicant.address}
                  onChange={(e) =>
                    setApplicant((s) => ({ ...s, address: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">TEL NO. / MOBILE:</Label>
                <TextLine
                  value={applicant.phone}
                  onChange={(e) =>
                    setApplicant((s) => ({ ...s, phone: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">E-MAIL ID:</Label>
                <TextLine
                  value={applicant.email}
                  onChange={(e) =>
                    setApplicant((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">SENDERS PAN NO:</Label>
                <TextLine
                  value={applicant.pan}
                  onChange={(e) =>
                    setApplicant((s) => ({ ...s, pan: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Beneficiary */}
          <div>
            <SectionTitle>DETAILS OF BENEFICIARY</SectionTitle>
            <div
              className="p-2 grid"
              style={{ gridTemplateRows: "repeat(8, minmax(28px, auto))" }}
            >
              <div className="flex items-end gap-2">
                <Label w="w-[150px]">1. IFS CODE:</Label>
                <TextLine
                  className="uppercase"
                  value={beneficiary.ifsc}
                  onChange={(e) =>
                    setBeneficiary((s) => ({ ...s, ifsc: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">2. BANK:</Label>
                <SearchSelect
                  listId="benef-bank-list"
                  value={beneficiary.bank}
                  onChange={(v) => setBeneficiary((s) => ({ ...s, bank: v }))}
                  options={banks}
                  placeholder="Select Bank"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">3. BRANCH:</Label>
                <TextLine
                  value={beneficiary.branch}
                  onChange={(e) =>
                    setBeneficiary((s) => ({ ...s, branch: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">4. A/C. NO:</Label>
                <SearchSelect
                  listId="benef-ac-list"
                  value={beneficiary.accountNumber}
                  onChange={onBeneficiaryAccountChange}
                  options={beneficiaryAccountOptions}
                  placeholder="Select or type account"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">5. REPEAT A/C. NO:</Label>
                <TextLine
                  value={beneficiary.repeatAccountNumber}
                  onChange={(e) =>
                    setBeneficiary((s) => ({
                      ...s,
                      repeatAccountNumber: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">6. TYPE OF A/C:</Label>
                <SearchSelect
                  listId="benef-type-list"
                  value={beneficiary.accountType}
                  onChange={(v) =>
                    setBeneficiary((s) => ({ ...s, accountType: v }))
                  }
                  options={accountTypes}
                  placeholder="Select"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">7. NAME:</Label>
                <SearchSelect
                  listId="benef-name-list"
                  value={beneficiary.name}
                  onChange={onBeneficiaryNameChange}
                  options={beneficiaryNameOptions}
                  placeholder="Select or type name"
                />
              </div>

              <div className="flex items-end gap-2">
                <Label w="w-[150px]">8. TELE. NO. / FAX NO:</Label>
                <TextLine
                  value={beneficiary.phoneFax}
                  onChange={(e) =>
                    setBeneficiary((s) => ({ ...s, phoneFax: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-4">
          <div className="text-[16px] font-semibold text-center underline">
            TERMS &amp; CONDITIONS
          </div>
          <ul className="list-disc pl-5 mt-2 text-[14px] space-y-1">
            <li>This transfer is valid for a single transaction.</li>
            <li>
              Due care is taken while filling up the beneficiary account number
              &amp; IFSC Code.
            </li>
            <li>
              Transfer of an amount up to 49,999 in cash permissible using this
              facility.
            </li>
            <li>
              Photo ID proof to be given by non-customer for cash payment.
            </li>
          </ul>
        </div>

        {/* Declaration */}
        <div className="mt-4">
          <div className="text-[16px] font-semibold text-center underline">
            DECLARATION
          </div>
          <div className="text-[14px] leading-5 mt-2 space-y-2">
            <p>
              We agree to abide by the Real Time Gross settlement System (RTGS)
              guidelines/regulation/rules etc. issued by Reserve Bank of India
              from time to time and also the guidelines and/or terms and
              conditions of Central Bank of India from time to time.
            </p>
            <p>
              We understand that as per RBI circular dated October 14, 2010
              credit will be effected based solely on the account number of
              beneficiary. Name of beneficiary will not be considered as a
              criteria for providing credit.
            </p>
            <p>
              Under normal circumstances, the beneficiary bank/branch would
              credit the beneficiary’s account on the same day (i.e. on the date
              of this application) and the beneficiary bank/branch centre
              subject to the RTGS guidelines/rules/regulation by RBI.
            </p>
          </div>
          <div className="flex justify-end items-center">
            <div className="flex flex-col  mt-2 ">
              <div className=" text-center text-[14px] mb-3">
                Yours Faithfully,
              </div>
              <input className="w-[170px] border-b outline-none mb-2 " />
              <span className="text-center">Applicant’s Signature(s)</span>
            </div>
          </div>
        </div>

        {/* Office use only */}
        <div className="mt-4 border border-black">
          <div className=" font-semibold text-[16px] tracking-wide px-2 py-1  border-black text-center">
            FOR OFFICE USE ONLY
          </div>
          <div className="p-2 text-[14px] space-y-2">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-6  p-2 border">
                <span>Applicant’s Signature(s) verified by:&nbsp;</span>
                <TextLine className="w-40 mt-5" />
                <div className="mt-2">
                  S. S. No.:&nbsp;
                  <TextLine className="w-28" />
                </div>
                <div className="mt-2">
                  Officer HSSC/CD/CC/OD/Dept:&nbsp;
                  <TextLine className="w-40" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3  p-2 border">
                <div className="font-semibold">S. S. No. (MAKER):</div>
                Signature:&nbsp;
                <TextLine className="w-32" />
                <div className="mt-2">
                  Date&nbsp;
                  <TextLine className="w-24" />
                  &nbsp;&nbsp;Time&nbsp;
                  <TextLine className="w-20" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3  p-2 border">
                <div className="font-semibold">S. S. No. (CHECKER):</div>
                Signature:&nbsp;
                <TextLine className="w-32" />
                <div className="mt-2">
                  Date&nbsp;
                  <TextLine className="w-24" />
                  &nbsp;&nbsp;Time&nbsp;
                  <TextLine className="w-20" />
                </div>
              </div>
            </div>
            <div className="mt-2">
              Transaction Reference No.:&nbsp;
              <TextLine className="w-60" />
            </div>
          </div>
        </div>

        {/* Acknowledgement */}
        <div className="mt-4 ">
          <div className=" font-semibold text-[16px] px-2 py-1  text-center">
            ACKNOWLEDGEMENT
          </div>
          <div className="p-2 text-[14px] space-y-2">
            <div className="flex ">
              <span className="w-[210px]">
                Received application from (Name)&nbsp;
              </span>
              <input
                type="text"
                className="text-[16px] w-[300px] border-b outline-none"
              />
              <span className="w-[170px]">
                &nbsp;&nbsp; HSS/CD/CC/OD A/c No.&nbsp;
              </span>
              <input
                type="text"
                className="text-[16px] w-[250px] border-b outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex">
                Rs.&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[200px] border-b outline-none"
                />
              </div>
              <div className="flex">
                on (Date)&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[200px] border-b outline-none"
                />
              </div>
              <div className="flex">
                at Time&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[142px] border-b outline-none"
                />
              </div>
              <div>for funds transfer under RTGS / NEFT.</div>
            </div>
            <div>
              Reference No:&nbsp;
              <input
                type="text"
                className="text-[16px] w-[400px] border-b outline-none"
              />
            </div>
            <div className="flex justify-between mt-6">
              <div>Seal</div>
              <div>Signature of the Officer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
