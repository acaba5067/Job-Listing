import { Box, Button, MenuItem, Select, styled } from '@mui/material'
import React, { useState } from 'react'

// تعريف الأنماط باستخدام styled
const Wrapper = styled(Box)({
    backgroundColor: `#fff`,
    display: `flex`,
    boxShadow: `0px 1px 5px rgba(0,0,0,0.1)`,
    borderRadius: `5px`,
    "& > *": { // هذا يعني أنه سيتم تطبيق هذه القواعد على كل أطفال العنصر Wrapper
        flex: 1, //يجعل كل عنصر داخلي يأخذ نفس المساحة النسبية
        height: `45px`,
        margin: `8px`
    }
})



const Searchbar = (props) => {
    const [jobSearch, setJobSearch] = useState({
        type: "Full time",
        location: "Remote"
    })

    const handleChange = (e) => {
        e.preventDefault();
        setJobSearch(oldstate => ({
            ...oldstate,
            [e.target.name]: e.target.value
        }))
    }
    
    const search = async () => {
        await props.fetchJobSearch(jobSearch)
    }
    console.log(jobSearch)

    return (
        <Wrapper p={2} mt={-5} mb={2} xs={12}>
            <Select onChange={handleChange} name='type' value={jobSearch.type} disableUnderline variant='filled' defaultValue={'Full time'}>
                <MenuItem value={'Full time'}>Full time</MenuItem>
                <MenuItem value={'Part time'}>Part time</MenuItem>
                <MenuItem value={'Contract'}>Contract</MenuItem>
            </Select>
            <Select onChange={handleChange} name='location' value={jobSearch.location} disableUnderline variant='filled' defaultValue={'Remote'}>
                <MenuItem value={'Remote'}>Remote</MenuItem>
                <MenuItem value={'In Office'}>In Office</MenuItem>
            </Select>
            <Button onClick={search} color='primary' variant='contained' disableElevation>Search</Button>
        </Wrapper>
    )
}

export default Searchbar
