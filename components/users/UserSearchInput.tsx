import { Search } from "lucide-react";

interface UserSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    disabled?: boolean;
}

export function UserSearchInput({
    value,
    onChange,
    onSearch,
    disabled = false,
}: UserSearchInputProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="proms-panel rounded-2xl p-4 mb-8"
        >
            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                        aria-hidden="true"
                    />
                    <label htmlFor="user-search" className="sr-only">
                        ค้นหาผู้ใช้งาน
                    </label>
                    <input
                        id="user-search"
                        type="text"
                        placeholder="ค้นหาชื่อหรืออีเมล..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        maxLength={120}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-600 bg-white text-slate-900 placeholder-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>
                <button
                    type="submit"
                    disabled={disabled}
                    className="px-6 py-2.5 proms-primary-gradient rounded-xl transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                >
                    ค้นหา
                </button>
            </div>
        </form>
    );
}
