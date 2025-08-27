"use client";
import React, { useState, useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import { Sarabun } from 'next/font/google';
import html2canvas from 'html2canvas';
// Font configuration
const sarabun = Sarabun({
  weight: ['300'],
  variable: '--font-sarabun',
  subsets: ['thai'],
});
// Document data interface
interface DocumentData {
  contactline: string;
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  subject: string;
  issue_number: string;
  content: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
  content6: string;
  content7: string;
  content8: string;
  content9: string;
  content10: string;
  content11: string;
  content12: string;
  issuer: string;
  date: string;
  date2: string;
  date3: string;
  education: string;
  skillsother: string;
}
export default function ExampleDoc() {
  // State management
  const [documentData, setDocumentData] = useState<DocumentData>({
    contactline: '',
    title1: '',
    title2: '',
    title3: '',
    title4: '',
    subject: '',
    issue_number: '',
    content: '',
    content2: '',
    content3: '',
    content4: '',
    content5: '',
    content6: '',
    content7: '',
    content8: '',
    content9: '',
    content10: '',
    content11: '',
    content12: '',
    issuer: '',
    date: '',
    date2: '',
    date3: '',
    education: '',
    skillsother: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  // Refs for DOM elements
  const formRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  // Handle PDF generation and download
  const handleDownloadPDF = useCallback(async () => {
    if (!previewRef.current || !documentData) return;
    setIsPdfGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: previewRef.current.scrollWidth,
        windowHeight: previewRef.current.scrollHeight,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.setProperties({
        title: 'แถลงการณ์กองทัพบก',
        subject: documentData.subject,
        creator: 'Document System',
        author: 'System',
      });
      pdf.save('document.pdf');
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsPdfGenerating(false);
    }
  }, [documentData]);
  // Function to make headings bold and black
  const blackenHeadings = useCallback((text: string) => {
    const headings = [
      "Data Visualization/Engineering",
      "Techniques",
      "Tools and Frameworks",
    ];
    const escaped = headings.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`(^|\\n)\\s*(${escaped.join("|")})(:?)`, "g");
    return text.replace(
      re,
      (_, brk, title, colon) =>
        `${brk}<span style="font-weight:600;color:#000">${title}</span>${colon}`
    );
  }, []);
  // Rest of the component remains the same...
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col p-4">
      {/* Header controls */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-md drop-shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">Document Example</h1>
        <div className="flex whitespace-nowrap w-fit">
          <button
            onClick={handleDownloadPDF}
            disabled={isPdfGenerating}
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-gray-400"
          >
            {isPdfGenerating ? 'กำลังสร้าง PDF...' : 'ดาวน์โหลด PDF'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex mt-6">
        {/* Form section */}
        <div className="flex-1 pr-0 md:pr-4 mb-8 md:mb-0">
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div
            id="document-form"
            ref={formRef}
            className={`mt-8 bg-white shadow ${sarabun.className} w-[595px] min-h-[842px] mx-auto p-10 box-border overflow-y-auto`}
          >
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">หัวข้อ1</label>
              <input
                type="text"
                value={documentData.title1}
                onChange={(e) => setDocumentData(prev => ({ ...prev, title1: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เรื่อง</label>
              <input
                type="text"
                placeholder="เรื่อง"
                value={documentData.subject}
                onChange={(e) => setDocumentData(prev => ({
                  ...prev,
                  subject: e.target.value
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">สายการติดต่อ</label>
              <textarea
                value={documentData.contactline}
                onChange={(e) => setDocumentData(prev => ({ ...prev, contactline: e.target.value }))}
                className="w-full border p-4 rounded min-h-[100px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา1</label>
              <textarea
                value={documentData.content}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full border p-4 rounded min-h-[150px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ประสบการณ์การทำงาน</label>
              <input
                type="text"
                value={documentData.issuer}
                onChange={(e) => setDocumentData(prev => ({ ...prev, issuer: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">หัวข้อ2</label>
              <textarea
                value={documentData.title2}
                onChange={(e) => setDocumentData(prev => ({ ...prev, title2: e.target.value }))}
                rows={1}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                style={{ textAlign: 'left', height: '40px' }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">วันที่1</label>
              <input
                type="text"
                value={documentData.date}
                onChange={(e) => setDocumentData(prev => ({ ...prev, date: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา2</label>
              <textarea
                value={documentData.content2}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content2: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา3</label>
              <textarea
                value={documentData.content3}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content3: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา4</label>
              <textarea
                value={documentData.content4}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content4: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">หัวข้อ3</label>
              <input
                type="text"
                value={documentData.title3}
                onChange={(e) => setDocumentData(prev => ({ ...prev, title3: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">วันที่2</label>
              <input
                type="text"
                value={documentData.date2}
                onChange={(e) => setDocumentData(prev => ({ ...prev, date2: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา5</label>
              <textarea
                value={documentData.content5}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content5: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา6</label>
              <textarea
                value={documentData.content6}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content6: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา7</label>
              <textarea
                value={documentData.content7}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content7: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">หัวข้อ4</label>
              <input
                type="text"
                value={documentData.title4}
                onChange={(e) => setDocumentData(prev => ({ ...prev, title4: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">วันที่3</label>
              <input
                type="text"
                value={documentData.date3}
                onChange={(e) => setDocumentData(prev => ({ ...prev, date3: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา8</label>
              <textarea
                value={documentData.content8}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content8: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา9</label>
              <textarea
                value={documentData.content9}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content9: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา10</label>
              <textarea
                value={documentData.content10}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content10: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">การศึกษา</label>
              <input
                type="text"
                value={documentData.education}
                onChange={(e) => setDocumentData(prev => ({ ...prev, education: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา11</label>
              <textarea
                value={documentData.content11}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content11: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">การศึกษา</label>
              <input
                type="text"
                value={documentData.skillsother}
                onChange={(e) => setDocumentData(prev => ({ ...prev, skillsother: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">เนื้อหา12</label>
              <textarea
                value={documentData.content12}
                onChange={(e) => setDocumentData(prev => ({ ...prev, content12: e.target.value }))}
                className="w-full border p-4 rounded min-h-[10px] whitespace-pre-wrap overflow-wrap break-words"
              />
            </div>
          </div>
        </div>

        {/* Preview section */}
        <div className="flex-1 p-2 bg-gray-600">
          <h2 className="text-xl font-bold mb-4 text-white text-center">
            ตัวอย่าง <strong className="text-red-400 font-extrabold">PDF</strong>
          </h2>
          <div
            id="document-preview"
            ref={previewRef}
            className={`mt-8 bg-white shadow ${sarabun.className} w-[210mm] min-h-[297mm] mx-auto p-10 box-border overflow-y-auto relative`}
          >
            {/* Document header */}
            <div className="flex justify-center items-center mb-[2px] mt-[1.5mm] pl-[30mm] pr-[20mm]">
            </div>
            <div className="text-center mb-[5px] -mt-[5mm] pl-[20mm] pr-[20mm] -ml-[520px]">
              <div className="text-blue-700 text-3xl font-bold">{documentData.title1}</div>
            </div>
            <div className="text-center -mb-[2px] pl-[2cm] pr-[20mm] relative -ml-[410px]">
              <div className="mb-[2px] text-xl font-bold">{documentData.subject}</div>
            </div>
            <div className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[10px] leading-[1.8] break-words"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.contactline}
            </div>
            <div className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] leading-[1.8] break-words"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.content}
            </div>
            {/* Document footer */}
            <div className="text-blue-700 text-center pl-[15mm] text-[16px] -ml-[117px]"
              style={{
                textIndent: '2.5cm',
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.issuer}
            </div>
            <div className="absolute left-[20mm] right-[19mm] h-[15px] border-b border-black" />
            <div className="text-lefttext text-[17px] font-bold pl-[20mm] pr-[60mm] relative mb-[16px] -ml-[40px] mt-[20px]">
              {documentData.title2}
            </div>
            <div className="text-center pl-[41mm] text-[17px] font-bold ml-[320px] -mt-[40px]">
              {documentData.date}
            </div>
            <div className="text-left pl-[10mm] pr-[60mm] relative mb-[16px] -mt-[3px]">
              {documentData.content2}
            </div>
            <div className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] leading-[1.8] break-words -mt-2"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.content3}
            </div>
            <div className="text-left pl-[10mm] pr-[60mm] relative mb-[16px] -mt-[3px]">
              {documentData.content5}
            </div>
            <div className="max-w-[715px] pl-[1.8cm] pr-[10mm] mb-[20px] -mt-2"
              style={{
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
              }}
            >
              <ul className="list-disc pl-6 leading-[1.8] break-words [text-align:justify] [white-space:pre-wrap] marker:text-gray-400 marker:text-[12px]">
                {documentData.content4
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i} className="[word-break:break-word] [overflow-wrap:break-word]">
                      {/* ตัด - หรือ • ที่ขึ้นต้นบรรทัดออก เพื่อไม่ให้ซ้ำกับ bullet */}
                      {line.replace(/^\s*[-–—•]\s*/, '')}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="text-lefttext text-[17px] font-bold pl-[20mm] pr-[60mm] relative mb-[16px] -ml-[40px] mt-[20px]">
              {documentData.title3}
            </div>
            <div className="text-center pl-[41mm] text-[17px] font-bold ml-[310px] -mt-[40px]">
              {documentData.date2}
            </div>
            <div className="text-left pl-[10mm] pr-[60mm] relative mb-[16px] -mt-[3px]">
              {documentData.content5}
            </div>
            <div className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] leading-[1.8] break-words -mt-2"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.content6}
            </div>
            <div className="max-w-[715px] pl-[1.8cm] pr-[10mm] mb-[20px] -mt-2"
              style={{
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
              }}
            >
              <ul className="list-disc pl-6 leading-[1.8] break-words [text-align:justify] [white-space:pre-wrap] marker:text-gray-400 marker:text-[12px]">
                {documentData.content7
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i} className="[word-break:break-word] [overflow-wrap:break-word]">
                      {/* ตัด - หรือ • ที่ขึ้นต้นบรรทัดออก เพื่อไม่ให้ซ้ำกับ bullet */}
                      {line.replace(/^\s*[-–—•]\s*/, '')}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="text-lefttext text-[17px] font-bold pl-[20mm] pr-[60mm] relative mb-[16px] -ml-[40px] mt-[20px]">
              {documentData.title4}
            </div>
            <div className="text-center pl-[41mm] text-[17px] font-bold ml-[300px] -mt-[40px]">
              {documentData.date3}
            </div>
            <div className="text-left pl-[10mm] pr-[60mm] relative mb-[16px] -mt-[3px]">
              {documentData.content8}
            </div>
            <div className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] leading-[1.8] break-words -mt-2"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.content9}
            </div>
            <div className="max-w-[715px] pl-[1.8cm] pr-[10mm] mb-[20px] -mt-2"
              style={{
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
              }}
            >
              <ul className="list-disc pl-6 leading-[1.8] break-words [text-align:justify] [white-space:pre-wrap] marker:text-gray-400 marker:text-[12px]">
                {documentData.content10
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i} className="[word-break:break-word] [overflow-wrap:break-word]">
                      {/* ตัด - หรือ • ที่ขึ้นต้นบรรทัดออก เพื่อไม่ให้ซ้ำกับ bullet */}
                      {line.replace(/^\s*[-–—•]\s*/, '')}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="text-blue-700 text-center pl-[15mm] text-[16px] -ml-[117px]"
              style={{
                textIndent: '2.5cm',
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.education}
            </div>
            <div className="absolute left-[20mm] right-[19mm] h-[15px] border-b border-black" />
            <div
              className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] mt-6"
              style={{
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
              }}
            >
              {(() => {
                const raw = (documentData.content11 || '').trim();
                const [line1 = '', line2 = ''] = raw.split(/\r?\n/, 2);

                const firstComma = line1.indexOf(',');
                const uni = firstComma > -1 ? line1.slice(0, firstComma).trim() : line1.trim();
                const location = firstComma > -1 ? line1.slice(firstComma + 1).trim() : '';

                const degree = line2.replace(/\s*[-–—]\s*/g, ' \u2013 ');

                return (
                  <>
                    <p className="leading-tight">
                      <span className="font-semibold">{uni}</span>
                      {location && <span>, {location}</span>}
                    </p>
                    {line2 && (
                      <p className="text-[0.98em] text-gray-700 leading-snug">
                        {degree}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="text-blue-700 text-center pl-[15mm] text-[16px] -ml-[117px]"
              style={{
                textIndent: '2.5cm',
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
            >
              {documentData.skillsother}
            </div>
            <div className="absolute left-[20mm] right-[19mm] h-[15px] border-b border-black" />
            <div
              className="max-w-[715px] pl-[1cm] pr-[10mm] mb-[20px] leading-[1.8] break-words mt-6"
              style={{
                textAlign: 'justify',
                whiteSpace: 'pre-wrap',
                wordSpacing: '-1px',
                letterSpacing: '-0.1px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                WebkitHyphens: 'none',
                MozHyphens: 'none',
                hyphens: 'none',
                fontKerning: 'normal',
                fontFamily: '"Sarabun", "Noto Sans Thai", sans-serif',
              }}
              dangerouslySetInnerHTML={{ __html: blackenHeadings(documentData.content12) }}
            />

          </div>
        </div>
      </div>
    </main>
  );
}