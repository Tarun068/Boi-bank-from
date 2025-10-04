import React, { useRef } from "react";
import boi from "./assets/boi.png";

const Row = ({ children, className = "" }) => (
  <div className={`flex items-center ${className}`}>{children}</div>
);

const Label = ({ children, w = 190 }) => (
  <div className={`shrink-0`} style={{ width: w }}>
    {children}
  </div>
);

const LineInput = ({ w = "100%", placeholder = "" }) => (
  <input
    placeholder={placeholder}
    className="outline-none h-[22px] font-bold border-b border-black"
    style={{ width: w }}
  />
);

function DigitBoxes({ length = 16, name = "digits", box = 22, gap = 6 }) {
  const refs = useRef([]);
  const onChange = (e, i) => {
    const v = e.target.value.replace(/[^0-9A-Za-z]/g, "").slice(0, 1);
    e.target.value = v;
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onKeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.currentTarget.value && i > 0)
      refs.current[i - 1]?.focus();
  };
  return (
    <div className="flex" style={{ gap }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          name={`${name}_${i}`}
          maxLength={1}
          ref={(el) => (refs.current[i] = el)}
          onChange={(e) => onChange(e, i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className="text-center font-bold border border-black outline-none"
          style={{ width: box, height: box, fontSize: 13 }}
        />
      ))}
    </div>
  );
}

export default function BOIFormPixelPerfect() {
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

      {/* A4 canvas */}
      <div
        className="a4 relative bg-white text-black shadow-sm border border-black"
        style={{ width: 794, height: 1123, padding: 22 }}
      >
        {/* Top header */}
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

        {/* DETAILS OF APPLICANT */}
        <div className="mt-[16px]">
          <div className="text-[15px] font-bold">
            DETAILS OF APPLICANT (मोकद्दार)
          </div>
          <div className="border-t border-black w-[245px] mt-[1px]" />

          <div className="mt-[10px] text-[12px]">
            <Row className="mb-[8px]">
              <Label w={90}>(Remitter)</Label>
              <LineInput />
            </Row>

            <Row className="mb-[8px]">
              <Label w={190}>1. Title of Account</Label>
              <LineInput />
            </Row>

            <Row className="mb-[4px]">
              <Label w={190}>2. Account No.</Label>
              <LineInput />
            </Row>
            <Row className="mb-[10px]">
              <Label w={190}></Label>
              <div className="text-[11px]">
                (Savings / Current / Cash Credit / Overdraft)
              </div>
            </Row>

            <Row className="mb-[8px]">
              <Label w={190}>3. CHQ. No.</Label>
              <LineInput w={300} />
              <div className="w-[18px]" />
              <Label w={50}>Date :</Label>
              <LineInput w={140} placeholder="DD/MM/YYYY" />
            </Row>
          </div>
        </div>

        {/* DETAILS OF BENEFICIARY */}
        <div className="mt-[18px]">
          <div className="text-[15px] font-bold">
            DETAILS OF BENEFICIARY : (ભેાણેફિશયરી)
          </div>
          <div className="border-t border-black w-[272px] mt-[1px]" />

          <div className="mt-[10px] text-[12px] space-y-[10px]">
            <Row>
              <Label w={190}>1. Beneficiary's name</Label>
              <LineInput />
            </Row>

            <Row>
              <Label w={190}>2. Account No.</Label>
              <DigitBoxes
                length={16}
                name="beneficiary_account"
                box={22}
                gap={6}
              />
            </Row>

            <Row className="items-center">
              <Label w={190}>3. Type of Account</Label>
              <div className="flex items-center gap-5 text-[12px]">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[12px] h-[12px] border border-black rounded-none accent-black"
                  />
                  <span>Savings</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[12px] h-[12px] border border-black rounded-none accent-black"
                  />
                  <span>Current</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[12px] h-[12px] border border-black rounded-none accent-black"
                  />
                  <span>Cash Credit</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-[12px] h-[12px] border border-black rounded-none accent-black"
                  />
                  <span>Overdraft</span>
                </label>
              </div>
            </Row>

            <Row>
              <Label w={190}>4. Center (શાખાનું નામ)</Label>
              <LineInput />
            </Row>

            <Row>
              <Label w={190}>5. Bank</Label>
              <LineInput />
            </Row>

            <Row>
              <Label w={190}>6. IFC Code</Label>
              <DigitBoxes length={11} name="ifsc" box={22} gap={6} />
            </Row>

            <Row>
              <Label w={190}>7. Branch</Label>
              <LineInput />
            </Row>
          </div>
        </div>

        {/* Amount block */}
        <div className="mt-[14px] text-[12px]">
          <Row className="mb-[8px]">
            <div>(Amount to be remitted : Rs.</div>
            <div className="mx-[8px]">
              <LineInput w={160} />
            </div>
            <div>)</div>
            <div className="ml-[24px]">Bank charges : Rs.</div>
            <div className="ml-[8px]">
              <LineInput w={160} />
            </div>
          </Row>

          <Row className="mb-[8px]">
            <div>Total : Rs.</div>
            <div className="ml-[8px]">
              <LineInput w={200} />
            </div>
          </Row>

          <Row>
            <div>Rupees</div>
            <div className="ml-[8px] flex-1">
              <LineInput w={"100%"} />
            </div>
          </Row>
        </div>

        {/* Declaration */}
        <div className="mt-[12px] text-[11px] leading-[16px]">
          Please remit an amount of Rs.
          <input className="w-[100px] mx-[6px] border-b border-black outline-none h-[18px] text-[11px]" />
          to the beneficiary as per the details mentioned above by debiting the
          said amount and your charges to my/our account. I have read the terms
          and conditions given overleaf and I agree to abide by them.
        </div>

        {/* Sign + mobile */}
        <div className="mt-[15px] grid grid-cols-2 gap-x-[30px]">
          <Label w={60}>Date :</Label>
          <LineInput placeholder="DD/MM/YYYY" />

          <Label w={90}>Mobile No. :</Label>
          <LineInput />
        </div>

        {/* Sign lines */}
        <div className="mt-[28px] flex justify-end">
          <div className="w-[240px] text-center">
            <div className="border-b border-black h-[18px]" />
            <div className="text-[10px] mt-[3px]">(Authorised Signatory)</div>
          </div>
        </div>

        {/* For Bank's Use Only */}
        <div className="mt-[26px]">
          <div className="text-[12px] font-bold text-center">
            FOR BANK'S USE ONLY
          </div>

          <div className="mt-[10px] text-[12px] grid grid-cols-2 gap-x-[34px] gap-y-[10px]">
            <Row>
              <Label w={170}>Debited Applicant's A/c.</Label>
              <LineInput />
            </Row>
            <Row>
              <Label w={170}>For SFMS users only</Label>
              <LineInput />
            </Row>
            <Row>
              <Label w={170}>Date of Transfer</Label>
              <LineInput placeholder="DD/MM/YYYY" />
            </Row>
            <Row>
              <Label w={170}>SFMS TRN No.</Label>
              <LineInput />
            </Row>
            <Row>
              <Label w={170}>Final UTR No.</Label>
              <LineInput />
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

        {/* Tiny footer marker */}
        <div className="absolute bottom-[18px] left-[22px] text-[9px] opacity-75 select-none">
          BOI
        </div>
      </div>
    </div>
  );
}
