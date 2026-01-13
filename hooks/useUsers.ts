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
    selectedUser: StaffUser | null;
    userSubmissions: UserSubmission[];
    loadingSubmissions: boolean;
    // Computed
    totalSubmissions: number;
    activeUsers: number;
    // Actions
    setSearchQuery: (query: string) => void;
    handleSearch: () => void;
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

    const handleSearch = useCallback(() => {
        loadUsers(searchQuery);
    }, [loadUsers, searchQuery]);

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
        selectedUser,
        userSubmissions,
        loadingSubmissions,
        totalSubmissions,
        activeUsers,
        setSearchQuery,
        handleSearch,
        openUserDetail,
        closeModal,
    };
}
