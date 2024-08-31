import Box from '@mui/material/Box'

const APP_LOGO = import.meta.env.APP_LOGO as string

export const Logo = () => {
    return (
        <Box sx={{
            fontFamily: '"Playwrite CU", cursive',
            fontOpticalSizing: 'auto',
            fontWeight: 100,
            fontStyle: 'normal',
            textAlign: 'center',
            fontSize: 60,
            marginBottom: 4,
            cursor: 'default'
        }}>
            {APP_LOGO}
        </Box>
    )
}