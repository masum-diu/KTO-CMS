import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import instance from "./api/api_instance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState('10');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleLogin = async (e) => {
    router.push("/home");
    e.preventDefault();
    setLoading(true);
    try {
      // const response = await instance.post("/login", { email, password });
      // //   console.log("Login response:", response);
      // router.push("/home");
      // localStorage.setItem("token", response?.data?.token);
    } catch (error) {
      // toast.error('Login failed. Please try again.');
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={0}>
      <Grid        
        item
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <Stack
          direction={"column"}
          component={Paper}
          elevation={6}
          spacing={3}
          sx={{ width: "90%", p: 4, maxWidth: "500px", mx: "auto", borderRadius: 2 }}
        >
          <Stack

            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={4}

          >
            <img src="/logoImage.png" alt="" style={{ width: "150px" }} />
            <Typography
              variant="h6"
              className="bold"
              sx={{ color: "#333", textAlign: "center" }}
            >
              KTO Content Management System
            </Typography>
          </Stack>
          <Typography pb={2} fontSize={32} className="bold" textAlign="center">
            Login Account
          </Typography>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <Stack direction={"column"} spacing={2}>
              <label >Email address</label>
              <TextField
                size="small"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                }}
              />

              <label>Password</label>
              <TextField
                size="small"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


              {loading ? (
                <CircularProgress
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  size={20}
                />
              ) : (
                <Button
                  variant="contained"
                  className="SemiBold"
                  size="small"
                  sx={{

                    textTransform: "none",
                    fontSize: 18,
                    backgroundColor: "#9B1FE8",
                    color: "#fff",
                    
                    "&:hover": {
                      backgroundColor: "#8A1CC8",
                      color: "#fff",
                    },
                  }}
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
              )}
            </Stack>
          </form>

        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
