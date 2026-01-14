import { Search } from "lucide-react";

interface UserSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

export function UserSearchInput({
    value,
    onChange,
    onSearch,
}: UserSearchInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm p-4 mb-8 border border-sky-100">
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อหรืออีเมล..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/80"
                    />
                </div>
                <button
                    onClick={onSearch}
                    className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all font-medium shadow-lg shadow-sky-500/20"
                >
                    ค้นหา
                </button>
            </div>
        </div>
    );
}
