import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import GlobalLoadingIndicator from 'common/providers/ApiProvider/GlobalLoadingIndicator'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const ApiProvider: React.FC = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalLoadingIndicator />
            {children}
        </QueryClientProvider>
    )
}

export default ApiProvider