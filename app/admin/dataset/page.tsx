"use client";

import React, { useState, useEffect } from "react";
import { Download, Database, RefreshCw, Layers, Sparkles, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatorDatasetPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchDataset = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/log-dataset");
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch dataset:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataset();
  }, []);

  const downloadJsonl = () => {
    const jsonlStr = records.map((r) => JSON.stringify(r)).join("\n");
    const blob = new Blob([jsonlStr], { type: "application/jsonlines" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `askilla_ml_dataset_${Date.now()}.jsonl`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    if (records.length === 0) return;
    const headers = ["timestamp", "event_type", "topic", "language", "level", "explanation", "user_answer"];
    const rows = records.map((r) =>
      [
        `"${r.timestamp || ""}"`,
        `"${r.event_type || ""}"`,
        `"${(r.topic || "").replace(/"/g, '""')}"`,
        `"${r.language || ""}"`,
        `"${r.level || ""}"`,
        `"${(r.explanation || "").replace(/"/g, '""').slice(0, 100)}"`,
        `"${(r.user_answer || "").replace(/"/g, '""')}"`,
      ].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `askilla_ml_dataset_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] dark:bg-[#121212] text-[#1C1917] dark:text-[#F5F5F4] p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E0E0E0] dark:border-[#1C1917] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#C25B32] uppercase tracking-widest">
              <Database className="w-4 h-4" />
              <span>Creator / Developer Hub</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl">
              Askilla ML Training Dataset
            </h1>
            <p className="text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
              Private data collector for training SFT/RLHF models & predictive educational analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#1C1917] text-xs font-bold flex items-center gap-2 hover:bg-[#FDEEE9]/50 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#C25B32]" />
              <span>Back to App</span>
            </Link>
            <button
              type="button"
              onClick={fetchDataset}
              className="p-2.5 rounded-full bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#1C1917] text-[#1C1917] dark:text-[#F5F5F4] hover:border-[#C25B32] transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#1C1917] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#1C1917]/50 dark:text-[#F5F5F4]/50">
              Total Logged Records
            </span>
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-3xl text-[#C25B32]">
                {totalCount}
              </span>
              <Layers className="w-6 h-6 text-[#C25B32]/40" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#1C1917] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#1C1917]/50 dark:text-[#F5F5F4]/50">
              Dataset Format
            </span>
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-lg">JSONL / CSV</span>
              <FileText className="w-6 h-6 text-[#C25B32]/40" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 border border-[#E0E0E0] dark:border-[#1C1917] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#1C1917]/50 dark:text-[#F5F5F4]/50">
              File Path
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#C25B32] truncate">data/askilla_ml_dataset.jsonl</span>
              <Sparkles className="w-6 h-6 text-[#C25B32]/40" />
            </div>
          </div>
        </div>

        {/* Actions & Export Buttons */}
        <div className="bg-gradient-to-r from-[#FDEEE9] to-white dark:from-[#2D1F1A] dark:to-[#1E1E1E] rounded-3xl p-6 border border-[#C25B32]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h3 className="font-heading font-extrabold text-base">Export Dataset for Model Training</h3>
            <p className="text-xs text-[#1C1917]/70 dark:text-[#F5F5F4]/70">
              Download clean structured instruction JSONL format ready for Hugging Face / OpenAI fine-tuning.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={downloadJsonl}
              disabled={records.length === 0}
              className="px-5 py-3 bg-[#C25B32] text-[#1C1917] font-extrabold text-xs rounded-full shadow-md hover:bg-[#94401F] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Download JSONL</span>
            </button>
            <button
              type="button"
              onClick={downloadCsv}
              disabled={records.length === 0}
              className="px-5 py-3 bg-white dark:bg-[#121212] border border-[#C25B32] text-[#C25B32] font-extrabold text-xs rounded-full hover:bg-[#FDEEE9] dark:hover:bg-[#2D1F1A] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Dataset Table Preview */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E0E0E0] dark:border-[#1C1917] p-6 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-base text-left">Recent Interaction Logs</h3>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
              Loading dataset records...
            </div>
          ) : records.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Database className="w-10 h-10 text-[#C25B32]/40 mx-auto" />
              <p className="text-xs text-[#1C1917]/60 dark:text-[#F5F5F4]/60">
                No dataset records yet. Generating course modules or taking lessons will automatically log records here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E0E0E0] dark:border-[#1C1917] text-[#1C1917]/50 dark:text-[#F5F5F4]/50 font-bold uppercase text-[10px]">
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Event Type</th>
                    <th className="py-3 px-3">Topic</th>
                    <th className="py-3 px-3">Language</th>
                    <th className="py-3 px-3">Explanation Sample</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]/60 dark:divide-[#1C1917]/60">
                  {records.slice(0, 20).map((r, i) => (
                    <tr key={r.id || i} className="hover:bg-[#FDEEE9]/30 dark:hover:bg-[#2D1F1A]/20">
                      <td className="py-3 px-3 font-mono text-[10px] text-[#1C1917]/70 dark:text-[#F5F5F4]/70">
                        {r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : "-"}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#C25B32]/15 text-[#C25B32] font-extrabold text-[9px] uppercase">
                          {r.event_type}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold">{r.topic}</td>
                      <td className="py-3 px-3 capitalize">{r.language}</td>
                      <td className="py-3 px-3 max-w-xs truncate text-[#1C1917]/70 dark:text-[#F5F5F4]/70">
                        {r.explanation || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
