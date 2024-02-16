import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { backendUrl } from "../../utils/textDisplay";
import { fetchCompany, fetchCompanyReviews } from '../../utils/actions';
import { Paths } from "../../config/Paths";
import Button from "../../components/button/Button";

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState({});
  const [companyReviews, setCompanyReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompany(id)
      .then(res => {
        if (res.status == 200) {
          setCompany(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

    fetchCompanyReviews(id)
      .then(res => {
        if (res.status == 200) {
          setCompanyReviews(res.data);
        }
        else {
          setError(res.data.error)
        }
      })
      .catch(err => {
        console.log(err);
      });

  }, []);
  return (
    <section className="px-4">
      <button onClick={() => navigate(-1)}>
        <div className="flex text-base py-2  mt-4">
          <ChevronDoubleLeftIcon className="w-5 h-5 ps-1" />戻る
        </div>
      </button>
      <div className="mt-2">
        <img src={company.logo_path && (backendUrl + company.logo_path)}
          alt="company logo"
          className="company-logo aspect-[2/1] border border-slate-200"
        />
        <h4 className="text-center mt-2">{company.name}</h4>
        <hr className="border-b border-gray-300 w-full my-2" />
        <p className="mt-2">{company.overview}</p>
      </div>
      {companyReviews.length>0&&companyReviews.map(company_review=>(
        <div className="mt-6 mb-4">
          <h5 className="font-bold">{company_review.title}</h5>
          <hr className="border-b border-gray-300 w-full my-2" />
          <p className="mt-2">
            {company_review.content}
          </p>
        </div>

      ))}
      <div className="flex flex-wrap justify-center gap-5 my-4">
        <Button
          title="投稿"
          bgColor="bg-orange-400"
          bgColorHover="bg-orange-700"
          className="px-5 py-2.5 rounded-lg"
          //Paths.showCompany.replace(':id', id)
          handleClick={() => navigate(Paths.createCompanyReview.replace(':id', id))}
        />
      </div>
      {/* <div className="mt-2 text-center">
        <Link to={Paths.entrySheetCorrection}>
          <button 
            className="bg-orange-500 text-white text-2xl px-6 py-1 rounded-2xl">
              投稿
          </button>
        </Link>
      </div> */}
    </section>
  )
}