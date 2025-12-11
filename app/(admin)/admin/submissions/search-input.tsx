"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchInput() {
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
        <form
            onSubmit={handleSearch}
            className="relative flex items-center gap-2"
        >
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="ค้นหาด้วย Submission ID..."
                    className="pl-10 pr-10 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
                ค้นหา
            </button>
        </form>
    );
}
