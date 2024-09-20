import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FilledInput, Grid, MenuItem, Select, styled, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';

const Skill = styled(Box)(({ theme, included }) => ({
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: '14.5px',
    borderRadius: '5px',
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    },
    ...(included && {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }),
}));

const initalState = {
    title: "",
    type: "Full time",
    companyName: "",
    companyUrl: "",
    location: "Remote",
    link: "",
    describtion: "",
    skills: [],
}

const NewJobModal = (props) => {
    const [jobDetailes, setJobDetailes] = useState(initalState)

    const handleChange = (e) => {
        e.preventDefault();
        setJobDetailes(oldstate => ({
            ...oldstate,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        if (!jobDetailes.skills.length) return
        await props.postJob(jobDetailes)
    }

    const addremoveSkills = (skill) => setJobDetailes(prevState => ({
        ...prevState,
        skills: prevState.skills.includes(skill)
            ? prevState.skills.filter(s => s !== skill)
            : [...prevState.skills, skill]
    }));

    const skills = [
        'java',
        'node',
        'Vue',
        'SQL',
        'Mongo',
        'react'
    ];

    return (
        <Dialog open={props.newJobModal} fullWidth>
            <DialogTitle>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    Post Job
                    {/* زر الإغلاق */}
                    <IconButton onClick={props.closeModal}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput
                            autoComplete='off'
                            name='title'
                            onChange={handleChange}
                            value={jobDetailes.title}
                            placeholder='Job title *'
                            disableUnderline
                            fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Select disableUnderline
                            variant='filled'
                            name='type'
                            onChange={handleChange}
                            value={jobDetailes.type}
                            // defaultValue={'Full time'}
                            fullWidth>
                            <MenuItem value={'Full time'}>Full time</MenuItem>
                            <MenuItem value={'Part time'}>Part time</MenuItem>
                            <MenuItem value={'Contract'}>Contract</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            autoComplete='off'
                            placeholder='Company Name *'
                            disableUnderline
                            onChange={handleChange}
                            name='companyName'
                            value={jobDetailes.companyName}
                            fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            autoComplete='off'
                            name='companyUrl'
                            onChange={handleChange}
                            value={jobDetailes.companyUrl}
                            placeholder='Company Url *'
                            disableUnderline
                            fullWidth />
                    </Grid>

                    <Grid item xs={6}>
                        <Select
                            disableUnderline
                            variant='filled'
                            onChange={handleChange}
                            name='location'
                            value={jobDetailes.location}
                            // defaultValue={'Remote'}
                            fullWidth>
                            <MenuItem value={'Remote'}>Remote</MenuItem>
                            <MenuItem value={'In Office'}>In Office</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                            autoComplete='off'
                            name='link'
                            value={jobDetailes.link}
                            placeholder='Job link *'
                            disableUnderline
                            onChange={handleChange}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput
                            placeholder='Job description *'
                            disableUnderline
                            onChange={handleChange}
                            multiline
                            name='describtion'
                            value={jobDetailes.describtion}
                            autoComplete='off'
                            fullWidth
                            rows={3}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Skills</Typography>
                    <Box display={'flex'}>
                        {skills.map((skill) => (
                            <Skill
                                included={jobDetailes.skills.includes(skill)}  // هنا تقوم بتمرير القيمة بناءً على حالة المهارة
                                key={skill}
                                onClick={() => addremoveSkills(skill)}
                            >
                                {skill}
                            </Skill>
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box
                    width={'100%'}
                    color={'red'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Typography variant='caption'>* Required fields</Typography>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        disableElevation
                        color='primary'>
                        Post job
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default NewJobModal;