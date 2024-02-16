import React, { useState, useEffect } from "react";
import '../../assets/scss/auth/login.scss';
import Heading from "../../components/partials/Heading";
import Events from "../../features/dashboard/Events";
import {fetchAllIndustries} from '../../utils/actions';

export default () => {
  const [industries, setIndustries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllIndustries()
      .then(res => {
        if(res.status == 200){
          setIndustries(res.data);
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
    <section className="">			
			<div className="mt-4">
        <Heading title="選考情報" />
      </div>
      {industries.length>0&&industries.map(industry=>(
        <div className="my-1 pb-5" key={industry.id}>
          <h4 className="ml-2 text-base">{industry.name}</h4>
          <Events companies={industry.companies} category='industry' perPage={3} padding={'2rem'}/>
        </div>
      ))}
    </section>
  )
}