"use client";

import { useUsers } from "@/hooks/useUsers";
import {
    UsersHeader,
    StatsCards,
    UserSearchInput,
    UsersTable,
    UserDetailModal,
} from "@/components/users";
import { Pagination } from "@/components/Pagination";

export default function AdminUsersPage() {
    const {
        users,
        loading,
        errorMessage,
        searchQuery,
        selectedUser,
        userSubmissions,
        loadingSubmissions,
        submissionsErrorMessage,
        totalSubmissions,
        activeUsers,
        page,
        totalPages,
        setSearchQuery,
        handleSearch,
        handlePageChange,
        openUserDetail,
        closeModal,
    } = useUsers();

    return (
        <div>
            <div className="container mx-auto pb-8">
                <UsersHeader />

                <StatsCards
                    totalUsers={users.length}
                    activeUsers={activeUsers}
                    totalSubmissions={totalSubmissions}
                />

                <UserSearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    disabled={loading}
                />

                {errorMessage && (
                    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <h2 className="font-bold text-amber-950 thai-text">
                            ยังโหลดรายชื่อผู้ใช้งานไม่ได้
                        </h2>
                        <p className="mt-1 text-sm text-amber-800 thai-text">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <UsersTable
                    users={users}
                    loading={loading}
                    onViewDetail={openUserDetail}
                />

                {!loading && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    submissions={userSubmissions}
                    loadingSubmissions={loadingSubmissions}
                    errorMessage={submissionsErrorMessage}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
