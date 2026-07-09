"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSearch = searchParams.get("search") || "";
    const currentRegion = searchParams.get("region") || "";

    const [searchValue, setSearchValue] = useState(currentSearch);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.set("page", "1");
        if (currentRegion) params.set("region", currentRegion);
        if (searchValue.trim()) params.set("search", searchValue.trim());

        router.push(`/admin/submissions?${params.toString()}`);
    };

    const handleClear = () => {
        setSearchValue("");
        const params = new URLSearchParams();
        params.set("page", "1");
        if (currentRegion) params.set("region", currentRegion);

        router.push(`/admin/submissions?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    aria-hidden="true"
                />
                <label htmlFor="submission-search" className="sr-only">
                    ค้นหาแบบสอบถาม
                </label>
                <input
                    id="submission-search"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="ค้นหาด้วย ชื่อ, ID แบบสอบถาม"
                    maxLength={120}
                    className="pl-10 pr-10 py-2.5 w-full text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-600 transition-colors text-slate-900 placeholder-slate-500"
                />
                {searchValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 rounded-full"
                        aria-label="ล้างคำค้นหา"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium proms-primary-gradient rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            >
                ค้นหา
            </button>
        </form>
    );
}
