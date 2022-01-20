import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignIn() {
  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const [snacker,setSnacker]=useState({
    open:false,
    vertical:"top",
    horizontal:"center",
    severity:'success',
    msg:"登录成功"
  })
  const {open,vertical,horizontal,severity,msg}=snacker

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true)
    axios.post('api/user/login',{
      username:formData.get('username'),
      password:formData.get('password')
    }).then(res=>{
      setLoading(false)
      if(res.data.code===1){
        setSnacker({
          ...snacker,
          open:true
        })

        router.push('tmrisn')
      }else{
        setSnacker({
          ...snacker,
          open:true,
          severity:'error',
          msg:res.data.msg
        })
      }
    })
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

  };


  return (
    <ThemeProvider theme={theme}>
      {
        loading && (
          <LinearProgress />
          )
      }
      <Container component="main" maxWidth="xs">

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={()=>{setSnacker({...snacker,open:false})}}
        // message="I love snacks"
        autoHideDuration={2000}
        key={vertical + horizontal}
      >
        <Alert severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            赛斯TMRI接口序列号管理平台
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              登  录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="forgetpassword" variant="body2">
                  忘记密码？
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"没有账号? 注册一个"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}