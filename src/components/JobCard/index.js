import { Box, Button, Grid, styled, Typography } from '@mui/material';
import { differenceInMinutes } from 'date-fns';
import React from 'react';

const Wrapper = styled(Box)({
    border: `1px solid #e8e8e8`,
    cursor: `pointer`,
    transition: `.3s`,
    "&:hover": {
        boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
        borderLeft: `6px solid #4D64E4`
    }
})

const CompanyName = styled(Typography)(({ theme }) => ({
    borderRadius: '5px',
    fontSize: '13.5px',
    backgroundColor: theme.palette.primary.main, // استخدام اللون الرئيسي من theme
    padding: theme.spacing(0.75), // استخدام المسافة من theme
    display: 'inline-block',
    fontWeight: 600,
}));

const Skill = styled(Grid)(({ theme }) => ({
    color: `#fff`,
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75), // استخدام المسافة من theme
    fontSize: '14.5px',
    borderRadius: '5px',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main, // استخدام اللون الرئيسي من theme
}));


const JobCard = (props) => {
    return (
        <Wrapper p={2}>
            <Grid container alignItems={`center`}>
                <Grid item xs>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                    <CompanyName variant='subtitle2'>{props.companyName}</CompanyName>
                </Grid>
                <Grid item container xs>
                    {props.skills.map((skill) => (
                        <Skill item key={skill}>
                            {skill}
                        </Skill>
                    ))}
                </Grid>
                <Grid item container xs direction='column' alignItems='flex-end'>
                    <Grid item>
                        <Typography variant='caption'>{differenceInMinutes(Date.now(), props.postedOn)} min ago | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button variant='outlined'>Check</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default JobCard;
