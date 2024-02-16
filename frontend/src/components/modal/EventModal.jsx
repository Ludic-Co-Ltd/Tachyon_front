import React from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import Button from "../button/Button";
import StarRating from "../partials/StarRating";
import Zoom from "../../assets/images/zoom.jpg";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 4,
	py: 1
};

export default (props) => {
	const { 
    name, 
    industry,
    image_path, 
    company,
    event_date, 
    start_time, 
    end_time, 
    zoom_url, 
    open_chat_url,
    rating,
    type,
    open,
    setOpen
} = props;

  const handleClick = () =>{
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="rounded-md pt-5"
    >
      <Box sx={style} className="rounded-md pt-5">
        <img src={image_path?(backendUrl+image_path):Zoom} 
            alt="event logo" 
            className="company-logo aspect-[3/2] border border-slate-200 mt-5" 
        />
        <div className="flex w-full gap-2">
          <div className="flex items-start text-xs text-neutral-300 break-keep">{industry}</div>          
        </div>
        <div className="flex items-center justify-center text-lg font-bold  break-keep">{name}</div>
        {rating&&<div className="flex justify-end w-full text-xs">
          <StarRating rating={rating}/>
        </div>}
        <div className="text-center text-base elb-title ml-5 mr-5">
          {moment(event_date).format('YYYY年MM月DD日')}{moment(start_time).format('hh:mm')+"~"+moment(end_time).format('hh:mm')}
        </div>
        <div className="mt-2">
          <div className="text-sm">参加用ZOOM</div>
          <a href={zoom_url} className="ml-5 text-xs" target="_blank">{zoom_url}</a>
        </div>
        {type != 3 && company != "ZOOM 面談" &&
        <div className="mt-2">
          <div className="text-sm">オープンチャット</div>
          <a href={open_chat_url} className="ml-5 text-xs" target="_blank">{open_chat_url}</a>
        </div>
        }
        <div className="flex flex-wrap justify-center gap-5 my-4">
          <Button 
            title="閉じる" 
            bgColor="bg-orange-400" 
            bgColorHover="bg-orange-700" 
            className="px-6 rounded-full py-0 text-xs" 
            // handleClick={()=>setOpen(false)}
            handleClick={handleClick}
          />
          
        </div>
      </Box>
    </Modal>
  )
}