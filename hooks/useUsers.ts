"use client";

import { useState, useEffect, useCallback } from "react";
import {
    getStaffUsers,
    getUserSubmissionsList,
    StaffUser,
    UserSubmission,
} from "@/lib/actions/users";

interface UseUsersReturn {
    // State
    users: StaffUser[];
    loading: boolean;
    searchQuery: string;
    page: number;
    totalPages: number;
    selectedUser: StaffUser | null;
    userSubmissions: UserSubmission[];
    loadingSubmissions: boolean;
    // Computed
    totalSubmissions: number;
    activeUsers: number;
    // Actions
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
    handlePageChange: (page: number) => void;
    openUserDetail: (user: StaffUser) => Promise<void>;
    closeModal: () => void;
}

/**
 * Custom hook for managing users page state and logic
 */
export function useUsers(): UseUsersReturn {
    const [users, setUsers] = useState<StaffUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState<StaffUser | null>(null);
    const [userSubmissions, setUserSubmissions] = useState<UserSubmission[]>(
        []
    );
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);

    const loadUsers = useCallback(
        async (query?: string, pageNum: number = 1) => {
            setLoading(true);
            const result = await getStaffUsers(query, pageNum);
            if (result.success) {
                setUsers(result.data);
                if (result.metadata) {
                    setTotalPages(result.metadata.totalPages);
                    setPage(result.metadata.page);
                }
            }
            setLoading(false);
        },
        []
    );

    // Initial data load on mount
    useEffect(() => {
        let cancelled = false;

        const fetchInitialUsers = async () => {
            setLoading(true);
            const result = await getStaffUsers("", 1);
            if (!cancelled && result.success) {
                setUsers(result.data);
                if (result.metadata) {
                    setTotalPages(result.metadata.totalPages);
                }
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

    const handleSearch = useCallback(() => {
        setPage(1);
        loadUsers(searchQuery, 1);
    }, [loadUsers, searchQuery]);

    const handlePageChange = useCallback(
        (newPage: number) => {
            loadUsers(searchQuery, newPage);
        },
        [loadUsers, searchQuery]
    );

    const openUserDetail = useCallback(async (user: StaffUser) => {
        setSelectedUser(user);
        setLoadingSubmissions(true);
        const result = await getUserSubmissionsList(user.id);
        if (result.success) {
            setUserSubmissions(result.data);
        }
        setLoadingSubmissions(false);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedUser(null);
        setUserSubmissions([]);
    }, []);

    // Computed values
    const totalSubmissions = users.reduce(
        (sum, u) => sum + u.submissionCount,
        0
    );
    const activeUsers = users.filter((u) => u.submissionCount > 0).length;

    return {
        users,
        loading,
        searchQuery,
        page,
        totalPages,
        selectedUser,
        userSubmissions,
        loadingSubmissions,
        totalSubmissions,
        activeUsers,
        setSearchQuery,
        handleSearch,
        handlePageChange,
        openUserDetail,
        closeModal,
    };
}
