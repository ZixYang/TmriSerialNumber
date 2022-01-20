import * as React from 'react';
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useSWR from 'swr';
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


export default function TmriSN(){
    const [loading,setLoading]=useState(true)
    const [snacker,setSnacker]=useState({
        open:false,
        error:false,
        msg:''
    })
    const [page,setPage]=useState({
        index:1,
        size:10
    })
    return (
        
        <TmriSnGrid page={page}></TmriSnGrid>
    )
}

TmriSN.getInitialProps=async ({ctx})=>{
    const res = await axios.get('/api/tmrisn/query',{
        page:ctx.index,
        size:ctx.size,
        city:ctx.city
    })
    return { result:res.data}
}

export function TmriSnGrid(props) {
    
    const [rows,setRows]=useState(props.data)
    useEffect(()=>{
        
        if(result){
            if(result.code===1){
                setRows(result)
                setSnacker({
                    ...snacker,
                    open:true,
                })
            }else{
                setLoading(false)
                setSnacker({
                    ...snacker,
                    open:true,
                    error:true,
                    msg:result.msg
                })
            }
            
        }
    },[result,snacker])
    

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
      

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
