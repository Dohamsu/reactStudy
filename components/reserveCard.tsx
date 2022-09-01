import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import {useRouter} from 'next/router'
import { Button,Box,Grid } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Rating from '@mui/material/Rating';

class ToggleDetail extends React.Component<{description:string},{isToggleOn:boolean}> {
    constructor(props:any) {
      super(props);
      this.state = {isToggleOn: false};
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }
  
    render() {
      return (
        <div>
            <ExpandMore
            expand={this.state.isToggleOn}
            onClick={this.handleClick}
            aria-expanded={this.state.isToggleOn}
            aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={this.state.isToggleOn} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography  sx={{whiteSpace: "pre-wrap"}} variant="body2" color="text.secondary">
                {this.props.description}
                </Typography>  
                </CardContent>
            </Collapse>
        </div>
      );
    }
  }

interface ExpandMoreProps extends IconButtonProps {
expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


export default function ReserveCard(props: any){


  
  let data = props.data;
  let rating = data.rating == undefined ? 0:data.rating; 
  console.log(props);
  
  return (
    <Card sx={{ width: 220, height:450}}>
        <CardMedia
            component="img"
            alt="thumb"
            height='200px'
            image={"https://www.zerogangnam.com/storage/"+data.thumb}
        />
        <CardContent>
          <Box
            sx={{justifyContent:"center"}}
          >
            <Typography gutterBottom variant="h6" component="div">
            {data.title}
            </Typography>
            <Rating
              name="text-feedback"
              value={rating}
              readOnly
              precision={0.5}
              
            />
            <Box sx={{ ml: 1, display:"inline",size:"0.825rem" }}>
              {"("+rating +")"}
              </Box>
          </Box>

            <Typography variant="body2" color="text.secondary" 
            >
            {data.description.split("\r")[0]}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <ToggleDetail
                description={data.description}
            ></ToggleDetail>
        </CardActions>                    
    </Card>
    )
}