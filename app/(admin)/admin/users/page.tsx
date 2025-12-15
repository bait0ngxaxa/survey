"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Eye, X, Calendar, MapPin } from "lucide-react";
import {
    getStaffUsers,
    getUserSubmissionsList,
    StaffUser,
    UserSubmission,
} from "@/lib/actions/users";
import Image from "next/image";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<StaffUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<StaffUser | null>(null);
    const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>(
        []
    );
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);

    const loadUsers = useCallback(async (query?: string) => {
        setLoading(true);
        const result = await getStaffUsers(query);
        if (result.success) {
            setUsers(result.data);
        }
        setLoading(false);
    }, []);

    // Initial data load on mount
    useEffect(() => {
        let cancelled = false;

        const fetchInitialUsers = async () => {
            setLoading(true);
            const result = await getStaffUsers("");
            if (!cancelled && result.success) {
                setUsers(result.data);
            }
            if (!cancelled) {
                setLoading(false);
            }
        };

        void fetchInitialUsers();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleSearch = () => {
        loadUsers(searchQuery);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const openUserDetail = async (user: StaffUser) => {
        setSelectedUser(user);
        setLoadingSubmissions(true);
        const result = await getUserSubmissionsList(user.id);
        if (result.success) {
            setUserSubmissions(result.data);
        }
        setLoadingSubmissions(false);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setUserSubmissions([]);
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatDateTime = (date: Date) => {
        return new Date(date).toLocaleString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getRegionLabel = (region: string) => {
        const labels: Record<string, string> = {
            central: "ทีมกลาง",
            phetchabun: "เพชรบูรณ์",
            satun: "สตูล",
            lopburi: "ลพบุรี",
        };
        return labels[region] || region;
    };

    // Stats
    const totalSubmissions = users.reduce(
        (sum, u) => sum + u.submissionCount,
        0
    );
    const activeUsers = users.filter((u) => u.submissionCount > 0).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        Users
                    </h1>
                    <p className="text-slate-600 mt-2">
                        รายชื่อผู้ใช้งานและจำนวนแบบสอบถามที่กรอก
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg"></div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    ผู้ใช้ทั้งหมด
                                </p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {users.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg"></div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    ผู้ใช้ที่กรอกข้อมูล
                                </p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {activeUsers}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-100 rounded-lg"></div>
                            <div>
                                <p className="text-sm text-slate-500">
                                    Submissions ทั้งหมด
                                </p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {totalSubmissions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-slate-100">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อหรืออีเมล..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            ค้นหา
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-slate-500 mt-3">กำลังโหลด...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            ไม่พบผู้ใช้
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                            ผู้ใช้
                                        </th>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                                            อีเมล
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                            จำนวน Submission
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                            กรอกล่าสุด
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-700">
                                            ดูรายละเอียด
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {user.imageUrl ? (
                                                        <Image
                                                            src={user.imageUrl}
                                                            alt=""
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <span className="text-blue-600 font-semibold">
                                                                {(
                                                                    user
                                                                        .firstName?.[0] ||
                                                                    user
                                                                        .email?.[0] ||
                                                                    "?"
                                                                ).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-slate-800">
                                                        {user.firstName ||
                                                        user.lastName
                                                            ? `${
                                                                  user.firstName ||
                                                                  ""
                                                              } ${
                                                                  user.lastName ||
                                                                  ""
                                                              }`.trim()
                                                            : "ไม่ระบุชื่อ"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                {user.email || "-"}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        user.submissionCount > 0
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                                >
                                                    {user.submissionCount} ชุด
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center text-slate-600">
                                                {formatDate(
                                                    user.lastSubmission
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() =>
                                                        openUserDetail(user)
                                                    }
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="ดูรายละเอียด"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    {selectedUser.imageUrl ? (
                                        <Image
                                            src={selectedUser.imageUrl}
                                            alt=""
                                            width={56}
                                            height={56}
                                            className="rounded-full border-2 border-white/30"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold">
                                                {(
                                                    selectedUser
                                                        .firstName?.[0] || "?"
                                                ).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {selectedUser.firstName ||
                                            selectedUser.lastName
                                                ? `${
                                                      selectedUser.firstName ||
                                                      ""
                                                  } ${
                                                      selectedUser.lastName ||
                                                      ""
                                                  }`.trim()
                                                : "ไม่ระบุชื่อ"}
                                        </h2>
                                        <p className="text-blue-100">
                                            {selectedUser.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="mt-4 flex gap-4">
                                <div className="bg-white/20 px-4 py-2 rounded-lg">
                                    <span className="text-blue-100 text-sm">
                                        กรอกทั้งหมด
                                    </span>
                                    <p className="text-2xl font-bold">
                                        {selectedUser.submissionCount} ชุด
                                    </p>
                                </div>
                                <div className="bg-white/20 px-4 py-2 rounded-lg">
                                    <span className="text-blue-100 text-sm">
                                        กรอกล่าสุด
                                    </span>
                                    <p className="text-lg font-semibold">
                                        {formatDate(
                                            selectedUser.lastSubmission
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[50vh]">
                            <h3 className="font-semibold text-slate-700 mb-4">
                                รายการ Submissions
                            </h3>
                            {loadingSubmissions ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                                </div>
                            ) : userSubmissions.length === 0 ? (
                                <div className="text-center py-8 text-slate-500">
                                    ยังไม่มี submissions
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {userSubmissions.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {sub.patientName}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                                        <span className="font-mono text-xs bg-slate-200 px-2 py-0.5 rounded">
                                                            {sub.id.slice(0, 8)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={14} />
                                                            {getRegionLabel(
                                                                sub.region
                                                            )}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar
                                                                size={14}
                                                            />
                                                            {formatDateTime(
                                                                sub.createdAt
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
