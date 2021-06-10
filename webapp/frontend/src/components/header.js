
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
  } from "@material-ui/core";
  import React from "react";

  
  const headersData = [
    {
      label: "Portfolio",
      href: "/mentors",
    },
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "Log Out",
      href: "/logout",
    },
  ];
                       
  const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
      },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
  }));
                       
  export default function Header() {
    const { header, logo, menuButton, toolbar } = useStyles();
                       
    const displayDesktop = () => {
        return (
          <Toolbar className={toolbar}>
            {timesharingLogo}
            <div>{getMenuButtons()}</div>
          </Toolbar>
        );
      };                 
    const timesharingLogo = (
      <Typography variant="h6" component="h1" className={logo}>
        Timesharing
      </Typography>
    );
    const  contentDisp = () =>{

    }             
    const getMenuButtons = () => {
      return headersData.map(({ label, href }) => {
        return (
            <Button
            {...{
               key: label,
               color: "inherit",
               to: href,
               className: menuButton
            }}
         >
            {label}
          </Button>
        );
      });
    };
                       
    return (
      <header>
        <AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
      
    );
  }