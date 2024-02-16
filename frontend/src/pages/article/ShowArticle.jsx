import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { backendUrl } from "../../utils/textDisplay";
import {fetchArticle} from '../../utils/actions';

export default () => {
	const {id} = useParams();

	const [article, setArticle] = useState({});
	const [error, setError] = useState('');

	useEffect(() => {
    fetchArticle(id)
      .then(res => {
        if(res.status == 200){
          setArticle(res.data);
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
			<div className="mt-2">
        <img src={article.image_path&&(backendUrl+article.image_path)} 
            alt="article logo" 
            className="company-logo aspect-[2/1] border border-slate-200" 
        />
        <div className="flex w-full justify-between mt-4">
          <h4 className="font-bold">{article.title}</h4>
          <p>~{moment(article.created_at).format('MM月DD日')}投稿~</p>
        </div>
				<hr className="border-b border-gray-300 w-full my-2" />
				<p className="mt-2">{article.content}</p>
			</div>
			<div className="my-4">
				<h5 className="font-bold">{article.subtitle}</h5>
				<hr className="border-b border-gray-300 w-full my-2" />
				<p className="mt-2">
          {article.content2}
				</p>
			</div>
		</section>
	)
}