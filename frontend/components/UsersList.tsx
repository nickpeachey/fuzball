'use client'

import { useGetUsersQuery, useLazyGetUserByIdQuery } from '@/lib/usersApi'
import { Input } from './ui/input'
import { Button } from './ui/button'
import React from 'react'

export default function UsersList() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { data: usersList } = useGetUsersQuery();
    const [getUserById, { data: userResult }] = useLazyGetUserByIdQuery();

    const handleSearch = () => {
        const id = Number(searchTerm);
        if (!Number.isNaN(id)) {
            getUserById(id);
        }
    }

    const renderUsers = Array.isArray(userResult)
        ? userResult
        : userResult
            ? [userResult]
            : usersList ?? [];

    return (
        <>
            <div>
                <Input placeholder="Search users..." type="number" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <ul>
                {renderUsers?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    )
}
