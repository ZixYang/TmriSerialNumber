
import * as React from 'react';
import { useState,useEffect,useContext } from 'react';
import {SearchCtx} from './index'
import { Button } from '@mui/material';
import Box from '@mui/material/Box'
import {FormGroup,FormControl,InputLabel,Select,MenuItem,KeyboardArrowRightIcon} from '@mui/material'

// Search.getInitialProps=()=>{

// }

export default function Search(){
    const [city,setCity]=useState('')
    const [org,setOrg]=useState('')
    const [cities,setCities]=useState([])
    const [orgs,setOrgs]=useState([])
    const {conditions,setConditions}=useContext(SearchCtx)
  
    useEffect(()=>{
      async ()=>{
        const res = await axios.get('/api/tmrisn/conditions');
        if(res){
          const {cities,orgs}=res;
          setCities(cities)
          setOrgs(orgs)
          }
        }
      
    },[])
    const handleSearch=(event)=>{
      setConditions({
        ...conditions,
        index:1,
        city,
        org
      })
    }
    const handleCityChange=(event)=>{
      console.log(event)
      setCity(event.target.value)
    }
    const handleOrgChange=(event)=>{
      console.log(event)
      setOrg(event.target.value)
    }
    return (
      <Box sx={{display:'flex',flexDirection:'row'}}>
          <FormControl  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>城市</InputLabel>
            <Select value={city} onChange={handleCityChange}>
                {
                cities && cities.map(c=>{
                    <MenuItem value={c}>{c}</MenuItem>
                })
                }
                
            </Select>
          </FormControl>
          <FormControl  sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>组织机构</InputLabel>
          <Select value={org} onChange={handleOrgChange}>
            {
              orgs && orgs.map(o=>{
                <MenuItem value={o}>{o}</MenuItem>
              })
            }
            
          </Select>
          </FormControl>
          <FormControl  sx={{ m: 1, minWidth: 120 }}>
            <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            >
            查询
            </Button>
          </FormControl>
        
    </Box>
    )
  }