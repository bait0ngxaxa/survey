"use client";

import { useUsers } from "@/hooks";
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
        searchQuery,
        selectedUser,
        userSubmissions,
        loadingSubmissions,
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
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-700">
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
                />

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
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
