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
      <style>{`
        @page { 
          size: A4 portrait; 
          margin: 5mm;
        }

        @media print {
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body, html {
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
          }

          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 4mm !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            font-size: 7pt !important;
            line-height: 1.1 !important;
          }

          /* Header section */
          .print-header {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 2mm !important;
            margin-bottom: 2mm !important;
          }

          .print-header img {
            height: 100px !important;
            width: auto !important;
          }

          .print-header h1 {
            font-size: 10pt !important;
            margin: 0 !important;
            padding: 0 !important;
            line-height: 1.1 !important;
          }

          /* Address section - ultra compact */
          .address-block {
            margin-top: 2mm !important;
            margin-bottom: 2mm !important;
            font-size: 10pt !important;
            line-height: 1 !important;
          }

          .address-block > div {
            margin: 0.5mm 0 !important;
          }

          .address-block input {
            font-size: 10pt !important;
            padding: 0 !important;
            height: 12px !important;
          }

          /* Amount section - compact */
          .amount-section {
            margin-top: 1mm !important;
            margin-bottom: 1mm !important;
            font-size: 10pt !important;
            line-height: 1.1 !important;
          }

          .amount-section input {
            font-size: 10pt !important;
            padding: 0 2px !important;
            height: 12px !important;
          }

          /* Payment type checkboxes */
          .payment-type {
            margin-top: 1mm !important;
            margin-bottom: 2mm !important;
            gap: 10px !important;
            font-size: 7pt !important;
          }

          .payment-type input[type="checkbox"] {
            width: 10px !important;
            height: 10px !important;
          }

          /* Main details grid - CRITICAL FIX */
          .details-grid {
            margin-top: 2mm !important;
            margin-bottom: 2mm !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            border: 1px solid black !important;
          }

          .details-grid > div:first-child {
            border-right: 1px solid black !important;
          }

          .details-grid .section-title {
            font-size: 8pt !important;
            padding: 1mm !important;
            border-bottom: 1px solid black !important;
          }

          .details-grid .grid-content {
            padding: 1mm !important;
            display: grid !important;
            grid-template-rows: repeat(8, auto) !important;
            gap: 1mm !important;
          }

          .details-grid .grid-content > div {
            display: flex !important;
            align-items: flex-end !important;
            gap: 2mm !important;
            min-height: 14px !important;
          }

          .details-grid label,
          .details-grid span {
            font-size: 8pt !important;
            white-space: nowrap !important;
          }

          .details-grid input,
          .details-grid select {
            font-size: 8pt !important;
            padding: 0 2px !important;
            height: auto !important;
            min-height: 12px !important;
            line-height: 1 !important;
          }

          .details-grid textarea {
            font-size: 8pt !important;
            padding: 1mm !important;
            min-height: 25px !important;
            max-height: 25px !important;
            line-height: 1.1 !important;
            resize: none !important;
          }

          /* Terms section - ultra compact */
          .terms-section {
            margin-top: 5mm !important;
            margin-bottom: 2mm !important;
          }

          .terms-section .section-header {
            font-size: 10pt !important;
            margin-bottom: 1mm !important;
          }

          .terms-section ul {
            margin: 1mm 0 !important;
            padding-left: 12px !important;
          }

          .terms-section li {
            font-size: 8pt !important;
            line-height: 1.1 !important;
            margin: 0.5mm 0 !important;
          }

          /* Declaration section - compact */
          .declaration-section {
            margin-top: 2mm !important;
            margin-bottom: 2mm !important;
          }

          .declaration-section .section-header {
            font-size: 10pt !important;
            margin-bottom: 1mm !important;
          }

          .declaration-section p {
            font-size: 8pt !important;
            line-height: 1.1 !important;
            margin: 1mm 0 !important;
          }

          .signature-area {
            margin-top: 2mm !important;
          }

          .signature-area > div {
            margin-top: 1mm !important;
          }

          .signature-area .text-center:first-child {
            font-size: 10pt !important;
            margin-bottom: 1mm !important;
          }

          .signature-area input {
            width: 100px !important;
            margin-bottom: 1mm !important;
            font-size: 10pt !important;
          }

          .signature-area span {
            font-size: 10pt !important;
          }

          /* Office section - ultra compact with correct layout */
          .office-section {
            margin-top: 1.5mm !important;
            margin-bottom: 1.5mm !important;
            border: 1px solid black !important;
          }

          .office-section .section-header {
            font-size: 8pt !important;
            padding: 1mm !important;
            border-bottom: none !important;
          }

          .office-grid {
            padding: 1.5mm !important;
          }

          .office-grid .space-y-2 {
            gap: 1.5mm !important;
          }

          /* Fix the grid layout - maintain 3 columns */
          .office-grid .grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 0.5mm !important;
          }

          .office-grid .grid > div {
            padding: 1mm 1.5mm !important;
            font-size: 10pt !important;
            line-height: 1.1 !important;
            border: 1px solid black !important;
          }

          /* First column takes 6 units, other two take 3 each */
          .office-grid .grid > div:first-child {
            grid-column: span 6 !important;
             padding: 1.5mm !important;
          }

          .office-grid .grid > div:nth-child(2) {
            grid-column: span 3 !important;
             padding: 1.5mm !important;
          }

          .office-grid .grid > div:nth-child(3) {
            grid-column: span 3 !important;
             padding: 1.5mm !important;
          }

          /* Ensure grid is 12 columns for proper md:col-span */
          .office-grid .grid-cols-12 {
            display: grid !important;
            grid-template-columns: repeat(12, 1fr) !important;
          }

          .office-grid .col-span-12 {
            grid-column: span 12 !important;
          }

          .office-grid .md\\:col-span-6 {
            grid-column: span 6 !important;
          }

          .office-grid .md\\:col-span-3 {
            grid-column: span 3 !important;
          }

          .office-grid input {
            font-size: 10pt !important;
            padding: 0 1px !important;
            height: 8px !important;
            border: none !important;
            border-bottom: 1px solid black !important;
          }

          .office-grid .font-semibold {
            font-size: 10pt !important;
            margin-bottom: 0.5mm !important;
          }

          .office-grid .mt-2 {
            margin-top: 0.5mm !important;
          }

          .office-grid .mt-5 {
            margin-top: 1mm !important;
          }

          .office-grid span {
            font-size: 10pt !important;
          }

          /* Transaction Reference row */
          .office-grid > .mt-2 {
            margin-top: 0.5mm !important;
            font-size: 5.5pt !important;
          }

          /* Acknowledgement - ultra compact */
          .ack-section {
            margin-top: 3mm !important;
          }

          .ack-section .section-header {
            font-size: 12pt !important;
            padding: 0.5mm !important;
          }

          .ack-content {
            padding: 0.5mm 1mm !important;
          }

          .ack-content .space-y-2 {
            gap: 0.5mm !important;
          }

          .ack-content > div {
            gap: 1mm !important;
            margin-bottom: 3mm !important;
          }

          .ack-content span {
            font-size: 12pt !important;
            white-space: nowrap !important;
          }

          .ack-content input {
            font-size: 5.5pt !important;
            padding: 0 1px !important;
            height: 8px !important;
          }

          .ack-content .mt-6 {
            margin-top: 1mm !important;
          }

          .ack-content .flex {
            align-items: flex-end !important;
          }
        }
      `}</style>

      <div className="print-container mx-auto max-w-[980px] bg-white text-black border border-gray-500 shadow-sm p-4 md:p-5 print:p-5 font-['Poppins']">
        {/* Header */}
        <div className="print-header flex flex-col items-center justify-between gap-3">
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
        <div className="address-block mt-3 text-[14px] leading-5">
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
        <div className="amount-section mt-2 text-[14px] leading-5">
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
        <div className="payment-type flex gap-10 mt-3 text-[12px]">
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
        <div className="details-grid mt-3 grid grid-cols-1 md:grid-cols-2 border border-black">
          {/* Applicant */}
          <div className="border-r border-black">
            <div className="section-title">
              <SectionTitle>DETAILS OF APPLICANT</SectionTitle>
            </div>
            <div
              className="grid-content p-2 grid"
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
            <div className="section-title">
              <SectionTitle>DETAILS OF BENEFICIARY</SectionTitle>
            </div>
            <div
              className="grid-content p-2 grid"
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
        <div className="terms-section mt-4">
          <div className="section-header text-[16px] font-semibold text-center underline">
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
        <div className="declaration-section mt-4">
          <div className="section-header text-[16px] font-semibold text-center underline">
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
              credit the beneficiary's account on the same day (i.e. on the date
              of this application) and the beneficiary bank/branch centre
              subject to the RTGS guidelines/rules/regulation by RBI.
            </p>
          </div>
          <div className="signature-area flex justify-end items-center">
            <div className="flex flex-col  mt-2 ">
              <div className=" text-center text-[14px] mb-3">
                Yours Faithfully,
              </div>
              <input className="w-[170px] border-b outline-none mb-2 " />
              <span className="text-center">Applicant's Signature(s)</span>
            </div>
          </div>
        </div>

        {/* Office use only */}
        <div className="office-section mt-4 border border-black">
          <div className="section-header font-semibold text-[16px] tracking-wide px-2 py-1  border-black text-center">
            FOR OFFICE USE ONLY
          </div>
          <div className="office-grid p-2 text-[14px] space-y-2">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-6  p-2 border">
                <span>Applicant's Signature(s) verified by:&nbsp;</span>
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
        <div className="ack-section mt-4 ">
          <div className="section-header font-semibold text-[16px] px-2 py-1  text-center">
            ACKNOWLEDGEMENT
          </div>
          <div className="ack-content p-2 text-[14px] space-y-2">
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
            <div className="flex gap-3 mt-6">
              <div className="flex">
                Rs.&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[100px] border-b outline-none"
                />
              </div>
              <div className="flex">
                on (Date)&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[100px] border-b outline-none"
                />
              </div>
              <div className="flex">
                at Time&nbsp;
                <input
                  type="text"
                  className="text-[16px] w-[60px] border-b outline-none"
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
