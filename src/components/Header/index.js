import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'

const Nav = (props) => {
    return (
        // padding في محور y
        <Box bgcolor={`${`secondary.main`}`} color={'white'} py={10}>
            <Grid container justifyContent='center'>
                <Grid item xs={10}> {/**يعني أن هذا العنصر يأخذ 10 أعمدة من الشبكة (الشبكة تحتوي على 12 عمودًا).*/}
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant='h4'>Open Job listing</Typography>
                        <Button color='primary' onClick={props.openNewModal} variant='contained' disableElevation>Post a job</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Nav
