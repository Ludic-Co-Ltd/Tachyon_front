import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
// import { ReactComponent as NS } from './../../assets/images/ns.svg';
import NS from '../../assets/images/ns.svg';
import { backendUrl } from "../../utils/textDisplay";
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fetchOneComment } from "../../utils/actions";
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
    const [comment, setComment] = useState({});
    const { id } = useParams();
    const formData = new FormData();
    const navigate = useNavigate();

    useEffect(() => {

        fetchOneComment(id)
            .then(res => {
                if (res.status == 200) {
                    setComment(JSON.parse(res.data.case_study_comment));
                }
            })
            .catch(err => {
                console.log(err);
            });

    }, []);


    return (
        <section className="px-4">
            <button onClick={() => navigate(-1)}>
                <div className="flex text-base mt-4">
                    <ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
                </div>
            </button>
            <div className="py-2">
                <Heading title="ケースチャレンジ" />
            </div>
            

            {Object.keys(comment).length > 0 &&
                <div className="my-2">
                    <div className="pdf-container h-56">
                        <a href={backendUrl + comment.file_path} download target='_blank'>
                        {/* <img src={comment.thumbnail&&(backendUrl+comment.thumbnail)}  alt="" className="aspect-[4/3]" />  */}
                            <Document
                                file={backendUrl + comment.file_path}
                                className={'h-full'}
                            		
                            >
                                <Page
                                    pageNumber={1}
                                    height={200}
                                    renderTextLayer={false}
                                    className={'w-full h-full'}
                                />
                            </Document>
                            <p className="text-right my-2"><DownloadIcon/>ダウンロードファイル</p>
                           
                        </a>
                    </div>
                    <div className="font-bold elp-title text-xl text-center" style={{marginTop:50}}><FavoriteBorderIcon />{comment.case_study.question}</div>
                    <div className="text-center elp-content  text-center" style={{marginTop:20}}>{comment.comment}</div>
                    <div className="grid grid-cols-5 text-xl font-bold mt-10 mb-3" style={{paddingLeft:20}}>
                        <div className="text-center">
                            <div style={{ background: `url(${NS})`, width: 40, height: 50, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
                                <div className="text-left" style={{ marginLeft: '-5px' }}>{comment.mark1 ? comment.mark1 : '00'}</div>
                                <div className="text-right " style={{ marginTop: '-12px', marginLeft: '-19px', textAlign: 'right' }}>25</div>
                            </div>
                            <div style={{ marginLeft: '-23px' }}>論理性</div>
                        </div>
                        <div className="text-center">
                            <div style={{ background: `url(${NS})`, width: 40, height: 50, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
                                <div className="text-left" style={{ marginLeft: '-5px' }}>{comment.mark2 ? comment.mark2 : '00'}</div>
                                <div className="text-right " style={{ marginTop: '-12px', marginLeft: '-19px', textAlign: 'right' }}>25</div>
                            </div>
                            <div style={{ marginLeft: '-23px' }}>思考力</div>
                        </div>
                        <div className="text-center">
                            <div style={{ background: `url(${NS})`, width: 40, height: 50, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
                                <div className="text-left" style={{ marginLeft: '-5px' }}>{comment.mark3 ? comment.mark3 : '00'}</div>
                                <div className="text-right " style={{ marginTop: '-12px', marginLeft: '-19px', textAlign: 'right' }}>25</div>
                            </div>
                            <div style={{ marginLeft: '-23px' }}>知識</div>
                        </div>
                        <div className="text-center">
                            <div style={{ background: `url(${NS})`, width: 40, height: 50, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
                                <div className="text-left" style={{ marginLeft: '-5px' }}>{comment.mark4 ? comment.mark4 : '00'}</div>
                                <div className="text-right " style={{ marginTop: '-12px', marginLeft: '-19px', textAlign: 'right' }}>25</div>
                            </div>
                            <div style={{ marginLeft: '-23px' }}>発想力</div>
                        </div>
                        <div className="text-center">
                            <div style={{ background: `url(${NS})`, width: 40, height: 50, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="bg-no-repeat bg-center">
                                <div className="text-left" style={{ marginLeft: '-5px' }}>{comment.mark1 + comment.mark2 + comment.mark3 + comment.mark4}</div>
                                <div className="text-right " style={{ marginTop: '-12px', marginLeft: '15px', textAlign: 'right' }}>100</div>
                            </div>
                            <div style={{ marginLeft: '-23px' }}>合計</div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}