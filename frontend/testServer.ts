import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', () => {
        return HttpResponse.json([
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ])
    }),
]

export const server = setupServer(...handlers)
