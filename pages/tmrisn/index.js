import * as React from 'react';
import { useState,useEffect,useContext } from 'react';
import Search from './search'
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'snType',
    headerName: '类型',
    width: 150,
    editable: true,
  },
  {
    field: 'city',
    headerName: '所在地区',
    width: 150,
    editable: true,
  },
  {
    field: 'organization',
    headerName: '组织机构',
    width: 150,
    editable: true,
  },
  {
    field: 'sn',
    headerName: '接口序列号',
    width: 110,
    editable: true,
  },
  {
    field: 'editTime',
    headerName: '最后录入时间',
    sortable: true,
    editable:false,
    width: 160,
  },
  {
    field: 'editUser',
    headerName: '操作员',
    width: 110,
    editable: false,
  }
];

export const SearchCtx=React.createContext({})



export default function TmriSnGrid() {
  const [loading,setLoading]=useState(true)
  const [snacker,setSnacker]=useState({
      open:false,
      error:false,
      msg:''
  })
  const [conditions,setConditions]=useState({
      index:1,
      size:10,
      city:'',
      org:''
  })
  const [rows,setRows]=useState([])

  const fetchData= async ()=>{
    setLoading(true)
    const res = await axios.get('/api/tmrisn/query',conditions)
    console.log(res.data)
    if(res.data.code===1){
      setRows(res.data.data)
    }else{
      setSnacker({
        ...snacker,
        open:true,
        error:true,
        msg:res.data.msg
      })
    }
    setLoading(false)
  }
    useEffect(()=>{
        fetchData()
    },[])//useEffect第二个参数表示在什么情况下才会调用它，[]表示只执行一次
    

    const handleSnackerClose=()=>{
        setSnacker(false)
    }
    
  return (
    <div style={{ height: 400, width: '100%' }}>
        {
        loading && (
          <LinearProgress />
          )
      }
      {
          snacker.open && (
              
            <Snackbar
                anchorOrigin={{ vertical:"top", horizontal:"center" }}
                open
                onClose={()=>handleSnackerClose}
                // message="I love snacks"
                autoHideDuration={2000}
            >
                <Alert severity={snacker.error?'error':'success'} sx={{ width: '100%' }}>
                {snacker.error?'查询失败':"成功"}
                </Alert>
            </Snackbar>
          )
      }
      
      <SearchCtx.Provider value={{conditions,setConditions}}>
      <Search></Search>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />

      </SearchCtx.Provider>

    </div>
  );
}
