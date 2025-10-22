'use client'

import { useGetUsersQuery } from '@/lib/usersApi'

export default function UsersList() {
    const { data, error, isLoading } = useGetUsersQuery()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Failed to load users</p>

    return (
        <ul>
            {data?.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
}
