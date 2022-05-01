import { Box, Dialog, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { FacebookShareButton, WhatsappShareButton,TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";

const SocialMediaShare = (props) => {
    const mountedRef = React.useRef(true)
  

    React.useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    }, []);

    let buttonStyle = { width: '300px', height: '50px', borderRadius: '15px', mx: '40px', backgroundColor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', mt: '30px' };


    return (
        <React.Fragment>
            <Dialog PaperProps={{ style: { borderRadius: '50px', backgroundColor: '#FFED66' } }} open={props.open} onClose={props.handleClose} fullWidth maxWidth="lg">
                <div style={{ height: '500px', backgroundColor: '#FFED66', padding: '50px',alignContent: 'center' }}>
                    <Typography fontWeight={600} fontSize={50} style={{ textAlign: 'center' }}>
                        Redes Sociales
                    </Typography>
                    <div style={{ height: '10%'}}></div>
                    <Divider>
                        <FacebookShareButton url="localhost:3000" quote="Compartir mis resultados!">
                            <FacebookIcon size={100} round={true}/>  
                        </FacebookShareButton>
                        <WhatsappShareButton url="localhost:3000" quote="Compartir mis resultados!">
                            <WhatsappIcon size={100} round={true}/>
                        </WhatsappShareButton>

                        <TwitterShareButton url="localhost:3000" quote="Compartir mis resultados!">
                            <TwitterIcon size={100} round={true}/>
                        </TwitterShareButton>
                    </Divider>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box className="hover" sx={buttonStyle}>
                            <Typography style={{ fontSize: '30px', color: '#FFF' }}> Cancelar</Typography>
                        </Box>
                    </div>
                 </div>   
            </Dialog>

        </React.Fragment >
    )
}

export default SocialMediaShare;