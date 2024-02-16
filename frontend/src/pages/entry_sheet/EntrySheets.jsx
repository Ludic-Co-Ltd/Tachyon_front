import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Document, Page, pdfjs } from 'react-pdf';
import Heading from "../../components/partials/Heading";
import { fetchAllES, deleteOneES } from "../../utils/actions";
import CustomPaginationActionsTable from '../../components/partials/CustomTable';
import BasicTabs from "../../components/partials/Tab";
import Footer from '../../components/partials/Footer';
import { backendUrl } from "../../utils/textDisplay";
import CustomButton from "../../components/partials/CustomButton";
import { Paths } from "../../config/Paths";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
  const navigate = useNavigate();

  const [esLeftTableBody, setEsLeftTableBody] = useState([]);
  const [esRightTableBody, setEsRightTableBody] = useState([]);

  const esLeftTableData = {
    body: esLeftTableBody
  };
  const esRightTableData = {
    body: esRightTableBody
  };
  const tabContents = [
    { id: 1, title: '添削前', content: <CustomPaginationActionsTable data={esLeftTableData} /> },
    { id: 2, title: '添削後', content: <CustomPaginationActionsTable data={esRightTableData} /> },
  ];

  const handleCorrection = (id) => {
    navigate(Paths.adminCorrectionEntrySheet.replace(':id', id));
  }

  const handleDelete = (id) => {
    window.confirm('本当に削除しますか？') && deleteOneES(id)
		.then(res => {
			if (res.status && (res.status === 200 || res.status === 204)) {
				toastr.success('ES情報が削除されました。');
				// navigate(Paths.adminMentees);
				window.location.reload();
				return;
			}
			toastr.error('ES情報の削除に失敗しました。');
		})
		.catch(err => {
			console.log('err', err);
			toastr.error('ES情報の削除に失敗しました。');
		});
  }

  useEffect(() => {
    fetchAllES()
      .then(res => {
        let leftData = [];
        let rightData = [];
        res.forEach(r => {
          if (r.status == '1') {
            leftData = [...leftData, {
              id: r.id,
              file_path: (<div >
                {/* <Document
                  file={backendUrl + r.file_path}
                  className={'h-full'}
                >
                  <Page
                    pageNumber={1}
                    height={120}
                    renderTextLayer={false}
                    className={' h-full'}
                  />
                </Document> */}
                <img src={r.thumbnail&&(backendUrl+r.thumbnail)}  alt="" className="aspect-[4/3]" style={{width:100, height:100, maxWidth:100}}/>

              </div>),
              user_name: (<div>
                <p className="text-sm text-neutral-300 text-left">
                  {moment(r.created_at).format('YYYY年MM月DD日hh:mm')}投稿
                </p>
                <p className="text-base text-primary text-left">{r.user.last_name + r.user.first_name}</p>
              </div>),
              company_name: (<h5 className="text-center text-primary">{r.company.name}</h5>),
              period: (<p className="text-primary">期限 : {moment(r.period).format('YYYY年MM月DD日')}</p>),
              action_button: (
                <div className="flex gap-5">
                  <CustomButton
                    id={r.id}
                    is_undisclosed={0}
                    handleClick={() => { handleCorrection(r.id) }}
                    title='添削'
                  />
                  <CustomButton
                    title="削除"
                    id={r.id}
                    is_undisclosed={1}
                    handleClick={() => { handleDelete(r.id) }}
                  />
                </div>
              )
            }]
          }
        });

        res.forEach(r => {
          if (r.status == '2') {
            rightData = [...rightData, {
              id: r.id,
              file_path: (<div >
                {/* <Document
                  file={backendUrl + r.file_path}
                  className={'h-full'}
                >
                  <Page
                    pageNumber={1}
                    height={120}
                    renderTextLayer={false}
                    className={' h-full'}
                  />
                </Document> */}
                <img src={r.thumbnail&&(backendUrl+r.thumbnail)}  alt="" className="aspect-[4/3]" style={{width:100, height:100, maxWidth:100}}/>
              </div>),
              user_name: (<div>
                <p className="text-sm text-neutral-300 text-left">
                  {moment(r.updated_at).format('YYYY年MM月DD日hh:mm')}回答
                </p>
                <p className="text-base text-primary text-left">{r.user.last_name + r.user.first_name}</p>
              </div>),
              company_name: (<h5 className="text-center text-primary">{r.company.name}</h5>),
              period: (<p className="text-primary">期限 : {moment(r.period).format('YYYY年MM月DD日')}</p>),
              action_button: (
                <div className="flex gap-5">
                  <CustomButton
                    id={r.id}
                    is_undisclosed={0}
                    handleClick={() => { handleCorrection(r.id) }}
                    title='編集'
                  />
                  <CustomButton
                    title="削除"
                    id={r.id}
                    is_undisclosed={1}
                    handleClick={() => { handleDelete(r.id) }}
                  />
                </div>
              )
            }]
          }
        });
        setEsLeftTableBody(leftData);
        setEsRightTableBody(rightData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      
      <div className="bg-white px-16 pb-4">
        <div className="flex flex-wrap justify-between">
          <Heading title="ES" />
        </div>
      </div>
      <div className="px-16 pb-16">
        <BasicTabs data={tabContents} />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </section>
  )
}