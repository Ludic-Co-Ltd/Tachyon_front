import React, { useState, useEffect } from "react";
import Heading from "../../components/partials/Heading";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { backendUrl } from "../../utils/textDisplay";
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import moment from "moment";
import { fetchEs } from "../../utils/actions";
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

 

export default () => {
  const navigate = useNavigate();
  const [es, setEs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchEs(id)
      .then(res => {
        if (res.status == 200) {
          setEs(res.data);
        }
        else {
          // setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);


  return (
    <section className="px-2">
      <button onClick={() => navigate(-1)} className="mt-4">
        <div className="flex text-base py-2">
          <ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
        </div>
      </button>

      {Object.keys(es).length > 0 &&
        <div>
          <a href={backendUrl + es.file_path} target='_blank' download>
            <div>
              {/* <Document
                file={backendUrl + es.file_path}
                className={'h-full'}
              >
                <Page
                  pageNumber={1}
                  height={200}
                  renderTextLayer={false}
                  className={'w-full h-full'}
                />
              </Document>              */}
              <img src={es.thumbnail&&(backendUrl+es.thumbnail)}  alt="" className="aspect-[4/3]" />

            </div>
            <p className="text-right my-2"><DownloadIcon/>ダウンロードファイル</p>
          </a>
          <div className="font-bold elp-title text-xl text-center">{es.company&&es.company.name}</div>
          <div className="font-bold elp-title text-xs text-gray-400 ">{moment(es.period).format('YYYY年MM月DD日')}</div>
          <div className="text-base mt-2" >{es.correction_result}</div>
        </div>
      }
    </section>
  )
}