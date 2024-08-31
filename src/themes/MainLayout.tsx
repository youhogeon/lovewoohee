import { mainTheme } from './theme'
import { Logo } from '../components/Logo'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import ThemeProvider from '@mui/material/styles/ThemeProvider'


interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = (props: MainLayoutProps) => {
    const { children } = props

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />

            <Box sx={{ width: 360, margin: '50px auto' }}>
                <Stack alignItems="center" justifyContent="center" spacing={4}>
                    <Logo />

                    {children}
                </Stack>
            </Box>
        </ThemeProvider>
    )
}